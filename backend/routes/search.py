import random
from fastapi import APIRouter, HTTPException
from sqlalchemy import func, select, literal, or_
from sqlalchemy.exc import SQLAlchemyError
from starlette import status
from auth import get_current_user_dependency
from db import Liked, Wallpaper, WallpaperCategory, User, Category, Downloaded, db_dependency
from util.logger import logger
from schema import ImageSchema

router = APIRouter(prefix='/api', tags=['APIs'])


@router.get('/search', response_model=list[ImageSchema], status_code=status.HTTP_200_OK)
async def search(skip: int, limit: int, query: str, db: db_dependency, user: get_current_user_dependency):
    try:
        user_id = user.get("user_id") if user else None  # Get user_id if logged in

        # Create a function to generate the correlated subquery
        def get_has_liked_expr(user_id):
            if user_id is None:
                return literal(False).label("has_liked")

            # Create a correlated subquery with explicit correlation
            liked_subquery = select(literal(True)).where(
                (Liked.user_id == user_id) &
                (Liked.wallpaper_id == Wallpaper.id)
            ).correlate(Wallpaper).exists().label("has_liked")

            return liked_subquery

        # Use the function in your query
        has_liked_expr = get_has_liked_expr(user_id)

        # First, create a subquery to find wallpapers that have matching categories
        wallpapers_with_matching_categories = (
            select(WallpaperCategory.wallpaper_id)
            .join(Category, Category.id == WallpaperCategory.category_id)
            .where(Category.name.icontains(query))
            .distinct()
            .scalar_subquery()
        )

        wallpapers = (
            db.query(
                Wallpaper.id,
                Wallpaper.name,
                Wallpaper.image,
                User.name.label("uploader_name"),
                func.count(Liked.id).label("likes"),
                func.count(Downloaded.id).label("downloads"),
                func.array_agg(Category.name).label("categories"),
                has_liked_expr
            )
            .join(User, User.id == Wallpaper.uploaded_by)
            .outerjoin(Liked, Wallpaper.id == Liked.wallpaper_id)  # Outer join for counting liked users
            .outerjoin(Downloaded, Wallpaper.id == Downloaded.wallpaper_id)  # Outer join for counting downloaded users
            .outerjoin(WallpaperCategory, WallpaperCategory.wallpaper_id == Wallpaper.id)
            .outerjoin(Category, Category.id == WallpaperCategory.category_id)
            .filter(or_(Wallpaper.name.icontains(query), Wallpaper.id.in_(
                wallpapers_with_matching_categories)))  # Get only the wallpapers liked by the user
            .group_by(Wallpaper.id, User.name)
            .order_by(Wallpaper.created_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )

        wallpapers_list = [
            ImageSchema.model_validate(w)
            for w in wallpapers
        ]

        random.shuffle(wallpapers_list)
        print(wallpapers_list)

        return wallpapers_list

    except SQLAlchemyError as e:
        logger.error(f"Upload error: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error occurred: {str(e)}"
        )
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {str(e)}"
        )

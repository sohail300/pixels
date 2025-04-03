import random

from fastapi import APIRouter, HTTPException
from sqlalchemy import func, select, literal, or_, distinct
from sqlalchemy.exc import SQLAlchemyError
from starlette import status

from auth import get_current_user_dependency
from schema import Liked, Wallpaper, WallpaperCategory, User, Category
from util.logger import logger
from database import db_dependency
from model import ImageResponseModel

router = APIRouter(prefix='/api', tags=['APIs'])


@router.get('/suggested', response_model=list[ImageResponseModel], status_code=status.HTTP_200_OK)
async def suggested(skip: int, limit: int, db: db_dependency, user: get_current_user_dependency):
    # if userid exists, then SEE WHAT CATEGORIES POSTS HAS USER LIKED, AND GET THOSE CATEGORY PHOTOS FROM BACKEND
    try:

        if not user or not user.get("user_id"):
            user_id = None

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

            most_liked_wallpapers = (
                db.query(
                    Wallpaper.id,
                    Wallpaper.name,
                    Wallpaper.image,
                    User.name.label("uploader_name"),
                    func.count(Wallpaper.liked_by_users).label("likes"),
                    func.count(Wallpaper.downloaded_by_users).label("downloads"),
                    func.array_agg(Category.name).label("categories"),
                    has_liked_expr
                )
                .join(User, User.id == Wallpaper.uploaded_by)
                .outerjoin(Wallpaper.liked_by_users)  # Outer join for counting liked users
                .outerjoin(Wallpaper.downloaded_by_users)  # Outer join for counting downloaded users
                .outerjoin(WallpaperCategory, WallpaperCategory.wallpaper_id == Wallpaper.id)
                .outerjoin(Category, Category.id == WallpaperCategory.category_id)
                .group_by(Wallpaper.id, User.name)
                .order_by(func.count(Wallpaper.liked_by_users).desc())
                .offset(skip / 2)
                .limit(limit / 2)
                .all()
            )

            most_downloaded_wallpapers = (
                db.query(
                    Wallpaper.id,
                    Wallpaper.name,
                    Wallpaper.image,
                    User.name.label("uploader_name"),
                    func.count(Wallpaper.liked_by_users).label("likes"),
                    func.count(Wallpaper.downloaded_by_users).label("downloads"),
                    func.array_agg(Category.name).label("categories"),
                    has_liked_expr
                )
                .join(User, User.id == Wallpaper.uploaded_by)
                .outerjoin(Wallpaper.liked_by_users)  # Outer join for counting liked users
                .outerjoin(Wallpaper.downloaded_by_users)  # Outer join for counting downloaded users
                .outerjoin(WallpaperCategory, WallpaperCategory.wallpaper_id == Wallpaper.id)
                .outerjoin(Category, Category.id == WallpaperCategory.category_id)
                .group_by(Wallpaper.id, User.name)
                .order_by(func.count(Wallpaper.downloaded_by_users).desc())
                .offset(skip / 2)
                .limit(limit / 2)
                .all()
            )

            # Merge both lists and remove duplicates based on Wallpaper.id
            unique_wallpapers = {wp.id: wp for wp in (most_liked_wallpapers + most_downloaded_wallpapers)}

            # Convert back to list (preserving only unique wallpapers)
            wallpapers = list(unique_wallpapers.values())

            wallpapers_list = [
                ImageResponseModel.model_validate(w)
                for w in wallpapers
            ]

            random.shuffle(wallpapers_list)

            return wallpapers_list

        else:
            user_id = user.get("user_id")

            user_category_counts = (
                db.query(
                    Category.id,
                    func.count(Category.id).label('category_count')
                )
                .join(WallpaperCategory, WallpaperCategory.category_id == Category.id)
                .join(Wallpaper, Wallpaper.id == WallpaperCategory.wallpaper_id)
                .join(Liked, Liked.wallpaper_id == Wallpaper.id)
                .filter(Liked.user_id == user_id)
                .group_by(Category.id)
            ).subquery('user_category_counts')

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

            # Get wallpapers with a relevance score based on matching categories
            relevant_wallpapers = (
                db.query(
                    Wallpaper.id,
                    func.sum(user_category_counts.c.category_count).label('relevance_score')
                )
                .join(WallpaperCategory, WallpaperCategory.wallpaper_id == Wallpaper.id)
                .join(user_category_counts, WallpaperCategory.category_id == user_category_counts.c.id)
                .group_by(Wallpaper.id)
            ).subquery('relevant_wallpapers')

            suggested_wallpapers = (
                db.query(
                    Wallpaper.id,
                    Wallpaper.name,
                    Wallpaper.image,
                    User.name.label("uploader_name"),
                    func.count(Wallpaper.liked_by_users).label("likes"),
                    func.count(Wallpaper.downloaded_by_users).label("downloads"),
                    func.array_agg(Category.name).label("categories"),
                    has_liked_expr,
                    relevant_wallpapers.c.relevance_score,
                )
                .join(relevant_wallpapers, Wallpaper.id == relevant_wallpapers.c.id)
                .join(User, User.id == Wallpaper.uploaded_by)
                .outerjoin(Wallpaper.liked_by_users)  # Outer join for counting liked users
                .outerjoin(Wallpaper.downloaded_by_users)  # Outer join for counting downloaded users
                .outerjoin(WallpaperCategory, WallpaperCategory.wallpaper_id == Wallpaper.id)
                .outerjoin(Category, Category.id == WallpaperCategory.category_id)
                .group_by(Wallpaper.id, User.name, relevant_wallpapers.c.relevance_score)
                .order_by(relevant_wallpapers.c.relevance_score.desc())  # Order by relevance score
                .limit(limit)
                .all()
            )

            wallpapers_list = [
                ImageResponseModel.model_validate(w)
                for w in suggested_wallpapers
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

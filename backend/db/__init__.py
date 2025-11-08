"""Database configuration and models."""

from .database import engine, db_dependency, Base
from .models import (
    User,
    Wallpaper,
    Category,
    WallpaperCategory,
    Liked,
    Downloaded,
)

# Import models to ensure Base metadata is populated
__all__ = [
    "engine",
    "db_dependency",
    "Base",
    "User",
    "Wallpaper",
    "Category",
    "WallpaperCategory",
    "Liked",
    "Downloaded",
]


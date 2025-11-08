from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, func, text, Boolean
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(String, primary_key=True)
    name = Column(String, nullable=True)
    email = Column(String, unique=True, nullable=False)
    image = Column(String, nullable=True)
    upload_permission = Column(Boolean, default=False)
    created_at = Column(DateTime)  # Added timestamp

    liked_wallpapers = relationship('Liked', back_populates='user', cascade="all, delete-orphan")
    downloaded_wallpapers = relationship('Downloaded', back_populates='user', cascade="all, delete-orphan")
    uploaded_wallpapers = relationship('Wallpaper', back_populates='uploader')


class Wallpaper(Base):
    __tablename__ = 'wallpapers'

    id = Column(String, primary_key=True, server_default=text('uuid_generate_v4()'))
    name = Column(String, nullable=False)
    image = Column(String, nullable=False)
    uploaded_by = Column(String, ForeignKey('users.id', ondelete="SET NULL"), nullable=True)
    created_at = Column(DateTime, default=func.now())

    uploader = relationship('User', back_populates='uploaded_wallpapers')
    categories = relationship('WallpaperCategory', back_populates='wallpaper', cascade="all, delete-orphan")
    liked_by_users = relationship('Liked', back_populates='wallpaper', cascade="all, delete-orphan")
    downloaded_by_users = relationship('Downloaded', back_populates='wallpaper', cascade="all, delete-orphan")


class Category(Base):
    __tablename__ = 'categories'

    id = Column(String, primary_key=True, server_default=text('uuid_generate_v4()'))
    name = Column(String, unique=True, nullable=False)

    wallpapers = relationship('WallpaperCategory', back_populates='category', cascade="all, delete-orphan")


class WallpaperCategory(Base):
    __tablename__ = 'wallpaper_categories'

    id = Column(String, primary_key=True, server_default=text('uuid_generate_v4()'))
    wallpaper_id = Column(String, ForeignKey('wallpapers.id', ondelete="CASCADE"))
    category_id = Column(String, ForeignKey('categories.id', ondelete="CASCADE"))

    wallpaper = relationship('Wallpaper', back_populates='categories')
    category = relationship('Category', back_populates='wallpapers')


class Liked(Base):
    __tablename__ = 'liked'

    id = Column(String, primary_key=True, server_default=text('uuid_generate_v4()'))
    user_id = Column(String, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    wallpaper_id = Column(String, ForeignKey('wallpapers.id', ondelete="CASCADE"), nullable=False)

    user = relationship('User', back_populates='liked_wallpapers')
    wallpaper = relationship('Wallpaper', back_populates='liked_by_users')


class Downloaded(Base):
    __tablename__ = 'downloaded'

    id = Column(String, primary_key=True, server_default=text('uuid_generate_v4()'))
    user_id = Column(String, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    wallpaper_id = Column(String, ForeignKey('wallpapers.id', ondelete="CASCADE"), nullable=False)

    user = relationship('User', back_populates='downloaded_wallpapers')
    wallpaper = relationship('Wallpaper', back_populates='downloaded_by_users')


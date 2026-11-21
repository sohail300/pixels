"""Grid thumbnails for wallpapers.

The app's grid shows wallpapers at roughly 200px wide, but the originals are often
1MB+. Each wallpaper gets a small WebP copy stored next to it in the same bucket at
`thumbs/<original object name>.webp`, so the app can derive its URL from the
`image` key without a database change.
"""

from io import BytesIO

from PIL import Image, ImageOps

THUMBNAIL_WIDTH = 480  # ~2x the grid card width on a typical phone
THUMBNAIL_QUALITY = 75
THUMBNAIL_PREFIX = "thumbs/"


def thumbnail_object_name(object_name: str) -> str:
    """Object name (inside the bucket) of the thumbnail for `object_name`."""
    return f"{THUMBNAIL_PREFIX}{object_name}.webp"


def make_thumbnail(image_bytes: bytes) -> bytes:
    """Return a WebP thumbnail of the image, at most THUMBNAIL_WIDTH wide."""
    with Image.open(BytesIO(image_bytes)) as image:
        # Respect EXIF rotation from phone photos before resizing.
        image = ImageOps.exif_transpose(image)
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")

        if image.width > THUMBNAIL_WIDTH:
            height = round(image.height * THUMBNAIL_WIDTH / image.width)
            image = image.resize((THUMBNAIL_WIDTH, height), Image.Resampling.LANCZOS)

        output = BytesIO()
        image.save(output, format="WEBP", quality=THUMBNAIL_QUALITY, method=6)
        return output.getvalue()

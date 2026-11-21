"""
Creates grid thumbnails for wallpapers that don't have one yet.

New uploads get a thumbnail automatically (see routes/upload.py); this backfills
wallpapers uploaded before that. Each thumbnail is stored in the `images` bucket at
`thumbs/<original object name>.webp`. Existing thumbnails are skipped, so it is
safe to run again.

Run from backend/:  python scripts/generate_thumbnails.py [--dry-run]
Requires SUPABASE_URL and SUPABASE_SECRET (service role key) in backend/.env
"""
import argparse
import os
import sys
from urllib.parse import quote

import httpx
from dotenv import load_dotenv

BACKEND_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
sys.path.insert(0, BACKEND_DIR)
load_dotenv(os.path.join(BACKEND_DIR, ".env"))

from db.database import SessionLocal  # noqa: E402
from db.models import Wallpaper  # noqa: E402
from util.thumbnail import make_thumbnail, thumbnail_object_name  # noqa: E402

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SECRET = os.getenv("SUPABASE_SECRET")
BUCKET = "images"


def object_url(object_name: str, public: bool = True) -> str:
    prefix = "object/public" if public else "object"
    return f"{SUPABASE_URL}/storage/v1/{prefix}/{BUCKET}/{quote(object_name, safe='/')}"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--dry-run", action="store_true", help="only report what would be created")
    args = parser.parse_args()

    if not SUPABASE_URL or not SUPABASE_SECRET:
        sys.exit("SUPABASE_URL and SUPABASE_SECRET must be set in backend/.env")

    db = SessionLocal()
    try:
        images = [image for (image,) in db.query(Wallpaper.image).all()]
    finally:
        db.close()

    created = skipped = failed = 0
    with httpx.Client(timeout=60) as client:
        for image in images:
            # Keys are stored as "<bucket>/<object name>".
            object_name = image.split("/", 1)[1] if image.startswith(f"{BUCKET}/") else image
            thumb_name = thumbnail_object_name(object_name)

            if client.head(object_url(thumb_name)).status_code == 200:
                skipped += 1
                continue

            if args.dry_run:
                print(f"would create  {thumb_name}")
                created += 1
                continue

            try:
                original = client.get(object_url(object_name))
                original.raise_for_status()
                thumbnail = make_thumbnail(original.content)
                response = client.post(
                    object_url(thumb_name, public=False),
                    content=thumbnail,
                    headers={
                        "Authorization": f"Bearer {SUPABASE_SECRET}",
                        "Content-Type": "image/webp",
                        "x-upsert": "true",
                    },
                )
                response.raise_for_status()
                created += 1
                print(f"created  {thumb_name}  {len(original.content) // 1024}KB -> {len(thumbnail) // 1024}KB")
            except Exception as e:
                failed += 1
                print(f"FAILED   {object_name}: {e}")

    action = "would create" if args.dry_run else "created"
    print(f"\n{action} {created}, already had one {skipped}, failed {failed}")


if __name__ == "__main__":
    main()

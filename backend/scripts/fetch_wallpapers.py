"""
Fetches wallpapers from the Pexels API, tags each with 2-3 categories,
and saves them to backend/images/ along with a manifest.json.

Run: python fetch_wallpapers.py
Requires PEXELS_API_KEY in backend/.env
"""
import json
import os
import re

import requests
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

PEXELS_API_KEY = os.getenv("PEXELS_API_KEY")
IMAGES_DIR = os.path.join(os.path.dirname(__file__), "..", "images")
MANIFEST_PATH = os.path.join(IMAGES_DIR, "manifest.json")
PER_CATEGORY = 10

# category -> search query used against Pexels
CATEGORIES = {
    "nature": "nature",
    "abstract": "abstract",
    "space": "space galaxy",
    "minimalist": "minimalist",
    "ocean": "ocean waves",
    "mountains": "mountains",
    "city": "city skyline night",
    "dark": "dark aesthetic",
    "technology": "technology",
    "art": "digital art",
}

# keyword -> category, used to find a second/third relevant tag from each photo's alt text
KEYWORDS = {
    "nature": ["nature", "forest", "tree", "plant", "flower", "leaf", "green"],
    "abstract": ["abstract", "pattern", "texture", "geometric"],
    "space": ["space", "galaxy", "star", "planet", "universe", "nebula", "night sky"],
    "minimalist": ["minimal", "simple", "plain"],
    "ocean": ["ocean", "sea", "wave", "beach", "water"],
    "mountains": ["mountain", "peak", "hill", "valley", "snow"],
    "city": ["city", "urban", "building", "skyline", "street"],
    "dark": ["dark", "black", "night", "shadow"],
    "technology": ["tech", "circuit", "computer", "code", "digital"],
    "art": ["art", "painting", "illustration", "design"],
}


def sanitize(name: str) -> str:
    name = re.sub(r"[^\w\s-]", "", name).strip()
    name = re.sub(r"\s+", "_", name)
    return name[:60] or "wallpaper"


def extra_categories(alt_text: str, primary: str, limit: int = 2):
    alt_lower = (alt_text or "").lower()
    found = []
    for category, keywords in KEYWORDS.items():
        if category == primary:
            continue
        if any(kw in alt_lower for kw in keywords):
            found.append(category)
        if len(found) >= limit:
            break
    return found


def fetch_category(category: str, query: str, session: requests.Session):
    resp = session.get(
        "https://api.pexels.com/v1/search",
        headers={"Authorization": PEXELS_API_KEY},
        params={"query": query, "orientation": "portrait", "per_page": PER_CATEGORY},
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json().get("photos", [])


def main():
    if not PEXELS_API_KEY:
        print("PEXELS_API_KEY not set in backend/.env")
        return

    os.makedirs(IMAGES_DIR, exist_ok=True)
    manifest = []
    seen_ids = set()
    session = requests.Session()

    for category, query in CATEGORIES.items():
        print(f"Fetching '{category}' ({query})...")
        try:
            photos = fetch_category(category, query, session)
        except requests.RequestException as e:
            print(f"  Failed to fetch {category}: {e}")
            continue

        for photo in photos:
            photo_id = photo["id"]
            if photo_id in seen_ids:
                continue
            seen_ids.add(photo_id)

            alt = photo.get("alt") or category
            display_name = sanitize(alt) or f"{category}_{photo_id}"
            categories = [category] + extra_categories(alt, category)

            image_url = photo["src"]["portrait"]
            ext = ".jpg"
            filename = f"{display_name}_{photo_id}{ext}"
            filepath = os.path.join(IMAGES_DIR, filename)

            try:
                img_resp = session.get(image_url, timeout=30)
                img_resp.raise_for_status()
                with open(filepath, "wb") as f:
                    f.write(img_resp.content)
            except requests.RequestException as e:
                print(f"  Failed to download {photo_id}: {e}")
                continue

            manifest.append({
                "filename": filename,
                "name": alt,
                "categories": categories,
                "photographer": photo.get("photographer"),
                "pexels_url": photo.get("url"),
            })
            print(f"  Saved: {filename} | {categories}")

    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    print(f"\nDone. {len(manifest)} wallpapers saved to {IMAGES_DIR}")
    print(f"Manifest written to {MANIFEST_PATH}")


if __name__ == "__main__":
    main()

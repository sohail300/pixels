import json
import os
import requests

# ====== CONFIGURATION ======
FOLDER_PATH = "images"  # path to your folder containing images
MANIFEST_PATH = os.path.join(FOLDER_PATH, "manifest.json")
UPLOAD_URL = "http://localhost:8000/api/upload"
TOKEN = ""  # replace with your valid token

# ====== UPLOAD FUNCTION ======
def upload_image(file_path, name, categories):
    # Determine content type based on file extension
    filename_lower = os.path.basename(file_path).lower()
    if filename_lower.endswith(('.jpg', '.jpeg')):
        content_type = 'image/jpeg'
    elif filename_lower.endswith('.png'):
        content_type = 'image/png'
    elif filename_lower.endswith('.webp'):
        content_type = 'image/webp'
    elif filename_lower.endswith('.gif'):
        content_type = 'image/gif'
    else:
        content_type = 'image/jpeg'  # default fallback
    
    with open(file_path, "rb") as image_file:
        # Pass file with explicit content type (filename, file_object, content_type)
        files = {"file": (os.path.basename(file_path), image_file, content_type)}
        data = {"name": name}

        # Add each category individually
        for category in categories:
            data.setdefault("categories", []).append(category)

        headers = {
            "Authorization": f"Bearer {TOKEN}"
        }

        response = requests.post(UPLOAD_URL, files=files, data=data, headers=headers)

        if response.status_code == 200:
            print(f"✅ Uploaded: {os.path.basename(file_path)} | Name: {name} | Categories: {categories}")
        else:
            print(f"❌ Failed: {os.path.basename(file_path)} | {response.status_code} | {response.text}")


def main():
    if not os.path.exists(MANIFEST_PATH):
        print(f"❌ Manifest not found: {MANIFEST_PATH} (run fetch_wallpapers.py first)")
        return

    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    for entry in manifest:
        file_path = os.path.join(FOLDER_PATH, entry["filename"])
        if not os.path.exists(file_path):
            print(f"⚠️ Skipping missing file: {entry['filename']}")
            continue
        upload_image(file_path, entry["name"], entry["categories"])


if __name__ == "__main__":
    main()

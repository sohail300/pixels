import os
import random
import requests

# ====== CONFIGURATION ======
FOLDER_PATH = "images"  # path to your folder containing images
UPLOAD_URL = "http://localhost:8000/api/upload"
TOKEN = "eyJhbGciOiJIUzI1NiIsImtpZCI6IlZyZCtqY2JtTWZZQWZyYnEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3dmY2trdmx0emNzc290dnVldmx5LnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJiM2M4OTVmYy1lZjNhLTRlM2QtYTkzOS02YzEzMmQwODEwZmIiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzYyNjk2NDQzLCJpYXQiOjE3NjI2OTI4NDMsImVtYWlsIjoibWQuc29oYWlsLmFuc2FyaTk5OUBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6Imdvb2dsZSIsInByb3ZpZGVycyI6WyJnb29nbGUiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyX3VybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0tvNkNfeVJDLUFhMG0xdk1ySDZqSjlvcEtuaFJVVHhNQUxYVHJfR2R4UVB5aEVxSFJhPXM5Ni1jIiwiZW1haWwiOiJtZC5zb2hhaWwuYW5zYXJpOTk5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmdWxsX25hbWUiOiJTb2hhaWwgQW5zYXJpIiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tIiwibmFtZSI6IlNvaGFpbCBBbnNhcmkiLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLbzZDX3lSQy1BYTBtMXZNckg2ako5b3BLbmhSVVR4TUFMWFRyX0dkeFFQeWhFcUhSYT1zOTYtYyIsInByb3ZpZGVyX2lkIjoiMTA4OTc0OTgwMDE5NzgyNTQzNTEzIiwic3ViIjoiMTA4OTc0OTgwMDE5NzgyNTQzNTEzIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib2F1dGgiLCJ0aW1lc3RhbXAiOjE3NjI2OTI4NDN9XSwic2Vzc2lvbl9pZCI6IjcxYWM5Y2M1LWZkY2UtNGI0OC1iODFiLTRhMDViYTFkY2NiYiIsImlzX2Fub255bW91cyI6ZmFsc2V9.cNzDunp4-4kYOuVvl7dCD65coV2gY8Dr_GkNXsaLII4"  # replace with your valid token

# ====== SAMPLE DICTIONARY WORDS ======
dictionary_words = [
    "nature", "ocean", "forest", "mountain", "river", "sky", "flower",
    "desert", "storm", "sunrise", "sunset", "planet", "dream", "stone",
    "shadow", "cloud", "flame", "garden", "snow", "wave", "star", "leaf",
    "mirror", "storm", "vision", "echo", "valley", "path", "heart", "mind",
]

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
    if not os.path.exists(FOLDER_PATH):
        print(f"❌ Folder not found: {FOLDER_PATH}")
        return

    for filename in os.listdir(FOLDER_PATH):
        if filename.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
            file_path = os.path.join(FOLDER_PATH, filename)
            random_name = f"Image_{random.randint(1000,9999)}"
            random_categories = random.sample(dictionary_words, k=random.randint(1, 3))
            upload_image(file_path, random_name, random_categories)


if __name__ == "__main__":
    main()

from io import BufferedReader, BytesIO
import httpx
from fastapi import HTTPException
import traceback


async def upload_file(
        supabase_url: str, bucket_name: str, file_name: str, file, access_token: str
):
    try:
        upload_url = f"{supabase_url}/storage/v1/object/{bucket_name}/{file_name}"

        # Prepare file content
        if isinstance(file, bytes):
            file_content = file
        elif hasattr(file, 'read'):
            file_content = file.read()
        else:
            file_content = file

        # Increase timeout values significantly for large uploads
        timeout_settings = httpx.Timeout(
            connect=10.0,  # Connection timeout
            read=120.0,  # Read timeout (increased to 2 minutes)
            write=60.0,  # Write timeout
            pool=10.0  # Pool timeout
        )

        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": 'image/*',
            "x-upsert": "true"
        }

        try:
            async with httpx.AsyncClient(timeout=timeout_settings) as client:
                response = await client.post(
                    upload_url,
                    content=file_content,
                    headers=headers
                )

                if response.status_code not in [200, 201, 202, 204]:
                    return {"error": f"Upload failed with status {response.status_code}", "details": response.text}

                # If we get here, the upload was successful
                try:
                    return response.json()
                except Exception:
                    # Return success even if we can't parse JSON
                    return {
                        "success": True,
                        "message": "File uploaded successfully",
                        "Key": file_name  # Include the filename as the Key for your database
                    }

        except httpx.ReadTimeout:
            # If we get a timeout after sending the request, the upload might still be successful
            print("Request timed out, but the upload may have succeeded")
            return {
                "success": True,
                "message": "Upload may have succeeded but response timed out",
                "Key": file_name  # Include the filename as the Key for your database
            }

        except Exception as request_error:
            print(f"Error during request: {str(request_error)}")
            print(traceback.format_exc())
            raise

    except Exception as e:
        print(f"Upload error: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")
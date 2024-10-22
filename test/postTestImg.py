import requests
import json
import base64

# Replace with your local or deployed backend URL
BASE_URL = 'http://localhost:3000'
IMAGE_PATH = "/Users/two-mac/Documents/ait/fsad/problem_03/test/img/brocode.png"

# Convert image to base64
def convert_image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        base64_image = base64.b64encode(image_file.read()).decode('utf-8')
    return base64_image

# Test Login API
def login_user():
    url = f"{BASE_URL}/login"
    payload = {
        "email": "t800@t800.com",
        "password": "12345678"
    }
    response = requests.post(url, json=payload)
    
    if response.status_code == 200:
        print("Login successful!")
        return response.json()  # Should include token and user info
    else:
        print(f"Login failed: {response.status_code} {response.text}")
        return None

# Test the "Create Post" API
def create_post(token, base64_image):
    url = f"{BASE_URL}/api/v1/posts"
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    payload = {
        "caption": "My first post with an image!",
        "image_base64": base64_image,
        "pinned": False,
        "category": "general"
    }
    response = requests.post(url, data=json.dumps(payload), headers=headers)
    
    if response.status_code == 201:
        print("Post created successfully!")
        return response.json()
    else:
        print(f"Failed to create post: {response.status_code} {response.text}")
        return None

# Main flow to test the API
if __name__ == "__main__":
    # Step 1: Log in and get the token
    login_response = login_user()
    
    if login_response and 'token' in login_response:
        token = login_response['token']  # Extract the JWT token

        # Step 2: Convert image to base64
        base64_image = convert_image_to_base64(IMAGE_PATH)
        
        # Step 3: Create a post with the base64 image
        created_post = create_post(token, base64_image)
        
        if created_post and 'id' in created_post:
            post_id = created_post['id']  # Capture the post ID
            
            # Further actions (e.g., fetching, updating, deleting) can be added here
        else:
            print("Unable to proceed with further actions as the post creation failed.")
    else:
        print("Login failed. Cannot proceed with API testing.")

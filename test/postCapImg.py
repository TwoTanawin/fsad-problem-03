import requests
import json
import base64

# Replace with your local or deployed backend URL
BASE_URL = 'http://localhost:3000'
IMAGE_PATH = "/Users/two-mac/Documents/ait/fsad/problem_03/test/img/brocode.png"

# Convert image to base64
def convert_image_to_base64(image_path):
    try:
        with open(image_path, "rb") as image_file:
            base64_image = base64.b64encode(image_file.read()).decode('utf-8')
        return base64_image
    except FileNotFoundError:
        print(f"Image not found at {image_path}")
        return None

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
def create_post(token, caption=None, base64_image=None):
    url = f"{BASE_URL}/api/v1/posts"
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }

    # Build the payload dynamically based on the provided data
    payload = {}
    
    if caption:
        payload["caption"] = caption
    if base64_image:
        payload["image_base64"] = base64_image
    
    # Adding optional fields like pinned and category
    payload["pinned"] = False
    payload["category"] = "general"
    
    # Ensure that there's at least a caption or image
    if not payload:
        print("Cannot create post without a caption or image.")
        return None

    response = requests.post(url, data=json.dumps(payload), headers=headers)
    
    if response.status_code == 201:
        print("Post created successfully!")
        return response.json()
    else:
        print(f"Failed to create post: {response.status_code} {response.text}")
        return None

# Function to test different input cases
def test_create_post_cases(token, base64_image=None):
    # Case 1: Input both caption and image
    print("Test Case 1: Creating post with both caption and image...")
    caption_and_image_post = create_post(token, caption="Post with both caption and image", base64_image=base64_image)
    
    # Case 2: Input caption without image
    print("Test Case 2: Creating post with caption only...")
    caption_only_post = create_post(token, caption="This is a caption-only post")
    
    # Case 3: Input image without caption
    if base64_image:
        print("Test Case 3: Creating post with image only...")
        image_only_post = create_post(token, base64_image=base64_image)
    else:
        print("Skipping image-only post creation due to missing image.")

# Main flow to test the API
if __name__ == "__main__":
    # Step 1: Log in and get the token
    login_response = login_user()
    
    if login_response and 'token' in login_response:
        token = login_response['token']  # Extract the JWT token
        
        # Step 2: Convert image to base64 (if image path exists)
        base64_image = convert_image_to_base64(IMAGE_PATH)
        
        # Step 3: Test different input cases for creating posts
        test_create_post_cases(token, base64_image)
    else:
        print("Login failed. Cannot proceed with API testing.")

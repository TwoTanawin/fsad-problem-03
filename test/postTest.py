import requests
import json

# Replace with your local or deployed backend URL
BASE_URL = 'http://localhost:3000'

# Test Login API
def login_user():
    url = f"{BASE_URL}/login"
    payload = {
        "email": "t800@t800.com",  # Replace with your test user email
        "password": "12345678"  # Replace with your test user password
    }
    response = requests.post(url, json=payload)
    
    if response.status_code == 200:
        print("Login successful!")
        return response.json()  # Should include token and user info
    else:
        print(f"Login failed: {response.status_code} {response.text}")
        return None

# Test the "Create Post" API
def create_post(token):
    url = f"{BASE_URL}/api/v1/posts"
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    payload = {
        "caption": "My first post!",
        "image_base64": "<base64_image_data>",  # Add base64 encoded image data
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

# Test the "Get All Posts" API
def get_all_posts(token):
    url = f"{BASE_URL}/api/v1/posts"
    headers = {
        'Authorization': f'Bearer {token}'
    }
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        print("Fetched all posts successfully!")
        return response.json()
    else:
        print(f"Failed to fetch posts: {response.status_code} {response.text}")
        return None

# Test the "Get Single Post" API
def get_single_post(token, post_id):
    url = f"{BASE_URL}/api/v1/posts/{post_id}"
    headers = {
        'Authorization': f'Bearer {token}'
    }
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        print(f"Fetched post {post_id} successfully!")
        return response.json()
    else:
        print(f"Failed to fetch post: {response.status_code} {response.text}")
        return None

# Test the "Update Post" API
def update_post(token, post_id):
    url = f"{BASE_URL}/api/v1/posts/{post_id}"
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    payload = {
        "caption": "Updated caption for my post!",
        "pinned": True
    }
    response = requests.put(url, data=json.dumps(payload), headers=headers)
    
    if response.status_code == 200:
        print(f"Post {post_id} updated successfully!")
        return response.json()
    else:
        print(f"Failed to update post: {response.status_code} {response.text}")
        return None

# Test the "Delete Post" API
def delete_post(token, post_id):
    url = f"{BASE_URL}/api/v1/posts/{post_id}"
    headers = {
        'Authorization': f'Bearer {token}'
    }
    response = requests.delete(url, headers=headers)
    
    if response.status_code == 204:
        print(f"Post {post_id} deleted successfully!")
    else:
        print(f"Failed to delete post: {response.status_code} {response.text}")

# Main flow to test the API
if __name__ == "__main__":
    # Step 1: Log in and get the token
    login_response = login_user()
    
    if login_response and 'token' in login_response:
        token = login_response['token']  # Extract the JWT token

        # Step 2: Create a post
        created_post = create_post(token)
        
        if created_post and 'id' in created_post:
            post_id = created_post['id']  # Capture the post ID
            
            # Step 3: Fetch all posts
            get_all_posts(token)

            # Step 4: Fetch the single post created
            get_single_post(token, post_id)

            # Step 5: Update the post
            update_post(token, post_id)

            # Step 6: Delete the post
            # delete_post(token, post_id)
        else:
            print("Unable to proceed with further actions as the post creation failed.")
    else:
        print("Login failed. Cannot proceed with API testing.")

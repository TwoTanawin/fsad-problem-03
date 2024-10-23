import requests
import base64
import os

# Replace with your local or deployed backend URL
BASE_URL = 'http://localhost:3000'
LOGIN_URL = f'{BASE_URL}/login'
POSTS_URL = f'{BASE_URL}/api/v1/posts'
SAVE_DIRECTORY = '/Users/two-mac/Documents/ait/fsad/problem_03/test/img/'

# Ensure the save directory exists
if not os.path.exists(SAVE_DIRECTORY):
    os.makedirs(SAVE_DIRECTORY)

def login_user():
    url = LOGIN_URL
    payload = {
        "email": "t800@t800.com",  # Replace with valid email
        "password": "12345678"      # Replace with valid password
    }
    response = requests.post(url, json=payload)
    
    if response.status_code == 200:
        print("Login successful!")
        return response.json()  # Should include token and user info
    else:
        print(f"Login failed: {response.status_code} {response.text}")
        return None

def save_base64_image(base64_string, file_name):
    # Strip the prefix 'data:image/png;base64,' if exists
    if base64_string.startswith('data:image'):
        base64_string = base64_string.split(',')[1]
    
    # Decode the Base64 string
    image_data = base64.b64decode(base64_string)

    # Define the path to save the image
    file_path = os.path.join(SAVE_DIRECTORY, file_name)

    # Save the image to the file system
    with open(file_path, 'wb') as f:
        f.write(image_data)
    
    print(f"Saved image as {file_path}")

def test_get_posts(token):
    headers = {
        'Authorization': f'Bearer {token}'
    }

    try:
        response = requests.get(POSTS_URL, headers=headers)
        if response.status_code == 200:
            print("Successfully fetched posts!")
            posts = response.json()

            # Process each post and fetch profile pictures
            for i, post in enumerate(posts):
                user = post.get('user', {})
                username = user.get('username', 'unknown_user')
                user_profile = user.get('user_profile', {})
                profile_picture = user_profile.get('profile_picture')

                if profile_picture:
                    print(f"Profile picture found for {username}: {profile_picture}")
                    # Save the profile picture
                    image_file_name = f"{username}_profile_picture_{i}.png"
                    save_base64_image(profile_picture, image_file_name)
                else:
                    print(f"No profile picture found for {username}")
        else:
            print(f"Failed to fetch posts: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    # Step 1: Log in and get the token
    login_response = login_user()
    
    if login_response and 'token' in login_response:
        token = login_response['token']  # Extract the JWT token

        # Step 2: Fetch posts and save profile images
        test_get_posts(token)
    else:
        print("Unable to fetch posts as login failed.")

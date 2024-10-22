import requests
import base64

BASE_URL = "http://localhost:3000"  # Update this if your API is hosted elsewhere
IMAGE_PATH = "/Users/two-mac/Documents/ait/fsad/problem_03/test/img/brocode.png"  # Path to the image

# Function to encode image to base64
def encode_image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

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

# Test Create User Profile API with an image upload using Base64
def create_user_profile(token, user_id):
    url = f"{BASE_URL}/user_profiles"
    headers = {
        "Authorization": f"Bearer {token}"
    }
    
    # Encode image to base64
    profile_picture_base64 = encode_image_to_base64(IMAGE_PATH)
    
    # Profile data
    payload = {
        "user_profile": {
            "user_id": user_id,  # Dynamically set the user_id
            "bio": "Fitness enthusiast",
            "fitness_goals": "Run a marathon",
            "weight": 70.5,
            "height": 180.0,
            "age": 25,
            "gender": "male",
            "activity_level": "moderate",
            "profile_picture": profile_picture_base64  # Changed to 'profile_picture'
        }
    }

    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 201:
        print("User profile created successfully!")
        print(response.json())
    else:
        print(f"User profile creation failed: {response.status_code} {response.text}")


if __name__ == "__main__":
    login_response = login_user()

    if login_response:
        user_id = login_response['user']['id']  # Extract user_id from login response
        token = login_response['token']  # Extract token from login response
    else:
        token = None
        user_id = None

    if token and user_id:
        create_user_profile(token, user_id)

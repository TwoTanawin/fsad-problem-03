import requests
import base64

BASE_URL = "http://localhost:3000"  # Update this if your API is hosted elsewhere
IMAGE_PATH = "/Users/two-mac/Documents/ait/fsad/problem_03/test/img/brocode.png"  # Path to the image

# Function to encode image to base64
def encode_image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# Test Signup API
def signup_user():
    url = f"{BASE_URL}/signup"
    payload = {
        "user": {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "password123",
            "password_confirmation": "password123"
        }
    }
    response = requests.post(url, json=payload)
    if response.status_code == 201:
        print("Signup successful!")
        return response.json()  # Should include user and token
    else:
        print(f"Signup failed: {response.status_code} {response.text}")

# Test Login API
def login_user():
    url = f"{BASE_URL}/login"
    payload = {
        "email": "testuser@example.com",
        "password": "password123"
    }
    response = requests.post(url, json=payload)
    if response.status_code == 200:
        print("Login successful!")
        token = response.json().get('token')
        return token
    else:
        print(f"Login failed: {response.status_code} {response.text}")

# Test Create User Profile API with an image upload using Base64
def create_user_profile(token):
    url = f"{BASE_URL}/user_profiles"
    headers = {
        "Authorization": f"Bearer {token}"
    }
    
    # Encode image to base64
    profile_picture_base64 = encode_image_to_base64(IMAGE_PATH)
    
    # Profile data
    payload = {
        "user_profile": {
            "user_id": 1,  # Replace with actual user_id after signup
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
    signup_response = signup_user()

    token = login_user()

    if token:
        create_user_profile(token)

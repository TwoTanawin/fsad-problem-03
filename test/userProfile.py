import requests

BASE_URL = "http://localhost:3000"  # Update this if your API is hosted elsewhere

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

# Test a protected endpoint with the JWT token (Optional: User Profile creation, for example)
def create_user_profile(token):
    url = f"{BASE_URL}/user_profiles"
    headers = {
        "Authorization": f"Bearer {token}"
    }
    payload = {
        "user_id": 1,  # Replace with actual user_id after signup
        "bio": "Fitness enthusiast",
        "fitness_goals": "Run a marathon",
        "weight": 70.5,
        "height": 180.0,
        "age": 25,
        "gender": "male",
        "activity_level": "moderate"
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 201:
        print("User profile created successfully!")
        print(response.json())
    else:
        print(f"User profile creation failed: {response.status_code} {response.text}")

if __name__ == "__main__":
    # Step 1: Sign up a new user
    signup_response = signup_user()

    # Step 2: Log in and get the JWT token
    token = login_user()

    if token:
        # Step 3: Use the token to access a protected route (e.g., create user profile)
        create_user_profile(token)

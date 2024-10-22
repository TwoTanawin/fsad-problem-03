import requests

# Base URL where your Rails server is running (make sure to update the port if necessary)
BASE_URL = "http://localhost:3000"

# Sample user data for signup and login
user_data_signup = {
    "user": {
        "username": "newuser",
        "email": "newuser@example.com",
        "password": "password123",
        "password_confirmation": "password123"
    }
}

user_data_login = {
    "email": "newuser@example.com",
    "password": "password123"
}

# Function to test user signup
def test_signup():
    response = requests.post(f"{BASE_URL}/signup", json=user_data_signup)
    if response.status_code == 201:
        print("Signup successful!")
        print(f"Response: {response.json()}")
        return response.json().get('token')  # Return token for further use
    else:
        print(f"Signup failed with status code {response.status_code}")
        print(f"Response: {response.json()}")

# Function to test user login
def test_login():
    response = requests.post(f"{BASE_URL}/login", json=user_data_login)
    if response.status_code == 200:
        print("Login successful!")
        print(f"Response: {response.json()}")
        return response.json().get('token')  # Return token for further use
    else:
        print(f"Login failed with status code {response.status_code}")
        print(f"Response: {response.json()}")

# Test Signup
print("Testing Signup:")
signup_token = test_signup()

# Test Login if signup was successful
if signup_token:
    print("\nTesting Login:")
    login_token = test_login()

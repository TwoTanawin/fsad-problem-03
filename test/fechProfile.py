import requests

# Replace with your local or deployed backend URL
BASE_URL = 'http://localhost:3000'

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

# Fetch User Profile
def fetch_user_profile(token):
    url = f"{BASE_URL}/user_profiles"
    headers = {
        'Authorization': f"Bearer {token}"
    }
    params = {
        'email': 't800@t800.com'  # Replace with the actual email to fetch the profile
    }
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        print("Profile fetched successfully!")
        return response.json()
    else:
        print(f"Failed to fetch profile: {response.status_code} {response.text}")
        return None

# Main flow
if __name__ == "__main__":
    # Step 1: Log in and get the token
    login_response = login_user()
    
    if login_response and 'token' in login_response:
        token = login_response['token']  # Extract the token
        
        # Step 2: Use the token to fetch the user profile
        profile_data = fetch_user_profile(token)
        
        if profile_data:
            # Print fetched profile data
            print("Profile Data:")
            print(f"Profile Picture: {profile_data.get('profile_picture')}")
            print(f"Bio: {profile_data.get('bio')}")
            print(f"Fitness Goals: {profile_data.get('fitness_goals')}")
            print(f"Weight: {profile_data.get('weight')}")
            print(f"Height: {profile_data.get('height')}")
            print(f"Age: {profile_data.get('age')}")
            print(f"Gender: {profile_data.get('gender')}")
            print(f"Activity Level: {profile_data.get('activity_level')}")
    else:
        print("Unable to proceed with fetching the profile.")

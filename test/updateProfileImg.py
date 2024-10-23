import requests
import base64

# Replace with your local or deployed backend URL
BASE_URL = 'http://localhost:3000'

# Convert the image file to a Base64 string
def encode_image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        base64_string = base64.b64encode(image_file.read()).decode('utf-8')
        return f"data:image/jpg;base64,{base64_string}"  # Adjust the MIME type if necessary (e.g., "image/png" for PNG files)

# Test Login API
def login_user():
    url = f"{BASE_URL}/login"
    payload = {
        "email": "john@john.com",
        "password": "11111111"
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

# Update User Profile
def update_user_profile(token, profile_id, update_data):
    url = f"{BASE_URL}/user_profiles/{profile_id}"
    headers = {
        'Authorization': f"Bearer {token}",
        'Content-Type': 'application/json'
    }
    
    response = requests.put(url, headers=headers, json=update_data)
    
    if response.status_code == 200:
        print("Profile updated successfully!")
        return response.json()
    else:
        print(f"Failed to update profile: {response.status_code} {response.text}")
        return None

# Main flow
if __name__ == "__main__":
    # Step 1: Log in and get the token
    login_response = login_user()
    
    if login_response and 'token' in login_response:
        token = login_response['token']  # Extract the token
        
        # Step 2: Fetch the user profile
        profile_data = fetch_user_profile(token)
        
        if profile_data:
            # Print fetched profile data
            print("Profile Data:")
            profile_id = profile_data.get('id')  # Assuming the profile has an 'id' field
            print(f"Profile Picture: {profile_data.get('profile_picture')}")
            print(f"Bio: {profile_data.get('bio')}")
            print(f"Fitness Goals: {profile_data.get('fitness_goals')}")
            print(f"Weight: {profile_data.get('weight')}")
            print(f"Height: {profile_data.get('height')}")
            print(f"Age: {profile_data.get('age')}")
            print(f"Gender: {profile_data.get('gender')}")
            print(f"Activity Level: {profile_data.get('activity_level')}")
            
            # Step 3: Encode new image to Base64
            image_path = "/Users/two-mac/Documents/ait/fsad/problem_03/test/img/tr.jpg"
            base64_image = encode_image_to_base64(image_path)
            
            # Step 4: Update the user profile with the new image
            updated_data = {
                "user_profile": {
                    "bio": "Updated Bio",
                    "fitness_goals": "Updated fitness goals",
                    "weight": 70,
                    "height": 180,
                    "age": 18,
                    "gender": "male",
                    "activity_level": "moderate",
                    "profile_picture": base64_image  # New Base64 image string here
                }
            }
            
            update_response = update_user_profile(token, profile_id, updated_data)
            
            if update_response:
                print("Updated Profile Data:")
                print(f"Bio: {update_response.get('bio')}")
                print(f"Fitness Goals: {update_response.get('fitness_goals')}")
                print(f"Weight: {update_response.get('weight')}")
                print(f"Height: {update_response.get('height')}")
                print(f"Age: {update_response.get('age')}")
                print(f"Gender: {update_response.get('gender')}")
                print(f"Activity Level: {update_response.get('activity_level')}")
                print(f"Profile Picture: {update_response.get('profile_picture')}")  # Display updated profile picture
        else:
            print("Unable to proceed with fetching the profile.")

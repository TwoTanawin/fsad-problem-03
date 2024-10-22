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

# Check User Profile by Email
def check_user_profile(token, email):
    headers = {
        'Authorization': f'Bearer {token}'  # Pass the token in the headers
    }
    
    # Make a GET request to the user_profiles endpoint with email as a query parameter
    response = requests.get(f"{BASE_URL}/user_profiles", params={'email': email}, headers=headers)

    # Check the response status code
    if response.status_code == 200:
        print(f"User profile for {email} found:")
        print(response.json())
    elif response.status_code == 404:
        print(f"No profile found for {email}.")
    else:
        print(f"Error occurred: {response.status_code}")
        print(response.text)

# Main function to perform login and check user profile
def main():
    # Perform login to get the token
    login_response = login_user()
    
    if login_response:
        # Extract the token from the login response
        token = login_response.get('token')
        
        if token:
            # Test with an email that has a profile
            check_user_profile(token, 't800@t800.com')
            
            # Test with an email that does not have a profile
            # check_user_profile(token, 'nonexistent@domain.com')
        else:
            print("Token not found in the login response.")
    else:
        print("Login failed. Cannot check user profile.")

if __name__ == "__main__":
    main()

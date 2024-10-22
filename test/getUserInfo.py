import requests
import json

# Login request
login_data = {
    'email': 't800@t800.com',  # Replace with your actual email
    'password': '12345678'  # Replace with your actual password
}

# Make the login request
login_response = requests.post(
    'http://localhost:3000/login',
    headers={'Content-Type': 'application/json'},
    data=json.dumps(login_data)
)

# Check login response
if login_response.status_code == 200:
    # Get the token from the login response
    token = login_response.json()['token']
    print("New token received:", token)
    
    # Now use this token for the user_info request
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    
    # Make the user_info request with the new token
    info_response = requests.get('http://localhost:3000/user_info', headers=headers)
    
    if info_response.status_code == 200:
        print("User info:", info_response.json())
    else:
        print(f"User info request failed: {info_response.status_code}")
        print(f"Error: {info_response.text}")
else:
    print(f"Login failed: {login_response.status_code}")
    print(f"Error: {login_response.text}")
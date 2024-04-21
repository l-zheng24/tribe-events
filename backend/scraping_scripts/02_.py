import requests
import json 


# Json => Database
with open('data/event_data.json') as f:
    data = json.load(f)

url = "http://localhost:8080/api"
headers = {'Content-Type': 'application/json'}
try:
    response = requests.post(url, json=data, headers=headers)
    response.raise_for_status() 
    print(response.text)
    print("Post request successful!")
except requests.exceptions.RequestException as e:
    print("Error occurred during post request:", e)
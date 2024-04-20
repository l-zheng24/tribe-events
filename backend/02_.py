import requests
import json 

with open('data/event_data.json') as f:
    data = json.load(f)

url = "http://localhost:8000/data/"

try:
    response = requests.post(url, json=data)
    response.raise_for_status() 
    print("Post request successful!")
except requests.exceptions.RequestException as e:
    print("Error occurred during post request:", e)
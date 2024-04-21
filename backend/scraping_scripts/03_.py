
# Deletes everything in DB
import requests

url = "http://localhost:8080/api/all"

response = requests.delete(url)

if response.status_code == 200:
    print("DELETE request successful")
else:
    print("DELETE request failed with status code:", response.status_code)
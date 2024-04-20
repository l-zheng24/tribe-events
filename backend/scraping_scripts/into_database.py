import psycopg2
import json
from datetime import datetime

# Load JSON from file
with open('data/event_data.json') as f:
    data = json.load(f)

# PASSWORD = "" # YOUR PASSWORD HERE.

# conn = psycopg2.connect(dbname="tribe_events", user='postgres', password=PASSWORD)
# cur = conn.cursor()

#Parse each item in the JSON list
for item in data:
    
    title = item["title"]
    start_time = datetime.strptime(item["start_time"], "%H:%M").time()
    if not item["end_time"]:
        end_time = None
    else:
        end_time = datetime.strptime(item["end_time"], "%H:%M").time()
    event_loc = item["event_loc"]
    building = item["building"]
    short_desc = item["short_desc"]
    event_date = datetime.strptime(item["event_date"], "%Y-%m-%d").date()
    long_desc = item["long_desc"]
    
    # query = "INSERT INTO event_data (title, start_time, end_time, event_loc, building, short_desc, event_date, long_desc) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    # cur.execute(query, (title, start_time, end_time, event_loc, building, short_desc, event_date, long_desc))
    # conn.commit()

    # Process each item here
    # Example: print the item
    #print(item["start_time"], item["end_time"], item["title"], item["event_loc"], item["building"], item["short_desc"], item["event_date"], item["long_desc"])
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from datetime import datetime
from selenium.webdriver.common.by import By
from datetime import timedelta
import json

#Script to scrape and parse data

def parse_data(time_str):
    try:
         #Ex: 8:30PM
         return_val = datetime.strptime(time_str, "%I:%M%p").strftime("%H:%M")
    except:
        # Ex: 8PM
        return_val = datetime.strptime(time_str, "%I%p").strftime("%H:%M")

    return return_val

def determine_building(location):
    if "sadler" in location:
        return "SADLER"
    elif "swem" in location:
        return "SWEM"
    elif "small" in location:
        return "SMALL"
    elif "ampitheater" in location:
        return "MATOAKA_AMPHITHEATER"
    elif "isc" in location:
        return "ISC"
    elif "miller" in location:
        return "BSCHOOL"
    elif "ewell" in location:
        return "EWELL"
    elif "blow" in location:
        return "BLOW"
    elif "zable" in location:
        return "ZABLE"
    elif "lake" in location:
        return "LAKE_MATOAKA"
    elif "wren" in location:
        return "WREN"
    elif "muscarelle" in location:
        return "MUSCARELLE"
    elif "botetourt" in location:
        return "BOTETOURT_COMPLEX"
    elif "jones" in location:
        return "JONES"
    elif "jamestown" in location:
        return "JAMESTOWN_FIELD"
    elif "blair" in location:
        return "BLAIR"
    elif "wellness" in location:
        return "WELLNESS_CENTER"
    elif "law" in location:
        return "LAW_SCHOOL"
    elif "boswell" in location:
        return "BOSWELL"
    elif "cohen" in location:
        return "COHEN"
    elif "chancellors" in location:
        return "CHANCELLORS"
    elif "meadow" in location:
        return "CRIM_DELL_MEADOW"
    elif "education" in location:
        return "SCHOOL_OF_ED"
    elif "grind" in location:
        return "GRIND"
    elif "mcglothlin" in location:
        return "MCGLOTHLIN"
    elif "tucker" in location:
        return "TUCKER"
    elif "tidewater" in location:
        return "SADLER"
    elif "washington" in location:
        return "WASHINGTON"
    elif "entrepreneurship" in location:
        return "ENTREPRENEURSHIP"
    elif "phi beta":
        return
    else:
        return None


options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)

NUM_DAYS = 5
BASE_URL = "https://events.wm.edu/calendar/day/wm/"


event_data = []
# to store the hrefs of the long description of the events
long_desc_hrefs = []


num_iters = 0

cur_date = datetime.now().date()

for iter in range(10,20):
    print("On date: ", iter)
    if (num_iters != 0):
        # For each day of the week
        cur_date += timedelta(days=1)

    url = BASE_URL + str(cur_date.year) + "/" + str(cur_date.month) + "/" + str(cur_date.day) + "/list" 
    driver.get(url)

    day_events_list = driver.find_element(By.ID, "day_events_list")
    wm_events = day_events_list.find_elements(By.CLASS_NAME, "wm_event")


    for wm_event in wm_events:
        try:
            event_info = dict()

            title = wm_event.find_element(By.CLASS_NAME, "event_title").text
            try:
                time = wm_event.find_element(By.CLASS_NAME, "event_time").text
            except:
                continue
            event_loc = wm_event.find_element(By.CLASS_NAME, "event_location").text
            building = determine_building(event_loc.lower())

            # not relevant to us
            if not building:
                continue

            # Ex: 7PM-8:30PM
            if ("-" in time):
                time = time.split("-")
                start_time = time[0].strip().upper()
                end_time = time[1].strip().upper()
                start_time = parse_data(start_time)
                end_time = parse_data(end_time)
            else:
                #Ex: 7:30PM
                start_time = time.strip().upper()
                start_time = parse_data(start_time)
                end_time = None



            short_desc = wm_event.find_element(By.CLASS_NAME, "event_short_desc").text

            href = wm_event.find_element(By.CLASS_NAME, "event_title").get_attribute("href")
            
            event_info["start_time"] = start_time.strip()
            event_info["end_time"] = end_time.strip()
            event_info["title"] = title
            event_info["event_loc"] = event_loc
            event_info["building"] = building
            event_info["short_desc"] = short_desc
            event_info["event_date"] = cur_date

            event_data.append(event_info)
            long_desc_hrefs.append(href)

        except Exception as e:
            print("Error parsing event data", wm_event)
            print(e)
            print("URL IS: ", url)
    num_iters += 1

for idx, href in enumerate(long_desc_hrefs):
    driver.get(href)
    long_desc = driver.find_element(By.ID, "event_longdesc").text
    event_data[idx]["long_desc"] = long_desc

with open('data\event_data.json', 'w') as f:
    json.dump(event_data, f, indent=4, default=str)

url = "http://localhost:8000/data"


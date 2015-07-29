## Earthquake data

Investigate the apparent surge of earthquakes in Oklahoma.


[More and bigger drilling-linked earthquakes rattle Oklahoma, Reuters, 2015-07-28](https://news.yahoo.com/more-bigger-drilling-linked-earthquakes-rattle-oklahoma-073805543.html) 

> OKLAHOMA CITY (Reuters) - Several earthquakes shook Oklahoma on Monday as the state experiences a sharp increase in the frequency of tremors linked to wastewater disposal from gas and oil drilling, including from fracking, state and federal officials said...

> Noticeable quakes - above magnitude 3.0 - now hit the state at a rate of two per day or more, compared with two or so per year prior to 2009. During the past seven days, Oklahoma has experienced about 40 earthquakes, according to the USGS.


The USGS provides its data in CSV:

http://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php

A 30-day feed of all earthquakes:

http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv

Archived here: [/datahaus/usgs/all_month.2015-07-28.csv](TK)

-------------

### Search earthquake data archives

http://earthquake.usgs.gov/earthquakes/search/

This downloads too many for the united states:

http://earthquake.usgs.gov/fdsnws/event/1/query.csv?starttime=1950-01-01%2000:00:00&maxlatitude=49.611&minlatitude=24.687&maxlongitude=-66.885&minlongitude=-125.244&minmagnitude=0&endtime=2015-07-28%2023:59:59&orderby=time-asc

    Error 400: Bad Request

    191661 matching events exceeds search limit of 20000. Modify the search to match fewer events.

    Usage details are available from http://earthquake.usgs.gov/fdsnws/event/1

    Request:
    /fdsnws/event/1/query.csv?starttime=1950-01-01%2000:00:00&maxlatitude=49.611&minlatitude=24.687&maxlongitude=-66.885&minlongitude=-125.244&minmagnitude=0&endtime=2015-07-28%2023:59:59&orderby=time-asc

    Request Submitted:
    2015-07-29T01:27:38+00:00

    Service version:
    1.0.17


### Python

Let's get the whole world of earthquakes. For each day, download the full set of earthquake data and save it into a date-stamped file.

~~~py
from datetime import date, timedelta
import requests
START_DATE = date(1970, 1, 1)
END_DATE = date(2015,7,28)

BASE_URL = "http://earthquake.usgs.gov/fdsnws/event/1/query.csv"
u_params = {
  'orderby': 'time-asc'
} 

for i in range((END_DATE - START_DATE).days + 1):
    day = START_DATE + timedelta(days = i)
    u_params['starttime'] = "%s 00:00:00" % day
    u_params['endtime'] = "%s 23:59:59" % day
    # download
    resp = requests.get(BASE_URL, params = u_params)
    fname = "%s.csv" % day
    with open(fname, 'w') as f:
      print(fname)
      f.write(resp.text)
~~~


Concat the files

~~~py
from glob import glob
oname = "/tmp/usgs-quakes--1970-01-01_2015-07-28.csv"
files = glob('*.csv')
with open(oname, 'w') as o:
  # write headers from the first file
  o.write(open(files[0]).readline())
  for fname in files:
    with open(fname) as f:
      f.readline() # skip first line
      o.write(f.read())  
~~~

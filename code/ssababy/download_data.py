# ./settings.py contains the path to download and save to
from settings import DOWNLOADED_DATA_DIR
from io import BytesIO
from zipfile import ZipFile
import os.path
import requests
NATION_ZIP_URL = 'http://www.ssa.gov/OACT/babynames/names.zip'
STATES_ZIP_URL = 'http://www.ssa.gov/oact/babynames/state/namesbystate.zip'

# Get the nationwide data
print("Downloading:", NATION_ZIP_URL)
with ZipFile(BytesIO(requests.get(NATION_ZIP_URL).content)) as zfile:
    ddir = os.path.join(DOWNLOADED_DATA_DIR, 'nation')
    zfile.extractall(ddir)

# Now get the states
print("Downloading:", STATES_ZIP_URL)
with ZipFile(BytesIO(requests.get(STATES_ZIP_URL).content)) as zfile:
    ddir = os.path.join(DOWNLOADED_DATA_DIR, 'states')
    zfile.extractall(ddir)

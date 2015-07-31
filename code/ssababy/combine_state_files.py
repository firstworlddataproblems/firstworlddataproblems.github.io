from settings import DOWNLOADED_DATA_DIR, COMBINED_STATES_FILE
from glob import glob
import os.path
import re

# open up the file to write to
c = open(COMBINED_STATES_FILE, 'w')
c.write("state,sex,year,name,count\n")

# glob up the downloaded individual files
filespath = os.path.join(DOWNLOADED_DATA_DIR, 'states', '*.TXT')
for fname in glob(filespath):
    print("Reading", fname)
    with open(fname, 'r') as f:
        c.writelines(f.readlines())
# close the combined file
c.close()

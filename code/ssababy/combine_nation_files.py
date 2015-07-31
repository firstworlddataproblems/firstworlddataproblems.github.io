from settings import DOWNLOADED_DATA_DIR, COMBINED_NATION_FILE
from glob import glob
import os.path
import re

# open up the file to write to
c = open(COMBINED_NATION_FILE, 'w')
c.write("name,sex,count,year\n")

# glob up the downloaded individual files
filespath = os.path.join(DOWNLOADED_DATA_DIR, 'nation', 'yob*.txt')
for fname in glob(filespath):
    # get the year from the filename
    year = re.search("\d{4}", fname).group()
    print("Reading...", year)
    # open the file
    for line in open(fname, 'r').readlines():
        # add ",year" to each line
        row = line.strip() + ',' + year + "\n"
        c.write(row)

c.close()

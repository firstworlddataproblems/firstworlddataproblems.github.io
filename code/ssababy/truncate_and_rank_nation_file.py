"""
Expects settings.COMBINED_NATION_FILE to exist
Truncates data between the years START_YEAR and END_YEAR
Adds a rank and per_100k column to each row, grouped by year and sex
"""
from settings import COMBINED_NATION_FILE
import os.path
import csv

START_YEAR = 1960
END_YEAR = 2015

data = list(csv.DictReader(open(COMBINED_NATION_FILE)))

for year in range(START_YEAR, END_YEAR):
    rows = sorted([r for r in data if int(r['year']) == year], reverse = True, key = lambda x: int(x['count']))
    for sx in ['M', 'F']:
        xrows = [r for r in rows if r['sex'] == sx]
        total_babies = sum(int(r['count']) for r in xrows)
        print(year, sx, total_babies)
        tratio = 100000 / total_babies
        xrank = 0
        xct = 0
        # calculate the rank
        for idx, r in enumerate(xrows):
            rcount = r['count'] = int(r['count'])
            if rcount < xct or xrank == 0:
                xrank = idx + 1
                xct = rcount
            r['rank'] = xrank
            # add the other attributes
            r['per_100k'] = round(rcount * tratio)
            print(r)

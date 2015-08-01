from settings import COMBINED_NATION_FILE
import os.path
import pandas as pd

START_YEAR = 1960
END_YEAR = 2015

alldf = pd.read_csv(COMBINED_NATION_FILE)
df = alldf[alldf.year > 2012]

# add a rank
df['rank'] = df.groupby('year')['count'].rank()


df['per_100k'] = 0
for year in range(START_YEAR, END_YEAR):
    total_babies = sum(df[df['year'] == year]['count'])
    # no idea why this works
    # http://stackoverflow.com/questions/12307099/modifying-a-subset-of-rows-in-a-pandas-dataframe
    df.ix[df['year'] == year, 'per_100k'] = df['count'] * 100000 / total_babies

#apply(numpy.sum, axis=1


###########
# TODO: I don't know how to do a selective modification
###########

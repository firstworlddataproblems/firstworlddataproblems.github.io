import os

WORKING_DIR = os.path.dirname(__file__)
DATA_DIR = os.path.realpath(os.path.join(WORKING_DIR, '../../datahaus/ssababy'))
DOWNLOADED_DATA_DIR = os.path.join(DATA_DIR, "downloaded")
# specify file paths for the combined files
COMBINED_NATION_PATH = os.path.join(DATA_DIR, 'babynames-combined-nation.csv')
COMBINED_STATES_PATH = os.path.join(DATA_DIR, 'babynames-combined-states.csv')

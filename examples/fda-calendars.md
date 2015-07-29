


~~~sh
wget --page-requisites --recursive --no-parent --no-host-directories http://www.fda.gov/NewsEvents/MeetingsConferencesWorkshops/PastMeetingsWithFDAOfficials/default.htm
~~~


Get the visual files

~~~sh
wget --recursive --level 1 --accept css http://www.fda.gov/NewsEvents/MeetingsConferencesWorkshops/PastMeetingsWithFDAOfficials/default.htm
~~~

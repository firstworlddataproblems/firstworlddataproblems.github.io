California CABG Surgery outcomes

http://oshpd.ca.gov/HID/Products/Clinical_Data/CABG/index.html


Just get the files

~~~sh
wget --recursive --level 2 --accept-regex "HID/Products" --no-directories -A xls,xlsx,pdf  http://oshpd.ca.gov/HID/Products/Clinical_Data/CABG/index.html
~~~

https://twitter.com/charlesornstein/status/626446001461698560


Get pages

~~~sh
wget --recursive --level 2 http://oshpd.ca.gov/HID/Products/Clinical_Data/CABG/index.html
~~~

Get styles

~~~sh
wget --recursive --level 1 --accept css http://oshpd.ca.gov/HID/Products/Clinical_Data/CABG/index.html
~~~



## More concise

~~~sh
wget --recursive --level 1 http://oshpd.ca.gov/HID/Products/Clinical_Data/CABG/index.html

curl -s http://oshpd.ca.gov/HID/Products/Clinical_Data/CABG/index.html | 
  grep -oiP '(?<=href=").+?reakdown.*?\.html\b' | while read -r href; do
  if [[ $href == "/"* ]]
  then
    url="http://oshpd.ca.gov$href"  
  else
    url="http://oshpd.ca.gov/HID/Products/Clinical_Data/CABG/$href"
  fi
  echo $url
  wget --recursive --level 1 $url --ignore-case --accept-regex "xls|pdf"
done
~~~


California CABG data collected with wget and curl as self-contained site:

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

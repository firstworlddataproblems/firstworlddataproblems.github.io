function GetUrlParam( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return null;
  else
    return results[1];
}


function WriteCookie (name,value,hours) {
        // write a cookie that says to stay on state.gov (until the cookie expires..  12 hrs?)
        var date = new Date();
        date.setTime(date.getTime()+(hours*60*60*1000));
        var expires = "; expires="+date.toGMTString();
        document.cookie = name+"="+value+expires+"; path=/";
}

function ReadCookie(name) {
        var nameEQ = name + "=";
        var cookies = document.cookie.split(';');
	var val=null;
        for(var i=0;i < cookies.length;i++) {
		var foundIt=cookies[i].indexOf(nameEQ);
		if(foundIt >= 0) {
        		val = cookies[i].split('=');
		}
        }
        return val;
}

function CheckMobile(mobile_file){
	var agent = navigator.userAgent.toLowerCase();
	var regex = /iP(hone|od|ad)|blackberry|avantgo|blazer|compal|elaine|fennec|hiptop|iemobile|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|Mobi|pixi|plucker|pocket|psp|smartphone|symbian|treo|vodafone|wap|windows (ce|phone)|xiino|nok(6|i)/i;
	if (typeof agent != "undefined" && agent.search(regex) != -1) {
		var urlParam = GetUrlParam("goMobile");
		if(urlParam) {
			WriteCookie("goMobile","0",12);
                }
		else {
			WriteCookie("testCookie","works",1);
			if(ReadCookie("testCookie")) {
				// cookies definitely work, so look at mobile cookie
				if(!ReadCookie("goMobile")) {
					//alert('mobile device.  no mobile cookie and cookies work. go to m.state.gov');
                			location.href="http://m.state.gov/"+mobile_file;
				}
			}
		}
        }
}




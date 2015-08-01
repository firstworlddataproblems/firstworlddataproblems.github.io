var timer, win;
	
		$(document).ready(function() {
			//init the jquery plugin for openid login look/feel
			openid.init('openid_identifier');
			//add click event to login link
			$('#opener').click(function() {
				showLogin();
				// prevent the default action, e.g., following a link
				return false;
			});
			$('#un-link08').click(function() {
				showLogin();
				// prevent the default action, e.g., following a link
				return false;
			});
			
			
		
		$(function() {
				$( "#login_dialog" ).dialog({
					height: 450,
					width: 625,
					modal: true,
					title: 'My State Department',
					autoOpen: false //we will check a cookie first, may not need to login
				});
				
				$( "#auth_dialog" ).dialog({
					height: 250,
					width: 625,
					modal: true,
					title: 'My State Department',
					autoOpen: false 
				});
				
				//see if the usersid is already set within a cookie
				//checkCookie();
			});
			
		});

		function formatWindow() {
			var w = 775;
			var h = 455;
			//clear the timer just in case it was still on??
			clearInterval(timer);
			timer = setInterval('polling()',1000);
			var rand = randomString();
			document.openid_form.js_key.value = rand;
			//document.openid_form.target = rand;
			LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
			TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
			settings = 'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',toolbars=no,menubar=no,location=no,resizable=yes,scrollbars=yes,status=no';
			win = window.open('','openIDProvider',settings);
			win.focus();
			return true;
		}
		
		function randomString() {
			var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
			var string_length = 64;
			var randomstring = '';
			for (var i=0; i<string_length; i++) {
				var rnum = Math.floor(Math.random() * chars.length);
				randomstring += chars.substring(rnum,rnum+1);
			}
			return randomstring; 
		}

		function launchMyStateDept() {
			$("#login_dialog").dialog('close');
			$("#auth_dialog").dialog('open');
			$("#auth_dialog").text("Loading MyStateDept....");
			//alert('removed relocate for debugging purposes');
			location.href='http://www.state.gov/mystatedept/index.htm';
		}
		
		function showLogin() {
			$("#fail_message").text('');
			$("#login_dialog").dialog('open');
			checkCookie();
		}
		
		function ckCredentials() {
			var js_key = document.openid_form.js_key.value; 
			var data = 'js_key=' + document.openid_form.js_key.value;
			$.ajax({
			  url: '/mystatedept/signin/ckCredentials.php',
			  dataType: 'json',
			  type: "POST", 
			  data:  data, 
			  success: function(data) {
				if(data.success) {
					//save cookie to indicate successful login, expires after 4 hours
					WriteCookie('userKey',data.user_key,4);
					clearCredentials(launchMyStateDept());
				}						
				else {
					clearCredentials(loginFailed(data.message));
					
				}
			  }
			  ,failure: function(result, request) {
				//failure occurred during ajax call
				clearCredentials(loginFailed('ERROR: Unable to connect to validation service'));	
			}//end failure function
			});
		}
		
		function loginFailed(msg) {
			$("#auth_dialog").dialog('close');
			$("#fail_message").html(msg+ "<br>Please Sign In Again...");
			$( "#login_dialog" ).dialog('open');
		}
		
		function clearCredentials(cb) {
			var js_key = document.openid_form.js_key.value; 
			var data = 'js_key=' + document.openid_form.js_key.value;
			$.ajax({
			  url: '/mystatedept/signin/clearCredentials.php',
			  dataType: 'json',
			  type: "POST", 
			  data:  data, 
			  success: function(data) {
			  	//run callback
				cb;
					
			  }
			  ,failure: function(result, request) {
				//failure occurred during ajax call, temp data didn't get deleted. It's ok, still run cb
				cb;
			}//end failure function
			});
		}
		
		
		
		function polling(){
			if (win && win.closed) {
				clearInterval(timer);
				 //alert('popup window is closed. Do stuff...');
				 //close the main login options window
				 $( "#login_dialog" ).dialog('close');
				 //set the text and open the authenticating window
				 $( "#auth_dialog" ).text("Checking Credentials....");
				 $( "#auth_dialog" ).dialog('open');
				 //ajax out to msd to see if the user is validated
				 ckCredentials();
			} 
		}
		
	

		function checkCookie() {
		if (document.cookie != ""){
			var yourID = ReadCookie('userKey');
			//alert('yourID within the cookie is set to: ~' + yourID + '~');
				if(yourID != null) {
					//alert('should launch my state dept');
					launchMyStateDept();
				} else {
					//alert('should open login');
					//showLogin();
				}
		} else {
			//showLogin();
			
		}
	}
		
		
		

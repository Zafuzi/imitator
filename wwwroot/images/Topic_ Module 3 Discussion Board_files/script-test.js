// https://apps.olympic.edu/canvas/script.js

//Included Javascript for Canvas

$(document).ready(function()
{    
	//login page formatting
    $('span.field-with-fancyplaceholder').parent().css('margin-bottom', '10px');
    $('span.field-with-fancyplaceholder').parent().css('margin-top', '-12px');
	
	//Login box fix
	//$('#pseudonym_session_unique_id').prev().html("<span>OC Login</span>");
	$('label[for="pseudonym_session_unique_id"]').html('OC Login');
	
	//Footer cleanup
	//Remove old
	$("a[href='http://www.instructure.com/privacy-policy']").remove();
	$("a[href='http://www.instructure.com/terms-of-use']").remove();
	$("a[href='http://facebook.com/instructure']").remove();
	$("a[href='http://twitter.com/instructure']").remove();
	
	//Add new
	$('#footer-links').append('<a href="http://www.olympic.edu/programs-classes/distance-learning"> eLearning at OC</a>');
	$('#footer-links').append('<a href="mailto:distancelearning@olympic.edu">distancelearning@olympic.edu</a>');
	$('#footer-links').append('Tel (360) 475-7770');
	
	//Customize Footer Help menu
	$('#footer-links a.support_url').click(function()
	{
		var timeoutSeconds=5;
		var date = new Date();
		var startTime = date.getTime();
		var report_problem_link, timerid;
   
		var checkForLink = function()
		{
			var diff = date.getTime()-startTime;
			report_problem_link = $('#help-dialog-options a[href=#create_ticket]').parent();
			     
			if(diff >= timeoutSeconds*1000 || (report_problem_link && report_problem_link.length!==0))
			{
				report_problem_link.hide();
				report_problem_link.next().next().hide();
				//'a[href=http://help.instructure.com/categories/20057816-feature-request-categories]'
				clearInterval(timerid);
			}
		}
		timerid = setInterval(checkForLink,100);
	})
	
	//Customize Top Help menu
	$('#identity a.support_url').click(function()
	{
		var timeoutSeconds=5;
		var date = new Date();
		var startTime = date.getTime();
		var report_problem_link, timerid;
   
		var checkForLink = function()
		{
			var diff = date.getTime()-startTime;
			report_problem_link = $('#help-dialog-options a[href=#create_ticket]').parent();
			     
			if(diff >= timeoutSeconds*1000 || (report_problem_link && report_problem_link.length!==0))
			{
				report_problem_link.hide();
				report_problem_link.next().next().hide();
				//'a[href=http://help.instructure.com/categories/20057816-feature-request-categories]'
				clearInterval(timerid);
			}
		}
		timerid = setInterval(checkForLink,100);
	})
	
	//Canvasbadges
	$(function() {
	  // NOTE: if pasting this code into another script, you'll need to manually change the
	  // next line. Instead of assigning the value null, you need to assign the value of
	  // the Canvabadges domain, i.e. "https://canvabadges.herokuapp.com"
	  //var protocol_and_host = null;
	  var protocol_and_host = "https://canvabadges.herokuapp.com";
	  var $scripts = $("script");
	  $("script").each(function() {
		var src = $(this).attr('src');
		if(src && src.match(/canvas_profile_badges/)) {
		  var splits = src.split(/\//);
		  protocol_and_host = splits[0] + "//" + splits[2];
		}
	  });
	  if(!protocol_and_host) {
		console.log("Couldn't find a valid protocol and host. Canvabadges will not appear on profile pages until this is fixed.");
	  }
	  var match = location.href.match(/\/users\/(\d+)$/);
	  if(match && protocol_and_host) {
		var user_id = match[1];
		var domain = location.host;
		var url = protocol_and_host + "/api/v1/badges/public/" + user_id + "/" + encodeURIComponent(domain) + ".json";
		$.ajax({
		  type: 'GET',
		  dataType: 'jsonp',
		  url: url,
		  success: function(data) {
			if(data.objects && data.objects.length > 0) {
			  var $box = $("<div/>");
			  $box.append("<h2 class='border border-b'>Badges</h2>");
			  for(idx in data.objects) {
				var badge = data.objects[idx];
				var $badge = $("<div/>", {style: 'float: left;'});
				var link = protocol_and_host + "/badges/criteria/" + badge.config_id + "/" + badge.config_nonce + "?user=" + badge.nonce;
				var $a = $("<a/>", {href: link});
				$a.append($("<img/>", {src: badge.image_url, style: 'width: 72px; height: 72px; padding-right: 10px;'}));
				$badge.append($a);
				$box.append($badge);
			  }
			  $box.append($("<div/>", {style: 'clear: left'}));
			  $("#edit_profile_form").after($box);
			}
		  },
		  error: function() {
			console.log("badges failed to load");
		  },
		  timeout: 5000
		});
	  }
	});

// Hide SBCTC menu for all but specific users - Jerry, Kathy, Patrick, Dessie
if (!(ENV.current_user_id == 3551810 || ENV.current_user_id == 3371077 || ENV.current_user_id==3658496 || ENV.current_user_id==3386565)) {
  $("a:contains('SBCTC eLearning')").parent().hide();
	  }	  
// Hide Open Theme Editor menu for all but specific users - Jerry, Kathy, Dessie, Lynn
if (!(ENV.current_user_id == 3551810 || ENV.current_user_id == 3371077 || ENV.current_user_id==3386565 || ENV.current_user_id==3371078)) {
  $("a:contains('Open Theme Editor')").parent().hide();
	  }
    //Self enrollment page fixes
    if (window.location.href.indexOf("https://olympic.instructure.com/enroll/") > -1)
    {
        $('link[rel="stylesheet"][href="https://apps.olympic.edu/canvas/k12_overrides.css"]').attr('disabled', 'disabled');
        $('head').append('<link rel="stylesheet" type="text/css" href="https://apps.olympic.edu/canvas/OCSelEnroll_overrides.css"/>');
        $('#enroll_form').html($('#enroll_form').html().replace('Email', 'Login ID'));
        $('#email_info').html($('#email_info').html().replace('Email', 'Login ID'));     
    }
    
	// add Ask Librarians links to the right sidebar
	var a = document.createElement("img");
	a.src = "https://apps.olympic.edu/canvas/research.png"
	a.style.cursor = 'pointer'
	a.onclick = function() {
		window.open ("http://libguides.olympic.edu/contact-us",'newwindow','location=no,menubar=no,status=no,titlebar=no,toolbar=no,top=100,left=100,scrollbars=yes,width=900,height=900');
	};
	//document.body.appendChild(a);
	document.getElementById("right-side").appendChild(a);

	var h = document.createElement("hr");
	document.getElementById("right-side").appendChild(h);
	
	var b = document.createElement("img");
	b.src = "https://apps.olympic.edu/canvas/email.png"
	b.style.cursor = 'pointer'
	b.onclick = function() {
		window.open ("http://www.olympic.edu/programs-classes/distance-learning",'newwindow','location=no,menubar=no,status=no,titlebar=no,toolbar=no,top=100,left=100,scrollbars=yes,width=900,height=900');
	};
	//document.body.appendChild(b);
	document.getElementById("right-side").appendChild(b);
	//End

});
function trk_ac_update_contact(contact)
{
	if( (contact.email != "") && (contact.email != undefined) )
	{
		var urlWebApp = "https://script.google.com/macros/s/AKfycbwDKQdFDCCCKNy47Zw8q7pz2edltXtYBHStj9e7GuwNZb-7jUq2/exec";
		var bodyData = [];
		bodyData.push ("https://script.google.com/macros/s/AKfycbwDKQdFDCCCKNy47Zw8q7pz2edltXtYBHStj9e7GuwNZb-7jUq2/exec"+"?email="+contact.email) ;
		bodyData.push
		( 
			if( (contact.utm_source != "") && (contact.utm_source != undefined) )  { ['utm_source='+contact.utm_source] }
			if( (contact.utm_campaign != "") && (contact.utm_campaign != undefined) )  { ['utm_campaign='+contact.utm_campaign] }
		);	
		//var UrlToCall = bodyData.map(function(el){el[1] = encodeURIComponent(el[1]); return el.join('=')}).join('&');
		var UrlToCall = bodyData.join('&');
		
		var Http = new XMLHttpRequest();
		//var url='https://script.google.com/macros/s/AKfycbwDKQdFDCCCKNy47Zw8q7pz2edltXtYBHStj9e7GuwNZb-7jUq2/exec'+'?email='+contact.email;
		Http.open("GET", UrlToCall);
		Http.send();
	}
}


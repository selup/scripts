function trk_ac_update_contact(contact)
{
	if( (contact.email != "") && (contact.email != undefined) )
	{
		var urlWebApp = "https://script.google.com/macros/s/AKfycbwDKQdFDCCCKNy47Zw8q7pz2edltXtYBHStj9e7GuwNZb-7jUq2/exec";
		
		
		var bodyData = [];
		bodyData.push (urlWebApp+"?email="+contact.email) ;
		if( (contact.utm_source != "") && (contact.utm_source != undefined) ) { bodyData.push(['utm_source='+contact.utm_source]); }
		if( (contact.utm_campaign != "") && (contact.utm_campaign != undefined) ) { bodyData.push(['utm_campaign='+contact.utm_campaign]); }
		
		var UrlToCall = bodyData.join('&');	
		
		
		
		var Http = new XMLHttpRequest();
		Http.open("GET", UrlToCall);
		Http.send();
	}
}


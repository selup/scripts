function trk_ac_update_contact(contact)
{
	if( (contact.email != "") && (contact.email != undefined) )
	{
		var urlWebApp = "https://script.google.com/macros/s/AKfycbwDKQdFDCCCKNy47Zw8q7pz2edltXtYBHStj9e7GuwNZb-7jUq2/exec";
		
		
		var bodyData = [];
		bodyData.push (urlWebApp+"?email="+encodeURIComponent(contact.email)) ;
		if( (contact.path != "") && (contact.path != undefined) ) { bodyData.push(['path='+encodeURIComponent(contact.path)]); }
		
		if( (contact.utm_source != "") && (contact.utm_source != undefined) ) { bodyData.push(['utm_source='+encodeURIComponent(contact.utm_source)]); }
		if( (contact.utm_campaign != "") && (contact.utm_campaign != undefined) ) { bodyData.push(['utm_campaign='+encodeURIComponent(contact.utm_campaign)]); }
		if( (contact.utm_term != "") && (contact.utm_term != undefined) ) { bodyData.push(['utm_term='+encodeURIComponent(contact.utm_term)]); }
		if( (contact.utm_medium != "") && (contact.utm_medium != undefined) ) { bodyData.push(['utm_medium='+encodeURIComponent(contact.utm_medium)]); }
		if( (contact.utm_content != "") && (contact.utm_content != undefined) ) { bodyData.push(['utm_content='+encodeURIComponent(contact.utm_content)]); }
		
		var UrlToCall = bodyData.join('&');	
		console.log("url is:"+UrlToCall);
		
		var Http = new XMLHttpRequest();
		Http.open("GET", UrlToCall);
		Http.send();
	}
}


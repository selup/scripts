// Global constants
const	TRKDBG_UPDATEAC = false;	

function trk_ac_update_contact(contact)
{
	
	if( (contact.email != "") && (contact.email != undefined) )
	{
		var urlWebApp = "https://script.google.com/macros/s/AKfycbwDKQdFDCCCKNy47Zw8q7pz2edltXtYBHStj9e7GuwNZb-7jUq2/exec";
		
		
		var bodyData = [];
		bodyData.push (urlWebApp+"?email="+encodeURIComponent(contact.email)) ;

		if( (contact.userid != "") && (contact.userid != undefined) ) { bodyData.push(['userid='+encodeURIComponent(contact.userid)]); }
		
		if( (contact.utm_campaign != "") && (contact.utm_campaign != undefined) ) { bodyData.push(['utm_campaign='+encodeURIComponent(contact.utm_campaign)]); }
		if( (contact.utm_source != "") && (contact.utm_source != undefined) ) { bodyData.push(['utm_source='+encodeURIComponent(contact.utm_source)]); }
		if( (contact.utm_term != "") && (contact.utm_term != undefined) ) { bodyData.push(['utm_term='+encodeURIComponent(contact.utm_term)]); }
		if( (contact.utm_content != "") && (contact.utm_content != undefined) ) { bodyData.push(['utm_content='+encodeURIComponent(contact.utm_content)]); }
		if( (contact.utm_medium != "") && (contact.utm_medium != undefined) ) { bodyData.push(['utm_medium='+encodeURIComponent(contact.utm_medium)]); }
		
		if( (contact.fragment != "") && (contact.fragment != undefined) ) { bodyData.push(['fragment='+encodeURIComponent(contact.fragment)]); }
		if( (contact.path != "") && (contact.path != undefined) ) { bodyData.push(['path='+encodeURIComponent(contact.path)]); }
		if( (contact.referrer != "") && (contact.referrer != undefined) ) { bodyData.push(['referrer='+encodeURIComponent(contact.referrer)]); }
		if( (contact.url != "") && (contact.url != undefined) ) { bodyData.push(['url='+encodeURIComponent(contact.url)]); }

		if( (contact.date != "") && (contact.date != undefined) ) { bodyData.push(['date='+encodeURIComponent(contact.date)]); }//date (JJ MM AA)
		
		
		// FISCA LANDING
		if( (contact.fisca_landing_url != "") && (contact.fisca_landing_url != undefined) ) { bodyData.push(['fisca_landing_url='+encodeURIComponent(contact.fisca_landing_url)]);}
		if( (contact.fisca_landing_date != "") && (contact.fisca_landing_date != undefined) ) { bodyData.push(['fisca_landing_date='+encodeURIComponent(contact.fisca_landing_date)]);}
		if( (contact.fisca_optin_url != "") && (contact.fisca_optin_url != undefined) ) { bodyData.push(['fisca_optin_url='+encodeURIComponent(contact.fisca_optin_url)]);}
		if( (contact.fisca_optin_date != "") && (contact.fisca_optin_date != undefined) ) { bodyData.push(['fisca_optin_date='+encodeURIComponent(contact.fisca_optin_date)]);}
		
		
		
		var UrlToCall = bodyData.join('&');	
		if({{TRKDBG_UPDATEAC}} {console.log("url is:"+UrlToCall);}
		
		var Http = new XMLHttpRequest();
		Http.open("GET", UrlToCall);
		Http.send();
	}
}



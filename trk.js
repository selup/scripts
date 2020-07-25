//
//
//
//	file can be fund here:  https://selup.github.io/scripts/trk.js
//	author: bpt
//

//////////////////////
// Global constants //
//////////////////////
// Debug settings
var	TRKDBG_FUNCIN = true;	// Enter in all function
var	TRKDBG_AC_UPDATE_CONTACT = false;	
var	TRKDBG_GET_DATE_STRING = false;
var	TRKDBG_WRITE_EMAIL_LOCAL_STORAGE_ON_EVENT = true; 


//////////////////
// Load scripts //
//////////////////





///////////////
// Functions //
///////////////
function trk_ac_update_contact(contact)
{
	if(TRKDBG_FUNCIN) {console.log("=>trk_ac_update_contact()");}
	
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
		if(TRKDBG_AC_UPDATE_CONTACT) {console.log("url is:"+UrlToCall);}
		
		var Http = new XMLHttpRequest();
		Http.open("GET", UrlToCall);
		Http.send();
	}
}


function trk_GetDateString()
{
	if(TRKDBG_FUNCIN) {console.log("=>trk_GetDateString()");}
	
	console.log("test read utm"+{{trk_utm_source}});
	
	var today = new Date();
	var dd = today.getDate();

	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	if(dd<10) 
	{
		dd='0'+dd;
	} 

	if(mm<10) 
	{
		mm='0'+mm;
	} 
	
	today = yyyy+'/'+mm+'/'+dd;	
	if(TRKDBG_GET_DATE_STRING) {console.log("date is:"+today);}
	return today;
}


//if email input exsit, create a event to read it 
function trk_WriteEmailOnLocalStorageOnEvent()   // create ...
{
	if(TRKDBG_FUNCIN) {console.log("=>trk_WriteEmailOnLocalStorageOnEvent()");}
	
	if(document.getElementsByName("email")[0])
	{
		var tmp_email = document.getElementsByName("email")[0].value; //if email already present
		tmp_email_encoded  = window.btoa( tmp_email );
		localStorage.setItem("trk_eml_enc", tmp_email_encoded); 
		if(TRKDBG_WRITE_EMAIL_LOCAL_STORAGE_ON_EVENT) {console.log("email write in local storage is:"+tmp_email);}
		
		document.getElementsByName("email")[0].oninput = function()
		{
			var tmp_email = document.getElementsByName("email")[0].value;
			tmp_email_encoded  = window.btoa( tmp_email );
			localStorage.setItem("trk_eml_enc", tmp_email_encoded); 
			if(TRKDBG_WRITE_EMAIL_LOCAL_STORAGE_ON_EVENT) {console.log("email write in local storage is:"+tmp_email);}
		};
	}
	// else read local storage ?
}


/////////////
// Main () //
/////////////


// Load sha256.js in special mode for GTM
(function() {
if(TRKDBG_FUNCIN) {console.log("=>load sha256.js()");}
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://selup.github.io/scripts/sha256.js';  
script.setAttribute('integrity','sha384-IT/pLh1Rncx9vLpihvEzJBju0K02/VtM4auFugUU965Ufj6XRyv+aQivyTngKzNN');
script.setAttribute('crossorigin','anonymous');
document.getElementsByTagName('head')[0].appendChild(script);
})();

// load event for catching email
trk_WriteEmailOnLocalStorageOnEvent();



// Get Data ..

// Create objet trk

// Subdivise files


// track LP without email.. (store on cookies) // mecanism cookie/localstorage





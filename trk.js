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
var TRKDBG_FUNCIN = true;	// Enter in all function
var TRKDBG_VERBOSE = true;

var TRKDBG_AC_UPDATE_CONTACT = false;
var TRKDBG_GET_DATE_STRING = false;
var TRKDBG_WRITE_EMAIL_LOCAL_STORAGE_ON_EVENT = true;





//////////////////
// Load scripts //
//////////////////
function dynamicallyLoadScript(url) {
   var script = document.createElement("script");  // create a script DOM node
   script.src = url;  // set its src to the provided URL

   document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}





///////////////
// Functions //
///////////////
function trk_ac_update_contact(contact) {
   if (TRKDBG_FUNCIN) { console.log("=>trk_ac_update_contact()"); }

   if ((contact.email != "") && (contact.email != undefined)) {
      var urlWebApp = "https://script.google.com/macros/s/AKfycbwDKQdFDCCCKNy47Zw8q7pz2edltXtYBHStj9e7GuwNZb-7jUq2/exec";

      var bodyData = [];
      bodyData.push(urlWebApp + "?email=" + encodeURIComponent(contact.email));

      if ((contact.userid != "") && (contact.userid != undefined)) { bodyData.push(['userid=' + encodeURIComponent(contact.userid)]); }

      if ((contact.utm_campaign != "") && (contact.utm_campaign != undefined)) { bodyData.push(['utm_campaign=' + encodeURIComponent(contact.utm_campaign)]); }
      if ((contact.utm_source != "") && (contact.utm_source != undefined)) { bodyData.push(['utm_source=' + encodeURIComponent(contact.utm_source)]); }
      if ((contact.utm_term != "") && (contact.utm_term != undefined)) { bodyData.push(['utm_term=' + encodeURIComponent(contact.utm_term)]); }
      if ((contact.utm_content != "") && (contact.utm_content != undefined)) { bodyData.push(['utm_content=' + encodeURIComponent(contact.utm_content)]); }
      if ((contact.utm_medium != "") && (contact.utm_medium != undefined)) { bodyData.push(['utm_medium=' + encodeURIComponent(contact.utm_medium)]); }

      if ((contact.fragment != "") && (contact.fragment != undefined)) { bodyData.push(['fragment=' + encodeURIComponent(contact.fragment)]); }
      if ((contact.path != "") && (contact.path != undefined)) { bodyData.push(['path=' + encodeURIComponent(contact.path)]); }
      if ((contact.referrer != "") && (contact.referrer != undefined)) { bodyData.push(['referrer=' + encodeURIComponent(contact.referrer)]); }
      if ((contact.url != "") && (contact.url != undefined)) { bodyData.push(['url=' + encodeURIComponent(contact.url)]); }

      if ((contact.date != "") && (contact.date != undefined)) { bodyData.push(['date=' + encodeURIComponent(contact.date)]); }//date (JJ MM AA)


      // FISCA LANDING
      if ((contact.fisca_landing_url != "") && (contact.fisca_landing_url != undefined)) { bodyData.push(['fisca_landing_url=' + encodeURIComponent(contact.fisca_landing_url)]); }
      if ((contact.fisca_landing_date != "") && (contact.fisca_landing_date != undefined)) { bodyData.push(['fisca_landing_date=' + encodeURIComponent(contact.fisca_landing_date)]); }
      if ((contact.fisca_optin_url != "") && (contact.fisca_optin_url != undefined)) { bodyData.push(['fisca_optin_url=' + encodeURIComponent(contact.fisca_optin_url)]); }
      if ((contact.fisca_optin_date != "") && (contact.fisca_optin_date != undefined)) { bodyData.push(['fisca_optin_date=' + encodeURIComponent(contact.fisca_optin_date)]); }



      var UrlToCall = bodyData.join('&');
      if (TRKDBG_AC_UPDATE_CONTACT) { console.log("url is:" + UrlToCall); }

      var Http = new XMLHttpRequest();
      Http.open("GET", UrlToCall);
      Http.send();
   }
}


function trk_GetDateString() {
   if (TRKDBG_FUNCIN) { console.log("=>trk_GetDateString()"); }

   var today = new Date();
   var dd = today.getDate();

   var mm = today.getMonth() + 1;
   var yyyy = today.getFullYear();
   if (dd < 10) {
      dd = '0' + dd;
   }

   if (mm < 10) {
      mm = '0' + mm;
   }

   today = yyyy + '/' + mm + '/' + dd;
   if (TRKDBG_GET_DATE_STRING) { console.log("date is:" + today); }
   return today;
}


//if email input exsit, create a event to read it 
function trk_WriteEmailOnLocalStorageOnEvent()   // create ...
{
   if (TRKDBG_FUNCIN) { console.log("=>trk_WriteEmailOnLocalStorageOnEvent()"); }

   if (document.getElementsByName("email")[0]) {
      var tmp_email = document.getElementsByName("email")[0].value; //if email already present
      tmp_email_encoded = window.btoa(tmp_email);
      localStorage.setItem("trk_eml_enc", tmp_email_encoded);
      if (TRKDBG_WRITE_EMAIL_LOCAL_STORAGE_ON_EVENT) { console.log("email write in local storage is:" + tmp_email); }

      document.getElementsByName("email")[0].oninput = function () {
         var tmp_email = document.getElementsByName("email")[0].value;
         tmp_email_encoded = window.btoa(tmp_email);
         localStorage.setItem("trk_eml_enc", tmp_email_encoded);
         if (TRKDBG_WRITE_EMAIL_LOCAL_STORAGE_ON_EVENT) { console.log("email write in local storage is:" + tmp_email); }
      };
   }
   // else read local storage ?
}


function trk_UrlGetParameter(parameterName) {
   var result = null,
      tmp = [];
   var items = location.search.substr(1).split("&");
   for (var index = 0; index < items.length; index++) {
      tmp = items[index].split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
   }
   return result;
}


function trk_GetCookieValue(cname) {
   var name = cname + "=";
   var decodedCookie = decodeURIComponent(document.cookie);
   var ca = decodedCookie.split(';');
   for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
         c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
         return c.substring(name.length, c.length);
      }
   }
   return "";
}


function trk_GetUtmURL(ctx) {
   ctx.utm = new object();
   ctx.utm.source = trk_UrlGetParameter("utm_source");
   ctx.utm.campaign = trk_UrlGetParameter("utm_campaign");
   ctx.utm.term = trk_UrlGetParameter("utm_term");
   ctx.utm.content = trk_UrlGetParameter("utm_content");
   ctx.utm.medium = trk_UrlGetParameter("utm_medium");
}

function trk_GetBaseData(ctx) {
   ctx.CurrentUrl = new object();
   ctx.CurrentUrl.path = window.location.pathname;
   ctx.CurrentUrl.url = window.location;
   ctx.CurrentUrl.referrer = window.location.origin;
   ctx.CurrentUrl.param = window.location.search;

   trk_GetUtmURL(ctx);
   ctx.date = trk_GetDateString();
}

/*
analytics.track('webinar LP', {
  webinaire: 'fisca'
});
*/

// trk_SetEvent
/*
function trk_SetEvent(str_evt,property)
{
	// Fill base data
	trk_GetBaseData();
	
	// Email & UserID
	trk_GetEmail();
	trk_GetUserID();
	
	// Event
	switch (evt) {
	  case 'landing':
			trk.fisca_landing_url = ctx.CurrentUrl.url;  
			trk.fisca_landing_date = ctx.date; 
			trk_ac_update_contact(trk);
		break;
	  case 'optin':
		break;
	  case 'sale':
		break;
	  case 'order':
		break;
	  case 'purchased':
		break;
	  default:
	}	
	
}
*/

function trk_GetEmail() {
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }
   var value_encoded = localStorage.getItem('trk_eml_enc');
   if (value_encoded) { var value_decoded = window.atob(value_encoded); }
   if (TRKDBG_VERBOSE) {
      console.log("email encoded is:" + value_encoded);
      console.log("email decoded is:" + value_decoded);
   }
   return value_decoded;
}


function trk_MakeUserID(email) {
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }

   if(email)
   {
      var email_sha256encoded = sha256(email);
      if(TRKDBG_VERBOSE){
         console.log("email befor sha256 is:"+eml);
         console.log("email sha256 is:"+email_sha256encoded.toString());  }
   }
   return email_sha256encoded;  
}


/////////////
// Main () //
/////////////
var trk =
{
   url: null,
   email: null,
   userID: null,
   anonymousId: null
};







// Load sha256.js in special mode for GTM

(function () {
   if (TRKDBG_FUNCIN) { console.log("=>load sha256.js()"); }
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = 'https://selup.github.io/scripts/sha256.js';
   script.setAttribute('integrity', 'sha384-IT/pLh1Rncx9vLpihvEzJBju0K02/VtM4auFugUU965Ufj6XRyv+aQivyTngKzNN');
   script.setAttribute('crossorigin', 'anonymous');
   document.getElementsByTagName('head')[0].appendChild(script);
})();


// load event for catching email
trk_WriteEmailOnLocalStorageOnEvent();



if (window.requestIdleCallback) {
  requestIdleCallback(function () {
    Fingerprint2.get(function (components) {
      console.log(components) // an array of components: {key: ..., value: ...}
      var values = components.map(function (component) { return component.value })
      var murmur = Fingerprint2.x64hash128(values.join(''), 31)
    })
  })
} else {
  setTimeout(function () {
    Fingerprint2.get(function (components) {
      console.log(components) // an array of components: {key: ..., value: ...}
      var values = components.map(function (component) { return component.value })
      var murmur = Fingerprint2.x64hash128(values.join(''), 31)
    })  
  }, 500)
}

console.log(murmur);

// Get Data ..

// Create objet trk

// Subdivise files


// track LP without email.. (store on cookies) // mecanism cookie/localstorage






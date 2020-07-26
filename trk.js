//	file can be fund here:  https://selup.github.io/scripts/trk.js


//////////////////////
// Global constants //
//////////////////////
var TRKDBG_FUNCIN = true;	// Enter in all function
var TRKDBG_VERBOSE = true;

var TRKDBG_AC_UPDATE_CONTACT = false;
var TRKDBG_GET_DATE_STRING = false;
var TRKDBG_WRITE_EMAIL_LOCAL_STORAGE_ON_EVENT = true;



function dynamicallyLoadScript(url) 
{
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }
   var script = document.createElement("script");  // create a script DOM node
   script.src = url;  // set its src to the provided URL

   document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}



/////////////////////////////
// VisitorID - TO IMPROVE //
/////////////////////////////
var murmur; // Global variable
function trk_SetFingerPrintAsync()
{
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }
   new Fingerprint2.get(function(result, components) {
      var info = {
         fingerprint: result
      };

      processFingerprint(info);
   });

   function processFingerprint(data) {
      //console.log(data.fingerprint);
      var values = data.fingerprint.map(function (x) {return x.value});
      murmur = Fingerprint2.x64hash128(values.join(''), 31);   
      if (TRKDBG_VERBOSE) { console.log(murmur); }
   }
}
// Create VisitorID based on fingerprintjs2
function trk_GetVisitorID()
{
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }
   // transform to blocking function
   // can be improve with async 
   var loop = 0;
   while((!murmur) && (loop<5) )
   {
      loop = loop +1;
      setTimeout(function(y){return}, 100); //ms       
   }

   if (TRKDBG_VERBOSE) { console.log("VisitorID is "+murmur); }
   return murmur;
}





//if email input exsit, create a event to read it 
function trk_WriteEmailOnLocalStorageOnEvent()   // create ...
{
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }

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





/////////////
// Main () //
/////////////

dynamicallyLoadScript("https://selup.github.io/scripts/trk-fct.js"); 

var trk =
{
   email: null,
   userId: null,
   visitorId: null,
   page: new Object(),
   event: new Object()
};

trk_SetFingerPrintAsync();

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














////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////








// Create VisitorID based on fingerprintjs2
/*
function trk_GetVisitorID()
{
   var murmur;
   console.log("enter in function");
   new Fingerprint2.get(function(result, components) {
      var info = {
         fingerprint: result
      };

      processFingerprint(info);
   });

   function processFingerprint(data) {
      //console.log(data.fingerprint);
      var values = data.fingerprint.map(function (x) {return x.value});
      murmur = Fingerprint2.x64hash128(values.join(''), 31);   
      console.log(murmur);
   }
   console.log("exit function");

   // transform to blocking function
   // can be improve with async 
   while(!murmur)
   {
      setTimeout(function(y){return}, 200); //ms       
   }
   return murmur;
}
*/













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
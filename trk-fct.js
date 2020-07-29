//	file can be fund here:  https://selup.github.io/scripts/trk-fct.js

function trk_CreateTRK()
{
   var trk =
   {
      email: null,
      userId: null,
      visitorId: null,
      page: new Object(),
      evt: new Object(),
   };

   return trk;
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
      //if (TRKDBG_VERBOSE) { console.log(murmur); }
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








function trk_Sleep(milliseconds) 
{
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }
   const date = Date.now();
   let currentDate = null;
   do {
     currentDate = Date.now();
   } while (currentDate - date < milliseconds);
 }






function trk_GetDateString() {
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }

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
   if (TRKDBG_VERBOSE) { console.log("date is:" + today); }
   return today;
}





function trk_SetEvent(ctx,ProductName,EventName)
{
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }

   // Event
	switch (EventName) {
      case 'landing':
         if(ProductName == "fisca")
         {
            ctx.evt.fisca_landing_url = ctx.page.url; 
            ctx.evt.fisca_landing_date = ctx.page.date; 
         }
       break;
      case 'optin':
         if(ProductName == "fisca")
         {
            ctx.evt.fisca_optin_url = ctx.page.url; 
            ctx.evt.fisca_optin_date = ctx.page.date;         
         }
       break;
       case 'registered':
         if(ProductName == "fisca")
         {
            ctx.evt.fisca_registered_url = ctx.page.url; 
            ctx.evt.fisca_registered_date = ctx.page.date;         
         }
       break;       
      case 'attended':
         if(ProductName == "fisca")
         {
            ctx.evt.fisca_attended_url = ctx.page.url; 
            ctx.evt.fisca_attended_date = ctx.page.date;         
         }         
       break;
      case 'sell':
         if(ProductName == "fisca")
         {
            ctx.evt.fisca_sell_url = ctx.page.url; 
            ctx.evt.fisca_sell_date = ctx.page.date;         
         }                  
       break;
      case 'purchased':
         if(ProductName == "fisca")
         {
            ctx.evt.fisca_purchased_url = ctx.page.url; 
            ctx.evt.fisca_purchased_date = ctx.page.date;         
         }                  
       break;
      default:
    }

    trk_WriteTrkData(ctx);
    trk_ac_update_contact(ctx);
}





function trk_AddPreviousUrlParam() {

   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }

   var initial_url = window.location.href;
   var url = new URL(initial_url);

   // filter utm_expid
   var utm_to_filter = url;
   var params_filter = new URLSearchParams(utm_to_filter.search.slice(1));
   params_filter.delete("utm_expid");


   var url_tmp = url;
   url_tmp.search = params_filter.toString();
   var url_filtered = url_tmp.toString();

   var queryString = new URL(url_filtered).search;


   document.querySelectorAll("[href]").forEach(link => {
      var current = link.href;

      // filter to higher speed (low flikr)
      if( ( (current.includes("webinaire.org") == true) || (current.includes("formation-pro.learnybox.com") == true) ) && (current.includes(".css") == false) && (current.includes("#submit-form") == false) )
      {
         link.href = current + queryString;
      }

   });

}





function trk_ac_update_contact(contact) {
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }

   if ((contact.email != "") && (contact.email != undefined)) {
      var urlWebApp = "https://script.google.com/macros/s/AKfycbwDKQdFDCCCKNy47Zw8q7pz2edltXtYBHStj9e7GuwNZb-7jUq2/exec";

      var bodyData = [];
      bodyData.push(urlWebApp + "?email=" + encodeURIComponent(contact.email));

      if (contact.userId) { bodyData.push(['userid=' + encodeURIComponent(contact.userId)]); }

      if (contact.page.utm_campaign) { bodyData.push(['utm_campaign=' + encodeURIComponent(contact.page.utm_campaign)]); }
      if (contact.page.utm_source) { bodyData.push(['utm_source=' + encodeURIComponent(contact.page.utm_source)]); }
      if (contact.page.utm_term) { bodyData.push(['utm_term=' + encodeURIComponent(contact.page.utm_term)]); }
      if (contact.page.utm_content) { bodyData.push(['utm_content=' + encodeURIComponent(contact.page.utm_content)]); }
      if (contact.page.utm_medium) { bodyData.push(['utm_medium=' + encodeURIComponent(contact.page.utm_medium)]); }

      if (contact.page.fragment) { bodyData.push(['fragment=' + encodeURIComponent(contact.page.fragment)]); }
      if (contact.page.path) { bodyData.push(['path=' + encodeURIComponent(contact.page.path)]); }
      if (contact.page.referrer) { bodyData.push(['referrer=' + encodeURIComponent(contact.page.referrer)]); }
      if (contact.page.url) { bodyData.push(['url=' + encodeURIComponent(contact.page.url)]); }

      if (contact.page.date) { bodyData.push(['date=' + encodeURIComponent(contact.page.date)]); }//date (JJ MM AA)


      // FISCA
      if (contact.evt.fisca_landing_url) { bodyData.push(['fisca_landing_url=' + encodeURIComponent(contact.evt.fisca_landing_url)]); }
      if (contact.evt.fisca_landing_date) { bodyData.push(['fisca_landing_date=' + encodeURIComponent(contact.evt.fisca_landing_date)]); }
      if (contact.evt.fisca_optin_url) { bodyData.push(['fisca_optin_url=' + encodeURIComponent(contact.evt.fisca_optin_url)]); }
      if (contact.evt.fisca_optin_date) { bodyData.push(['fisca_optin_date=' + encodeURIComponent(contact.evt.fisca_optin_date)]); }
      if (contact.evt.fisca_registered_url) { bodyData.push(['fisca_registered_url=' + encodeURIComponent(contact.evt.fisca_registered_url)]); }
      if (contact.evt.fisca_registered_date) { bodyData.push(['fisca_registered_date=' + encodeURIComponent(contact.evt.fisca_registered_date)]); }
      if (contact.evt.fisca_attended_url) { bodyData.push(['fisca_attended_url=' + encodeURIComponent(contact.evt.fisca_attended_url)]); }
      if (contact.evt.fisca_attended_date) { bodyData.push(['fisca_attended_date=' + encodeURIComponent(contact.evt.fisca_attended_date)]); }
      if (contact.evt.fisca_sell_url) { bodyData.push(['fisca_sell_url=' + encodeURIComponent(contact.evt.fisca_sell_url)]); }
      if (contact.evt.fisca_sell_date) { bodyData.push(['fisca_sell_date=' + encodeURIComponent(contact.evt.fisca_sell_date)]); }   
      if (contact.evt.fisca_purchased_url) { bodyData.push(['fisca_purchased_url=' + encodeURIComponent(contact.evt.fisca_purchased_url)]); }
      if (contact.evt.fisca_purchased_date) { bodyData.push(['fisca_purchased_date=' + encodeURIComponent(contact.evt.fisca_purchased_date)]); }      


      var UrlToCall = bodyData.join('&');
      if (TRKDBG_VERBOSE) { console.log("url is:" + UrlToCall); }

      var Http = new XMLHttpRequest();
      Http.open("GET", UrlToCall);
      Http.send();
   }
}





function trk_UrlGetParameter(parameterName) {
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }
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
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }
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





function trk_WriteTrkData(trk) {
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }

   /*
   if(trk.evt.fisca_landing_url) {localStorage.setItem("trk_fisca_landing_url", trk.evt.fisca_landing_url); }
   if(trk.evt.fisca_landing_date) {localStorage.setItem("trk_fisca_landing_date", trk.evt.fisca_landing_date); }   
*/

   // Log path visited (session only)
   if(trk.email) {document.cookie = "trk_email="+trk.email; }
   if(trk.userId) {document.cookie = "trk_userId="+trk.userId; }
   if(trk.visitorId) {document.cookie = "trk_visitorId="+trk.visitorId; }
   
   if(trk.page.utm_campaign) {document.cookie = "trk_utm_campaign="+trk.page.utm_campaign; }
   if(trk.page.utm_source) {document.cookie = "trk_utm_source="+trk.page.utm_source; }
   if(trk.page.utm_term) {document.cookie = "trk_utm_term="+trk.page.utm_term; }
   if(trk.page.utm_content) {document.cookie = "trk_utm_content="+trk.page.utm_content; }
   if(trk.page.utm_medium) {document.cookie = "trk_utm_medium="+trk.page.utm_medium;}


   if(trk.page.fragment) {document.cookie = "trk_fragment="+trk.page.fragment; }
   if(trk.page.path) {document.cookie = "trk_path="+trk.page.path; }
   if(trk.page.referrer) {document.cookie = "trk_referrer="+trk.page.referrer; }
   if(trk.page.url) {document.cookie = "trk_url="+trk.page.url; }
   if(trk.page.date) {document.cookie = "trk_date="+trk.page.date; }

   if(trk.evt.fisca_landing_url) {document.cookie = "trk_fisca_landing_url="+trk.evt.fisca_landing_url; }
   if(trk.evt.fisca_landing_date) {document.cookie = "trk_fisca_landing_date="+trk.evt.fisca_landing_date; }   
   if(trk.evt.fisca_optin_url) {document.cookie = "trk_fisca_optin_url="+trk.evt.fisca_optin_url; }
   if(trk.evt.fisca_optin_date) {document.cookie = "trk_fisca_optin_date="+trk.evt.fisca_optin_date; }   

   if(trk.evt.fisca_registered_url) {document.cookie = "trk_fisca_registered_url="+trk.evt.fisca_registered_url; }
   if(trk.evt.fisca_registered_date) {document.cookie = "trk_fisca_registered_date="+trk.evt.fisca_registered_date; }   
   if(trk.evt.fisca_attended_url) {document.cookie = "trk_fisca_attended_url="+trk.evt.fisca_attended_url; }
   if(trk.evt.fisca_attended_date) {document.cookie = "trk_fisca_attended_date="+trk.evt.fisca_attended_date; }   
   if(trk.evt.fisca_selling_url) {document.cookie = "trk_fisca_selling_url="+trk.evt.fisca_selling_url; }
   if(trk.evt.fisca_selling_date) {document.cookie = "trk_fisca_selling_date="+trk.evt.fisca_selling_date; }   
   if(trk.evt.fisca_purchased_url) {document.cookie = "trk_fisca_purchased_url="+trk.evt.fisca_purchased_url; }
   if(trk.evt.fisca_purchased_date) {document.cookie = "trk_fisca_purchased_date="+trk.evt.fisca_purchased_date; }   

}


function trk_ReadTrkData(trk) {
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }

   /*
   trk.evt.fisca_landing_url = localStorage.getItem("trk_fisca_landing_url");
   trk.evt.fisca_landing_date = localStorage.getItem("trk_fisca_landing_date");   
   */

   trk.email = trk_GetCookieValue("trk_email");
   trk.userId = trk_GetCookieValue("trk_userId");
   trk.visitorId = trk_GetCookieValue("trk_visitorId");
  
   trk.page.utm_campaign = trk_GetCookieValue("trk_utm_campaign");
   trk.page.utm_source = trk_GetCookieValue("trk_utm_source");
   trk.page.utm_term = trk_GetCookieValue("trk_utm_term");
   trk.page.utm_content = trk_GetCookieValue("trk_utm_content");
   trk.page.utm_medium = trk_GetCookieValue("trk_utm_medium"); 

   trk.page.fragment =  trk_GetCookieValue("trk_fragment");
   trk.page.path =  trk_GetCookieValue("trk_path");
   trk.page.referrer =  trk_GetCookieValue("trk_referrer");
   trk.page.url =  trk_GetCookieValue("trk_url");
   trk.page.date =  trk_GetCookieValue("trk_date");


  // Read path visited (session only)
  trk.evt.fisca_landing_url = trk_GetCookieValue("trk_fisca_landing_url");
  trk.evt.fisca_landing_date = trk_GetCookieValue("trk_fisca_landing_date");   
  trk.evt.fisca_optin_url = trk_GetCookieValue("trk_fisca_optin_url");
  trk.evt.fisca_optin_date = trk_GetCookieValue("trk_fisca_optin_date");   

  trk.evt.fisca_registered_url = trk_GetCookieValue("trk_fisca_registered_url");
  trk.evt.fisca_registered_date = trk_GetCookieValue("trk_fisca_registered_date");   
  trk.evt.fisca_attended_url = trk_GetCookieValue("trk_fisca_attended_url");
  trk.evt.fisca_attended_date = trk_GetCookieValue("trk_fisca_attended_date");  

  trk.evt.fisca_selling_url = trk_GetCookieValue("trk_fisca_selling_url");
  trk.evt.fisca_selling_date = trk_GetCookieValue("trk_fisca_selling_date");   
  trk.evt.fisca_purchased_url = trk_GetCookieValue("trk_fisca_purchased_url");
  trk.evt.fisca_purchased_date = trk_GetCookieValue("trk_fisca_purchased_date");    

}





function trk_GetPageInfo(ctx) {
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }
   
   ctx.utm_source = trk_UrlGetParameter("utm_source");
   ctx.utm_campaign = trk_UrlGetParameter("utm_campaign");
   ctx.utm_term = trk_UrlGetParameter("utm_term");
   ctx.utm_content = trk_UrlGetParameter("utm_content");
   ctx.utm_medium = trk_UrlGetParameter("utm_medium");

   ctx.path = window.location.pathname;
   ctx.url = window.location;
   ctx.referrer = window.location.origin;
   ctx.param = window.location.search;

   ctx.date = trk_GetDateString();

   //page title
}


////////////////
// WebinarJam //
////////////////
function trk_SetVideoTimerEvent()
{
  
  var timerID = setInterval(function() {
      var element_video_time = document.getElementsByClassName("vjs-current-time-display");
      var value_video_time = element_video_time[0].textContent;
      console.log("Current time of the video is: "+value_video_time);

      var element_video = document.getElementsByClassName("vjs-duration-display");
      var value_video_duration = element_video[0].textContent;      
      console.log("video duration is: "+value_video_duration);


  }, 10 * 1000); 
  //clearInterval(timerID); // The setInterval it cleared and doesn't run anymore.
}




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

      var loop = 0;
      while((loop<30) )
      {
         loop = loop +1;
         setTimeout(function(z){return}, 100); //ms       
      }


      var email_sha256encoded = sha256(email);
      if(TRKDBG_VERBOSE){
         console.log("email befor sha256 is:"+email);
         console.log("email sha256 is:"+email_sha256encoded.toString());  }
   }
   return email_sha256encoded;  
}



// Via Cookies for subdomain
// Mecanism to restore cookie via local storage

//if email input exsit, create a event to read it 
function trk_LoadEventWriteEmailOnLocalStorage()   // create ...
{
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }

   if (document.getElementsByName("email")[0]) {
      var tmp_email = document.getElementsByName("email")[0].value; //if email already present
      tmp_email_encoded = window.btoa(tmp_email);
      localStorage.setItem("trk_eml_enc", tmp_email_encoded);
      if (TRKDBG_VERBOSE) { console.log("email write in local storage is:" + tmp_email); }

      document.getElementsByName("email")[0].oninput = function () {
         var tmp_email = document.getElementsByName("email")[0].value;
         tmp_email_encoded = window.btoa(tmp_email);
         localStorage.setItem("trk_eml_enc", tmp_email_encoded);
         if (TRKDBG_VERBOSE) { console.log("email write in local storage is:" + tmp_email); }
      };
   }
   // else read local storage ?
}


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











/*
function trk_ac_update_contact(contact) {
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }

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
*/



/*
function dynamicallyLoadScript(url) 
{
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }
   var script = document.createElement("script");  // create a script DOM node
   script.src = url;  // set its src to the provided URL

   document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}
*/



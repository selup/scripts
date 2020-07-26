






function sleep(milliseconds) 
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
   if (TRKDBG_GET_DATE_STRING) { console.log("date is:" + today); }
   return today;
}





function trk_SetEvent(ctx,EventName)
{
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }

   // Event
	switch (EventName) {
      case 'landing':
         ctx.evt.fisca_landing_url = ctx.page.url; 
         ctx.evt.fisca_landing_date = ctx.page.Date; 
       break;
      case 'optin':
         ctx.evt.fisca_optin_url = ctx.page.url; 
         ctx.evt.fisca_optin_date = ctx.page.date;         
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
         console.log("email befor sha256 is:"+email);
         console.log("email sha256 is:"+email_sha256encoded.toString());  }
   }
   return email_sha256encoded;  
}

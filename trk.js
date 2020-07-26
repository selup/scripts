//	file can be fund here:  https://selup.github.io/scripts/trk.js


//////////////////////
// Global constants //
//////////////////////
var TRKDBG_FUNCIN = true;	// Enter in all function
var TRKDBG_VERBOSE = true;

var TRKDBG_AC_UPDATE_CONTACT = false;
var TRKDBG_GET_DATE_STRING = false;
var TRKDBG_WRITE_EMAIL_LOCAL_STORAGE_ON_EVENT = true;


/*
function dynamicallyLoadScript(url) 
{
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }
   var script = document.createElement("script");  // create a script DOM node
   script.src = url;  // set its src to the provided URL

   document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}
*/









/////////////
// Main () //
/////////////

var trk =
{
   email: null,
   userId: null,
   visitorId: null,
   page: new Object(),
   evt: new Object(),
};

trk_SetFingerPrintAsync();

// load event for catching email
trk_LoadEventWriteEmailOnLocalStorage();


trk_LoadSHA256script();










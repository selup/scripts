//	file can be fund here:  https://selup.github.io/scripts/trk.js


//////////////////////
// Global constants //
//////////////////////
var TRKDBG_FUNCIN = true;	// Enter in all function
var TRKDBG_VERBOSE = true;

//var TRKDBG_AC_UPDATE_CONTACT = false;
//var TRKDBG_GET_DATE_STRING = false;
//var TRKDBG_WRITE_EMAIL_LOCAL_STORAGE_ON_EVENT = true;






/////////////
// Main () //
/////////////

// create trk a partir d'un prototype

var trk =
{
   email: null,
   userId: null,
   visitorId: null,
   page: new Object(),
   evt: new Object(),
};

trk_SetFingerPrintAsync();

trk_LoadEventWriteEmailOnLocalStorage();

trk_LoadSHA256script();










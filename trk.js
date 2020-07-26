//	file can be fund here:  https://selup.github.io/scripts/trk.js


//////////////////////
// Global constants //
//////////////////////
var TRKDBG_FUNCIN = true;	// Enter in all function
var TRKDBG_VERBOSE = true;



/////////////
// Main () //
/////////////
//trk_LoadSHA256script();

/*
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
*/

trk_SetFingerPrintAsync();

trk_LoadEventWriteEmailOnLocalStorage();












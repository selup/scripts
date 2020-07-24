
/*****************/
/** DEBUG MODE  **/
/*****************/
// If code uncomment, print forms (for debug only) - caution, all page with this form will be show
var elt_input = $('[data-title="row-trk"]');
elt_input.attr('style','display:unset');
debug_consol = true; //print on consol
// TODO: mettre accesible cette partie via GTM independement des autres pour pouvoir activer le debug uniquement sur les pages soujaités
// Envoyer email si bug






async function encodeSHA256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return hash;
}






/****************************************/
/** READ INPUT & WRITE COOKIE (event)  **/
/****************************************/
// email
document.getElementsByName("email")[0].oninput = function()
{
	var trk_eml = document.getElementsByName("email")[0].value;
	trk_eml  = window.btoa( trk_eml );
	//document.cookie = 'trk_eml_enc='+trk_eml;
	localStorage.setItem("trk_eml_enc", trk_eml); 
	if(debug_consol == true){ console.log("email encrypted 2 is",trk_eml);}
};
// TODO: Filtrage "vide" / undefined
// add Title, Referer


// Via GTM
// UTMs, URL, Path, Referrer
// direct decrypt on GTM
 
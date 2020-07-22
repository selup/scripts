
/*****************/
/** DEBUG MODE  **/
/*****************/
// If code uncomment, print forms (for debug only) - caution, all page with this form will be show
var elt_input = $('[data-title="row-trk"]');
elt_input.attr('style','display:unset');
debug_consol = true; //print on consol




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



// Via GTM
// UTMs, URL, Path, Referrer
// direct decrypt on GTM


// On doit pouvoir injecter ce petit morceau de code directement via GTM
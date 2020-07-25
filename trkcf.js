
/*****************/
/** DEBUG MODE  **/
/*****************/
// If code uncomment, print forms (for debug only) - caution, all page with this form will be show
var elt_input = $('[data-title="row-trk"]');
elt_input.attr('style','display:unset');
debug_consol = true; //print on consol
// TODO: mettre accesible cette partie via GTM independement des autres pour pouvoir activer le debug uniquement sur les pages soujaités
// Envoyer email si bug



/****************************************/
/** READ INPUT & WRITE COOKIE (event)  **/ 
/****************************************/
//if email input exsit, create a event to read it 
if(document.getElementsByName("email")[0])
{
	document.getElementsByName("email")[0].oninput = function()
	{
		var trk_eml = document.getElementsByName("email")[0].value;
		trk_eml  = window.btoa( trk_eml );
		//document.cookie = 'trk_eml_enc='+trk_eml;
		localStorage.setItem("trk_eml_enc", trk_eml); 
		if(debug_consol == true){ console.log("email encrypted 2 is",trk_eml);}
	};
}


 

// If code uncomment, print forms (for debug only) - caution, all page with this form will be show
var elt_input = $('[data-title="row-trk"]');
elt_input.attr('style','display:unset');



function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
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



/**********************/
/**   WRITE COOKIE   **/
/**********************/
// encrypt , change variable name
// email
/*
var elt_input = $('[name="email"]');
cookie_email = elt_input.attr('value');
*/

document.getElementsByName("email")[0].oninput = function()
{
	var cookie_email = document.getElementsByName("email")[0].value;
	console.log("email is",cookie_email);
};



/********************/
/**   GET CONFIG   **/
/********************/
// PageType
var elt_input = $('[data-custom-type="conf_pagetype"]');
conf_pagetype = elt_input.attr('value');
console.log("conf_pagetype is",conf_pagetype);

// Name
var elt_input = $('[data-custom-type="conf_name"]');
conf_name = elt_input.attr('value');
console.log("conf_name is",conf_name);

// Option
var elt_input = $('[data-custom-type="conf_option"]');
conf_option = elt_input.attr('value');
console.log("conf_option is",conf_option);



/************************/
/** Add Data to Cookie **/
/************************/
// Current path
current_path = window.location.pathname;
// Remove first char (/)
current_path = current_path.substr(1);

	
/** LANDING **/
if(conf_pagetype == "landing")
{
	document.cookie = 'trk_lp_path='+current_path;
	document.cookie = 'trk_lp_name='+conf_name;
	document.cookie = 'trk_lp_opt='+conf_option;
}
else if(conf_pagetype == "submit")
{
	document.cookie = 'trk_subm_path='+current_path;
	document.cookie = 'trk_subm_name='+conf_name;
	document.cookie = 'trk_subm_opt='+conf_option;
}




/******************************/
/** Add Data to Custom Field **/
/******************************/
// if not empty, write Custom Field from cookie

/** LANDING **/
// path
var cooki_lp_path =getCookie("trk_lp_path");
var elt_input = $('[data-custom-type="trk_lp_path"]');
if(elt_input != "") { elt_input.attr('value',cooki_lp_path); }

// name
var cooki_lp_name =getCookie("trk_lp_name");
var elt_input = $('[data-custom-type="trk_lp_name"]');
if(elt_input != "") { elt_input.attr('value',cooki_lp_name); }

// name
var cooki_lp_opt =getCookie("trk_lp_opt");
var elt_input = $('[data-custom-type="trk_lp_opt"]');
if(elt_input != "") { elt_input.attr('value',cooki_lp_opt); }

/** SUBMIT **/
// path
var cooki_subm_path = getCookie("trk_subm_path");
var elt_input = $('[data-custom-type="trk_subm_path"]');
if(elt_input != "") {elt_input.attr('value',cooki_subm_path); }

// name
var cooki_subm_name =getCookie("trk_subm_name");
var elt_input = $('[data-custom-type="trk_subm_name"]');
if(elt_input != "") { elt_input.attr('value',cooki_subm_name); }

// name
var cooki_subm_opt =getCookie("trk_subm_opt");
var elt_input = $('[data-custom-type="trk_subm_opt"]');
if(elt_input != "") { elt_input.attr('value',cooki_subm_opt); }



/********************************************/
/** Add current Data to NEXT parameter URL **/
/********************************************/

var initial_url = window.location.href;
var url = new URL(initial_url);
var search_params = url.searchParams;



// Current path
current_path = window.location.pathname;
// Remove first char (/)
current_path = current_path.substr(1);
/**   SUBMIT   **/
if (conf_pagetype == "submit")
{
	// path
	if( current_path != ""){search_params.set('trk_subm_path', current_path);}
	
	//  Name
	if( conf_name != ""){search_params.set('trk_subm_name', conf_name);}
	
	// Option 
	if( conf_option != ""){search_params.set('trk_subm_opt', conf_option);}
}

/**   LANDING   **/
else if(conf_pagetype == "landing")
{
	// path
	if( current_path != ""){search_params.set('trk_lp_path', current_path);}
	
	//  Name
	if( conf_name != ""){search_params.set('trk_lp_name', conf_name);}
	
	// Option 
	if( conf_option != ""){search_params.set('trk_lp_opt', conf_option);}
}

url.search = search_params.toString();


/*******************************************************/
/** ADD current URL parameter to all link of the page **/
/** by Replacinh href link in all document 			  **/
/*******************************************************/
// filter utm_expid
var utm_to_filter = url;
//var utm_to_filter = new URL(new_url);
var params_filter = new URLSearchParams(utm_to_filter.search.slice(1));
params_filter.delete("utm_expid");
console.log("params_filter is",params_filter.toString());


var url_tmp = url;
//var url_tmp = new URL(new_url);
url_tmp.search = params_filter.toString();
var url_filtered = url_tmp.toString();
console.log("url filtered is",url_filtered);

var queryString = new URL(url_filtered).search;
console.log("queryString is",queryString);


//var queryString = new URL(new_url).search;
//console.log("queryString is",queryString);
document.querySelectorAll("[href]").forEach(link => {
    var current = link.href;
	//console.log("link",current);
	// filter to higher speed (low flikr)
	if( (current.includes("webinaire.org") == true) && (current.includes(".css") == false) && (current.includes("#submit-form") == false) )
	{
		link.href = current + queryString;
		//console.log("link replace",link.href);
	}

});


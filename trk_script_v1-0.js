/********************/
/**   GET CONFIG   **/
/********************/
/*
var conf_pagetype = document.getElementById('conf_pagetype').textContent;
console.log("conf_pagetype is:",conf_pagetype);

var conf_name = document.getElementById('conf_name').textContent;
console.log("conf_name is:",conf_name);

var conf_option = document.getElementById('conf_option').textContent;
console.log("conf_option is:",conf_option);
*/

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


var initial_url = window.location.href;
var url = new URL(initial_url);
var search_params = url.searchParams;

/*****************/
/**   SUBMIT   **/
/*****************/

if (conf_pagetype == "submit")
{
	//var var_submit = window.location.pathname;
	//search_params.set('trk_subm', var_submit);
	
	//////////
	// path //
	//////////
	// set url param
	var var_submit = window.location.pathname;
	search_params.set('trk_subm_path', var_submit);
	// set input value
	var elt_input = $('[data-custom-type="trk_subm_path"]');
	elt_input.attr('value',var_submit);
	// set cookie
	document.cookie = 'trk_subm_path='+var_submit;
	
	///////////
	//  Name //
	///////////
	// set url param
	search_params.set('trk_subm_name', conf_name);
	// set input value
	var elt_input = $('[data-custom-type="trk_subm_name"]');
	elt_input.attr('value',conf_name);
	// set cookie
	document.cookie = 'trk_subm_name='+conf_name;
	
	
	////////////
	// Option //
	////////////
	// set url param
	search_params.set('trk_subm_opt', conf_option);
	// set input value
	var elt_input = $('[data-custom-type="trk_subm_opt"]');
	elt_input.attr('value',conf_option);
	// set cookie
	document.cookie = 'trk_subm_opt='+conf_option;
}

/*****************/
/**   LANDING   **/
/*****************/
else if(conf_pagetype == "landing")
{
	//////////
	// path //
	//////////
	// set url param
	var var_landing = window.location.pathname;
	search_params.set('trk_lp_path', var_landing);
	// set input value
	var elt_input = $('[data-custom-type="trk_lp_path"]');
	elt_input.attr('value',var_landing);
	// set cookie
	document.cookie = 'trk_lp_path='+var_landing;
	
	///////////
	//  Name //
	///////////
	// set url param
	search_params.set('trk_lp_name', conf_name);
	// set input value
	var elt_input = $('[data-custom-type="trk_lp_name"]');
	elt_input.attr('value',conf_name);
	// set cookie
	document.cookie = 'trk_lp_name='+conf_name;
	
	
	////////////
	// Option //
	////////////
	// set url param
	search_params.set('trk_lp_opt', conf_option);
	// set input value
	var elt_input = $('[data-custom-type="trk_lp_opt"]');
	elt_input.attr('value',conf_option);
	// set cookie
	document.cookie = 'trk_lp_opt='+conf_option;

}

url.search = search_params.toString();
var new_url = url.toString();
console.log(new_url);
//window.history.pushState({},{},new_url);	
window.history.replaceState({},{},new_url);


/***************************************/
/** Replace href link in all document **/
/***************************************/
// filter utm_expid
var utm_to_filter = new URL(new_url);
var params_filter = new URLSearchParams(utm_to_filter.search.slice(1));
params_filter.delete("utm_expid");
console.log("params_filter is",params_filter.toString());


var url_tmp = new URL(new_url);
url_tmp.search = params_filter.toString();
var url_filtered = url_tmp.toString();
console.log("url filtered is",url_filtered);

var queryString = new URL(url_filtered).search;
console.log("queryString is",queryString);

/*
//var queryString = new URL(new_url).search;
//console.log("queryString is",queryString);
document.querySelectorAll("[href]").forEach(link => {
    var current = link.href;
    link.href = current + queryString;
});
*/

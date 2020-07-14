// Get config
var conf_pagetype = document.getElementById('conf_pagetype').textContent;
console.log("conf_pagetype is:",conf_pagetype);

var conf_name = document.getElementById('conf_name').textContent;
console.log("conf_name is:",conf_name);

var conf_option = document.getElementById('conf_option').textContent;
console.log("conf_option is:",conf_option);


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
window.history.pushState({},{},new_url);	




// read cookie
//var x = document.cookie;
//console.log(x);

// write cookie
//document.cookie = "cookiname=woo";


/*
var trk_referer = document.referrer;
  console.log("the referer is:", trk_referer);
  
  var trk_url = window.location.href;
  console.log("the url is:", trk_url); 
  
  var trk_path = window.location.pathname;
*/
/*
	var url = new URL(trk_url);
	var search_params = url.searchParams;
	//search_params.set('trk_param', search_params);
	search_params.set('trk_path', trk_path);
	search_params.set('trk_lp', trk_lp);
	//search_params.set('trk_url', trk_url);
	//search_params.set('trk_referer', trk_referer);

	url.search = search_params.toString();
	var new_url = url.toString();
	console.log(new_url);
	window.history.pushState({},{},new_url); 
*/ 




// Get config
var conf_pagetype = document.getElementById('conf_pagetype').textContent;
console.log("conf_pagetype is:",conf_pagetype);


if conf_pagetype == "landing")
{
	var trk_lp = window.location.pathname;
}


// read cookie
//var x = document.cookie;
//console.log(x);

// write cookie
//document.cookie = "cookiname=woo";



var trk_referer = document.referrer;
  console.log("the referer is:", trk_referer);
  
  var trk_url = window.location.href;
  console.log("the url is:", trk_url); 
  
  var trk_path = window.location.pathname;


 
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



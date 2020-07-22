function trk_ac_update_contact()
{
 	const Http = new XMLHttpRequest();
	const url='https://script.google.com/macros/s/AKfycbwDKQdFDCCCKNy47Zw8q7pz2edltXtYBHStj9e7GuwNZb-7jUq2/exec';
	Http.open("GET", url);
	Http.send();

	Http.onreadystatechange = (e) => 
	{
	  console.log(Http.responseText)
	}


}; 

trk_ac_update_contact();
console.log("go go go");
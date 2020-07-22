function trk_ac_update_contact(contact)
{
	console.log(contact.email);
	
 	var Http = new XMLHttpRequest();
	var url='https://script.google.com/macros/s/AKfycbwDKQdFDCCCKNy47Zw8q7pz2edltXtYBHStj9e7GuwNZb-7jUq2/exec'+'?email='+contact.email;
	Http.open("GET", url);
	Http.send();

/*
	Http.onreadystatechange = (e) => 
	{
	  console.log(Http.responseText)
	}
	*/
}




//verif email
/*
function() {
  // Test email address first
  function emailIsValid (email) {
    return /\S+@\S+\.\S+/.test(email)
  }
  // If email address is valid, hash it
  if (emailIsValid({{visitorEmail}})) {
    var hash = sha256({{visitorEmail}});
    return hash;
  } else {
    return undefined;
  }
}
*/


function trk_GetDateString()
{
	
	var today = new Date();
	var dd = today.getDate();

	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	if(dd<10) 
	{
		dd='0'+dd;
	} 

	if(mm<10) 
	{
		mm='0'+mm;
	} 
	/*
	today = mm+'-'+dd+'-'+yyyy;
	console.log(today);
	today = mm+'/'+dd+'/'+yyyy;
	console.log(today);
	today = dd+'-'+mm+'-'+yyyy;
	console.log(today);
	today = dd+'/'+mm+'/'+yyyy;
	console.log(today);	
	*/
	
	today = yyyy+'/'+mm+'/'+dd;
	console.log(today);		
	return today;
}

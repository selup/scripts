function trk_ac_update_contact(e)
{
 
  var contactEmail = "bpatout+dev@gmail.com";
  var vartmp = "tmp";
  var varall;
 
  try
  {  
    // Mise en forme pour envoi
    var bodyData = [];
    
    //push data for the body parameters
    bodyData.push
    ( 
      ['api_key' , API],  
      ['api_action' , 'contact_sync'],
      ['api_output' , 'json'],
      ['email' , contactEmail],
      ['field[%TRACKTAGS%]', vartmp],       
      ['field[%TRACKALL%]', varall],
    );

    
    //map data from array and build payload
    var body = bodyData.map(function(el){el[1] = encodeURIComponent(el[1]); return el.join('=')}).join('&');
    
    
    //send data to AC
    var options =
        {
          'method' : 'POST',
          'payload' : body,
          'contentType': 'application/x-www-form-urlencoded'
        };
    
    
    var response = UrlFetchApp.fetch(URL+"/admin/api.php", options); //send data to AC
    //print out response
    return ContentService.createTextOutput(response.getContentText());
  }
  catch(e)
  {
    return ContentService.createTextOutput(e);
  }
}; 

trk_ac_update_contact(null);
console.log("go go go");
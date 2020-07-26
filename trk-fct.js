
function trk_GetDateString() {
   if (TRKDBG_FUNCIN) { console.log("=>" + arguments.callee.name + "()"); }

   var today = new Date();
   var dd = today.getDate();

   var mm = today.getMonth() + 1;
   var yyyy = today.getFullYear();
   if (dd < 10) {
      dd = '0' + dd;
   }

   if (mm < 10) {
      mm = '0' + mm;
   }

   today = yyyy + '/' + mm + '/' + dd;
   if (TRKDBG_GET_DATE_STRING) { console.log("date is:" + today); }
   return today;
}

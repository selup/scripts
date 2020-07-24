/*
async function encodeSHA256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return hash;
}
*/

function encodeSHA256(message) {
  var hash = crypto.subtle.digest('SHA-256', message);
  return hash;
}
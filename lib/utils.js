export function getCookie(sKey) {
   if (!sKey) {
     return null;
   }
   return (
     decodeURIComponent(
       document?.cookie.replace(
         new RegExp(
           `(?:(?:^|.*;)\\s*${encodeURIComponent(sKey).replace(
             /[-.+*]/g,
             '\\$&'
           )}\\s*\\=\\s*([^;]*).*$)|^.*$`
         ),
         '$1'
       )
     ) || null
   ); //eslint-disable-line
 }
 
 export function setCookie(name, value, days) {
   let expires = '';
   if (days) {
     const date = new Date();
     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
     expires = `; expires=${date.toUTCString()}`;
   }
   document.cookie = `${name}=${value || ''}${expires}; path=/`;
 }

export function isInt(value){
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
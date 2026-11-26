/* Private forms get a fresh document, never a public page with live analytics attached. */
(function(){
 'use strict';
 var pattern=/^\/(checkout|orders)(\/|$)/;
 var initiallyPrivate=pattern.test(location.pathname);
 function check(url){try{return pattern.test(new URL(url,location.href).pathname);}catch(_){return false;}}
 ['pushState','replaceState'].forEach(function(key){var original=history[key];history[key]=function(state,title,url){if(url!=null&&check(url)!==initiallyPrivate){location.assign(new URL(url,location.href).href);return;}return original.apply(this,arguments);};});
 window.addEventListener('popstate',function(){if(pattern.test(location.pathname)!==initiallyPrivate)location.reload();});
 document.addEventListener('click',function(e){var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;if(!a||e.defaultPrevented||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||a.target||a.hasAttribute('download'))return;var u=new URL(a.href,location.href);if(u.origin===location.origin&&pattern.test(u.pathname)!==initiallyPrivate){e.preventDefault();e.stopImmediatePropagation();location.assign(u.href);}},true);
})();

!function(){"use strict";var v,e,f,b,E,t,n;"undefined"!=typeof window&&window.addEventListener&&(v=Object.create(null),f=function(){clearTimeout(e),e=setTimeout(t,100)},b=function(){},E="http://www.w3.org/1999/xlink",t=function(){var e,t,n,o,i,r,u,s,d,a,l,c=0;function h(){var e;0===--c&&(b(),window.addEventListener("resize",f,!1),window.addEventListener("orientationchange",f,!1),b=window.MutationObserver?((e=new MutationObserver(f)).observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0}),function(){try{e.disconnect(),window.removeEventListener("resize",f,!1),window.removeEventListener("orientationchange",f,!1)}catch(e){}}):(document.documentElement.addEventListener("DOMSubtreeModified",f,!1),function(){document.documentElement.removeEventListener("DOMSubtreeModified",f,!1),window.removeEventListener("resize",f,!1),window.removeEventListener("orientationchange",f,!1)}))}function m(e){return function(){!0!==v[e.base]&&(e.useEl.setAttributeNS(E,"xlink:href","#"+e.hash),e.useEl.hasAttribute("href")&&e.useEl.setAttribute("href","#"+e.hash))}}function w(e){return function(){e.onerror=null,e.ontimeout=null,h()}}for(b(),r=document.getElementsByTagName("use"),o=0;o<r.length;o+=1){try{t=r[o].getBoundingClientRect()}catch(e){t=!1}e=(a=(l=r[o].getAttribute("href")||r[o].getAttributeNS(E,"href")||r[o].getAttribute("xlink:href"))&&l.split?l.split("#"):["",""])[0],n=a[1],i=t&&0===t.left&&0===t.right&&0===t.top&&0===t.bottom,t&&0===t.width&&0===t.height&&!i?(r[o].hasAttribute("href")&&r[o].setAttributeNS(E,"xlink:href",l),e.length&&(!0!==(u=v[e])&&setTimeout(m({useEl:r[o],base:e,hash:n}),0),void 0===u&&(s=e,d=function(e){var t;return void 0!==e.protocol?t=e:(t=document.createElement("a")).href=e,t.protocol.replace(/:/g,"")+t.host},l=a=void 0,window.XMLHttpRequest&&(a=new XMLHttpRequest,l=d(location),s=d(s),a=void 0===a.withCredentials&&""!==s&&s!==l?XDomainRequest||void 0:XMLHttpRequest),void 0!==a&&(u=new a,(v[e]=u).onload=function(n){return function(){var e=document.body,t=document.createElement("x");n.onload=null,t.innerHTML=n.responseText,(t=t.getElementsByTagName("svg")[0])&&(t.setAttribute("aria-hidden","true"),t.style.position="absolute",t.style.width=0,t.style.height=0,t.style.overflow="hidden",e.insertBefore(t,e.firstChild)),h()}}(u),u.onerror=w(u),u.ontimeout=w(u),u.open("GET",e),u.send(),c+=1)))):i?e.length&&v[e]&&setTimeout(m({useEl:r[o],base:e,hash:n}),0):void 0===v[e]?v[e]=!0:v[e].onload&&(v[e].abort(),delete v[e].onload,v[e]=!0)}r="",c+=1,h()},n=function(){window.removeEventListener("load",n,!1),e=setTimeout(t,0)},"complete"!==document.readyState?window.addEventListener("load",n,!1):n())}();
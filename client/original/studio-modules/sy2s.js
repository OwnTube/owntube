"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var SLg,TLg,ULg,VLg;SLg=function(a,b){b=typeof b==="string"?_.MKa(b):"\\s";return a.replace(new RegExp("(^"+(b?"|["+b+"]+":"")+")([a-z])","g"),function(c,e,g){return e+g.toUpperCase()})};
TLg=/^--.+/;ULg={};VLg=function(a,b,c){var e=ULg[c];if(!e){var g=_.pKa(c);e=g;a.style[g]===void 0&&(g=(_.Ef?"Webkit":_.IHa?"Moz":null)+SLg(g),a.style[g]!==void 0&&(e=g));ULg[c]=e}(c=e)&&(TLg.test(c)?a.style.setProperty(c,b):a.style[c]=b)};
_.WLg=function(a,b,c){if(typeof b==="string")VLg(a,c,b);else for(var e in b)VLg(a,b[e],e)};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

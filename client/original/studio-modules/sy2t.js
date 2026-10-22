"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var IMg,JMg,KMg,LMg;IMg=function(a,b){b=typeof b==="string"?_.WKa(b):"\\s";return a.replace(new RegExp("(^"+(b?"|["+b+"]+":"")+")([a-z])","g"),function(c,e,g){return e+g.toUpperCase()})};
JMg=/^--.+/;KMg={};LMg=function(a,b,c){var e=KMg[c];if(!e){var g=_.zKa(c);e=g;a.style[g]===void 0&&(g=(_.If?"Webkit":_.UHa?"Moz":null)+IMg(g),a.style[g]!==void 0&&(e=g));KMg[c]=e}(c=e)&&(JMg.test(c)?a.style.setProperty(c,b):a.style[c]=b)};
_.MMg=function(a,b,c){if(typeof b==="string")LMg(a,c,b);else for(var e in b)LMg(a,b[e],e)};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

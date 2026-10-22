"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.fmi=function(a){if(a&&a.year&&a.month&&a.day)return _.Lm((new Date(a.year+"-"+a.month+"-"+a.day)).getTime())};
_.gmi=function(a,b,c){c||(c=1E-10);return a.currencyCode!==b.currencyCode?NaN:Math.abs(_.qq(a)-_.qq(b))<=c?0:_.qq(a)-_.qq(b)};
_.hmi=function(a){if(a&&_.Mg(_.bbb).find(function(b){return b===a}))return a};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

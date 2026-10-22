"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.fni=function(a){if(a&&a.year&&a.month&&a.day)return _.Gm((new Date(a.year+"-"+a.month+"-"+a.day)).getTime())};
_.gni=function(a,b,c){c||(c=1E-10);return a.currencyCode!==b.currencyCode?NaN:Math.abs(_.tq(a)-_.tq(b))<=c?0:_.tq(a)-_.tq(b)};
_.hni=function(a){if(a&&_.Qg(_.mbb).find(function(b){return b===a}))return a};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

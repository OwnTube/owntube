"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.c2f=function(a){var b=_.vl(_.Bg(a));if(b==="ERROR")return _.tl();if(b==="LOADING")return _.wl;b={};var c=_.f(_.Og(a)),e=c.next();try{for(;!e.done;e=c.next()){var g=e.value;b[g]=a[g].data}}finally{_.h(c,e)}return _.sl(b)};
_.d2f=function(a){var b=_.zfb(a);a=_.Afb(a);return _.Qqb(new Date(b.getTime()),new Date(a.getTime()-1),2)};
_.e2f=function(a){switch(a){case "POSITIVE":return"ytcp-icons:trend-up-circle";case "NEGATIVE":return"ytcp-icons:trend-down-circle";case "NEUTRAL":return"ytcp-icons:check-circle-outline"}};
_.f2f=function(a){return a.context.creatorSettings.artistRosterSettings};
_.g2f=function(a,b){b=b||new Date(_.Wc());var c;if(c=a.getDate()==b.getDate())if(b=b||new Date(_.Wc()),c=a.getMonth()==b.getMonth())b=b||new Date(_.Wc()),c=a.getFullYear()==b.getFullYear();return c};
_.h2f=_.Ul(function(a){return a.ui.artistListPageState.artistListPagination});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

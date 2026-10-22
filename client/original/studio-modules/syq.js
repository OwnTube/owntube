"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.f1f=function(a,b){if(!a)throw _.pi(_.TUe,b);if(a.unit!==b)throw _.pi(_.UUe,a.unit,b);return a};
_.g1f=function(a){return(new _.bk("{days,plural,=1{{DIFF} more than yesterday}other{{DIFF} more than previous {DAYS} days}}")).format({days:a.days,DIFF:String(a.diff),DAYS:String(a.days)})};
_.h1f=function(a){return(new _.bk("{days,plural,=1{{DIFF} less than yesterday}other{{DIFF} less than previous {DAYS} days}}")).format({days:a.days,DIFF:String(a.diff),DAYS:String(a.days)})};
_.i1f=function(a){return(new _.bk("{days,plural,=1{About the same as yesterday}other{About the same as previous {DAYS} days}}")).format({days:a.days,DAYS:String(a.days)})};
_.j1f=function(a,b){return{type:"LIST_CREATOR_VIDEOS",videoFragment:b,request:a}};
_.k1f=function(a,b,c){return _.f1f(a.getDimensionColumn(b,c),"DATE_IDS")};
_.l1f=function(a,b,c){a=_.sDb(a.getResult(b),"LIST_CREATOR_VIDEOS");_.FSb(a.videoFragment.mask,c.mask);return a.videoList};_.m1f=[_.zp.ROYAL_BLUE,_.zp.PARROT,_.zp.APRICOT,_.zp.AUDIENCE,_.zp.VALENTINE,_.zp.PINE,_.zp.BUBBLEGUM,_.zp.YELLOW,_.zp.OVERVIEW,_.zp.REACH,_.zp.REVENUE,_.zp.ENGAGEMENT];_.n1f=[_.zp.OVERVIEW,[].includes("color_blind_comparison")?_.zp.APRICOT:_.zp.AUDIENCE];_.o1f=_.m1f.length;_.p1f=_.zp.TEXT_PRIMARY;
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

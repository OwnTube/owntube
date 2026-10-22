"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.s0f=function(a,b){if(!a)throw _.ni(_.mUe,b);if(a.unit!==b)throw _.ni(_.nUe,a.unit,b);return a};
_.t0f=function(a){return(new _.Zj("{days,plural,=1{{DIFF} more than yesterday}other{{DIFF} more than previous {DAYS} days}}")).format({days:a.days,DIFF:String(a.diff),DAYS:String(a.days)})};
_.u0f=function(a){return(new _.Zj("{days,plural,=1{{DIFF} less than yesterday}other{{DIFF} less than previous {DAYS} days}}")).format({days:a.days,DIFF:String(a.diff),DAYS:String(a.days)})};
_.v0f=function(a){return(new _.Zj("{days,plural,=1{About the same as yesterday}other{About the same as previous {DAYS} days}}")).format({days:a.days,DAYS:String(a.days)})};
_.w0f=function(a,b){return{type:"LIST_CREATOR_VIDEOS",videoFragment:b,request:a}};
_.x0f=function(a,b,c){return _.s0f(a.getDimensionColumn(b,c),"DATE_IDS")};
_.y0f=function(a,b,c){a=_.hDb(a.getResult(b),"LIST_CREATOR_VIDEOS");_.vSb(a.videoFragment.mask,c.mask);return a.videoList};_.z0f=[_.xp.ROYAL_BLUE,_.xp.PARROT,_.xp.APRICOT,_.xp.AUDIENCE,_.xp.VALENTINE,_.xp.PINE,_.xp.BUBBLEGUM,_.xp.YELLOW,_.xp.OVERVIEW,_.xp.REACH,_.xp.REVENUE,_.xp.ENGAGEMENT];_.A0f=[_.xp.OVERVIEW,[].includes("color_blind_comparison")?_.xp.APRICOT:_.xp.AUDIENCE];_.B0f=_.z0f.length;_.C0f=_.xp.TEXT_PRIMARY;
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

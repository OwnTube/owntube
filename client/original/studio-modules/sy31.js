"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.XLg=function(a,b){var c=_.EAe.getSessionStorage(),e=_.EAe.getLocalStorage();if(!c&&!e||!window.JSON)return null;try{var g=c?c.get(a):void 0}catch(k){}if(typeof g!=="string")try{g=e?e.get(a):void 0}catch(k){}if(typeof g!=="string")return null;try{g=JSON.parse(g,b)}catch(k){}return g};
_.ZLg=function(a,b){(a=_.YLg(a))&&((_.D("enable_mini_app_command_handler_mweb_fix")?0:b)?_.Zmb(a,{},!1):_.ne().resolve(_.ao).resolveCommand(a))};
_.YLg=function(a){return _.Qe(a,_.Ph)};
_.aMg=function(a,b,c){var e=_.Qe(_.Qe(a,_.Ph),_.$Lg);e&&(b&&(e.serializedAdditionalMetadata=_.gb(b)),c&&(e.messageId=c),_.ZLg(a,!0))};_.cMg=function(a){this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows=_.Mb(a,void 0,void 0)};
_.G(_.cMg,_.$b);_.d=_.cMg.prototype;_.d.getInviteCode=function(){return _.ft(this,1)};
_.d.setInviteCode=function(a){return _.De(this,1,a)};
_.d.clearInviteCode=function(){return _.X(this,1)};
_.d.hasInviteCode=function(){return _.uu(this,1)};
_.d.getInviteCodeOrUndefined=function(){return _.Xs(this,1,void 0)};
_.d.getHighScore=function(){return _.ft(this,2)};
_.d.setHighScore=function(a){return _.De(this,2,a)};
_.d.clearHighScore=function(){return _.X(this,2)};
_.d.hasHighScore=function(){return _.uu(this,2)};
_.d.getHighScoreOrUndefined=function(){return _.Xs(this,2,void 0)};_.dMg=[0,_.Lu,-1];_.cMg.prototype.serializeBinary=_.Ac(_.dMg);_.cMg.prototype.toObject=function(){if(this!=null){_.zc(this);var a={inviteCode:_.q(_.Yc(this,1)),highScore:_.q(_.Yc(this,2))}}else a=void 0;return a};_.$Lg=new _.Nv("postWebToNativeMessageCommand");new CustomEvent("iframeLoadedForTesting");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.NMg=function(a,b){var c=_.hBe.getSessionStorage(),e=_.hBe.getLocalStorage();if(!c&&!e||!window.JSON)return null;try{var g=c?c.get(a):void 0}catch(k){}if(typeof g!=="string")try{g=e?e.get(a):void 0}catch(k){}if(typeof g!=="string")return null;try{g=JSON.parse(g,b)}catch(k){}return g};
_.PMg=function(a,b){(a=_.OMg(a))&&((_.D("enable_mini_app_command_handler_mweb_fix")?0:b)?_.inb(a,{},!1):_.qe().resolve(_.co).resolveCommand(a))};
_.OMg=function(a){return _.bf(a,_.Rh)};
_.RMg=function(a,b,c){var e=_.bf(_.bf(a,_.Rh),_.QMg);e&&(b&&(e.serializedAdditionalMetadata=_.lb(b)),c&&(e.messageId=c),_.PMg(a,!0))};_.TMg=function(a){this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows=_.Pb(a,void 0,void 0)};
_.G(_.TMg,_.cc);_.d=_.TMg.prototype;_.d.getInviteCode=function(){return _.gt(this,1)};
_.d.setInviteCode=function(a){return _.Ie(this,1,a)};
_.d.clearInviteCode=function(){return _.X(this,1)};
_.d.hasInviteCode=function(){return _.tu(this,1)};
_.d.getInviteCodeOrUndefined=function(){return _.Ys(this,1,void 0)};
_.d.getHighScore=function(){return _.gt(this,2)};
_.d.setHighScore=function(a){return _.Ie(this,2,a)};
_.d.clearHighScore=function(){return _.X(this,2)};
_.d.hasHighScore=function(){return _.tu(this,2)};
_.d.getHighScoreOrUndefined=function(){return _.Ys(this,2,void 0)};_.UMg=[0,_.Ku,-1];_.TMg.prototype.serializeBinary=_.Dc(_.UMg);_.TMg.prototype.toObject=function(){if(this!=null){_.Bc(this);var a={inviteCode:_.q(_.ed(this,1)),highScore:_.q(_.ed(this,2))}}else a=void 0;return a};_.QMg=new _.Mv("postWebToNativeMessageCommand");new CustomEvent("iframeLoadedForTesting");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.lVf=function(a,b,c,e,g,k){a=_.hn(e,"ARTIST",a,{},{c:b,u:0}).routeLink;_.kVf(a,c,e,g,k)};
_.kVf=function(a,b,c,e,g){(e==null?void 0:e.accountSwitchConfirmationDialogWebState)!=="DISPLAY_STATE_SHOWN"?g({type:"ARTIST_ROSTER_ACCOUNT_SWITCH_CONFIRMATION_DIALOG_OPEN",payload:{artistName:b,targetRouteLink:a}}):_.D("enable_account_switch_without_page_reload")?c.navigateToRoute(a.route.name,a.route.params):_.ki(a==null?void 0:a.url)};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

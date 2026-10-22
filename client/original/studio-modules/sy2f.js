"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var NGg,OGg,PGg,MGg;NGg=function(a,b,c){return new _.LGg(new MGg(a,c),b)};
OGg=function(a,b){return a.shareTargets?Object.assign({},a,{shareTargets:a.shareTargets.filter(function(c){return c.shareTargetRenderer&&c.shareTargetRenderer.serviceName&&!b.has(c.shareTargetRenderer.serviceName)})}):a};
_.QGg=function(a){a=PGg(a);a=_.f(a);var b=a.next();try{for(;!b.done;b=a.next()){var c=b.value.thirdPartyNetworkSection;if(c){if(c.shareTargets)return{shareTargets:c.shareTargets};var e=c.shareTargetContainer;if(e&&e.thirdPartyShareTargetSectionRenderer)return e.thirdPartyShareTargetSectionRenderer}}}finally{_.h(a,b)}};
PGg=function(a){if(!a.actions)return[];a=a.actions.find(function(b){return!!_.Qe(b,_.Sh)});
return a&&_.Qe(a,_.Sh)?(a=_.Qe(a,_.Sh).popup)&&a.unifiedSharePanelRenderer?a.unifiedSharePanelRenderer.contents||[]:[]:[]};
MGg=function(a,b,c){c=c===void 0?null:c;this.gapiVersion=a;this.$apiClient=new _.Fy(b,c)};
MGg.prototype.get_sharing_provider_data=function(a){return _.Gy(this.$apiClient,{body:a,httpMethod:"POST",methodId:"youtubei.share.get_sharing_provider_data",path:"/"+this.gapiVersion+"/share/get_sharing_provider_data"})};
MGg.prototype.get_web_player_share_panel=function(a){return _.Gy(this.$apiClient,{body:a,httpMethod:"POST",methodId:"youtubei.share.get_web_player_share_panel",path:"/"+this.gapiVersion+"/share/get_web_player_share_panel"})};
MGg.prototype.submit_share_engagement=function(a){return _.Gy(this.$apiClient,{body:a,httpMethod:"POST",methodId:"youtubei.share.submit_share_engagement",path:"/"+this.gapiVersion+"/share/submit_share_engagement"})};_.LGg=function(a,b){this.shareApi=a;this.baseContextFactory=b};
_.RGg=function(a,b){b={context:a.baseContextFactory(),serializedSharedEntity:b};a=a.shareApi;return _.Gy(a.$apiClient,{body:b,httpMethod:"POST",methodId:"youtubei.share.get_share_panel",path:"/"+a.gapiVersion+"/share/get_share_panel"})};
_.Di([{provide:_.LGg,useFactory:NGg,deps:[_.Yz,_.Zz,_.$z]}]);var SGg;var TGg=_.Zr(["The endpoint is not supported: ",""]),UGg=_.Zr(["The endpoint doesn't contain url: ",""]),VGg=function(){return _.P.apply(this,arguments)||this};
_.G(VGg,_.P);_.d=VGg.prototype;
_.d.getThirdPartyShareRendererData=function(){var a=this;_.RGg(this.sharingService,this.serializedSharedEntity).then(function(b){var c=(c=_.QGg(b))?OGg(c,new Set(["embed"])):void 0;a.thirdPartyShareRendererData=c;a:{b=PGg(b);b=_.f(b);c=b.next();try{for(;!c.done;c=b.next()){var e=c.value.thirdPartyNetworkSection;if(e){var g=_.Qe(e.copyLinkContainer,_.Hoe);if(g){var k=g.shortUrl;break a}}}}finally{_.h(b,c)}k=void 0}a.shareUrl=k}).catch(function(b){_.pi("GetSharePanel",b)})};
_.d.updateOpen=function(){this.isOpen!==void 0&&(this.isOpen?this.open():this.close())};
_.d.open=function(){this.getThirdPartyShareRendererData();this.dialog.open()};
_.d.close=function(){this.dialog.close()};
_.d.onClose=function(){this.close()};
_.d.onShareUrlInputTap=function(){this.shareUrlInput.select()};
_.d.onCopy=function(){a:{var a=this.shareUrlInput;a.select();try{document.execCommand("copy")}catch(c){var b=!1;break a}finally{a.setSelectionRange(0,0)}b=!0}b&&this.toastManager.enqueue({text:_.ck()})};
_.d.onYtNavigate=function(a){var b=_.Qe(a.detail.endpoint,_.qf);b?b.url?(_.ji(b.url),this.dialog.focus()):(a=JSON.stringify(a.detail.endpoint),_.ki(_.mi(UGg,a))):(a=JSON.stringify(a.detail.endpoint),_.ki(_.mi(TGg,a)))};
VGg.prototype.updateOpen=VGg.prototype.updateOpen;_.U([_.Q(),_.V("design:type",_.LGg)],VGg.prototype,"sharingService",void 0);_.U([_.Q(),_.V("design:type",_.Kq)],VGg.prototype,"toastManager",void 0);_.U([_.N(),_.V("design:type",Boolean)],VGg.prototype,"isOpen",void 0);_.U([_.N(),_.V("design:type",String)],VGg.prototype,"serializedSharedEntity",void 0);_.U([_.vi("#dialog"),_.V("design:type",Object)],VGg.prototype,"dialog",void 0);
_.U([_.vi("#share-url-input"),_.V("design:type",HTMLInputElement)],VGg.prototype,"shareUrlInput",void 0);_.U([_.ui("isOpen"),_.V("design:type",Function),_.V("design:paramtypes",[]),_.V("design:returntype",void 0)],VGg.prototype,"updateOpen",null);
_.rj()(VGg,"ytcp-item-share-dialog",function(){if(SGg===void 0){var a=document.createElement("template");_.dg(a,'\x3c!--css-build:shady--\x3e\x3c!--css_build_scope:ytcp-item-share-dialog--\x3e<ytcp-dialog id="dialog" aria-labelledby="item-share-dialog-title" max-width="512" min-width="512" modal="" no-shrinking="" class="style-scope ytcp-item-share-dialog"><h1 id="item-share-dialog-title" slot="primary-header" class="style-scope ytcp-item-share-dialog">Share on social</h1><div slot="content" class="style-scope ytcp-item-share-dialog"><template is="dom-if" restamp="" if="[[thirdPartyShareRendererData]]" class="style-scope ytcp-item-share-dialog"><yt-third-party-share-target-section-renderer class="disable-default-icon-color style-scope ytcp-item-share-dialog" data="[[thirdPartyShareRendererData]]" new-state="" on-yt-navigate="onYtNavigate"></yt-third-party-share-target-section-renderer></template><div class="url-container style-scope ytcp-item-share-dialog"><input id="share-url-input" readonly="" type="text" value="[[shareUrl]]" on-tap="onShareUrlInputTap" class="style-scope ytcp-item-share-dialog"><ytcp-button id="copy-button" label="Copy" on-tap="onCopy" class="style-scope ytcp-item-share-dialog"></ytcp-button></div></div><ytcp-button id="close-button" slot="secondary-footer" label="Close" on-tap="onClose" class="style-scope ytcp-item-share-dialog"></ytcp-button></ytcp-dialog>');SGg=
a}a=SGg;return a},{allowedProps:["serializedSharedEntity",
"isOpen"],mode:1});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

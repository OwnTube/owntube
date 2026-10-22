"use strict";_F_installCss(".ytCountDownHost{display:inline-block;font-family:Roboto,Arial,sans-serif;font-size:2rem;font-variation-settings:\"wdth\" 100;font-weight:700;line-height:2.8rem}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var AUg;_.zUg=function(a,b){return(a=_.oo(a,b))?_.ja(_.la(a)):null};
AUg=new _.Nv("updateToggleAction");var BUg,CUg=function(){return BUg!==void 0?BUg:BUg=document.createElement("template")};
document.head.appendChild(CUg().content);var DUg,EUg=function(){return DUg!==void 0?DUg:DUg=document.createElement("template")};
document.head.appendChild(EUg().content);var FUg;var GUg,HUg=function(){return GUg!==void 0?GUg:GUg=document.createElement("template")};
document.head.appendChild(HUg().content);var IUg;var JUg=document.head,KUg=JUg.appendChild,LUg;if(IUg===void 0){var MUg=document.createElement("template");_.dg(MUg,"\x3c!--css-build:shady--\x3e");MUg.content.insertBefore(HUg().content.cloneNode(!0),MUg.content.firstChild);IUg=MUg}LUg=IUg;KUg.call(JUg,LUg.content);var NUg=document.head,OUg=NUg.appendChild,PUg;if(FUg===void 0){var QUg=document.createElement("template");_.dg(QUg,"\x3c!--css-build:shady--\x3e");QUg.content.insertBefore(EUg().content.cloneNode(!0),QUg.content.firstChild);QUg.content.insertBefore(CUg().content.cloneNode(!0),QUg.content.firstChild);FUg=QUg}PUg=FUg;OUg.call(NUg,PUg.content);var pL=function(){return _.xi.apply(this,arguments)||this};
_.G(pL,_.xi);_.d=pL.prototype;_.d.bindIf=function(a,b,c){return a?b:c};
_.d.bindIfDefined=function(a,b){return a!==void 0?a:b};
_.d.booleanString=function(a){return(!!a).toString()};
_.d.equals=function(){for(var a=_.ba.apply(0,arguments),b=a[0],c=1;c<a.length;c++)if(b!=a[c])return!1;return!0};
_.d.isGreaterThan=function(a,b){return a>b};
_.d.isLessThan=function(a,b){return a<b};
_.d.logicalAND=function(){for(var a=_.ba.apply(0,arguments),b=!!a[0],c=1;c<a.length;c++)b=b&&!!a[c];return b};
_.d.logicalOR=function(){for(var a=_.ba.apply(0,arguments),b=!!a[0],c=1;c<a.length;c++)b=b||!!a[c];return b};
_.d.toBool=function(a){return!!a};
pL.prototype.toBool=pL.prototype.toBool;pL.prototype.logicalOR=pL.prototype.logicalOR;pL.prototype.logicalAND=pL.prototype.logicalAND;pL.prototype.isLessThan=pL.prototype.isLessThan;pL.prototype.isGreaterThan=pL.prototype.isGreaterThan;pL.prototype.equals=pL.prototype.equals;pL.prototype.booleanString=pL.prototype.booleanString;pL.prototype.bindIfDefined=pL.prototype.bindIfDefined;pL.prototype.bindIf=pL.prototype.bindIf;_.U([_.yi()],pL);_.RUg=[pL.prototype];_.Wn(_.Ri(function(a){function b(){c().seconds&&k(_.hVa({seconds:Number(c().seconds)-Date.now()/1E3}))}
var c=a.targetTimestamp;a=a.className;var e=_.f(_.xd("",void 0,"U1Q8Ae",function(){})),g=e.next().value,k=e.next().value;
_.Td(function(){b();var l=setInterval(function(){b()},1E3);
_.wd(function(){clearInterval(l)})},"Qh");
return _.y("yt-countdown",{class:_.Un("ytCountDownHost",a)},_.y("div",null,g))},"Rh"),"yt-countdown",{props:{targetTimestamp:_.FA,
className:_.Vn}});var SUg;var TUg;_.Xq("itemSectionRenderer","toggleFormFieldRenderer","yt-toggle-form-field-renderer");var UUg=function(){var a=_.P.apply(this,arguments)||this;a.actionMap={"yt-update-toggle-action":"handleUpdateToggleAction_"};return a};
_.G(UUg,_.P);_.d=UUg.prototype;_.d.configureRendererStamper=function(){return{"data.footer":{id:"footer-container",mapping:{copyLinkRenderer:"yt-copy-link-renderer"}}}};
_.d.attached=function(){this.keyboardFocused=!1};
_.d.onToggleButtonFocusin_=function(){if(this.useKeyboardFocused){var a=_.ne().resolve(_.ke(_.PA));a&&(this.keyboardFocused=a.keyboardInUse)}};
_.d.onToggleButtonFocusout_=function(){this.keyboardFocused=!1};
_.d.computeDescription_=function(){if(this.data){if(this.data.toggled&&this.data.toggledDescription)return this.data.toggledDescription;if(!this.data.toggled&&this.data.description)return this.data.description}};
_.d.onChange_=function(){if(this.data){var a=this.data.toggled?this.data.toggleOnAction:this.data.toggleOffAction;a&&_.Pq(a,this.hostElement);this.data.requireChangeConfirmation&&this.set("data.toggled",!this.data.toggled)}};
_.d.handleUpdateToggleAction_=function(a){(a=_.Qe(a,AUg))&&this.data&&a.targetId==this.data.targetId&&this.set("data.toggled",a.toggled)};
_.d.toBoolean_=function(a){return!!a};
_.d.reset=function(){};
_.d.dataChangedForBinding=function(){this.hostElement.dispatchEvent(new _.WA("data-changed",this.data))};
_.d.updateDataToggledFromBinding=function(a){this.set("data.toggled",a.detail.value)};
UUg.prototype.dataChangedForBinding=UUg.prototype.dataChangedForBinding;_.U([_.si(_.EA.YtActionHandlerBehavior),_.V("design:type",Object)],UUg.prototype,"ytActionHandlerBehavior",void 0);_.U([_.si(_.nD.YtRendererstamperBehavior),_.V("design:type",Object)],UUg.prototype,"ytRendererstamperBehavior",void 0);_.U([_.si(_.ZA.YtComponentBehavior),_.V("design:type",Object)],UUg.prototype,"ytComponentBehavior",void 0);
_.U([_.si(_.$A.YtRendererBehavior),_.V("design:type",Object)],UUg.prototype,"ytRendererBehavior",void 0);_.U([_.N(),_.V("design:type",Object)],UUg.prototype,"data",void 0);_.U([_.N({computed:"computeDescription_(data.*)"}),_.V("design:type",Object)],UUg.prototype,"description_",void 0);_.U([_.N({value:function(){return!!_.ne().resolve(_.ke(_.PA))&&_.D("kevlar_keyboard_button_focus")},
reflectToAttribute:!0}),_.V("design:type",Boolean)],UUg.prototype,"useKeyboardFocused",void 0);_.U([_.N({value:!1,reflectToAttribute:!0}),_.V("design:type",Boolean)],UUg.prototype,"keyboardFocused",void 0);_.U([_.ui("data"),_.V("design:type",Function),_.V("design:paramtypes",[]),_.V("design:returntype",void 0)],UUg.prototype,"dataChangedForBinding",null);_.U([_.Hi({is:"yt-toggle-form-field-renderer",disableElementRegistration:!0})],UUg);
_.Ti(UUg,"yt-toggle-form-field-renderer",function(){if(TUg===void 0){var a=document.createElement("template");_.dg(a,'\x3c!--css-build:shady--\x3e\x3c!--css_build_scope:yt-toggle-form-field-renderer--\x3e\x3c!--css_build_styles:video.youtube.src.web.polymer.shared.ui.styles.yt_base_styles.yt.base.styles.css.js,video.youtube.src.web.polymer.shared.ui.renderers.playlist.yt_toggle_form_field_renderer.yt.toggle.form.field.renderer.css.js--\x3e<div id="toggle-container" class="style-scope yt-toggle-form-field-renderer">\n  <div id="caption" class="style-scope yt-toggle-form-field-renderer">[[getSimpleString(data.label)]]</div>\n  <tp-yt-paper-toggle-button id="input" checked="[[data.toggled]]" disabled="[[toBoolean_(data.isDisabled)]]" noink="" on-change="onChange_" on-checked-changed="updateDataToggledFromBinding" on-focusin="onToggleButtonFocusin_" on-focusout="onToggleButtonFocusout_" class="style-scope yt-toggle-form-field-renderer">\n  </tp-yt-paper-toggle-button>\n</div>\n<yt-formatted-string id="description" hidden="[[!description_]]" text="[[description_]]" class="style-scope yt-toggle-form-field-renderer">\n</yt-formatted-string>\n<div id="footer-container" class="style-scope yt-toggle-form-field-renderer"></div>\n');
a.content.insertBefore(_.Bz().content.cloneNode(!0),a.content.firstChild);var b=a.content,c=b.insertBefore;SUg===void 0&&(SUg=document.createElement("template"));var e=SUg;c.call(b,e.content.cloneNode(!0),a.content.firstChild);TUg=a}a=TUg;return a},{mode:2});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

"use strict";_F_installCss(".ytCountDownHost{display:inline-block;font-family:Roboto,Arial,sans-serif;font-size:2rem;font-variation-settings:\"wdth\" 100;font-weight:700;line-height:2.8rem}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var qVg;_.pVg=function(a,b){return(a=_.qo(a,b))?_.ja(_.la(a)):null};
qVg=new _.Mv("updateToggleAction");var rVg,sVg=function(){return rVg!==void 0?rVg:rVg=document.createElement("template")};
document.head.appendChild(sVg().content);var tVg,uVg=function(){return tVg!==void 0?tVg:tVg=document.createElement("template")};
document.head.appendChild(uVg().content);var vVg;var wVg,xVg=function(){return wVg!==void 0?wVg:wVg=document.createElement("template")};
document.head.appendChild(xVg().content);var yVg;var zVg=document.head,AVg=zVg.appendChild,BVg;if(yVg===void 0){var CVg=document.createElement("template");_.fg(CVg,"\x3c!--css-build:shady--\x3e");CVg.content.insertBefore(xVg().content.cloneNode(!0),CVg.content.firstChild);yVg=CVg}BVg=yVg;AVg.call(zVg,BVg.content);var DVg=document.head,EVg=DVg.appendChild,FVg;if(vVg===void 0){var GVg=document.createElement("template");_.fg(GVg,"\x3c!--css-build:shady--\x3e");GVg.content.insertBefore(uVg().content.cloneNode(!0),GVg.content.firstChild);GVg.content.insertBefore(sVg().content.cloneNode(!0),GVg.content.firstChild);vVg=GVg}FVg=vVg;EVg.call(DVg,FVg.content);var oL=function(){return _.Bi.apply(this,arguments)||this};
_.G(oL,_.Bi);_.d=oL.prototype;_.d.bindIf=function(a,b,c){return a?b:c};
_.d.bindIfDefined=function(a,b){return a!==void 0?a:b};
_.d.booleanString=function(a){return(!!a).toString()};
_.d.equals=function(){for(var a=_.ca.apply(0,arguments),b=a[0],c=1;c<a.length;c++)if(b!=a[c])return!1;return!0};
_.d.isGreaterThan=function(a,b){return a>b};
_.d.isLessThan=function(a,b){return a<b};
_.d.logicalAND=function(){for(var a=_.ca.apply(0,arguments),b=!!a[0],c=1;c<a.length;c++)b=b&&!!a[c];return b};
_.d.logicalOR=function(){for(var a=_.ca.apply(0,arguments),b=!!a[0],c=1;c<a.length;c++)b=b||!!a[c];return b};
_.d.toBool=function(a){return!!a};
oL.prototype.toBool=oL.prototype.toBool;oL.prototype.logicalOR=oL.prototype.logicalOR;oL.prototype.logicalAND=oL.prototype.logicalAND;oL.prototype.isLessThan=oL.prototype.isLessThan;oL.prototype.isGreaterThan=oL.prototype.isGreaterThan;oL.prototype.equals=oL.prototype.equals;oL.prototype.booleanString=oL.prototype.booleanString;oL.prototype.bindIfDefined=oL.prototype.bindIfDefined;oL.prototype.bindIf=oL.prototype.bindIf;_.U([_.Ci()],oL);_.HVg=[oL.prototype];_.Yn(_.Ui(function(a){function b(){c().seconds&&k(_.rVa({seconds:Number(c().seconds)-Date.now()/1E3}))}
var c=a.targetTimestamp;a=a.className;var e=_.f(_.zd("",void 0,"U1Q8Ae",function(){})),g=e.next().value,k=e.next().value;
_.Vd(function(){b();var l=setInterval(function(){b()},1E3);
_.yd(function(){clearInterval(l)})},"Qh");
return _.y("yt-countdown",{class:_.Wn("ytCountDownHost",a)},_.y("div",null,g))},"Rh"),"yt-countdown",{props:{targetTimestamp:_.GA,
className:_.Xn}});var IVg;var JVg;_.$q("itemSectionRenderer","toggleFormFieldRenderer","yt-toggle-form-field-renderer");var KVg=function(){var a=_.P.apply(this,arguments)||this;a.actionMap={"yt-update-toggle-action":"handleUpdateToggleAction_"};return a};
_.G(KVg,_.P);_.d=KVg.prototype;_.d.configureRendererStamper=function(){return{"data.footer":{id:"footer-container",mapping:{copyLinkRenderer:"yt-copy-link-renderer"}}}};
_.d.attached=function(){this.keyboardFocused=!1};
_.d.onToggleButtonFocusin_=function(){if(this.useKeyboardFocused){var a=_.qe().resolve(_.oe(_.QA));a&&(this.keyboardFocused=a.keyboardInUse)}};
_.d.onToggleButtonFocusout_=function(){this.keyboardFocused=!1};
_.d.computeDescription_=function(){if(this.data){if(this.data.toggled&&this.data.toggledDescription)return this.data.toggledDescription;if(!this.data.toggled&&this.data.description)return this.data.description}};
_.d.onChange_=function(){if(this.data){var a=this.data.toggled?this.data.toggleOnAction:this.data.toggleOffAction;a&&_.Sq(a,this.hostElement);this.data.requireChangeConfirmation&&this.set("data.toggled",!this.data.toggled)}};
_.d.handleUpdateToggleAction_=function(a){(a=_.bf(a,qVg))&&this.data&&a.targetId==this.data.targetId&&this.set("data.toggled",a.toggled)};
_.d.toBoolean_=function(a){return!!a};
_.d.reset=function(){};
_.d.dataChangedForBinding=function(){this.hostElement.dispatchEvent(new _.XA("data-changed",this.data))};
_.d.updateDataToggledFromBinding=function(a){this.set("data.toggled",a.detail.value)};
KVg.prototype.dataChangedForBinding=KVg.prototype.dataChangedForBinding;_.U([_.vi(_.FA.YtActionHandlerBehavior),_.V("design:type",Object)],KVg.prototype,"ytActionHandlerBehavior",void 0);_.U([_.vi(_.oD.YtRendererstamperBehavior),_.V("design:type",Object)],KVg.prototype,"ytRendererstamperBehavior",void 0);_.U([_.vi(_.$A.YtComponentBehavior),_.V("design:type",Object)],KVg.prototype,"ytComponentBehavior",void 0);
_.U([_.vi(_.aB.YtRendererBehavior),_.V("design:type",Object)],KVg.prototype,"ytRendererBehavior",void 0);_.U([_.N(),_.V("design:type",Object)],KVg.prototype,"data",void 0);_.U([_.N({computed:"computeDescription_(data.*)"}),_.V("design:type",Object)],KVg.prototype,"description_",void 0);_.U([_.N({value:function(){return!!_.qe().resolve(_.oe(_.QA))&&_.D("kevlar_keyboard_button_focus")},
reflectToAttribute:!0}),_.V("design:type",Boolean)],KVg.prototype,"useKeyboardFocused",void 0);_.U([_.N({value:!1,reflectToAttribute:!0}),_.V("design:type",Boolean)],KVg.prototype,"keyboardFocused",void 0);_.U([_.xi("data"),_.V("design:type",Function),_.V("design:paramtypes",[]),_.V("design:returntype",void 0)],KVg.prototype,"dataChangedForBinding",null);_.U([_.Ki({is:"yt-toggle-form-field-renderer",disableElementRegistration:!0})],KVg);
_.Wi(KVg,"yt-toggle-form-field-renderer",function(){if(JVg===void 0){var a=document.createElement("template");_.fg(a,'\x3c!--css-build:shady--\x3e\x3c!--css_build_scope:yt-toggle-form-field-renderer--\x3e\x3c!--css_build_styles:video.youtube.src.web.polymer.shared.ui.styles.yt_base_styles.yt.base.styles.css.js,video.youtube.src.web.polymer.shared.ui.renderers.playlist.yt_toggle_form_field_renderer.yt.toggle.form.field.renderer.css.js--\x3e<div id="toggle-container" class="style-scope yt-toggle-form-field-renderer">\n  <div id="caption" class="style-scope yt-toggle-form-field-renderer">[[getSimpleString(data.label)]]</div>\n  <tp-yt-paper-toggle-button id="input" checked="[[data.toggled]]" disabled="[[toBoolean_(data.isDisabled)]]" noink="" on-change="onChange_" on-checked-changed="updateDataToggledFromBinding" on-focusin="onToggleButtonFocusin_" on-focusout="onToggleButtonFocusout_" class="style-scope yt-toggle-form-field-renderer">\n  </tp-yt-paper-toggle-button>\n</div>\n<yt-formatted-string id="description" hidden="[[!description_]]" text="[[description_]]" class="style-scope yt-toggle-form-field-renderer">\n</yt-formatted-string>\n<div id="footer-container" class="style-scope yt-toggle-form-field-renderer"></div>\n');
a.content.insertBefore(_.Cz().content.cloneNode(!0),a.content.firstChild);var b=a.content,c=b.insertBefore;IVg===void 0&&(IVg=document.createElement("template"));var e=IVg;c.call(b,e.content.cloneNode(!0),a.content.firstChild);JVg=a}a=JVg;return a},{mode:2});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

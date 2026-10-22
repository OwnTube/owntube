"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var Ayg;_.zyg=function(a){return"Select "+String(a.entityName)};var Byg=function(){var a=_.P.apply(this,arguments)||this;a.positionTarget="trigger";a.backdropStrategy="TRANSPARENT_BACKDROP";a.shouldRenderDialog=!1;a.disabled=!1;a.onTriggerClicked=function(){if(!a.disabled){a.shouldRenderDialog||(a.shouldRenderDialog=!0,_.Dy());var b=_.mg(a.hostElement).querySelector('template[slot="dialog"]');if(b){if(!a.boundDom){var c,e=((c=_.kg(a.hostElement).getRootNode().host)==null?void 0:c.polymerController)||a;a.boundDom=e._stampTemplate(b);a.dialog=a.boundDom.firstElementChild;
a.dialog.addEventListener("iron-overlay-closed",a.cleanupBoundDom);a.popupHostBehavior.hostPopup(a.dialog,a.backdropStrategy)}}else{a.dialog=_.mg(a.hostElement).querySelector('[slot="dialog"]');if(!a.dialog)throw Error("nB");a.dialog.addEventListener("iron-overlay-closed",a.ironOverlayClosedHandler);a.popupHostBehavior.hostPopup(a.dialog,a.backdropStrategy)}a.dialog&&(a.getPositionTarget()&&(a.dialog.positionTarget=a.getPositionTarget()),a.dialog.open())}};
a.cleanupBoundDom=function(){if(a.boundDom){a.boundDom=void 0;var b;(b=a.dialog)==null||b.removeEventListener("iron-overlay-closed",a.ironOverlayClosedHandler);a.dialog=void 0}};
a.ironOverlayClosedHandler=function(){a.dialog&&a.hostElement.appendChild(a.dialog);a.shouldRenderDialog=!1;a.dialog&&(a.dialog.removeEventListener("iron-overlay-closed",a.ironOverlayClosedHandler),a.dialog=void 0)};
a.initializeTrigger=function(){a.trigger=_.mg(a.hostElement).querySelector('[slot="trigger"]');if(!a.trigger)throw Error("oB");a.trigger.addEventListener("tap",a.onTriggerClicked)};
a.testOnly={openDialog:function(){a.trigger||(_.L3a(a.initializeTrigger),a.initializeTrigger());a.onTriggerClicked();return a.dialog},
fireEventFromDialog:function(b,c,e){if(!a.dialog)throw Error("pB");a.dialog.fire(b,c,e)}};
return a};
_.G(Byg,_.P);Byg.prototype.attached=function(){_.ij(this.initializeTrigger)};
Byg.prototype.detached=function(){this.cleanupBoundDom();this.trigger&&this.trigger.removeEventListener("tap",this.onTriggerClicked)};
Byg.prototype.getPositionTarget=function(){return this.positionTarget==="trigger"?this.trigger:this.positionTarget};
_.U([_.si(),_.V("design:type",_.qB)],Byg.prototype,"popupHostBehavior",void 0);_.U([_.N(),_.V("design:type",Object)],Byg.prototype,"positionTarget",void 0);_.U([_.N(),_.V("design:type",String)],Byg.prototype,"backdropStrategy",void 0);_.U([_.N(),_.V("design:type",Object)],Byg.prototype,"shouldRenderDialog",void 0);_.U([_.N(),_.V("design:type",Object)],Byg.prototype,"disabled",void 0);
_.rj()(Byg,"ytcp-dialog-trigger",function(){if(Ayg===void 0){var a=document.createElement("template");_.dg(a,'\x3c!--css-build:shady--\x3e\x3c!--css_build_scope:ytcp-dialog-trigger--\x3e<slot name="trigger" class="style-scope ytcp-dialog-trigger"></slot><template is="dom-if" restamp="" if="[[shouldRenderDialog]]" class="style-scope ytcp-dialog-trigger"><slot name="dialog" class="style-scope ytcp-dialog-trigger"></slot></template>');Ayg=a}a=Ayg;return a},{slotProps:["trigger",
"dialog"],allowedProps:["backdropStrategy","disabled"],mode:2});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

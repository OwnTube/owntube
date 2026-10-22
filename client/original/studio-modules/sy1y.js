"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var nzg;_.mzg=function(a){return"Select "+String(a.entityName)};var ozg=function(){var a=_.P.apply(this,arguments)||this;a.positionTarget="trigger";a.backdropStrategy="TRANSPARENT_BACKDROP";a.shouldRenderDialog=!1;a.disabled=!1;a.onTriggerClicked=function(){if(!a.disabled){a.shouldRenderDialog||(a.shouldRenderDialog=!0,_.Ey());var b=_.ng(a.hostElement).querySelector('template[slot="dialog"]');if(b){if(!a.boundDom){var c,e=((c=_.mg(a.hostElement).getRootNode().host)==null?void 0:c.polymerController)||a;a.boundDom=e._stampTemplate(b);a.dialog=a.boundDom.firstElementChild;
a.dialog.addEventListener("iron-overlay-closed",a.cleanupBoundDom);a.popupHostBehavior.hostPopup(a.dialog,a.backdropStrategy)}}else{a.dialog=_.ng(a.hostElement).querySelector('[slot="dialog"]');if(!a.dialog)throw Error("sB");a.dialog.addEventListener("iron-overlay-closed",a.ironOverlayClosedHandler);a.popupHostBehavior.hostPopup(a.dialog,a.backdropStrategy)}a.dialog&&(a.getPositionTarget()&&(a.dialog.positionTarget=a.getPositionTarget()),a.dialog.open())}};
a.cleanupBoundDom=function(){if(a.boundDom){a.boundDom=void 0;var b;(b=a.dialog)==null||b.removeEventListener("iron-overlay-closed",a.ironOverlayClosedHandler);a.dialog=void 0}};
a.ironOverlayClosedHandler=function(){a.dialog&&a.hostElement.appendChild(a.dialog);a.shouldRenderDialog=!1;a.dialog&&(a.dialog.removeEventListener("iron-overlay-closed",a.ironOverlayClosedHandler),a.dialog=void 0)};
a.initializeTrigger=function(){a.trigger=_.ng(a.hostElement).querySelector('[slot="trigger"]');if(!a.trigger)throw Error("tB");a.trigger.addEventListener("tap",a.onTriggerClicked)};
a.testOnly={openDialog:function(){a.trigger||(_.W3a(a.initializeTrigger),a.initializeTrigger());a.onTriggerClicked();return a.dialog},
fireEventFromDialog:function(b,c,e){if(!a.dialog)throw Error("uB");a.dialog.fire(b,c,e)}};
return a};
_.G(ozg,_.P);ozg.prototype.attached=function(){_.kj(this.initializeTrigger)};
ozg.prototype.detached=function(){this.cleanupBoundDom();this.trigger&&this.trigger.removeEventListener("tap",this.onTriggerClicked)};
ozg.prototype.getPositionTarget=function(){return this.positionTarget==="trigger"?this.trigger:this.positionTarget};
_.U([_.vi(),_.V("design:type",_.sB)],ozg.prototype,"popupHostBehavior",void 0);_.U([_.N(),_.V("design:type",Object)],ozg.prototype,"positionTarget",void 0);_.U([_.N(),_.V("design:type",String)],ozg.prototype,"backdropStrategy",void 0);_.U([_.N(),_.V("design:type",Object)],ozg.prototype,"shouldRenderDialog",void 0);_.U([_.N(),_.V("design:type",Object)],ozg.prototype,"disabled",void 0);
_.uj()(ozg,"ytcp-dialog-trigger",function(){if(nzg===void 0){var a=document.createElement("template");_.fg(a,'\x3c!--css-build:shady--\x3e\x3c!--css_build_scope:ytcp-dialog-trigger--\x3e<slot name="trigger" class="style-scope ytcp-dialog-trigger"></slot><template is="dom-if" restamp="" if="[[shouldRenderDialog]]" class="style-scope ytcp-dialog-trigger"><slot name="dialog" class="style-scope ytcp-dialog-trigger"></slot></template>');nzg=a}a=nzg;return a},{slotProps:["trigger",
"dialog"],allowedProps:["backdropStrategy","disabled"],mode:2});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var Dej,Eej;_.zej=function(){return"I have the necessary rights to claim other videos that contain this content."};
_.Aej=function(){return"Are you sure?"};
_.Bej=function(a){return"Please type '"+String(a.total)+"' to confirm"};
_.Cej=function(){return"I understand the implications of this action"};
Eej=function(){if(Dej!==void 0)return Dej;var a=document.createElement("template");_.fg(a,'\x3c!--css-build:shady--\x3e\x3c!--css_build_scope:ytcp-bulk-actions-editor-single-option--\x3e<ytcp-form-select field="[[formProxy.selectedOptionId]]" help-tooltip="[[helpTooltip]]" label="[[label]]" options="[[ytcpSelectOptions]]" class="style-scope ytcp-bulk-actions-editor-single-option"></ytcp-form-select>');return Dej=a};var aX=function(){return _.P.apply(this,arguments)||this};
_.G(aX,_.P);_.J.Object.defineProperties(aX.prototype,{ytcpSelectOptions:{configurable:!0,enumerable:!0,get:function(){return this.options?this.options.map(function(a){return{value:a.id,label:a.label}}):[]}}});
aX.prototype.updateForm=function(){if(this.options){if(this.options.length===0)throw Error("CH");this.form={selectedOptionId:_.Pn(this.options[0].id)}}};
aX.prototype.onFormModified=function(a){this.form=_.wg(a,this.form);a.stopPropagation();_.sg(this.hostElement,"YTCP_BULK_ACTIONS_ON_EDITOR_CHANGED")};
_.J.Object.defineProperties(aX.prototype,{formProxy:{configurable:!0,enumerable:!0,get:function(){if(this.form)return _.In(this.form,this)}}});
aX.prototype.validate=function(){return this.form&&_.Kn(this.form)?{isValid:!0,value:this.form.selectedOptionId.value}:{isValid:!1}};
aX.prototype.getCollapsedDescription=function(){if(!this.form)return"";var a=_.f(this.options),b=a.next();try{for(;!b.done;b=a.next()){var c=b.value;if(c.id===this.form.selectedOptionId.value)return c.label}}finally{_.h(a,b)}return""};
_.J.Object.defineProperties(aX,{template:{configurable:!0,enumerable:!0,get:function(){return Eej()}}});
aX.prototype.onFormModified=aX.prototype.onFormModified;aX.prototype.updateForm=aX.prototype.updateForm;_.U([_.N(),_.V("design:type",String)],aX.prototype,"label",void 0);_.U([_.N(),_.V("design:type",Array)],aX.prototype,"options",void 0);_.U([_.N(),_.V("design:type",Object)],aX.prototype,"helpTooltip",void 0);_.U([_.L("options"),_.V("design:type",Array),_.V("design:paramtypes",[])],aX.prototype,"ytcpSelectOptions",null);
_.U([_.Di("options"),_.V("design:type",Function),_.V("design:paramtypes",[]),_.V("design:returntype",void 0)],aX.prototype,"updateForm",null);_.U([_.wi("form-modified"),_.V("design:type",Function),_.V("design:paramtypes",[Object]),_.V("design:returntype",void 0)],aX.prototype,"onFormModified",null);_.U([_.L("form"),_.V("design:type",Object),_.V("design:paramtypes",[])],aX.prototype,"formProxy",null);_.tj(aX,"ytcp-bulk-actions-editor-single-option",Eej,{mode:1});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

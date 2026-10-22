"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var Jdj,Kdj;_.Fdj=function(){return"I have the necessary rights to claim other videos that contain this content."};
_.Gdj=function(){return"Are you sure?"};
_.Hdj=function(a){return"Please type '"+String(a.total)+"' to confirm"};
_.Idj=function(){return"I understand the implications of this action"};
Kdj=function(){if(Jdj!==void 0)return Jdj;var a=document.createElement("template");_.dg(a,'\x3c!--css-build:shady--\x3e\x3c!--css_build_scope:ytcp-bulk-actions-editor-single-option--\x3e<ytcp-form-select field="[[formProxy.selectedOptionId]]" help-tooltip="[[helpTooltip]]" label="[[label]]" options="[[ytcpSelectOptions]]" class="style-scope ytcp-bulk-actions-editor-single-option"></ytcp-form-select>');return Jdj=a};var $W=function(){return _.P.apply(this,arguments)||this};
_.G($W,_.P);_.J.Object.defineProperties($W.prototype,{ytcpSelectOptions:{configurable:!0,enumerable:!0,get:function(){return this.options?this.options.map(function(a){return{value:a.id,label:a.label}}):[]}}});
$W.prototype.updateForm=function(){if(this.options){if(this.options.length===0)throw Error("xH");this.form={selectedOptionId:_.Nn(this.options[0].id)}}};
$W.prototype.onFormModified=function(a){this.form=_.ug(a,this.form);a.stopPropagation();_.qg(this.hostElement,"YTCP_BULK_ACTIONS_ON_EDITOR_CHANGED")};
_.J.Object.defineProperties($W.prototype,{formProxy:{configurable:!0,enumerable:!0,get:function(){if(this.form)return _.Gn(this.form,this)}}});
$W.prototype.validate=function(){return this.form&&_.In(this.form)?{isValid:!0,value:this.form.selectedOptionId.value}:{isValid:!1}};
$W.prototype.getCollapsedDescription=function(){if(!this.form)return"";var a=_.f(this.options),b=a.next();try{for(;!b.done;b=a.next()){var c=b.value;if(c.id===this.form.selectedOptionId.value)return c.label}}finally{_.h(a,b)}return""};
_.J.Object.defineProperties($W,{template:{configurable:!0,enumerable:!0,get:function(){return Kdj()}}});
$W.prototype.onFormModified=$W.prototype.onFormModified;$W.prototype.updateForm=$W.prototype.updateForm;_.U([_.N(),_.V("design:type",String)],$W.prototype,"label",void 0);_.U([_.N(),_.V("design:type",Array)],$W.prototype,"options",void 0);_.U([_.N(),_.V("design:type",Object)],$W.prototype,"helpTooltip",void 0);_.U([_.L("options"),_.V("design:type",Array),_.V("design:paramtypes",[])],$W.prototype,"ytcpSelectOptions",null);
_.U([_.zi("options"),_.V("design:type",Function),_.V("design:paramtypes",[]),_.V("design:returntype",void 0)],$W.prototype,"updateForm",null);_.U([_.ti("form-modified"),_.V("design:type",Function),_.V("design:paramtypes",[Object]),_.V("design:returntype",void 0)],$W.prototype,"onFormModified",null);_.U([_.L("form"),_.V("design:type",Object),_.V("design:paramtypes",[])],$W.prototype,"formProxy",null);_.qj($W,"ytcp-bulk-actions-editor-single-option",Kdj,{mode:1});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

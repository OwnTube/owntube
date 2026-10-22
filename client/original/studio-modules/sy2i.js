"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var VHg;_.UHg=function(){return _.Bn("livestreaming")};var WHg=function(){var a=_.P.apply(this,arguments)||this;a.buttonLabel="Upload videos";a.buttonType="filled";return a};
_.G(WHg,_.P);_.J.Object.defineProperties(WHg.prototype,{isReadOnlyMode:{configurable:!0,enumerable:!0,get:function(){return!this.permissions.canWriteChannel}},
isUploadButtonDisabled:{configurable:!0,enumerable:!0,get:function(){return this.isReadOnlyMode}}});
WHg.prototype.onTap=function(){this.dispatch(_.DA(void 0,void 0,this.preselectedPlaylistId))};
_.U([_.Q(_.Yz),_.V("design:type",Function)],WHg.prototype,"dispatch",void 0);_.U([_.vi(),_.V("design:type",_.OC)],WHg.prototype,"permissions",void 0);_.U([_.N(),_.V("design:type",String)],WHg.prototype,"buttonLabel",void 0);_.U([_.N(),_.V("design:type",Object)],WHg.prototype,"buttonType",void 0);_.U([_.N(),_.V("design:type",String)],WHg.prototype,"preselectedPlaylistId",void 0);_.U([_.L("canWriteChannel"),_.V("design:type",Boolean),_.V("design:paramtypes",[])],WHg.prototype,"isReadOnlyMode",null);
_.U([_.L("isReadOnlyMode"),_.V("design:type",Boolean),_.V("design:paramtypes",[])],WHg.prototype,"isUploadButtonDisabled",null);
_.tj(WHg,"ytcp-upload-video-button",function(){if(VHg!==void 0)return VHg;var a=document.createElement("template");_.fg(a,'\x3c!--css-build:shady--\x3e\x3c!--css_build_scope:ytcp-upload-video-button--\x3e<ytcp-button id="upload-button" disabled="[[isUploadButtonDisabled]]" icon-alignment="end" label="[[buttonLabel]]" type="[[buttonType]]" on-tap="onTap" class="style-scope ytcp-upload-video-button"></ytcp-button>');return VHg=a},{logging:{veType:101672,
trackClick:!0},mode:2});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

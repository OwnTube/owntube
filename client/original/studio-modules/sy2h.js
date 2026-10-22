"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var gHg;_.fHg=function(){return _.zn("livestreaming")};var hHg=function(){var a=_.P.apply(this,arguments)||this;a.buttonLabel="Upload videos";a.buttonType="filled";return a};
_.G(hHg,_.P);_.J.Object.defineProperties(hHg.prototype,{isReadOnlyMode:{configurable:!0,enumerable:!0,get:function(){return!this.permissions.canWriteChannel}},
isUploadButtonDisabled:{configurable:!0,enumerable:!0,get:function(){return this.isReadOnlyMode}}});
hHg.prototype.onTap=function(){this.dispatch(_.CA(void 0,void 0,this.preselectedPlaylistId))};
_.U([_.Q(_.Xz),_.V("design:type",Function)],hHg.prototype,"dispatch",void 0);_.U([_.si(),_.V("design:type",_.NC)],hHg.prototype,"permissions",void 0);_.U([_.N(),_.V("design:type",String)],hHg.prototype,"buttonLabel",void 0);_.U([_.N(),_.V("design:type",Object)],hHg.prototype,"buttonType",void 0);_.U([_.N(),_.V("design:type",String)],hHg.prototype,"preselectedPlaylistId",void 0);_.U([_.L("canWriteChannel"),_.V("design:type",Boolean),_.V("design:paramtypes",[])],hHg.prototype,"isReadOnlyMode",null);
_.U([_.L("isReadOnlyMode"),_.V("design:type",Boolean),_.V("design:paramtypes",[])],hHg.prototype,"isUploadButtonDisabled",null);
_.qj(hHg,"ytcp-upload-video-button",function(){if(gHg!==void 0)return gHg;var a=document.createElement("template");_.dg(a,'\x3c!--css-build:shady--\x3e\x3c!--css_build_scope:ytcp-upload-video-button--\x3e<ytcp-button id="upload-button" disabled="[[isUploadButtonDisabled]]" icon-alignment="end" label="[[buttonLabel]]" type="[[buttonType]]" on-tap="onTap" class="style-scope ytcp-upload-video-button"></ytcp-button>');return gHg=a},{logging:{veType:101672,
trackClick:!0},mode:2});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

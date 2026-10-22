"use strict";_F_installCss(".ytcpPostAttachmentHost{display:flex;flex-direction:column}.ytcpPostAttachmentCenterImageAttachment{margin-left:auto;margin-right:auto}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.oHg=function(a,b){return{type:"COPYRIGHT_STRIKES_DIALOG_OPEN",payload:{copyrightSchool:a===void 0?!1:a,channelTerminationData:b}}};_.pHg=_.Ri(function(a){var b=_.Si(a,{attachment:void 0,centerImage:!1,showImagePreview:!1,largeThumbnail:!1,postVideoData:null}),c=b.attachment,e=b.centerImage,g=b.showImagePreview,k=b.largeThumbnail,l=b.postVideoData;return _.y("ytcp-post-attachment",{class:_.Un("ytcpPostAttachmentHost",a.className)},_.y(_.B,{cond:c,then:function(m){return _.y(_.Nd,null,_.y(_.zd,{when:function(){return m().type==="image"}},function(){var p={};
return _.y("div",{class:_.Un((p.ytcpPostAttachmentCenterImageAttachment=e,p))},_.y(_.Fcf,{imageAttachments:function(){return m().data},
showImagePreview:g,postVideoData:l}))}),_.y(_.zd,{when:function(){return m().type==="poll"}},function(){return _.y(_.m1f,{fullSize:k,
poll:function(){return m().data}})}),_.y(_.zd,{when:function(){return m().type==="quiz"}},function(){return _.y(_.o1f,{fullSize:k,
quiz:function(){return m().data}})}),_.y(_.zd,{when:function(){return m().type==="video"}},function(){return _.y(_.Ycf,{largeThumbnail:k,
videoId:function(){return m().data.videoId}})}),_.y(_.zd,{when:function(){return m().type==="playlist"}},function(){return _.y(_.Pcf,{largeThumbnail:k,
playlistId:function(){return m().data.playlistId}})}))}}))},"sh");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

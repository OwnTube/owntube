"use strict";_F_installCss(".ytcpVideoMetadataRemixSettingsHost{display:block}.ytcpVideoMetadataRemixSettingsRadioButton{display:flex;padding:4px 12px 10px 0;font-family:var(--ytcp-font-subheading-font-family);font-weight:var(--ytcp-font-subheading-font-weight);-webkit-font-smoothing:antialiased;font-size:var(--ytcp-font-subheading-font-size);line-height:var(--ytcp-font-subheading-line-height)}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.Tbj=function(){return _.zn("yt/copyright")};
_.Ubj=function(){return"Language and captions certification"};
_.Vbj=function(){return"Allows people to create Shorts using parts of this video."};
_.Wbj=function(){return"Allow people to sample this content"};
_.Xbj=function(a){var b=[{label:"None",value:"VIDEO_UNCAPTIONED_REASON_UNNECESSARY_OR_NOT_SET"},{label:_.RRi(),value:"VIDEO_UNCAPTIONED_REASON_NO_US_TV_CONTENT"},{label:_.SRi(),value:"VIDEO_UNCAPTIONED_REASON_CAPTIONLESS_TV_CONTENT"},{label:_.TRi(),value:"VIDEO_UNCAPTIONED_REASON_LEGACY"},{label:_.VRi(),value:"VIDEO_UNCAPTIONED_REASON_NOT_REQUIRED"},{label:_.WRi(),value:"VIDEO_UNCAPTIONED_REASON_EXCEPTION_GRANTED"}],c={label:_.URi(),value:"VIDEO_UNCAPTIONED_REASON_NO_FULL_LENGTH_VIDEO"};return(a==
null?void 0:a.uncaptionedReason)==="VIDEO_UNCAPTIONED_REASON_NO_FULL_LENGTH_VIDEO"?[].concat(_.u(b),[c]):b};_.Wn(_.Ri(function(a){var b=_.Si(a,{disabled:!1,optOutHidden:!1,field:void 0,className:""});a=b.className;var c=b.disabled,e=b.optOutHidden,g=b.field;b=_.f(_.Qi(function(){var m,p;return(p=(m=g())==null?void 0:m.value)!=null?p:""}));
var k=b.next().value,l=b.next().value;return _.y("ytcp-video-metadata-remix-settings",{class:_.Un("ytcpVideoMetadataRemixSettingsHost",a)},_.y(_.xS,{selected:k,onIronActivate:function(m){if(m.detail.selected){l(m.detail.selected);var p=g();p&&(p.value=m.detail.selected)}}},_.y(_.LG,{id:"opt-in-radio-button",
className:"ytcpVideoMetadataRemixSettingsRadioButton",disabled:c,name:"REMIX_SOURCE_OPTION_OPT_IN"},_.y(_.kD,{veType:177779,trackClick:!0},_.hSi())),_.y(_.LG,{id:"visual-opt-out-radio-button",className:"ytcpVideoMetadataRemixSettingsRadioButton",disabled:c,name:"REMIX_SOURCE_OPTION_VISUAL_OPT_OUT_AND_PERFORM_ACTIONS"},_.y(_.kD,{veType:177781,trackClick:!0},_.iSi())),_.y(_.B,{cond:function(){return!e()},
then:function(){return _.y(_.LG,{id:"opt-out-radio-button",className:"ytcpVideoMetadataRemixSettingsRadioButton",disabled:c,name:"REMIX_SOURCE_OPTION_OPT_OUT_AND_MUTE_DERIVATIVES"},_.y(_.kD,{veType:177780,trackClick:!0},_.jSi()))}})))},"Yr"),"ytcp-video-metadata-remix-settings",{props:{disabled:_.FA,
optOutHidden:_.FA,field:_.FA,className:_.FA}});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

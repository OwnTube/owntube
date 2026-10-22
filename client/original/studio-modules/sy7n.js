"use strict";_F_installCss(".ytcpVideoMetadataRemixSettingsHost{display:block}.ytcpVideoMetadataRemixSettingsRadioButton{display:flex;padding:4px 12px 10px 0;font-family:var(--ytcp-font-subheading-font-family);font-weight:var(--ytcp-font-subheading-font-weight);-webkit-font-smoothing:antialiased;font-size:var(--ytcp-font-subheading-font-size);line-height:var(--ytcp-font-subheading-line-height)}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.Ncj=function(){return _.Bn("yt/copyright")};
_.Ocj=function(){return"Language and captions certification"};
_.Pcj=function(){return"Allows people to create Shorts using parts of this video."};
_.Qcj=function(){return"Allow people to sample this content"};
_.Rcj=function(a){var b=[{label:"None",value:"VIDEO_UNCAPTIONED_REASON_UNNECESSARY_OR_NOT_SET"},{label:_.KSi(),value:"VIDEO_UNCAPTIONED_REASON_NO_US_TV_CONTENT"},{label:_.LSi(),value:"VIDEO_UNCAPTIONED_REASON_CAPTIONLESS_TV_CONTENT"},{label:_.MSi(),value:"VIDEO_UNCAPTIONED_REASON_LEGACY"},{label:_.OSi(),value:"VIDEO_UNCAPTIONED_REASON_NOT_REQUIRED"},{label:_.PSi(),value:"VIDEO_UNCAPTIONED_REASON_EXCEPTION_GRANTED"}],c={label:_.NSi(),value:"VIDEO_UNCAPTIONED_REASON_NO_FULL_LENGTH_VIDEO"};return(a==
null?void 0:a.uncaptionedReason)==="VIDEO_UNCAPTIONED_REASON_NO_FULL_LENGTH_VIDEO"?[].concat(_.u(b),[c]):b};_.Yn(_.Ui(function(a){var b=_.Vi(a,{disabled:!1,optOutHidden:!1,field:void 0,className:""});a=b.className;var c=b.disabled,e=b.optOutHidden,g=b.field;b=_.f(_.Ti(function(){var m,p;return(p=(m=g())==null?void 0:m.value)!=null?p:""}));
var k=b.next().value,l=b.next().value;return _.y("ytcp-video-metadata-remix-settings",{class:_.Wn("ytcpVideoMetadataRemixSettingsHost",a)},_.y(_.yS,{selected:k,onIronActivate:function(m){if(m.detail.selected){l(m.detail.selected);var p=g();p&&(p.value=m.detail.selected)}}},_.y(_.LG,{id:"opt-in-radio-button",
className:"ytcpVideoMetadataRemixSettingsRadioButton",disabled:c,name:"REMIX_SOURCE_OPTION_OPT_IN"},_.y(_.lD,{veType:177779,trackClick:!0},_.aTi())),_.y(_.LG,{id:"visual-opt-out-radio-button",className:"ytcpVideoMetadataRemixSettingsRadioButton",disabled:c,name:"REMIX_SOURCE_OPTION_VISUAL_OPT_OUT_AND_PERFORM_ACTIONS"},_.y(_.lD,{veType:177781,trackClick:!0},_.bTi())),_.y(_.B,{cond:function(){return!e()},
then:function(){return _.y(_.LG,{id:"opt-out-radio-button",className:"ytcpVideoMetadataRemixSettingsRadioButton",disabled:c,name:"REMIX_SOURCE_OPTION_OPT_OUT_AND_MUTE_DERIVATIVES"},_.y(_.lD,{veType:177780,trackClick:!0},_.cTi()))}})))},"$r"),"ytcp-video-metadata-remix-settings",{props:{disabled:_.GA,
optOutHidden:_.GA,field:_.GA,className:_.GA}});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

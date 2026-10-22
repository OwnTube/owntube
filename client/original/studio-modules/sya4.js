"use strict";_F_installCss(".ytLockupAttachmentsViewModelHost{display:flex;flex:1;flex-direction:column}.ytLockupAttachmentsViewModelInlineAttachment{flex:none}.ytLockupAttachmentsViewModelAttachment{margin-top:12px;min-width:0}.ytLockupAttachmentsViewModelNoTopMargin{margin-top:0}.ytLockupAttachmentsViewModelExpandableMetadata{padding-top:4px}.ytwAdButtonGroupViewModelHost{display:flex;flex-basis:100%;flex-direction:row;align-items:center}.ytwAdButtonGroupViewModelHostPrimaryButton{flex:1}.ytwAdButtonGroupViewModelHostSecondaryButton{margin-right:4px;flex:1}.ytwAdButtonGroupViewModelHostCompactWidth{flex-basis:0;min-width:200px;width:50%;gap:12px}.ytwAdButtonGroupViewModelHostCompactWidthSecondaryButton{margin-right:0}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var Xrm=new _.Ov("EXPANDABLE_METADATA_VIEW_MODEL_TOKEN");var Yrm=_.Ri(function(a){var b=a.data;a=function(){return b().style==="AD_BUTTON_GROUP_STYLE_COMPACT_WIDTH"};
var c=_.uf({visibilityCallback:function(k){var l,m=(l=b().interaction)==null?void 0:l.onFirstVisible;k&&m&&_.$n(m)},
showOption:_.qL}),e={},g={};return _.y("ad-button-group-view-model",{class:_.Un("ytwAdButtonGroupViewModelHost",(e.ytwAdButtonGroupViewModelHostCompactWidth=a,e)),el:_.Xn(c)},_.y("div",{class:_.Un("ytwAdButtonGroupViewModelHostSecondaryButton",(g.ytwAdButtonGroupViewModelHostCompactWidthSecondaryButton=a,g))},_.y(_.ko,{data:function(){return b().secondaryAdButton}},{adButtonViewModel:function(k){return _.y(_.xVg,{data:k.data})}})),_.y("div",{class:"ytwAdButtonGroupViewModelHostPrimaryButton"},_.y(_.ko,
{data:function(){return b().primaryAdButton}},{adButtonViewModel:function(k){return _.y(_.xVg,{data:k.data})}})))},"NK");_.qlc=_.Ri(function(a){var b=_.ne().resolve(_.ke(_.Cwf)),c={};return _.y("lockup-attachments-view-model",{class:_.Un("ytLockupAttachmentsViewModelHost",(c.ytLockupAttachmentsViewModelInlineAttachment=function(){var e;return(e=a.lockupStyle())==null?void 0:e.inlineAttachment},c))},_.y(_.ko,{data:function(){var e;
return(e=a.data())==null?void 0:e.attachments}},Object.assign({},{flexibleActionsViewModel:function(e){e=e.data;
var g={};return _.y("div",{class:_.Un("ytLockupAttachmentsViewModelAttachment",(g.ytLockupAttachmentsViewModelNoTopMargin=function(){var k;return(k=a.lockupStyle())==null?void 0:k.inlineAttachment},g))},_.y(_.Ugf,{data:e,
layout:function(){var k;return((k=a.lockupStyle())==null?void 0:k.arrangement)===1?0:1},
justifyContentOverride:function(){var k;return((k=a.lockupStyle())==null?void 0:k.arrangement)===1?"FLEXIBLE_ACTIONS_JUSTIFY_CONTENT_START":"FLEXIBLE_ACTIONS_JUSTIFY_CONTENT_EVENLY"}}))},
slimlineSurveyViewModel:function(e){return _.y("div",{class:"ytLockupAttachmentsViewModelAttachment"},_.y(_.VVg,{data:e.data}))},
expandableMetadataViewModel:function(e){e=e.data;var g;return _.y("div",{class:_.Un("ytLockupAttachmentsViewModelAttachment","ytLockupAttachmentsViewModelExpandableMetadata")},(g=_.ne().resolve(_.ke(Xrm)))==null?void 0:g({data:e}))},
adButtonGroupViewModel:function(e){return _.y("div",{class:"ytLockupAttachmentsViewModelAttachment"},_.y(Yrm,{data:e.data}))},
adButtonViewModel:function(e){return _.y("div",{class:"ytLockupAttachmentsViewModelAttachment"},_.y(_.xVg,{data:e.data,isCompactWidth:!0}))},
tableViewModel:function(e){return _.y("div",{class:"ytLockupAttachmentsViewModelAttachment"},_.y(_.vBh,{data:e.data}))},
aiCompanionAttachmentViewModel:function(e){e=e.data;var g;return _.y("div",{class:"ytLockupAttachmentsViewModelAttachment"},(g=_.ne().resolve(_.ke(_.wXg)))==null?void 0:g({data:e}))},
carouselAdCardCollectionViewModel:function(e){return _.y("div",{class:"ytLockupAttachmentsViewModelAttachment"},_.y(_.Wrm,{data:e.data,isLockupAttachment:!0}))},
engagementBarViewModel:function(e){return _.y("div",{class:"ytLockupAttachmentsViewModelAttachment"},_.y(_.YVg,{data:e.data}))}},b&&{uploadMetadataViewModel:function(e){return _.y("div",{class:"ytLockupAttachmentsViewModelAttachment"},_.y(b,{data:e.data}))}})))},"OK");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

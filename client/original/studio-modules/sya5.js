"use strict";_F_installCss(".ytLockupAttachmentsViewModelHost{display:flex;flex:1;flex-direction:column}.ytLockupAttachmentsViewModelInlineAttachment{flex:none}.ytLockupAttachmentsViewModelAttachment{margin-top:12px;min-width:0}.ytLockupAttachmentsViewModelNoTopMargin{margin-top:0}.ytLockupAttachmentsViewModelExpandableMetadata{padding-top:4px}.ytwAdButtonGroupViewModelHost{display:flex;flex-basis:100%;flex-direction:row;align-items:center}.ytwAdButtonGroupViewModelHostPrimaryButton{flex:1}.ytwAdButtonGroupViewModelHostSecondaryButton{margin-right:4px;flex:1}.ytwAdButtonGroupViewModelHostCompactWidth{flex-basis:0;min-width:200px;width:50%;gap:12px}.ytwAdButtonGroupViewModelHostCompactWidthSecondaryButton{margin-right:0}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var Zsm=new _.Nv("EXPANDABLE_METADATA_VIEW_MODEL_TOKEN");var $sm=_.Ui(function(a){var b=a.data;a=function(){return b().style==="AD_BUTTON_GROUP_STYLE_COMPACT_WIDTH"};
var c=_.wf({visibilityCallback:function(k){var l,m=(l=b().interaction)==null?void 0:l.onFirstVisible;k&&m&&_.bo(m)},
showOption:_.pL}),e={},g={};return _.y("ad-button-group-view-model",{class:_.Wn("ytwAdButtonGroupViewModelHost",(e.ytwAdButtonGroupViewModelHostCompactWidth=a,e)),el:_.Zn(c)},_.y("div",{class:_.Wn("ytwAdButtonGroupViewModelHostSecondaryButton",(g.ytwAdButtonGroupViewModelHostCompactWidthSecondaryButton=a,g))},_.y(_.mo,{data:function(){return b().secondaryAdButton}},{adButtonViewModel:function(k){return _.y(_.nWg,{data:k.data})}})),_.y("div",{class:"ytwAdButtonGroupViewModelHostPrimaryButton"},_.y(_.mo,
{data:function(){return b().primaryAdButton}},{adButtonViewModel:function(k){return _.y(_.nWg,{data:k.data})}})))},"RK");_.Dlc=_.Ui(function(a){var b=_.qe().resolve(_.oe(_.gxf)),c={};return _.y("lockup-attachments-view-model",{class:_.Wn("ytLockupAttachmentsViewModelHost",(c.ytLockupAttachmentsViewModelInlineAttachment=function(){var e;return(e=a.lockupStyle())==null?void 0:e.inlineAttachment},c))},_.y(_.mo,{data:function(){var e;
return(e=a.data())==null?void 0:e.attachments}},Object.assign({},{flexibleActionsViewModel:function(e){e=e.data;
var g={};return _.y("div",{class:_.Wn("ytLockupAttachmentsViewModelAttachment",(g.ytLockupAttachmentsViewModelNoTopMargin=function(){var k;return(k=a.lockupStyle())==null?void 0:k.inlineAttachment},g))},_.y(_.zhf,{data:e,
layout:function(){var k;return((k=a.lockupStyle())==null?void 0:k.arrangement)===1?0:1},
justifyContentOverride:function(){var k;return((k=a.lockupStyle())==null?void 0:k.arrangement)===1?"FLEXIBLE_ACTIONS_JUSTIFY_CONTENT_START":"FLEXIBLE_ACTIONS_JUSTIFY_CONTENT_EVENLY"}}))},
slimlineSurveyViewModel:function(e){return _.y("div",{class:"ytLockupAttachmentsViewModelAttachment"},_.y(_.LWg,{data:e.data}))},
expandableMetadataViewModel:function(e){e=e.data;var g;return _.y("div",{class:_.Wn("ytLockupAttachmentsViewModelAttachment","ytLockupAttachmentsViewModelExpandableMetadata")},(g=_.qe().resolve(_.oe(Zsm)))==null?void 0:g({data:e}))},
adButtonGroupViewModel:function(e){return _.y("div",{class:"ytLockupAttachmentsViewModelAttachment"},_.y($sm,{data:e.data}))},
adButtonViewModel:function(e){return _.y("div",{class:"ytLockupAttachmentsViewModelAttachment"},_.y(_.nWg,{data:e.data,isCompactWidth:!0}))},
tableViewModel:function(e){return _.y("div",{class:"ytLockupAttachmentsViewModelAttachment"},_.y(_.qCh,{data:e.data}))},
aiCompanionAttachmentViewModel:function(e){e=e.data;var g;return _.y("div",{class:"ytLockupAttachmentsViewModelAttachment"},(g=_.qe().resolve(_.oe(_.NYg)))==null?void 0:g({data:e}))},
carouselAdCardCollectionViewModel:function(e){return _.y("div",{class:"ytLockupAttachmentsViewModelAttachment"},_.y(_.Ysm,{data:e.data,isLockupAttachment:!0}))},
engagementBarViewModel:function(e){return _.y("div",{class:"ytLockupAttachmentsViewModelAttachment"},_.y(_.OWg,{data:e.data}))}},b&&{uploadMetadataViewModel:function(e){return _.y("div",{class:"ytLockupAttachmentsViewModelAttachment"},_.y(b,{data:e.data}))}})))},"SK");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

"use strict";_F_installCss(".ytCreatePlaylistDialogFormViewModelHost{display:block;margin-top:12px}.ytCreatePlaylistDialogFormViewModelTitleField,.ytCreatePlaylistDialogFormViewModelVisibilityField{margin-bottom:12px}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var ivm=function(a){var b,c,e;if(a=(b=a.createPlaylistDialogFormSchema)==null?void 0:(c=b.fieldSchemas)==null?void 0:(e=c.title)==null?void 0:e.validationSchema){b=[a.syncStep,a.asyncStep].filter(function(m){return m!==void 0});
b=_.f(b);c=b.next();try{for(;!c.done;c=b.next()){var g=c.value.rules;if(!g)break;var k=_.f(g),l=k.next();try{for(;!l.done;l=k.next())return _.bf(l.value,_.mqe)}finally{_.h(k,l)}}}finally{_.h(b,c)}}},kvm=function(a){var b,c,e;
if(a=(b=a.createPlaylistDialogFormSchema)==null?void 0:(c=b.fieldSchemas)==null?void 0:(e=c.visibility)==null?void 0:e.validationSchema){b=[a.syncStep,a.asyncStep].filter(function(p){return p!==void 0});
b=_.f(b);c=b.next();try{for(;!c.done;c=b.next()){var g=c.value.rules;if(!g)break;var k=_.f(g),l=k.next();try{for(;!l.done;l=k.next()){var m=_.bf(l.value,jvm);if(m)return e=void 0,(e=m.translations)==null?void 0:e.visibilityNotValidErrorMessage}}finally{_.h(k,l)}}}finally{_.h(b,c)}}},jvm=new _.Mv("collaborativePlaylistVisibilityValidationRule");_.Fkc=_.Ui(function(a){var b=_.f(_.Ti(function(){var M,O;return((M=a.data().createPlaylistDialogFormSchema)==null?0:(O=M.initialValues)==null?0:O.title)?a.data().createPlaylistDialogFormSchema.initialValues.title:""})),c=b.next().value,e=b.next().value;
b=_.f(_.Ti(function(){a.data();return!1}));
var g=b.next().value,k=b.next().value;b=_.f(_.Ti(function(){a.data();return!1}));
var l=b.next().value,m=b.next().value;b=_.f(_.Ti(function(){var M,O;return(M=a.data().createPlaylistDialogFormSchema)==null?void 0:(O=M.initialValues)==null?void 0:O.visibility}));
var p=b.next().value,r=b.next().value;b=_.f(_.Ti(function(){a.data();return!1}));
var t=b.next().value,v=b.next().value;b=_.f(_.Ti(function(){var M,O;return(M=a.data().createPlaylistDialogFormSchema)==null?void 0:(O=M.initialValues)==null?void 0:O.isCollaborative}));
var w=b.next().value,x=b.next().value,z=_.Sd("div");_.Md(function(){var M=z.value.querySelector("textarea");M&&(M.value=c())},"H9GQCf","cM");
_.Wd(function(){var M;_.XCh((M=a.data().createPlaylistDialogFormSchema)==null?void 0:M.id,{onSubmit:function(){var O=c();var S=p(),W=w(),aa=a.data();O=_.cf({commandExecutorCommand:{commands:[_.cf({createPlaylistServiceEndpoint:{title:O,privacyStatus:S,videoIds:aa.videoIds,sourcePlaylistId:aa.sourcePlaylistId,params:W?aa.createPlaylistParamsCollaborationEnabled:aa.createPlaylistParamsCollaborationDisabled}},_.uue),_.cf({dismissDialogEndpoint:{}},_.gse)]}},_.hh);_.qe().resolve(_.co).resolveCommand(O)},
isValid:function(){return g()&&!l()&&!t()}})});
var A=function(M){if(M!==void 0&&(e(M),!g()&&M.length>0&&k(!0),g())){var O=ivm(a.data());if(O){var S=O.minLength;O=O.maxLength;S&&M.length<S?m(!0):O&&M.length>O?m(!0):m(!1)}}},C=function(){var M=!(!w()||p()!=="PRIVATE");
v(M)},E=function(M){M!==void 0&&(r(M),C())},F=function(){if(t())return kvm(a.data())},H=function(){x(!w());
C()},I=function(){return{validate:function(M){if(g()){var O=ivm(a.data());
if(O){var S=O.minLength;O=O.translations;if(S&&M.length<S)return O==null?void 0:O.minLengthErrorMessage}}}}},K=function(){var M=ivm(a.data()),O=M==null?void 0:M.maxLength,S;
M=M==null?void 0:(S=M.translations)==null?void 0:S.maxLengthErrorMessage;if(O&&M)return{maxChars:O,errorMessage:M}};
return _.y("yt-create-playlist-dialog-form-view-model",{class:"ytCreatePlaylistDialogFormViewModelHost"},_.y("div",{class:"ytCreatePlaylistDialogFormViewModelTitleField",el:z},_.y(_.mo,{data:function(){return a.data().playlistTitle}},{textFieldViewModel:function(M){return _.y(_.Dpf,{data:M.data,
text:c,controlledMode:!0,onInput:A,validation:I,characterLimit:K})}})),_.y("div",{class:"ytCreatePlaylistDialogFormViewModelVisibilityField"},_.y(_.mo,{data:function(){return a.data().playlistVisibility}},{dropdownViewModel:function(M){return _.y(_.Tkc,{data:M.data,
onSelected:E,error:F})}})),_.y(_.B,{cond:function(){return!!a.data().playlistCollaborate},
then:function(){return _.y("div",null,_.y(_.mo,{data:function(){return a.data().playlistCollaborate}},{switchListItemViewModel:function(M){return _.y(_.prf,{data:M.data,
onTap:H,disableFormsApiMode:!0})}}))}}))},"dM");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

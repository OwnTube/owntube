"use strict";_F_installCss(".ytVotingViewModelHost{display:flex}.ytVotingViewModelVoteCount{display:flex;align-items:center;margin:0 8px;color:var(--tffc2fd3a644f6275);font-family:Roboto,Arial,sans-serif;font-size:1.4rem;font-weight:400;line-height:2rem}.ytVotingViewModelVoteCountDisabled{color:var(--t7e34d5baa4ea6277)}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.ld("haouOe");
var Yum=function(a,b){return _.Ch(a.entities,"votingEntity",b)};var Zum=new _.Nv("VOTING_ANIMATION_CONTROLLER_TOKEN");_.Wjc=_.Ui(function(a){var b=a.data;var c=_.Sd("div"),e=_.Sd("div");a=_.f(_.zd("VOTE_STATUS_NONE",void 0,"Y7Qjcf",function(){}));
var g=a.next().value,k=a.next().value,l=_.er(Yum,function(){var w;return(w=b())==null?void 0:w.entityKey}),m=_.D("web_enable_voting_animation")||_.D("enable_music_web_cairo_voting_animation");
_.Wd(function(){var w;((w=b().initialState)==null?0:w.status)&&k(b().initialState.status)});
var p=function(){var w,x,z=Number((x=(w=b().initialState)==null?void 0:w.votes)!=null?x:0),A;w=(A=b().initialState)==null?void 0:A.status;return w==="VOTE_STATUS_UPVOTED"?z-1:w==="VOTE_STATUS_DOWNVOTED"?z+1:z},r=function(){return g()==="VOTE_STATUS_UPVOTED"?p()+1:g()==="VOTE_STATUS_DOWNVOTED"?p()-1:p()},t=function(w){var x=w?"VOTE_STATUS_UPVOTED":"VOTE_STATUS_NONE";
k(x);var z=r(),A=_.qe().resolve(_.oe(Zum)),C=l();C&&(w&&(C==null?0:C.upvoteDefaultButtonOnTap)?_.bo(C.upvoteDefaultButtonOnTap,{form:{element:c.value},disableClickTracking:!0}):(C==null?0:C.upvoteToggledButtonOnTap)&&_.bo(C.upvoteToggledButtonOnTap,{form:{element:c.value},disableClickTracking:!0}));var E;w=(E=C==null?void 0:C.enableOptimisticReordering)!=null?E:b().enableOptimisticReordering;m&&A&&b().itemId&&w&&A.updateVoteCount(b().itemId,z,x)},v=function(w){var x=w?"VOTE_STATUS_DOWNVOTED":"VOTE_STATUS_NONE";
k(x);var z=r(),A=_.qe().resolve(_.oe(Zum)),C=l();C&&(w&&(C==null?0:C.downvoteDefaultButtonOnTap)?_.bo(C.downvoteDefaultButtonOnTap,{form:{element:e.value},disableClickTracking:!0}):(C==null?0:C.downvoteToggledButtonOnTap)&&_.bo(C.downvoteToggledButtonOnTap,{form:{element:e.value},disableClickTracking:!0}));var E;w=(E=C==null?void 0:C.enableOptimisticReordering)!=null?E:b().enableOptimisticReordering;m&&A&&b().itemId&&w&&A.updateVoteCount(b().itemId,z,x)};
a={};a=_.Wn("ytVotingViewModelVoteCount",(a.ytVotingViewModelVoteCountDisabled=function(){return b().isDisabled},a));
return _.y("voting-view-model",{class:"ytVotingViewModelHost"},_.y("div",{el:c},_.y(_.mo,{data:function(){var w=_.bf(b().upvoteButton,_.Dr);return{toggleButtonViewModel:Object.assign({},w,{isToggled:g()==="VOTE_STATUS_UPVOTED"})}}},{toggleButtonViewModel:function(w){return _.y(_.HE,{data:w.data,
onToggle:t})}})),_.y("div",{class:a},function(){var w,x,z;
return g()==="VOTE_STATUS_UPVOTED"?(w=b().initialState)==null?void 0:w.compactVotesUpvoted:g()==="VOTE_STATUS_DOWNVOTED"?(x=b().initialState)==null?void 0:x.compactVotesDownvoted:(z=b().initialState)==null?void 0:z.compactVotes}),_.y("div",{el:e},_.y(_.mo,{data:function(){var w=_.bf(b().downvoteButton,_.Dr);
return{toggleButtonViewModel:Object.assign({},w,{isToggled:g()==="VOTE_STATUS_DOWNVOTED"})}}},{toggleButtonViewModel:function(w){return _.y(_.HE,{data:w.data,
onToggle:v})}})))},"aM");
_.md();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

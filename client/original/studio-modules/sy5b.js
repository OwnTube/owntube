"use strict";_F_installCss(".ytDecoratedAvatarViewModelHost{display:block}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var eWg=function(a,b,c,e){return function(){_.MYb(b,{form:{element:c},commandController:e})}};_.Alc=_.Ui(function(a){var b=a.data;var c=a.className;var e=a.avatarOverrides;var g=a.avatarExperiments;var k=_.Td("yt-decorated-avatar-view-model"),l=function(){return _.bf(b().avatar,_.Lcc)},m=_.Ld(function(){var p,r=b(),t=l(),v=_.fr(b().rendererContext),w=(p=k.value)!=null?p:void 0;
p=e==null?void 0:e();var x=g==null?void 0:g(),z;if(t){w={data:r,avatar:t,onTap:v,element:w,overrides:p,avatarExperiments:x};r=w.data;v=w.avatar;p=w.onTap;x=w.element;var A=w.commandController;t=w.overrides;w=w.avatarExperiments;var C,E,F;p=p?eWg(r,p,x,A):void 0;x=[];r.liveData&&x.push(0);var H;A=(H=r.liveData)==null?void 0:H.liveBadgeText;H=(z=_.bf(r.rendererContext,_.Uq))==null?void 0:z.label;z=_.aWg({data:v,onTap:p,decorations:x,badgeText:A,accessibilityText:H?H:r.a11yLabel,badgeIcon:(C=r.iconBadgeData)==
null?void 0:C.iconName,badgeIconColor:((E=r.iconBadgeData)==null?0:E.iconColorOverride)?_.Zh(r.iconBadgeData.iconColorOverride):void 0,badgeIconBorderColor:((F=r.iconBadgeData)==null?0:F.strokeColorOverride)?_.Zh(r.iconBadgeData.strokeColorOverride):void 0,overrides:t,avatarExperiments:w})}else z=Object.assign({},{size:"medium"},p,{avatarExperiments:x});return z},void 0,"H8tk9d");
return _.y("yt-decorated-avatar-view-model",{class:_.Wn("ytDecoratedAvatarViewModelHost",c),el:k},_.y(_.B,{cond:function(){var p;return(p=l())==null?void 0:p.image},
then:function(p){return _.y(_.dWg,{data:m,image:p,iconType:"RADAR_LIVE",overlays:function(){return _.y(_.bWg,{data:l})}})}}))},"$h");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

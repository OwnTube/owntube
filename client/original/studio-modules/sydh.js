"use strict";_F_installCss(".ytShoppingDescriptionShelfViewModelHost{display:flex;flex-direction:column}.ytShoppingDescriptionShelfViewModelHostEngagementPanel{background-color:var(--t7f4f2c6d54836ce0)}.ytShoppingDescriptionShelfViewModelItems{display:flex;flex-direction:column}.ytShoppingDescriptionShelfViewModelButtonContainer{padding-left:12px;padding-right:12px}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.Ojc=_.Ui(function(a){var b=a.data;var c=a.className;var e=a.engagementPanel;var g=function(){return b().expandedStateKey},k=_.er(_.jmb,g),l=function(){var t,v,w;
if(w=!!g()){var x;w=!((x=k())!=null&&x.expanded)}return w&&!!b().bottomButton&&((v=(t=b().items)==null?void 0:t.length)!=null?v:0)>3},m=function(){var t;
return((t=b().borderRadius)!=null?t:12)+"px"},p=function(){return{"border-top-left-radius":function(){var t;
return((t=b().roundedCorners)==null?0:t.topStart)?m():void 0},
"border-top-right-radius":function(){var t;return((t=b().roundedCorners)==null?0:t.topEnd)?m():void 0},
"border-bottom-left-radius":function(){var t;return((t=b().roundedCorners)==null?0:t.bottomStart)?m():void 0},
"border-bottom-right-radius":function(){var t;return((t=b().roundedCorners)==null?0:t.bottomEnd)?m():void 0}}},r=function(){return{"margin-inline-start":function(){var t;
return _.rum((t=b().buttonMargin)==null?void 0:t.start)},
"margin-inline-end":function(){var t;return _.rum((t=b().buttonMargin)==null?void 0:t.end)},
"margin-top":function(){var t;return _.rum((t=b().buttonMargin)==null?void 0:t.top)},
"margin-bottom":function(){var t;return _.rum((t=b().buttonMargin)==null?void 0:t.bottom)}}};
a={};return _.y("yt-shopping-description-shelf-view-model",{class:_.Wn("ytShoppingDescriptionShelfViewModelHost",c,(a.ytShoppingDescriptionShelfViewModelHostEngagementPanel=e,a)),style:_.ho(function(){if(e!=null&&e())var t=p();else{t=Object;var v=t.assign,w,x=((w=_.qe().resolve(_.oe(_.ir)))==null?0:w())?b().darkThemeBackgroundColor:b().lightThemeBackgroundColor;w=x?_.Zh(x):void 0;t=v.call(t,{},{"background-color":w},p())}return t})},_.y(_.mo,{data:function(){return b().header}},{sectionHeaderViewModel:_.lpf}),
_.y("div",{class:"ytShoppingDescriptionShelfViewModelItems",
style:_.ho({gap:function(){return b().itemGap?b().itemGap+"px":void 0}})},_.y(_.mo,{data:function(){var t;
return l()?(t=b().items)==null?void 0:t.slice(0,3):b().items}},{shoppingDescriptionItemViewModel:_.xZg})),_.y(_.B,{cond:l,
then:function(){return _.y("div",{class:"ytShoppingDescriptionShelfViewModelButtonContainer",style:_.ho(r)},_.y(_.mo,{data:function(){return b().bottomButton}},{buttonViewModel:_.PD}))}}))},"MO");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

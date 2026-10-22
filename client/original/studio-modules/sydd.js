"use strict";_F_installCss(".ytAdaptiveGridViewModelHost{display:flex;flex-direction:column;width:100%}.ytAdaptiveGridViewModelContainer{width:100%;display:grid;gap:16px;grid-template-columns:repeat(var(--adaptive-num-cols-large,3),minmax(0,1fr))}@media (max-width:875px){.ytAdaptiveGridViewModelContainer{grid-template-columns:repeat(var(--adaptive-num-cols-medium,2),minmax(0,1fr))}}@media (max-width:600px){.ytAdaptiveGridViewModelContainer{grid-template-columns:repeat(var(--adaptive-num-cols-small,1),minmax(0,1fr))}}.ytAdaptiveGridViewModelGridItem{display:flex;flex-direction:column;min-width:0}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var vxm;_.uxm=function(){var a;return _.n(function(b){if(b.nextAddress==1)return b.yield((0,_.ds)("xgv4kf"),2);a=_.Fjc;return b.return(a)})};
vxm=_.jo(function(){return _.uxm()},"clusterViewModel");
_.re(_.NA,function(a){a.registerLoadFn("clusterViewModel","xgv4kf",_.uxm)});var wxm=[];_.HZg=_.Ui(function(a){var b=_.f(_.qXg({canHaveZeroSize:!1})),c=b.next().value;b=b.next().value;var e=function(){var g;return(g=a.data().items)!=null?g:wxm};
return _.y("yt-adaptive-grid-view-model",{class:"ytAdaptiveGridViewModelHost",el:_.Zn(b),style:_.ho({"--adaptive-num-cols-large":function(){var g=e().length;return g===4||g===2?2:3},
"--adaptive-num-cols-medium":2,"--adaptive-num-cols-small":1})},_.y("div",{class:"ytAdaptiveGridViewModelContainer"},_.y(_.mo,{data:e,wrapper:function(g){return _.y("div",{class:"ytAdaptiveGridViewModelGridItem"},g())}},{lockupViewModel:_.RD,
shortsLockupViewModel:function(g){return _.y(_.upf,{data:g.data,scrimStyle:3,aspectRatio:3})},
clusterViewModel:vxm,chatUserTurnViewModel:function(g){return _.y(_.JZg,{data:g.data,containerHeight:c.height,isFullWidth:!0,isFullHeight:!0,disableMargin:!0})}})))},"EO");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

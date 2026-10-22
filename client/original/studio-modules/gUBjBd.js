"use strict";_F_installCss(".ytwPivotButtonViewModelHost{display:flex;justify-content:center;cursor:pointer}.ytwPivotButtonViewModelHostImage{border-radius:6px;width:40px;height:40px;display:block}.ytwPivotButtonViewModelHostIcon{border:1px solid #fff;border-radius:6px;padding:6px}.ytwPivotButtonViewModelHost[data-background-color=THEME_ATTRIBUTE_OVERLAY_BACKGROUND_MEDIUM] .ytwPivotButtonViewModelHostIcon{background-color:rgba(0,0,0,0.6)}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.ld("gUBjBd");
_.Ejc=_.Ui(function(a){var b=a.data;a=a.className;var c=_.Sd("pivot-button-view-model");_.Wd(function(){var e;((e=b())==null?0:e.backgroundColor)&&c.value.setAttribute("data-background-color",String(b().backgroundColor))});
return _.y("pivot-button-view-model",{el:c,class:_.Wn("ytwPivotButtonViewModelHost",a)},_.y(_.LA,{command:function(){var e=b();e=e.onClickCommand?_.Sh(e.onClickCommand):e.contentDescription?_.BWa(_.Oh(e.contentDescription),void 0):void 0;return e},
ariaLabel:function(){return b().contentDescription}},_.y(_.B,{cond:function(){return b().thumbnail},
then:function(e){return _.y(_.io,{data:e,alt:"",className:"ytwPivotButtonViewModelHostImage"})},
else:function(){return _.y(_.B,{cond:function(){return b().icon},
then:function(e){return _.y(_.no,{icon:function(){return e().iconType},
className:"ytwPivotButtonViewModelHostIcon"})}})}})))},"NO");
_.md();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

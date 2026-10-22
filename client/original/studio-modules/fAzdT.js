"use strict";_F_installCss(".ytwChannelBlocksViewModelHost{display:block}.ytwChannelBlocksViewModelListWrapper{scrollbar-color:transparent transparent;scrollbar-width:thin}.ytwChannelBlocksViewModelListWrapper::-webkit-scrollbar{background:transparent;width:16px}.ytwChannelBlocksViewModelListWrapper::-webkit-scrollbar-thumb{height:56px;border-radius:8px;border:4px solid transparent;background-clip:content-box;background-color:transparent}.ytwChannelBlocksViewModelListWrapper:hover{scrollbar-color:var(--t7e34d5baa4ea6277) transparent}.ytwChannelBlocksViewModelListWrapper:hover::-webkit-scrollbar-thumb{background-color:var(--t7e34d5baa4ea6277)}.ytwChannelBlocksViewModelListWrapper{overflow-y:auto;max-height:min(360px,100vh - 300px);min-width:min(448px,100vw - 144px)}@media (max-width:330px){.ytwChannelBlocksViewModelListWrapper{max-height:calc(100vh - 200px)}}.ytwChannelBlocksViewModelListWrapper :has(>.yt-icon-shape){background-color:var(--t7f4f2c6d54836ce0);border-radius:50%;box-sizing:content-box;padding:8px}.ytwChannelBlocksViewModelSearchContainer{position:relative;padding-bottom:8px}.ytwChannelBlocksViewModelDropdownPanel{position:absolute;background-color:var(--t518e925f61bdcb91);border:1px solid var(--tf3fc855af2285f5f);box-shadow:0 2px 10px rgba(0,0,0,0.25);border-radius:4px;z-index:2010;width:100%;max-height:min(300px,100vh - 300px);overflow-y:auto;top:100%;left:0}.ytwChannelBlocksViewModelSuggestionsListbox{padding:8px 0}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.hd("fAzdT");
var mwm;_.lwm=function(){var a;return _.n(function(b){if(b.nextAddress==1)return b.yield((0,_.ds)("DvZC9"),2);a=_.Lic;return b.return(a)})};
mwm=_.ho(function(){return _.lwm()},"continuationItemViewModel");
_.oe(_.MA,function(a){a.registerLoadFn("continuationItemViewModel","DvZC9",_.lwm)});_.jkc=_.Ri(function(a){var b=a.data;var c=_.f(_.D0b(b)).next().value,e=_.f(_.xd([],void 0,"g8Gnhb",function(){}));
a=e.next().value;var g=e.next().value,k=_.f(_.xd(!1,void 0,"DMtMAc",function(){}));
e=k.next().value;var l=k.next().value;k="i"+_.zEf++;_.sf("yt-append-continuation-items-action",function(m){(m=_.Qe(m,_.eqe))&&m.targetId&&m.targetId===c().targetId&&_.Kcc(m.targetId,m.continuationItems)});
_.sf("yt-reload-continuation-items-command",function(m){m=_.Qe(m,_.TXb);if(m!=null&&m.targetId){var p=_.Qe(b().searchInput,_.qbc),r;if(m.targetId===(p==null?void 0:(r=p.formSchema)==null?void 0:r.id)){var t;r=(t=m.continuationItems)!=null?t:[];g(r);l(r.length>0)}}});
return _.y("yt-channel-blocks-view-model",{el:_.Xn(_.wcc),class:"ytwChannelBlocksViewModelHost"},_.y(nwm,{data:function(){return b().searchInput},
showDropdown:e,suggestions:a,listboxId:k}),_.y("div",{class:"ytwChannelBlocksViewModelListWrapper",role:"list","data-target-id":function(){return b().targetId}},_.y(_.ko,{data:function(){return c().contents}},{listItemViewModel:function(m){return _.y(_.QD,{data:m.data,
disableHorizontalPadding:!0})},
continuationItemViewModel:mwm})))},"bO");
var nwm=_.Ri(function(a){var b=a.data;var c=a.showDropdown;var e=a.suggestions;var g=a.listboxId;return _.y("div",{class:"ytwChannelBlocksViewModelSearchContainer",role:"combobox","aria-label":function(){var k;return(k=_.Qe(b(),_.qbc))==null?void 0:k.placeholderText},
"aria-haspopup":"listbox","aria-autocomplete":"list","aria-expanded":c,"aria-controls":function(){return c()?g():void 0}},_.y(_.ko,{data:b},{searchInputViewModel:_.hvf}),_.y(_.B,{cond:c,
then:function(){return _.y("div",{class:"ytwChannelBlocksViewModelDropdownPanel"},_.y("div",{id:function(){return g()},
class:"ytwChannelBlocksViewModelSuggestionsListbox",role:"listbox"},_.y(_.ko,{data:e},{listItemViewModel:_.QD})))}}))},"cO");
_.jd();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

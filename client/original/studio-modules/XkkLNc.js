"use strict";_F_installCss(".ytcpAudienceOnlineHeatmapViewModelHost{display:flex;flex-direction:column}.ytcpAudienceOnlineHeatmapViewModelCard{display:flex;flex-direction:row;padding:8px 24px}.ytcpAudienceOnlineHeatmapViewModelDaysHeader{display:flex;flex-direction:row}.ytcpAudienceOnlineHeatmapViewModelHoursColumn{display:flex;flex-direction:column;justify-content:space-between;padding-top:24px;padding-right:16px}.ytcpAudienceOnlineHeatmapViewModelHourLabel{color:var(--t4a6da19e16bf221a);font-family:Roboto,Arial,sans-serif;font-size:1.2rem;font-weight:400;line-height:1.8rem}.ytcpAudienceOnlineHeatmapViewModelHeatmap{display:flex;flex-direction:row;flex-grow:1}.ytcpAudienceOnlineHeatmapViewModelDayColumn{display:flex;flex-direction:column;padding:0 4px;flex:1;min-width:0}.ytcpAudienceOnlineHeatmapViewModelDayColumnContainer{position:relative;width:100%}.ytcpAudienceOnlineHeatmapViewModelDayLabel{color:var(--t4a6da19e16bf221a);padding-top:2px;padding-bottom:8px;text-align:center;font-family:Roboto,Arial,sans-serif;font-size:1.2rem;font-weight:400;line-height:1.8rem}.ytcpAudienceOnlineHeatmapViewModelCells{display:flex;flex-direction:column}.ytcpAudienceOnlineHeatmapViewModelCellContainer{padding-bottom:2px}.ytcpAudienceOnlineHeatmapViewModelCell{display:flex;height:8px;flex-grow:1;border-radius:4px;transition:opacity .15s ease-in-out}.ytcpAudienceOnlineHeatmapViewModelDataExplanationMessage{color:var(--t4a6da19e16bf221a);padding:16px 24px 24px;font-family:Roboto,Arial,sans-serif;font-size:1.4rem;font-weight:400;line-height:2rem}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.hd("XkkLNc");
var pum;_.oum=function(){var a;return _.n(function(b){if(b.nextAddress==1)return b.yield((0,_.ds)("GPGmR"),2);a=_.Avf;return b.return(a)})};
pum=_.ho(function(){return _.oum()},"hoverCardViewModel");
_.oe(_.MA,function(a){a.registerLoadFn("hoverCardViewModel","GPGmR",_.oum)});_.akc=_.Ri(function(a){var b=a.data;var c=_.Od("yta-audience-online-heatmap-view-model");a=_.f(_.xd(0,void 0,"YOfID",function(){}));
var e=a.next().value,g=a.next().value;a=_.f(_.xd(0,void 0,"EUMF3c",function(){}));
var k=a.next().value,l=a.next().value;a=_.f(_.xd(null,void 0,"aelhy",function(){}));
var m=a.next().value,p=a.next().value;_.Id(function(){var r=e(),t=k(),v=document.activeElement,w;if((w=c.value)!=null&&w.contains(v)){var x,z;(z=(x=c.value)==null?void 0:x.querySelector('[data-day="'+r+'"][data-hour="'+t+'"]'))==null||z.focus()}},"BulXzd","gM");
return _.y("yta-audience-online-heatmap-view-model",{el:c,id:function(){var r;return(r=b())==null?void 0:r.accessibilityId},
class:"ytcpAudienceOnlineHeatmapViewModelHost"},_.y("div",{class:"ytcpAudienceOnlineHeatmapViewModelCard"},_.y("div",{class:"ytcpAudienceOnlineHeatmapViewModelHoursColumn","aria-hidden":"true"},_.y(_.Md,{each:function(){return b().hourLabelMessages||[]},
keyBy:"REFERENCE"},function(r){return _.y("div",{class:"ytcpAudienceOnlineHeatmapViewModelHourLabel"},r)})),_.y("div",{class:"ytcpAudienceOnlineHeatmapViewModelHeatmap",
role:"grid","on:keydown":function(r){var t=e(),v=k(),w=!1;switch(r.key){case "ArrowDown":v=Math.min(v+1,23);w=!0;break;case "ArrowUp":v=Math.max(v-1,0);w=!0;break;case "ArrowRight":t=Math.min(t+1,6);w=!0;break;case "ArrowLeft":t=Math.max(t-1,0),w=!0}w&&(r.preventDefault(),g(t),l(v))},
"on:mouseleave":function(){p(null)},
"aria-label":"Audience active times hourly grid"},_.y(_.Md,{each:function(){return b().days||[]},
keyBy:"REFERENCE"},function(r,t){return _.y("div",{class:"ytcpAudienceOnlineHeatmapViewModelDayColumn",role:"row"},_.y("div",{class:"ytcpAudienceOnlineHeatmapViewModelDayColumnContainer",role:"presentation"},_.y("div",{class:"ytcpAudienceOnlineHeatmapViewModelDayLabel",role:"rowheader"},r.dayLabelMessage),_.y("div",{class:"ytcpAudienceOnlineHeatmapViewModelCells",role:"presentation"},_.y(_.Md,{each:function(){return r.cells||[]},
keyBy:"REFERENCE"},function(v,w){var x=_.hr(function(){return v.color}),z=v.tooltip?_.Qe(v.tooltip,_.fcc):void 0;
x=_.y("div",{class:"ytcpAudienceOnlineHeatmapViewModelCell",role:"gridcell",tabindex:function(){return e()===t()&&k()===w()?0:-1},
"data-day":t,"data-hour":w,"aria-label":function(){return v.accessibilityLabel},
style:_.fo({"background-color":x,opacity:function(){if(m()!==null){var A,C;var E=((A=m())==null?void 0:A.day)===t()&&((C=m())==null?void 0:C.hour)===w()||e()===t()&&k()===w()?1:.3}else E=void 0;return E}})});
return _.y("div",{class:"ytcpAudienceOnlineHeatmapViewModelCellContainer",role:"presentation","on:mouseenter":function(){p({day:t(),hour:w()})},
"on:mouseleave":function(){p(null)}},z?_.y(_.YD,{type:"custom-content",
position:"top",offset:4,tooltipContent:function(){return _.y(pum,{data:z})}},x):x)}))))}))),_.y("div",{class:"ytcpAudienceOnlineHeatmapViewModelDataExplanationMessage"},_.y(_.LA,{text:function(){return b().dataExplanationHelperText}})))},"hM");
_.jd();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

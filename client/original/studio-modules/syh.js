"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.QG=function(a){for(var b=a.columnsToShow||[],c=[],e=[],g=_.xqb(a.columnDimensions||{},b),k={minWidth:0,maxWidth:0,flexGrow:0,paddingLeft:0,paddingRight:0},l=0,m=0,p=[],r=0,t=0,v=0,w=0;w<b.length;w++){var x=b[w],z=a.columns[x];if(z===void 0)throw Error("lo`"+x);var A=!0,C=b[w+1],E=a.columns[C];C&&E&&(A=E.headerGroup!==z.headerGroup||E.headerGroup===void 0);C=g[w];k.flexGrow+=C.flexGrow;E=C.paddingLeft+C.paddingRight;k.minWidth+=C.minWidth+E;k.maxWidth+=C.maxWidth+E;p.length===0&&(l=C.paddingLeft);
A&&(m=C.paddingRight);var F=_.zqb(C);E={type:x,index:w};var H=_.wqb(a,x,["DEFAULTS","SORTING","RIGHT_ALIGN"]),I=_.wqb(a,x,["DEFAULTS","FLOATING"]);var K=a.getCustomTooltip?a.getCustomTooltip(x,z.headerTooltipParagraphs):z.headerTooltipParagraphs;var M=F;z.headerCustomCss&&(M=[F,z.headerCustomCss].join(""));H=Object.assign({},E,{style:M,classes:H,headerName:z.headerName||"",headerIcon:z.headerIcon,headerTooltipParagraphs:K||[],headerTooltipHelpContext:z.headerTooltipHelpContext,sortOrders:z.sortOrders||
[],selectionState:z.isSelectionCheckbox?a.selectionState:void 0,reorderable:z.reorderable||!1,hideable:z.hideable||!1,veType:z.veType});K="";t>0&&w<(a.leftFloatingColumns||0)&&(K="left:"+t+"px;");t+=C.minWidth+C.paddingLeft+C.paddingRight;C=[F,K].join("");C=Object.assign({},E,{style:C,classes:I});e.push(C);p.push(H);A&&(A=_.zqb(k),v>0&&w<(a.leftFloatingColumns||0)&&(A=[A,"left:"+v+"px;"].join("")),v+=k.minWidth+k.paddingLeft+k.paddingRight,C="padding-left:"+l+"px;padding-right:"+m+"px;",x=_.wqb(a,
x,["FLOATING"]),I=void 0,E=z.headerGroup&&((I=a.headerGroupsConfig)==null?void 0:I[z.headerGroup])||void 0,M=K=H=F=I=void 0,c.push({index:r++,groupId:z.headerGroup,groupName:(M=(I=E)==null?void 0:I.name)!=null?M:z.headerGroup||"",groupStyle:A,groupClasses:x,headerTextStyle:C,subheaders:p,groupButtonIcon:(F=E)==null?void 0:F.buttonIcon,reorderable:((H=E)==null?void 0:H.reorderable)||z.reorderable||!1,hideable:((K=E)==null?void 0:K.hideable)||z.hideable||!1}),p=[],k.flexGrow=0,k.maxWidth=0,k.minWidth=
0)}return{headerColumns:c,bodyColumns:e}};
_.oUf=function(a,b,c){return _.sCb(a.getMetricColumn(b,c),"PERCENTAGES")};
_.pUf={mask:{lastTimeUpdated:{all:!0}},responseType:void 0};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.

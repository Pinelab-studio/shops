"use strict";(self.webpackChunkvendure_admin_ui=self.webpackChunkvendure_admin_ui||[]).push([[672],{83672:function(t,e,n){n.r(e),n.d(e,{DEFAULT_DASHBOARD_WIDGET_LAYOUT:function(){return V},DEFAULT_WIDGETS:function(){return K},DashboardComponent:function(){return P},DashboardModule:function(){return tt},DashboardWidgetComponent:function(){return U},LatestOrdersWidgetComponent:function(){return j},LatestOrdersWidgetModule:function(){return F},OrderSummaryWidgetComponent:function(){return R},OrderSummaryWidgetModule:function(){return N},TestWidgetComponent:function(){return B},TestWidgetModule:function(){return Q},WelcomeWidgetComponent:function(){return Y},WelcomeWidgetModule:function(){return H},dashboardRoutes:function(){return J},"\u02750":function(){return E},"\u02751":function(){return X},"\u02752":function(){return z},"\u02753":function(){return G}});var r=n(51694),o=n(49594),i=n(48304),a=n(37097),d=n(9219),s=n(90380),c=n(56971),l=n(86184),g=n(3189),u=n(41460),p=n(24791),h=n(10116),m=n.n(h),f=n(14416),y=n(86123),v=n(70942),Z=n(3292),w=n(53198);function b(t,e){if(1&t){const t=r.EpF();r.TgZ(0,"button",7),r.NdJ("click",function(){const e=r.CHM(t).$implicit;return r.oxw().addWidget(e)}),r._uU(1),r.qZA()}if(2&t){const t=e.$implicit;r.xp6(1),r.hij(" ",t," ")}}const A=function(t){return{width:t}};function x(t,e){if(1&t){const t=r.EpF();r.TgZ(0,"button",22),r.NdJ("click",function(){const e=r.CHM(t).$implicit,n=r.oxw(2).$implicit;return r.oxw(2).setWidgetWidth(n,e)}),r._uU(1),r.ALo(2,"translate"),r.qZA()}if(2&t){const t=e.$implicit,n=r.oxw(2).$implicit;r.Q6J("disabled",t===n.width),r.xp6(1),r.hij(" ",r.xi3(2,2,"dashboard.widget-width",r.VKq(5,A,t))," ")}}function C(t,e){if(1&t){const t=r.EpF();r.TgZ(0,"vdr-dashboard-widget",12),r.TgZ(1,"div",13),r.TgZ(2,"div",14),r._UZ(3,"clr-icon",15),r.qZA(),r.TgZ(4,"vdr-dropdown"),r.TgZ(5,"button",16),r._UZ(6,"clr-icon",17),r.qZA(),r.TgZ(7,"vdr-dropdown-menu",3),r.TgZ(8,"h4",18),r._uU(9),r.ALo(10,"translate"),r.qZA(),r.YNc(11,x,3,7,"button",19),r._UZ(12,"div",20),r.TgZ(13,"button",7),r.NdJ("click",function(){r.CHM(t);const e=r.oxw().$implicit;return r.oxw(2).removeWidget(e)}),r._UZ(14,"clr-icon",21),r._uU(15),r.ALo(16,"translate"),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA()}if(2&t){const t=r.oxw().$implicit,e=r.oxw(2);r.Q6J("widgetConfig",t.config),r.xp6(9),r.Oqu(r.lcZ(10,4,"dashboard.widget-resize")),r.xp6(2),r.Q6J("ngForOf",e.getSupportedWidths(t.config)),r.xp6(4),r.hij(" ",r.lcZ(16,6,"dashboard.remove-widget")," ")}}function O(t,e){if(1&t&&(r.TgZ(0,"div",10),r.YNc(1,C,17,8,"vdr-dashboard-widget",11),r.qZA()),2&t){const t=e.$implicit,n=r.oxw(2);r.Q6J("ngClass",n.getClassForWidth(t.width))("cdkDragData",t),r.xp6(1),r.Q6J("vdrIfPermissions",t.config.requiresPermissions||null)}}const _=function(t){return{index:t}};function L(t,e){if(1&t){const t=r.EpF();r.TgZ(0,"div",8),r.NdJ("cdkDropListDropped",function(e){return r.CHM(t),r.oxw().drop(e)}),r.YNc(1,O,2,3,"div",9),r.qZA()}if(2&t){const t=e.$implicit,n=e.index,o=r.oxw();r.Q6J("cdkDropListData",r.VKq(3,_,n)),r.xp6(1),r.Q6J("ngForOf",t)("ngForTrackBy",o.trackRowItem)}}const D=["portal"];function k(t,e){if(1&t&&(r.ynx(0),r._uU(1),r.ALo(2,"translate"),r.BQk()),2&t){const t=e.ngIf;r.xp6(1),r.Oqu(r.lcZ(2,1,t))}}function q(t,e){}const T=function(t){return["/orders/",t]};function W(t,e){if(1&t&&(r.TgZ(0,"td",1),r._uU(1),r._UZ(2,"vdr-order-state-label",2),r.qZA(),r.TgZ(3,"td",1),r._UZ(4,"vdr-customer-label",3),r.qZA(),r.TgZ(5,"td",1),r._uU(6),r.ALo(7,"localeCurrency"),r.qZA(),r.TgZ(8,"td",1),r._uU(9),r.ALo(10,"timeAgo"),r.qZA(),r.TgZ(11,"td",4),r._UZ(12,"vdr-table-row-action",5),r.ALo(13,"translate"),r.qZA()),2&t){const t=e.item;r.xp6(1),r.hij(" ",t.code," "),r.xp6(1),r.Q6J("state",t.state),r.xp6(2),r.Q6J("customer",t.customer),r.xp6(2),r.Oqu(r.xi3(7,7,t.total,t.currencyCode)),r.xp6(3),r.Oqu(r.lcZ(10,10,t.orderPlacedAt)),r.xp6(3),r.Q6J("label",r.lcZ(13,12,"common.open"))("linkTo",r.VKq(14,T,t.id))}}function M(t,e){if(1&t){const t=r.EpF();r.TgZ(0,"div",7),r.TgZ(1,"button",8),r.NdJ("click",function(){r.CHM(t);const e=r.oxw();return e.selection$.next({timeframe:"day",date:e.today})}),r._uU(2),r.ALo(3,"translate"),r.qZA(),r.TgZ(4,"button",8),r.NdJ("click",function(){r.CHM(t);const e=r.oxw();return e.selection$.next({timeframe:"day",date:e.yesterday})}),r._uU(5),r.ALo(6,"translate"),r.qZA(),r.TgZ(7,"button",8),r.NdJ("click",function(){return r.CHM(t),r.oxw().selection$.next({timeframe:"week"})}),r._uU(8),r.ALo(9,"translate"),r.qZA(),r.TgZ(10,"button",8),r.NdJ("click",function(){return r.CHM(t),r.oxw().selection$.next({timeframe:"month"})}),r._uU(11),r.ALo(12,"translate"),r.qZA(),r.qZA()}if(2&t){const t=e.ngIf,n=r.oxw();r.xp6(1),r.ekj("btn-primary",t.date===n.today),r.xp6(1),r.hij(" ",r.lcZ(3,12,"dashboard.today")," "),r.xp6(2),r.ekj("btn-primary",t.date===n.yesterday),r.xp6(1),r.hij(" ",r.lcZ(6,14,"dashboard.yesterday")," "),r.xp6(2),r.ekj("btn-primary","week"===t.timeframe),r.xp6(1),r.hij(" ",r.lcZ(9,16,"dashboard.thisWeek")," "),r.xp6(2),r.ekj("btn-primary","month"===t.timeframe),r.xp6(1),r.hij(" ",r.lcZ(12,18,"dashboard.thisMonth")," ")}}function S(t,e){if(1&t&&(r.TgZ(0,"div",9),r._uU(1),r.ALo(2,"localeDate"),r.ALo(3,"localeDate"),r.qZA()),2&t){const t=e.ngIf;r.xp6(1),r.AsE(" ",r.lcZ(2,2,t.start)," - ",r.lcZ(3,4,t.end)," ")}}function $(t,e){if(1&t&&(r.TgZ(0,"p",4),r._uU(1),r.qZA()),2&t){const t=r.oxw(2);r.xp6(1),r.AsE(" ",t.hideVendureBranding?"":"Vendure"," ",t.hideVersion?"":"Admin UI v"+t.version," ")}}function I(t,e){if(1&t&&(r.TgZ(0,"div"),r.TgZ(1,"h4",3),r._uU(2),r._UZ(3,"br"),r.TgZ(4,"small",4),r._uU(5),r.ALo(6,"timeAgo"),r.qZA(),r.qZA(),r.YNc(7,$,2,2,"p",5),r.qZA()),2&t){const t=e.ngIf,n=r.oxw();r.xp6(2),r.AsE(" Welcome, ",t.firstName," ",t.lastName,""),r.xp6(3),r.hij("Last login: ",r.lcZ(6,4,t.user.lastLogin),""),r.xp6(2),r.Q6J("ngIf",!n.hideVendureBranding||!n.hideVersion)}}class P{constructor(t,e,n,r){this.dashboardWidgetService=t,this.localStorageService=e,this.changedDetectorRef=n,this.dataService=r,this.deletionMarker="__delete__"}ngOnInit(){this.availableWidgetIds$=this.dataService.client.userStatus().stream$.pipe((0,a.U)(({userStatus:t})=>t.permissions),(0,a.U)(t=>this.dashboardWidgetService.getAvailableIds(t)),(0,d.b)(t=>this.widgetLayout=this.initLayout(t)))}getClassForWidth(t){switch(t){case 3:return"clr-col-12 clr-col-sm-6 clr-col-lg-3";case 4:return"clr-col-12 clr-col-sm-6 clr-col-lg-4";case 6:return"clr-col-12 clr-col-lg-6";case 8:return"clr-col-12 clr-col-lg-8";case 12:return"clr-col-12";default:(0,i.assertNever)(t)}}getSupportedWidths(t){return t.supportedWidths||[3,4,6,8,12]}setWidgetWidth(t,e){t.width=e,this.recalculateLayout()}trackRow(t,e){return e.map(t=>`${t.id}:${t.width}`).join("|")}trackRowItem(t,e){return e.config}addWidget(t){var e;const n=this.dashboardWidgetService.getWidgetById(t);if(n){const r={id:t,config:n,width:this.getSupportedWidths(n)[0]};let o;this.widgetLayout&&this.widgetLayout.length?o=this.widgetLayout[this.widgetLayout.length-1]:(o=[],null===(e=this.widgetLayout)||void 0===e||e.push(o)),o.push(r),this.recalculateLayout()}}removeWidget(t){t.id=this.deletionMarker,this.recalculateLayout()}drop(t){const{currentIndex:e,previousIndex:n,previousContainer:r,container:o}=t;if((n!==e||r.data.index!==o.data.index)&&this.widgetLayout){const i=this.widgetLayout[r.data.index],a=this.widgetLayout[o.data.index];i.splice(n,1),a.splice(e,0,t.item.data),this.recalculateLayout()}}initLayout(t){const e=this.localStorageService.get("dashboardWidgetLayout");let n;return e&&(n=e.filter(e=>t.includes(e.id))),this.dashboardWidgetService.getWidgetLayout(n)}recalculateLayout(){if(this.widgetLayout){const t=this.widgetLayout.reduce((t,e)=>[...t,...e],[]).filter(t=>t.id!==this.deletionMarker).map(t=>({id:t.id,width:t.width}));this.widgetLayout=this.dashboardWidgetService.getWidgetLayout(t),this.localStorageService.set("dashboardWidgetLayout",t),setTimeout(()=>this.changedDetectorRef.markForCheck())}}}P.\u0275fac=function(t){return new(t||P)(r.Y36(o.ayj),r.Y36(o.n2A),r.Y36(r.sBO),r.Y36(o.DoR))},P.\u0275cmp=r.Xpm({type:P,selectors:[["vdr-dashboard"]],decls:11,vars:8,consts:[[1,"widget-header"],["vdrDropdownTrigger","",1,"btn","btn-secondary","btn-sm"],["shape","plus"],["vdrPosition","bottom-right"],["class","button","vdrDropdownItem","",3,"click",4,"ngFor","ngForOf"],["cdkDropListGroup",""],["class","clr-row dashboard-row","cdkDropList","","cdkDropListOrientation","horizontal",3,"cdkDropListData","cdkDropListDropped",4,"ngFor","ngForOf","ngForTrackBy"],["vdrDropdownItem","",1,"button",3,"click"],["cdkDropList","","cdkDropListOrientation","horizontal",1,"clr-row","dashboard-row",3,"cdkDropListData","cdkDropListDropped"],["class","dashboard-item","cdkDrag","",3,"ngClass","cdkDragData",4,"ngFor","ngForOf","ngForTrackBy"],["cdkDrag","",1,"dashboard-item",3,"ngClass","cdkDragData"],[3,"widgetConfig",4,"vdrIfPermissions"],[3,"widgetConfig"],[1,"flex"],["cdkDragHandle","",1,"drag-handle"],["shape","drag-handle","size","24"],["vdrDropdownTrigger","",1,"icon-button"],["shape","ellipsis-vertical"],[1,"dropdown-header"],["class","button","vdrDropdownItem","",3,"disabled","click",4,"ngFor","ngForOf"],["role","separator",1,"dropdown-divider"],["shape","trash",1,"is-danger"],["vdrDropdownItem","",1,"button",3,"disabled","click"]],template:function(t,e){1&t&&(r.TgZ(0,"div",0),r.TgZ(1,"vdr-dropdown"),r.TgZ(2,"button",1),r._UZ(3,"clr-icon",2),r._uU(4),r.ALo(5,"translate"),r.qZA(),r.TgZ(6,"vdr-dropdown-menu",3),r.YNc(7,b,2,1,"button",4),r.ALo(8,"async"),r.qZA(),r.qZA(),r.qZA(),r.TgZ(9,"div",5),r.YNc(10,L,2,5,"div",6),r.qZA()),2&t&&(r.xp6(4),r.hij(" ",r.lcZ(5,4,"dashboard.add-widget")," "),r.xp6(3),r.Q6J("ngForOf",r.lcZ(8,6,e.availableWidgetIds$)),r.xp6(3),r.Q6J("ngForOf",e.widgetLayout)("ngForTrackBy",e.trackRow))},directives:function(){return[o.JOL,o.UaT,y.qvL,o.N9E,v.sg,Z.Fd,y.q0d,o.HH4,Z.Wj,Z.Zt,v.mk,o.HAh,U,Z.Bh]},pipes:function(){return[w.X$,v.Ov]},styles:[".widget-header[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.placeholder[_ngcontent-%COMP%]{color:var(--color-grey-300);text-align:center}.placeholder[_ngcontent-%COMP%]   .version[_ngcontent-%COMP%]{font-size:3em;margin:24px;line-height:1em}.placeholder[_ngcontent-%COMP%]     .clr-i-outline{fill:var(--color-grey-200)}vdr-dashboard-widget[_ngcontent-%COMP%]{margin-bottom:24px}.cdk-drag-preview[_ngcontent-%COMP%]{box-sizing:border-box;border-radius:4px}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}.dashboard-row[_ngcontent-%COMP%]{padding:0;border-width:1;margin-bottom:6px;transition:padding .2s,margin .2s}.dashboard-row.cdk-drop-list-dragging[_ngcontent-%COMP%], .dashboard-row.cdk-drop-list-receiving[_ngcontent-%COMP%]{border:1px dashed var(--color-component-border-200);padding:6px}.dashboard-row.cdk-drop-list-dragging[_ngcontent-%COMP%]   .dashboard-item[_ngcontent-%COMP%]:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}"],changeDetection:0}),P.ctorParameters=()=>[{type:o.ayj},{type:o.n2A},{type:r.sBO},{type:o.DoR}];class U{constructor(t){this.componentFactoryResolver=t}ngAfterViewInit(){this.loadWidget()}loadWidget(){return(0,g.mG)(this,void 0,void 0,function*(){const t=this.widgetConfig.loadComponent(),e=t instanceof Promise?yield t:t;this.componentRef=this.portal.createComponent(this.componentFactoryResolver.resolveComponentFactory(e)),this.componentRef.changeDetectorRef.markForCheck()})}ngOnDestroy(){this.componentRef&&this.componentRef.destroy()}}U.\u0275fac=function(t){return new(t||U)(r.Y36(r._Vd))},U.\u0275cmp=r.Xpm({type:U,selectors:[["vdr-dashboard-widget"]],viewQuery:function(t,e){if(1&t&&r.Gf(D,5,r.s_b),2&t){let t;r.iGM(t=r.CRH())&&(e.portal=t.first)}},inputs:{widgetConfig:"widgetConfig"},ngContentSelectors:["*"],decls:9,vars:1,consts:[[1,"card"],[1,"card-header"],[1,"title"],[4,"ngIf"],[1,"controls"],[1,"card-block"],["portal",""]],template:function(t,e){1&t&&(r.F$t(),r.TgZ(0,"div",0),r.TgZ(1,"div",1),r.TgZ(2,"div",2),r.YNc(3,k,3,3,"ng-container",3),r.qZA(),r.TgZ(4,"div",4),r.Hsn(5),r.qZA(),r.qZA(),r.TgZ(6,"div",5),r.YNc(7,q,0,0,"ng-template",null,6,r.W1O),r.qZA(),r.qZA()),2&t&&(r.xp6(3),r.Q6J("ngIf",e.widgetConfig.title))},directives:[v.O5],pipes:[w.X$],styles:["[_nghost-%COMP%]{display:block}.card[_ngcontent-%COMP%]{margin-top:0;min-height:200px}.card-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between}"],changeDetection:0}),U.ctorParameters=()=>[{type:r._Vd}],U.propDecorators={widgetConfig:[{type:r.IIB}],portal:[{type:r.i9L,args:["portal",{read:r.s_b}]}]};const J=[{path:"",component:P,pathMatch:"full"}];class j{constructor(t){this.dataService=t}ngOnInit(){this.latestOrders$=this.dataService.order.getOrders({take:10,filter:{active:{eq:!1}},sort:{orderPlacedAt:o.Asd.DESC}}).refetchOnChannelChange().mapStream(t=>t.orders.items)}}j.\u0275fac=function(t){return new(t||j)(r.Y36(o.DoR))},j.\u0275cmp=r.Xpm({type:j,selectors:[["vdr-latest-orders-widget"]],decls:3,vars:3,consts:[[3,"items"],[1,"left","align-middle"],[3,"state"],[3,"customer"],[1,"right","align-middle"],["iconShape","shopping-cart",3,"label","linkTo"]],template:function(t,e){1&t&&(r.TgZ(0,"vdr-data-table",0),r.ALo(1,"async"),r.YNc(2,W,14,16,"ng-template"),r.qZA()),2&t&&r.Q6J("items",r.lcZ(1,1,e.latestOrders$))},directives:[o.Qj_,o.GXt,o.d$,o.v_8],pipes:[v.Ov,o.kgx,o.eGd,w.X$],styles:["vdr-data-table[_ngcontent-%COMP%]     table{margin-top:0}"],changeDetection:0}),j.ctorParameters=()=>[{type:o.DoR}];class F{}F.\u0275fac=function(t){return new(t||F)},F.\u0275mod=r.oAB({type:F}),F.\u0275inj=r.cJS({imports:[[o.IR2,o.m81]]});class R{constructor(t){this.dataService=t,this.today=new Date,this.yesterday=new Date((new Date).setDate(this.today.getDate()-1)),this.selection$=new f.X({timeframe:"day",date:this.today})}ngOnInit(){this.dateRange$=this.selection$.pipe((0,s.x)(),(0,a.U)(t=>({start:m()(t.date).startOf(t.timeframe).toDate(),end:m()(t.date).endOf(t.timeframe).toDate()})),(0,c.d)(1));const t=this.dateRange$.pipe((0,l.w)(({start:t,end:e})=>this.dataService.order.getOrderSummary(t,e).refetchOnChannelChange().mapStream(t=>t.orders)),(0,c.d)(1));this.totalOrderCount$=t.pipe((0,a.U)(t=>t.totalItems)),this.totalOrderValue$=t.pipe((0,a.U)(t=>t.items.reduce((t,e)=>t+e.total,0)/100)),this.currencyCode$=this.dataService.settings.getActiveChannel().refetchOnChannelChange().mapStream(t=>t.activeChannel.currencyCode||void 0)}}R.\u0275fac=function(t){return new(t||R)(r.Y36(o.DoR))},R.\u0275cmp=r.Xpm({type:R,selectors:[["vdr-order-summary-widget"]],decls:22,vars:23,consts:[[1,"stats"],[1,"stat"],[1,"stat-figure"],[1,"stat-label"],[1,"footer"],["class","btn-group btn-outline-primary btn-sm",4,"ngIf"],["class","date-range p5",4,"ngIf"],[1,"btn-group","btn-outline-primary","btn-sm"],[1,"btn",3,"click"],[1,"date-range","p5"]],template:function(t,e){1&t&&(r.TgZ(0,"div",0),r.TgZ(1,"div",1),r.TgZ(2,"div",2),r._uU(3),r.ALo(4,"async"),r.qZA(),r.TgZ(5,"div",3),r._uU(6),r.ALo(7,"translate"),r.qZA(),r.qZA(),r.TgZ(8,"div",1),r.TgZ(9,"div",2),r._uU(10),r.ALo(11,"currency"),r.ALo(12,"async"),r.ALo(13,"async"),r.qZA(),r.TgZ(14,"div",3),r._uU(15),r.ALo(16,"translate"),r.qZA(),r.qZA(),r.qZA(),r.TgZ(17,"div",4),r.YNc(18,M,13,20,"div",5),r.ALo(19,"async"),r.YNc(20,S,4,6,"div",6),r.ALo(21,"async"),r.qZA()),2&t&&(r.xp6(3),r.Oqu(r.lcZ(4,6,e.totalOrderCount$)),r.xp6(3),r.Oqu(r.lcZ(7,8,"dashboard.total-orders")),r.xp6(4),r.hij(" ",r.xi3(11,10,r.lcZ(12,13,e.totalOrderValue$),r.lcZ(13,15,e.currencyCode$)||void 0)," "),r.xp6(5),r.Oqu(r.lcZ(16,17,"dashboard.total-order-value")),r.xp6(3),r.Q6J("ngIf",r.lcZ(19,19,e.selection$)),r.xp6(2),r.Q6J("ngIf",r.lcZ(21,21,e.dateRange$)))},directives:[v.O5],pipes:[v.Ov,w.X$,v.H9,o.HbD],styles:[".stats[_ngcontent-%COMP%]{display:flex;justify-content:space-evenly}.stat[_ngcontent-%COMP%]{text-align:center}.stat-figure[_ngcontent-%COMP%]{font-size:2rem;line-height:3rem}.stat-label[_ngcontent-%COMP%]{text-transform:uppercase}.date-range[_ngcontent-%COMP%]{margin-top:0}.footer[_ngcontent-%COMP%]{margin-top:24px;display:flex;flex-direction:column;justify-content:space-between}@media screen and (min-width: 768px){.footer[_ngcontent-%COMP%]{flex-direction:row}}"],changeDetection:0}),R.ctorParameters=()=>[{type:o.DoR}];class N{}N.\u0275fac=function(t){return new(t||N)},N.\u0275mod=r.oAB({type:N}),N.\u0275inj=r.cJS({imports:[[o.IR2]]});class B{}B.\u0275fac=function(t){return new(t||B)},B.\u0275cmp=r.Xpm({type:B,selectors:[["vdr-test-widget"]],decls:2,vars:0,template:function(t,e){1&t&&(r.TgZ(0,"p"),r._uU(1,"This is a test widget!"),r.qZA())},styles:[""],changeDetection:0});class Q{}Q.\u0275fac=function(t){return new(t||Q)},Q.\u0275mod=r.oAB({type:Q}),Q.\u0275inj=r.cJS({});class Y{constructor(t){this.dataService=t,this.version=o.s5M,this.brand=(0,o.hq7)().brand,this.hideVendureBranding=(0,o.hq7)().hideVendureBranding,this.hideVersion=(0,o.hq7)().hideVersion}ngOnInit(){this.administrator$=this.dataService.administrator.getActiveAdministrator().mapStream(t=>t.activeAdministrator||null)}}Y.\u0275fac=function(t){return new(t||Y)(r.Y36(o.DoR))},Y.\u0275cmp=r.Xpm({type:Y,selectors:[["vdr-welcome-widget"]],decls:4,vars:3,consts:[[4,"ngIf"],[1,"placeholder"],["shape","line-chart","size","128"],[1,"h4"],[1,"p5"],["class","p5",4,"ngIf"]],template:function(t,e){1&t&&(r.YNc(0,I,8,6,"div",0),r.ALo(1,"async"),r.TgZ(2,"div",1),r._UZ(3,"clr-icon",2),r.qZA()),2&t&&r.Q6J("ngIf",r.lcZ(1,1,e.administrator$))},directives:[v.O5,y.qvL],pipes:[v.Ov,o.eGd],styles:["[_nghost-%COMP%]{display:flex;justify-content:space-between}.placeholder[_ngcontent-%COMP%]{color:var(--color-grey-200)}"],changeDetection:0}),Y.ctorParameters=()=>[{type:o.DoR}];class H{}H.\u0275fac=function(t){return new(t||H)},H.\u0275mod=r.oAB({type:H}),H.\u0275inj=r.cJS({imports:[[o.IR2]]});const V=[{id:"welcome",width:12},{id:"orderSummary",width:6},{id:"latestOrders",width:6}],E=()=>Y,X=()=>R,z=()=>j,G=()=>B,K={welcome:{loadComponent:E},orderSummary:{title:(0,p.J)("dashboard.orders-summary"),loadComponent:X,requiresPermissions:[o.y3$.ReadOrder]},latestOrders:{title:(0,p.J)("dashboard.latest-orders"),loadComponent:z,supportedWidths:[6,8,12],requiresPermissions:[o.y3$.ReadOrder]},testWidget:{title:"Test Widget",loadComponent:G}};class tt{constructor(t){Object.entries(K).map(([e,n])=>t.registerWidget(e,n)),0===t.getDefaultLayout().length&&t.setDefaultLayout(V)}}tt.\u0275fac=function(t){return new(t||tt)(r.LFG(o.ayj))},tt.\u0275mod=r.oAB({type:tt}),tt.\u0275inj=r.cJS({imports:[[o.m81,u.Bz.forChild(J)]]}),tt.ctorParameters=()=>[{type:o.ayj}]}}]);
//# sourceMappingURL=672-es2015.d6543941ac237370c4ce.js.map
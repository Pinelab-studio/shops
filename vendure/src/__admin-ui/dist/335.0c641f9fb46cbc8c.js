"use strict";(self.webpackChunkvendure_admin=self.webpackChunkvendure_admin||[]).push([[335],{3335:(g,i,e)=>{e.r(i),e.d(i,{StockWidgetComponent:()=>c});var r=e(5592),d=e(6335),t=e(6108),u=e(8046),l=e(4285);const _=function(s,o){return["/catalog","products",s,"variants",o]};function m(s,o){if(1&s&&(t.TgZ(0,"td",1)(1,"a",2),t._uU(2),t.qZA()(),t.TgZ(3,"td",1),t._uU(4),t.qZA()),2&s){const n=o.item,a=t.oxw();t.ekj("out-of-stock",!n.stockOnHand),t.xp6(1),t.Q6J("routerLink",t.WLB(7,_,n.productId,n.id)),t.xp6(1),t.Oqu(n.name),t.xp6(1),t.ekj("out-of-stock",!n.stockOnHand),t.xp6(1),t.hij(" ",a.reduceSum(n.stockLevels)," ")}}class c{constructor(o){this.dataService=o}ngOnInit(){this.variant$=this.dataService.query(d.ZP`
          query productVariantsWithLowStock {
            productVariantsWithLowStock {
              id
              name
              enabled
              stockOnHand
              productId
              stockLevels {
                stockOnHand
              }
            }
          }
        `).mapStream(o=>o.productVariantsWithLowStock)}reduceSum(o){return o.reduce((n,a)=>n+a.stockOnHand,0)}static#t=this.\u0275fac=function(n){return new(n||c)(t.Y36(r.DoR))};static#n=this.\u0275cmp=t.Xpm({type:c,selectors:[["stock-widget"]],standalone:!0,features:[t.jDz],decls:3,vars:3,consts:[[1,"stock-widget-overflow",3,"items"],[1,"left","align-middle"],[3,"routerLink"]],template:function(n,a){1&n&&(t.TgZ(0,"vdr-data-table",0),t.ALo(1,"async"),t.YNc(2,m,5,10,"ng-template"),t.qZA()),2&n&&t.Q6J("items",t.lcZ(1,1,a.variant$))},dependencies:[r.m81,u.Ov,l.rH,r.Qj_],styles:[".out-of-stock[_ngcontent-%COMP%]{background-color:#fce2de}\n\n/*# sourceMappingURL=stock-widget.ts-angular-inline--7.css.map*/",".stock-widget-overflow[_ngcontent-%COMP%]{max-height:300px;overflow:scroll}\n\n/*# sourceMappingURL=stock-widget.ts-angular-inline--8.css.map*/"]})}}}]);
//# sourceMappingURL=335.0c641f9fb46cbc8c.js.map
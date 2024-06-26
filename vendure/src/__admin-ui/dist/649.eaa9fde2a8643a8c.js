"use strict";(self.webpackChunkvendure_admin=self.webpackChunkvendure_admin||[]).push([[649],{6649:(g,i,o)=>{o.r(i),o.d(i,{StockWidgetComponent:()=>s});var r=o(734),d=o(5972),t=o(5220),u=o(1133),l=o(2703);const m=c=>["/catalog","inventory",c];function _(c,e){if(1&c&&(t.j41(0,"td",1)(1,"a",2),t.EFF(2),t.k0s()(),t.j41(3,"td",1),t.EFF(4),t.k0s()),2&c){const n=e.item,a=t.XpG();t.AVh("out-of-stock",!n.stockOnHand),t.R7$(),t.Y8G("routerLink",t.eq3(7,m,n.productId)),t.R7$(),t.JRh(n.name),t.R7$(),t.AVh("out-of-stock",!n.stockOnHand),t.R7$(),t.SpI(" ",a.reduceSum(n.stockLevels)," ")}}class s{constructor(e){this.dataService=e}ngOnInit(){this.variant$=this.dataService.query(d.Ay`
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
        `).mapStream(e=>e.productVariantsWithLowStock)}reduceSum(e){return e.reduce((n,a)=>n+a.stockOnHand,0)}static#t=this.\u0275fac=function(n){return new(n||s)(t.rXU(r.uSP))};static#n=this.\u0275cmp=t.VBU({type:s,selectors:[["stock-widget"]],standalone:!0,features:[t.aNF],decls:3,vars:3,consts:[[1,"stock-widget-overflow",3,"items"],[1,"left","align-middle"],[3,"routerLink"]],template:function(n,a){1&n&&(t.j41(0,"vdr-data-table",0),t.nI1(1,"async"),t.DNE(2,_,5,9,"ng-template"),t.k0s()),2&n&&t.Y8G("items",t.bMT(1,1,a.variant$))},dependencies:[r.GgS,u.Jj,l.Wk,r.up],styles:[".out-of-stock[_ngcontent-%COMP%]{background-color:#fce2de}\n\n/*# sourceMappingURL=stock-widget.ts-angular-inline--7.css.map*/",".stock-widget-overflow[_ngcontent-%COMP%]{max-height:300px;overflow:scroll}\n\n/*# sourceMappingURL=stock-widget.ts-angular-inline--8.css.map*/"]})}}}]);
//# sourceMappingURL=649.eaa9fde2a8643a8c.js.map
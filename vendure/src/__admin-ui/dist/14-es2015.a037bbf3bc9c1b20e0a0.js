(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{lZdz:function(o,e,t){"use strict";t.r(e),t.d(e,"WebhookModule",function(){return d});var r=t("sEIs"),i=t("ixhn"),c=t("D57K"),n=t("nIj0"),s=t("Z4DO");const a=s.a`
  mutation updateWebhook($url: String!) {
    updateWebhook(url: $url)
  }
`,u=s.a`
  query webhook {
    webhook
  }
`;var h=t("EM62");class b{constructor(o,e,t,r,i,c,s){this.formBuilder=r,this.dataService=i,this.changeDetector=c,this.notificationService=s,this.webhookForm=this.formBuilder.group({url:["https://example.com",n.C.required]})}ngOnInit(){return Object(c.b)(this,void 0,void 0,function*(){yield this.dataService.query(u).mapStream(o=>o.webhook).subscribe(o=>this.webhookForm.controls.url.setValue(o))})}save(){return Object(c.b)(this,void 0,void 0,function*(){console.log("SAVEDDD",this.webhookForm.value.url);try{if(this.webhookForm.dirty){const o=this.webhookForm.value;yield this.dataService.mutate(a,{url:o.url}).toPromise()}this.webhookForm.markAsPristine(),this.changeDetector.markForCheck(),this.notificationService.success("common.notify-update-success",{entity:"Webhook"})}catch(o){this.notificationService.error("common.notify-update-error",{entity:"Webhook"})}})}}b.\u0275fac=function(o){return new(o||b)(h.dc(r.a),h.dc(r.e),h.dc(i.Mb),h.dc(n.e),h.dc(i.L),h.dc(h.k),h.dc(i.Eb))},b.\u0275cmp=h.Xb({type:b,selectors:[["greeter"]],decls:8,vars:2,consts:[[1,"clr-row"],[1,"clr-col"],[1,"form",3,"formGroup"],[1,"form-block"],["label","Webhook url","for","url"],["id","url","type","text","formControlName","url"],[1,"btn","btn-primary",3,"disabled","click"]],template:function(o,e){1&o&&(h.jc(0,"div",0),h.jc(1,"div",1),h.jc(2,"form",2),h.jc(3,"section",3),h.jc(4,"vdr-form-field",4),h.ec(5,"input",5),h.ic(),h.jc(6,"button",6),h.qc("click",function(){return e.save()}),h.Vc(7," Save "),h.ic(),h.ic(),h.ic(),h.ic(),h.ic()),2&o&&(h.Sb(2),h.zc("formGroup",e.webhookForm),h.Sb(4),h.zc("disabled",e.webhookForm.invalid||e.webhookForm.pristine))},directives:[n.E,n.q,n.j,i.db,i.eb,n.b,n.p,n.h],encapsulation:2});class d{}d.\u0275fac=function(o){return new(o||d)},d.\u0275mod=h.bc({type:d}),d.\u0275inj=h.ac({providers:[Object(i.Xb)({id:"webhook",label:"Webhook",routerLink:["/extensions/webhook"],icon:"cursor-hand-open"},"settings")],imports:[[i.Nb,r.i.forChild([{path:"",pathMatch:"full",component:b,data:{breadcrumb:"Webhook"}}])]]})}}]);
//# sourceMappingURL=14-es2015.a037bbf3bc9c1b20e0a0.js.map
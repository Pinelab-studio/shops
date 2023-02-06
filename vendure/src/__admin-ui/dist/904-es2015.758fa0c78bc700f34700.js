"use strict";(self.webpackChunkvendure_admin_ui=self.webpackChunkvendure_admin_ui||[]).push([[904],{16904:function(e,i,t){t.r(i),t.d(i,{MyparcelModule:function(){return m}});var r=t(41460),o=t(329),n=t(3189),a=t(83974);const c=a.ZP`
  mutation updateMyparcelConfig($input: MyparcelConfigInput!) {
    updateMyparcelConfig(input: $input) {
      apiKey
    }
  }
`,s=a.ZP`
  query myparcelConfig {
    myparcelConfig {
      apiKey
    }
  }
`;var p=t(51694),u=t(21067);class l{constructor(e,i,t,r){this.formBuilder=e,this.dataService=i,this.changeDetector=t,this.notificationService=r,this.form=this.formBuilder.group({apiKey:["your-api-key"]})}ngOnInit(){return(0,n.mG)(this,void 0,void 0,function*(){yield this.dataService.query(s).mapStream(e=>e.myparcelConfig).subscribe(e=>this.form.controls.apiKey.setValue(e.apiKey))})}save(){return(0,n.mG)(this,void 0,void 0,function*(){try{if(this.form.dirty){const e=this.form.value;yield this.dataService.mutate(c,{input:{apiKey:e.apiKey}}).toPromise()}this.form.markAsPristine(),this.changeDetector.markForCheck(),this.notificationService.success("common.notify-update-success",{entity:"MyparcelConfig"})}catch(e){this.notificationService.error("common.notify-update-error",{entity:"MyparcelConfig"})}})}}l.\u0275fac=function(e){return new(e||l)(p.Y36(u.qu),p.Y36(o.DoR),p.Y36(p.sBO),p.Y36(o.gqp))},l.\u0275cmp=p.Xpm({type:l,selectors:[["myparcel-component"]],decls:8,vars:2,consts:[[1,"clr-row"],[1,"clr-col"],[1,"form",3,"formGroup"],[1,"form-block"],["label","MyParcel apikey","for","apiKey"],["id","apiKey","type","text","formControlName","apiKey"],[1,"btn","btn-primary",3,"disabled","click"]],template:function(e,i){1&e&&(p.TgZ(0,"div",0),p.TgZ(1,"div",1),p.TgZ(2,"form",2),p.TgZ(3,"section",3),p.TgZ(4,"vdr-form-field",4),p._UZ(5,"input",5),p.qZA(),p.TgZ(6,"button",6),p.NdJ("click",function(){return i.save()}),p._uU(7," Save "),p.qZA(),p.qZA(),p.qZA(),p.qZA(),p.qZA()),2&e&&(p.xp6(2),p.Q6J("formGroup",i.form),p.xp6(4),p.Q6J("disabled",i.form.invalid||i.form.pristine))},directives:[u._Y,u.JL,u.sg,o.hgI,o.y_K,u.Fj,u.JJ,u.u],encapsulation:2});class m{}m.\u0275fac=function(e){return new(e||m)},m.\u0275mod=p.oAB({type:m}),m.\u0275inj=p.cJS({providers:[(0,o.e$Y)({id:"myparcel",label:"MyParcel",routerLink:["/extensions/myparcel"],icon:"cursor-hand-open"},"settings")],imports:[[o.m81,r.Bz.forChild([{path:"",pathMatch:"full",component:l,data:{breadcrumb:"MyParcel"}}])]]})}}]);
//# sourceMappingURL=904-es2015.758fa0c78bc700f34700.js.map
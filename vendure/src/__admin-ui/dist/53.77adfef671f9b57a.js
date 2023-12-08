"use strict";(self.webpackChunkvendure_admin=self.webpackChunkvendure_admin||[]).push([[53],{9053:(g,u,n)=>{n.r(u),n.d(u,{EBoekhoudenModule:()=>s});var f=n(4285),a=n(1767),d=n(6642),m=n(9248);const h=m.ZP`
  mutation updateEBoekhoudenConfig($input: EBoekhoudenConfigInput!) {
    updateEBoekhoudenConfig(input: $input) {
      enabled
      username
      secret1
      secret2
      account
      contraAccount
    }
  }
`,p=m.ZP`
  query eBoekhoudenConfig {
    eBoekhoudenConfig {
      enabled
      username
      secret1
      secret2
      account
      contraAccount
    }
  }
`;var e=n(6108),r=n(5086),b=n(2977);class i{constructor(t,o,c,l){this.formBuilder=t,this.dataService=o,this.changeDetector=c,this.notificationService=l,this.form=this.formBuilder.group({enabled:["enabled"],username:["username"],secret1:["secret1"],secret2:["secret2"],account:["account"],contraAccount:["contraAccount"]})}ngOnInit(){var t=this;return(0,d.Z)(function*(){yield t.dataService.query(p).mapStream(o=>o.eBoekhoudenConfig).subscribe(o=>t.setValues(o))})()}save(){var t=this;return(0,d.Z)(function*(){try{if(t.form.dirty){const o=t.form.value,c=yield t.dataService.mutate(h,{input:{...o}}).toPromise();t.setValues(c?.updateEBoekhoudenConfig)}t.form.markAsPristine(),t.changeDetector.markForCheck(),t.notificationService.success("common.notify-update-success",{entity:"Eboekhouden config"})}catch{t.notificationService.error("common.notify-update-error",{entity:"Eboekhouden config"})}})()}setValues(t){this.form.controls.enabled.setValue(t?.enabled),this.form.controls.username.setValue(t?.username),this.form.controls.secret1.setValue(t?.secret1),this.form.controls.secret2.setValue(t?.secret2),this.form.controls.account.setValue(t?.account),this.form.controls.contraAccount.setValue(t?.contraAccount)}static#e=this.\u0275fac=function(o){return new(o||i)(e.Y36(r.qu),e.Y36(a.DoR),e.Y36(e.sBO),e.Y36(a.gqp))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["e-boekhouden-component"]],decls:16,vars:2,consts:[[1,"form",3,"formGroup"],[1,"form-block"],["label","Enabled","for","enabled"],["type","checkbox","name","enabled","clrCheckbox","","formControlName","enabled"],["label","Username","for","username"],["id","username","type","text","formControlName","username"],["label","Secret 1","for","secret1"],["id","secret1","type","text","formControlName","secret1"],["label","Secret 2","for","secret2"],["id","secret2","type","text","formControlName","secret2"],["label","Account","for","account"],["id","account","type","text","formControlName","account"],["label","Contra account","for","contraAccount"],["id","contraAccount","type","text","formControlName","contraAccount"],[1,"btn","btn-primary",3,"disabled","click"]],template:function(o,c){1&o&&(e.TgZ(0,"form",0)(1,"section",1)(2,"vdr-form-field",2),e._UZ(3,"input",3),e.qZA(),e.TgZ(4,"vdr-form-field",4),e._UZ(5,"input",5),e.qZA(),e.TgZ(6,"vdr-form-field",6),e._UZ(7,"input",7),e.qZA(),e.TgZ(8,"vdr-form-field",8),e._UZ(9,"input",9),e.qZA(),e.TgZ(10,"vdr-form-field",10),e._UZ(11,"input",11),e.qZA(),e.TgZ(12,"vdr-form-field",12),e._UZ(13,"input",13),e.qZA(),e.TgZ(14,"button",14),e.NdJ("click",function(){return c.save()}),e._uU(15," Save "),e.qZA()()()),2&o&&(e.Q6J("formGroup",c.form),e.xp6(14),e.Q6J("disabled",c.form.invalid||c.form.pristine))},dependencies:[b.KKC,r._Y,r.Fj,r.Wl,r.JJ,r.JL,r.sg,r.u,a.hgI,a.y_K],encapsulation:2})}class s{static#e=this.\u0275fac=function(o){return new(o||s)};static#t=this.\u0275mod=e.oAB({type:s});static#o=this.\u0275inj=e.cJS({imports:[a.m81,f.Bz.forChild([{path:"",pathMatch:"full",component:i,data:{breadcrumb:"e-Boekhouden"}}])]})}}}]);
//# sourceMappingURL=53.77adfef671f9b57a.js.map
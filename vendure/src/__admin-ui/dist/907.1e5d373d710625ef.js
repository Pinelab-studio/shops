"use strict";(self.webpackChunkvendure_admin=self.webpackChunkvendure_admin||[]).push([[907],{1907:(b,u,n)=>{n.r(u),n.d(u,{EBoekhoudenModule:()=>i});var l=n(2703),a=n(734),m=n(5774),d=n(5972);const h=d.Ay`
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
`,p=d.Ay`
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
`;var e=n(5220),r=n(4725),k=n(4225);class s{constructor(t,o,c,f){this.formBuilder=t,this.dataService=o,this.changeDetector=c,this.notificationService=f,this.form=this.formBuilder.group({enabled:["enabled"],username:["username"],secret1:["secret1"],secret2:["secret2"],account:["account"],contraAccount:["contraAccount"]})}ngOnInit(){var t=this;return(0,m.A)(function*(){yield t.dataService.query(p).mapStream(o=>o.eBoekhoudenConfig).subscribe(o=>t.setValues(o))})()}save(){var t=this;return(0,m.A)(function*(){try{if(t.form.dirty){const o=t.form.value,c=yield t.dataService.mutate(h,{input:{...o}}).toPromise();t.setValues(c?.updateEBoekhoudenConfig)}t.form.markAsPristine(),t.changeDetector.markForCheck(),t.notificationService.success("common.notify-update-success",{entity:"Eboekhouden config"})}catch{t.notificationService.error("common.notify-update-error",{entity:"Eboekhouden config"})}})()}setValues(t){this.form.controls.enabled.setValue(t?.enabled),this.form.controls.username.setValue(t?.username),this.form.controls.secret1.setValue(t?.secret1),this.form.controls.secret2.setValue(t?.secret2),this.form.controls.account.setValue(t?.account),this.form.controls.contraAccount.setValue(t?.contraAccount)}static#e=this.\u0275fac=function(o){return new(o||s)(e.rXU(r.ok),e.rXU(a.uSP),e.rXU(e.gRc),e.rXU(a.JEu))};static#t=this.\u0275cmp=e.VBU({type:s,selectors:[["e-boekhouden-component"]],decls:16,vars:2,consts:[[1,"form",3,"formGroup"],[1,"form-block"],["label","Enabled","for","enabled"],["type","checkbox","name","enabled","clrCheckbox","","formControlName","enabled"],["label","Username","for","username"],["id","username","type","text","formControlName","username"],["label","Secret 1","for","secret1"],["id","secret1","type","text","formControlName","secret1"],["label","Secret 2","for","secret2"],["id","secret2","type","text","formControlName","secret2"],["label","Account","for","account"],["id","account","type","text","formControlName","account"],["label","Contra account","for","contraAccount"],["id","contraAccount","type","text","formControlName","contraAccount"],[1,"btn","btn-primary",3,"click","disabled"]],template:function(o,c){1&o&&(e.j41(0,"form",0)(1,"section",1)(2,"vdr-form-field",2),e.nrm(3,"input",3),e.k0s(),e.j41(4,"vdr-form-field",4),e.nrm(5,"input",5),e.k0s(),e.j41(6,"vdr-form-field",6),e.nrm(7,"input",7),e.k0s(),e.j41(8,"vdr-form-field",8),e.nrm(9,"input",9),e.k0s(),e.j41(10,"vdr-form-field",10),e.nrm(11,"input",11),e.k0s(),e.j41(12,"vdr-form-field",12),e.nrm(13,"input",13),e.k0s(),e.j41(14,"button",14),e.bIt("click",function(){return c.save()}),e.EFF(15," Save "),e.k0s()()()),2&o&&(e.Y8G("formGroup",c.form),e.R7$(14),e.Y8G("disabled",c.form.invalid||c.form.pristine))},dependencies:[k.Jej,r.qT,r.me,r.Zm,r.BC,r.cb,r.j4,r.JD,a.KSf,a.Vr5],encapsulation:2})}class i{static#e=this.\u0275fac=function(o){return new(o||i)};static#t=this.\u0275mod=e.$C({type:i});static#o=this.\u0275inj=e.G2t({imports:[a.GgS,l.iI.forChild([{path:"",pathMatch:"full",component:s,data:{breadcrumb:"e-Boekhouden"}}])]})}}}]);
//# sourceMappingURL=907.1e5d373d710625ef.js.map
"use strict";(self.webpackChunkvendure_admin=self.webpackChunkvendure_admin||[]).push([[612],{4612:(C,a,r)=>{r.r(a),r.d(a,{SendcloudModule:()=>l});var p=r(2703),u=r(734),d=r(5774),m=r(5972);const h=m.Ay`
  mutation updateSendCloudConfig($input: SendCloudConfigInput) {
    updateSendCloudConfig(input: $input) {
      id
      secret
      publicKey
      defaultPhoneNr
    }
  }
`,y=m.Ay`
  query sendCloudConfig {
    sendCloudConfig {
      id
      secret
      publicKey
      defaultPhoneNr
    }
  }
`;var e=r(5220),o=r(4725),c=r(4225);class s{constructor(n,t,i,f){this.formBuilder=n,this.dataService=t,this.changeDetector=i,this.notificationService=f,this.form=this.formBuilder.group({secret:["your-secret"],publicKey:["your-public-key"],defaultPhoneNr:["your-phone-number"]})}ngOnInit(){var n=this;return(0,d.A)(function*(){yield n.dataService.query(y).mapStream(t=>t.sendCloudConfig).subscribe(t=>{n.form.controls.secret.setValue(t.secret),n.form.controls.publicKey.setValue(t.publicKey),n.form.controls.defaultPhoneNr.setValue(t.defaultPhoneNr)})})()}save(){var n=this;return(0,d.A)(function*(){try{if(n.form.dirty){const t=n.form.value;yield n.dataService.mutate(h,{input:{secret:t.secret,publicKey:t.publicKey,defaultPhoneNr:t.defaultPhoneNr}}).toPromise()}n.form.markAsPristine(),n.changeDetector.markForCheck(),n.notificationService.success("common.notify-update-success",{entity:"SendCloud config"})}catch{n.notificationService.error("common.notify-update-error",{entity:"SendCloud config"})}})()}static#e=this.\u0275fac=function(t){return new(t||s)(e.rXU(o.ok),e.rXU(u.uSP),e.rXU(e.gRc),e.rXU(u.JEu))};static#t=this.\u0275cmp=e.VBU({type:s,selectors:[["sendcloud-component"]],decls:21,vars:2,consts:[[1,"clr-row"],[1,"clr-col"],["clrForm","",3,"formGroup"],["id","secret","type","text","formControlName","secret","clrInput","","size","28"],["id","publicKey","type","text","formControlName","publicKey","clrInput","","size","28"],["id","defaultPhoneNr","type","text","formControlName","defaultPhoneNr","clrInput","","size","28"],[1,"btn","btn-primary",2,"margin-left","20rem",3,"click","disabled"]],template:function(t,i){1&t&&(e.j41(0,"div",0)(1,"div",1)(2,"form",2)(3,"clr-input-container")(4,"label"),e.EFF(5,"SendCloud secret"),e.k0s(),e.nrm(6,"input",3),e.k0s(),e.j41(7,"clr-input-container")(8,"label"),e.EFF(9,"SendCloud public key"),e.k0s(),e.nrm(10,"input",4),e.k0s(),e.j41(11,"clr-input-container")(12,"label"),e.EFF(13,"Fallback phone nr."),e.k0s(),e.nrm(14,"input",5),e.j41(15,"clr-control-helper"),e.EFF(16,"Used when a customer hasn't entered a phone number. "),e.nrm(17,"br"),e.EFF(18," Phone number is required in some cases by Sendcloud"),e.k0s()(),e.j41(19,"button",6),e.bIt("click",function(){return i.save()}),e.EFF(20," Save "),e.k0s()()()()),2&t&&(e.R7$(2),e.Y8G("formGroup",i.form),e.R7$(17),e.Y8G("disabled",i.form.invalid||i.form.pristine))},dependencies:[c.aZZ,c.bnk,c.mDd,c.icl,c.Xu5,o.qT,o.me,o.BC,o.cb,o.j4,o.JD,u.Vr5],encapsulation:2})}class l{static#e=this.\u0275fac=function(t){return new(t||l)};static#t=this.\u0275mod=e.$C({type:l});static#n=this.\u0275inj=e.G2t({imports:[u.GgS,p.iI.forChild([{path:"",pathMatch:"full",component:s,data:{breadcrumb:"SendCloud"}}])]})}}}]);
//# sourceMappingURL=612.da4e97f187afa471.js.map
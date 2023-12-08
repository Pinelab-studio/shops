"use strict";(self.webpackChunkvendure_admin=self.webpackChunkvendure_admin||[]).push([[306],{1306:(C,a,o)=>{o.r(a),o.d(a,{SendcloudModule:()=>s});var p=o(4285),c=o(1767),d=o(6642),m=o(9248);const h=m.ZP`
  mutation updateSendCloudConfig($input: SendCloudConfigInput) {
    updateSendCloudConfig(input: $input) {
      id
      secret
      publicKey
      defaultPhoneNr
    }
  }
`,y=m.ZP`
  query sendCloudConfig {
    sendCloudConfig {
      id
      secret
      publicKey
      defaultPhoneNr
    }
  }
`;var e=o(6108),r=o(5086),u=o(2977);class l{constructor(n,t,i,f){this.formBuilder=n,this.dataService=t,this.changeDetector=i,this.notificationService=f,this.form=this.formBuilder.group({secret:["your-secret"],publicKey:["your-public-key"],defaultPhoneNr:["your-phone-number"]})}ngOnInit(){var n=this;return(0,d.Z)(function*(){yield n.dataService.query(y).mapStream(t=>t.sendCloudConfig).subscribe(t=>{n.form.controls.secret.setValue(t.secret),n.form.controls.publicKey.setValue(t.publicKey),n.form.controls.defaultPhoneNr.setValue(t.defaultPhoneNr)})})()}save(){var n=this;return(0,d.Z)(function*(){try{if(n.form.dirty){const t=n.form.value;yield n.dataService.mutate(h,{input:{secret:t.secret,publicKey:t.publicKey,defaultPhoneNr:t.defaultPhoneNr}}).toPromise()}n.form.markAsPristine(),n.changeDetector.markForCheck(),n.notificationService.success("common.notify-update-success",{entity:"SendCloud config"})}catch{n.notificationService.error("common.notify-update-error",{entity:"SendCloud config"})}})()}static#e=this.\u0275fac=function(t){return new(t||l)(e.Y36(r.qu),e.Y36(c.DoR),e.Y36(e.sBO),e.Y36(c.gqp))};static#t=this.\u0275cmp=e.Xpm({type:l,selectors:[["sendcloud-component"]],decls:21,vars:2,consts:[[1,"clr-row"],[1,"clr-col"],["clrForm","",3,"formGroup"],["id","secret","type","text","formControlName","secret","clrInput","","size","28"],["id","publicKey","type","text","formControlName","publicKey","clrInput","","size","28"],["id","defaultPhoneNr","type","text","formControlName","defaultPhoneNr","clrInput","","size","28"],[1,"btn","btn-primary",2,"margin-left","20rem",3,"disabled","click"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"form",2)(3,"clr-input-container")(4,"label"),e._uU(5,"SendCloud secret"),e.qZA(),e._UZ(6,"input",3),e.qZA(),e.TgZ(7,"clr-input-container")(8,"label"),e._uU(9,"SendCloud public key"),e.qZA(),e._UZ(10,"input",4),e.qZA(),e.TgZ(11,"clr-input-container")(12,"label"),e._uU(13,"Fallback phone nr."),e.qZA(),e._UZ(14,"input",5),e.TgZ(15,"clr-control-helper"),e._uU(16,"Used when a customer hasn't entered a phone number. "),e._UZ(17,"br"),e._uU(18," Phone number is required in some cases by Sendcloud"),e.qZA()(),e.TgZ(19,"button",6),e.NdJ("click",function(){return i.save()}),e._uU(20," Save "),e.qZA()()()()),2&t&&(e.xp6(2),e.Q6J("formGroup",i.form),e.xp6(17),e.Q6J("disabled",i.form.invalid||i.form.pristine))},dependencies:[u.MgK,u.CM6,u.YAP,u.xRP,u.G55,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u,c.y_K],encapsulation:2})}class s{static#e=this.\u0275fac=function(t){return new(t||s)};static#t=this.\u0275mod=e.oAB({type:s});static#n=this.\u0275inj=e.cJS({imports:[c.m81,p.Bz.forChild([{path:"",pathMatch:"full",component:l,data:{breadcrumb:"SendCloud"}}])]})}}}]);
//# sourceMappingURL=306.bd450c8fa3089959.js.map
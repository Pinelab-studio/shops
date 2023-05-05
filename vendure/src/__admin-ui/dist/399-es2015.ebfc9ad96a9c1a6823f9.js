"use strict";(self.webpackChunkvendure_admin_ui=self.webpackChunkvendure_admin_ui||[]).push([[399],{91399:function(e,t,o){o.r(t),o.d(t,{SendcloudModule:function(){return f}});var r=o(41460),i=o(329),n=o(3189),u=o(93610);const c=u.ZP`
  mutation updateSendCloudConfig($input: SendCloudConfigInput) {
    updateSendCloudConfig(input: $input) {
      id
      secret
      publicKey
      defaultPhoneNr
    }
  }
`,d=u.ZP`
  query sendCloudConfig {
    sendCloudConfig {
      id
      secret
      publicKey
      defaultPhoneNr
    }
  }
`;var s=o(51694),l=o(21067);class a{constructor(e,t,o,r){this.formBuilder=e,this.dataService=t,this.changeDetector=o,this.notificationService=r,this.form=this.formBuilder.group({secret:["your-secret"],publicKey:["your-public-key"],defaultPhoneNr:["your-phone-number"]})}ngOnInit(){return(0,n.mG)(this,void 0,void 0,function*(){yield this.dataService.query(d).mapStream(e=>e.sendCloudConfig).subscribe(e=>{this.form.controls.secret.setValue(e.secret),this.form.controls.publicKey.setValue(e.publicKey),this.form.controls.defaultPhoneNr.setValue(e.defaultPhoneNr)})})}save(){return(0,n.mG)(this,void 0,void 0,function*(){try{if(this.form.dirty){const e=this.form.value;yield this.dataService.mutate(c,{input:{secret:e.secret,publicKey:e.publicKey,defaultPhoneNr:e.defaultPhoneNr}}).toPromise()}this.form.markAsPristine(),this.changeDetector.markForCheck(),this.notificationService.success("common.notify-update-success",{entity:"SendCloud config"})}catch(e){this.notificationService.error("common.notify-update-error",{entity:"SendCloud config"})}})}}a.\u0275fac=function(e){return new(e||a)(s.Y36(l.qu),s.Y36(i.DoR),s.Y36(s.sBO),s.Y36(i.gqp))},a.\u0275cmp=s.Xpm({type:a,selectors:[["sendcloud-component"]],decls:12,vars:2,consts:[[1,"clr-row"],[1,"clr-col"],[1,"form",3,"formGroup"],[1,"form-block"],["label","SendCloud secret","for","apiKey"],["id","secret","type","text","formControlName","secret"],["label","SendCloud public key","for","publicKey"],["id","publicKey","type","text","formControlName","publicKey"],["label","Fallback phone nr.","for","defaultPhoneNr","tooltip","Used when a customer hasn't entered a phone number. Phone number is required in some cases by Sendcloud"],["id","defaultPhoneNr","type","text","formControlName","defaultPhoneNr"],[1,"btn","btn-primary",3,"disabled","click"]],template:function(e,t){1&e&&(s.TgZ(0,"div",0),s.TgZ(1,"div",1),s.TgZ(2,"form",2),s.TgZ(3,"section",3),s.TgZ(4,"vdr-form-field",4),s._UZ(5,"input",5),s.qZA(),s.TgZ(6,"vdr-form-field",6),s._UZ(7,"input",7),s.qZA(),s.TgZ(8,"vdr-form-field",8),s._UZ(9,"input",9),s.qZA(),s.TgZ(10,"button",10),s.NdJ("click",function(){return t.save()}),s._uU(11," Save "),s.qZA(),s.qZA(),s.qZA(),s.qZA(),s.qZA()),2&e&&(s.xp6(2),s.Q6J("formGroup",t.form),s.xp6(8),s.Q6J("disabled",t.form.invalid||t.form.pristine))},directives:[l._Y,l.JL,l.sg,i.hgI,i.y_K,l.Fj,l.JJ,l.u],encapsulation:2});class f{}f.\u0275fac=function(e){return new(e||f)},f.\u0275mod=s.oAB({type:f}),f.\u0275inj=s.cJS({providers:[],imports:[[i.m81,r.Bz.forChild([{path:"",pathMatch:"full",component:a,data:{breadcrumb:"SendCloud"}}])]]})}}]);
//# sourceMappingURL=399-es2015.ebfc9ad96a9c1a6823f9.js.map
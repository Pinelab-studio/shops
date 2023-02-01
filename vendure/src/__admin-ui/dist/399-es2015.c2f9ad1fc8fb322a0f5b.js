"use strict";(self.webpackChunkvendure_admin_ui=self.webpackChunkvendure_admin_ui||[]).push([[399],{91399:function(e,t,i){i.r(t),i.d(t,{SendcloudModule:function(){return f}});var o=i(41460),r=i(329),n=i(3189),c=i(83974);const u=c.ZP`
  mutation updateSendCloudConfig($input: SendCloudConfigInput) {
    updateSendCloudConfig(input: $input) {
      id
      secret
      publicKey
    }
  }
`,s=c.ZP`
  query sendCloudConfig {
    sendCloudConfig {
      id
      secret
      publicKey
    }
  }
`;var d=i(51694),l=i(21067);class a{constructor(e,t,i,o){this.formBuilder=e,this.dataService=t,this.changeDetector=i,this.notificationService=o,this.form=this.formBuilder.group({secret:["your-secret"],publicKey:["your-public-key"]})}ngOnInit(){return(0,n.mG)(this,void 0,void 0,function*(){yield this.dataService.query(s).mapStream(e=>e.sendCloudConfig).subscribe(e=>{this.form.controls.secret.setValue(e.secret),this.form.controls.publicKey.setValue(e.publicKey)})})}save(){return(0,n.mG)(this,void 0,void 0,function*(){try{if(this.form.dirty){const e=this.form.value;yield this.dataService.mutate(u,{input:{secret:e.secret,publicKey:e.publicKey}}).toPromise()}this.form.markAsPristine(),this.changeDetector.markForCheck(),this.notificationService.success("common.notify-update-success",{entity:"SendCloud config"})}catch(e){this.notificationService.error("common.notify-update-error",{entity:"SendCloud config"})}})}}a.\u0275fac=function(e){return new(e||a)(d.Y36(l.qu),d.Y36(r.DoR),d.Y36(d.sBO),d.Y36(r.gqp))},a.\u0275cmp=d.Xpm({type:a,selectors:[["sendcloud-component"]],decls:10,vars:2,consts:[[1,"clr-row"],[1,"clr-col"],[1,"form",3,"formGroup"],[1,"form-block"],["label","SendCloud secret","for","apiKey"],["id","secret","type","text","formControlName","secret"],["label","SendCloud public key","for","publicKey"],["id","publicKey","type","text","formControlName","publicKey"],[1,"btn","btn-primary",3,"disabled","click"]],template:function(e,t){1&e&&(d.TgZ(0,"div",0),d.TgZ(1,"div",1),d.TgZ(2,"form",2),d.TgZ(3,"section",3),d.TgZ(4,"vdr-form-field",4),d._UZ(5,"input",5),d.qZA(),d.TgZ(6,"vdr-form-field",6),d._UZ(7,"input",7),d.qZA(),d.TgZ(8,"button",8),d.NdJ("click",function(){return t.save()}),d._uU(9," Save "),d.qZA(),d.qZA(),d.qZA(),d.qZA(),d.qZA()),2&e&&(d.xp6(2),d.Q6J("formGroup",t.form),d.xp6(6),d.Q6J("disabled",t.form.invalid||t.form.pristine))},directives:[l._Y,l.JL,l.sg,r.hgI,r.y_K,l.Fj,l.JJ,l.u],encapsulation:2});class f{}f.\u0275fac=function(e){return new(e||f)},f.\u0275mod=d.oAB({type:f}),f.\u0275inj=d.cJS({providers:[],imports:[[r.m81,o.Bz.forChild([{path:"",pathMatch:"full",component:a,data:{breadcrumb:"SendCloud"}}])]]})}}]);
//# sourceMappingURL=399-es2015.c2f9ad1fc8fb322a0f5b.js.map
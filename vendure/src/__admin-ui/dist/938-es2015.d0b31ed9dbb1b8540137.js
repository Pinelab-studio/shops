"use strict";(self.webpackChunkvendure_admin_ui=self.webpackChunkvendure_admin_ui||[]).push([[938],{53938:function(e,t,o){o.r(t),o.d(t,{EBoekhoudenModule:function(){return f}});var n=o(41460),r=o(329),c=o(3189),i=o(83974);const u=i.ZP`
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
`,a=i.ZP`
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
`;var s=o(51694),l=o(21067),d=o(56258);class m{constructor(e,t,o,n){this.formBuilder=e,this.dataService=t,this.changeDetector=o,this.notificationService=n,this.form=this.formBuilder.group({enabled:["enabled"],username:["username"],secret1:["secret1"],secret2:["secret2"],account:["account"],contraAccount:["contraAccount"]})}ngOnInit(){return(0,c.mG)(this,void 0,void 0,function*(){yield this.dataService.query(a).mapStream(e=>e.eBoekhoudenConfig).subscribe(e=>this.setValues(e))})}save(){return(0,c.mG)(this,void 0,void 0,function*(){try{if(this.form.dirty){const e=this.form.value,{updateEBoekhoudenConfig:t}=yield this.dataService.mutate(u,{input:Object.assign({},e)}).toPromise();this.setValues(t)}this.form.markAsPristine(),this.changeDetector.markForCheck(),this.notificationService.success("common.notify-update-success",{entity:"Eboekhouden config"})}catch(e){this.notificationService.error("common.notify-update-error",{entity:"Eboekhouden config"})}})}setValues(e){this.form.controls.enabled.setValue(null==e?void 0:e.enabled),this.form.controls.username.setValue(null==e?void 0:e.username),this.form.controls.secret1.setValue(null==e?void 0:e.secret1),this.form.controls.secret2.setValue(null==e?void 0:e.secret2),this.form.controls.account.setValue(null==e?void 0:e.account),this.form.controls.contraAccount.setValue(null==e?void 0:e.contraAccount)}}m.\u0275fac=function(e){return new(e||m)(s.Y36(l.qu),s.Y36(r.DoR),s.Y36(s.sBO),s.Y36(r.gqp))},m.\u0275cmp=s.Xpm({type:m,selectors:[["e-boekhouden-component"]],decls:16,vars:2,consts:[[1,"form",3,"formGroup"],[1,"form-block"],["label","Enabled","for","enabled"],["type","checkbox","name","enabled","clrCheckbox","","formControlName","enabled"],["label","Username","for","username"],["id","username","type","text","formControlName","username"],["label","Secret 1","for","secret1"],["id","secret1","type","text","formControlName","secret1"],["label","Secret 2","for","secret2"],["id","secret2","type","text","formControlName","secret2"],["label","Account","for","account"],["id","account","type","text","formControlName","account"],["label","Contra account","for","contraAccount"],["id","contraAccount","type","text","formControlName","contraAccount"],[1,"btn","btn-primary",3,"disabled","click"]],template:function(e,t){1&e&&(s.TgZ(0,"form",0),s.TgZ(1,"section",1),s.TgZ(2,"vdr-form-field",2),s._UZ(3,"input",3),s.qZA(),s.TgZ(4,"vdr-form-field",4),s._UZ(5,"input",5),s.qZA(),s.TgZ(6,"vdr-form-field",6),s._UZ(7,"input",7),s.qZA(),s.TgZ(8,"vdr-form-field",8),s._UZ(9,"input",9),s.qZA(),s.TgZ(10,"vdr-form-field",10),s._UZ(11,"input",11),s.qZA(),s.TgZ(12,"vdr-form-field",12),s._UZ(13,"input",13),s.qZA(),s.TgZ(14,"button",14),s.NdJ("click",function(){return t.save()}),s._uU(15," Save "),s.qZA(),s.qZA(),s.qZA()),2&e&&(s.Q6J("formGroup",t.form),s.xp6(14),s.Q6J("disabled",t.form.invalid||t.form.pristine))},directives:[l._Y,l.JL,l.sg,r.hgI,r.y_K,l.Wl,d.KKC,l.JJ,l.u,l.Fj],encapsulation:2});class f{}f.\u0275fac=function(e){return new(e||f)},f.\u0275mod=s.oAB({type:f}),f.\u0275inj=s.cJS({providers:[],imports:[[r.m81,n.Bz.forChild([{path:"",pathMatch:"full",component:m,data:{breadcrumb:"e-Boekhouden"}}])]]})}}]);
//# sourceMappingURL=938-es2015.d0b31ed9dbb1b8540137.js.map
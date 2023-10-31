"use strict";(self.webpackChunkvendure_admin=self.webpackChunkvendure_admin||[]).push([[637],{2637:(h,p,r)=>{r.r(p),r.d(p,{MyparcelModule:()=>s});var f=r(4285),n=r(1661),l=r(6642),m=r(9248);const y=m.ZP`
  mutation updateMyparcelConfig($input: MyparcelConfigInput!) {
    updateMyparcelConfig(input: $input) {
      apiKey
    }
  }
`,d=m.ZP`
  query myparcelConfig {
    myparcelConfig {
      apiKey
    }
  }
`;var e=r(6108),o=r(5086);class c{constructor(t,i,a,u){this.formBuilder=t,this.dataService=i,this.changeDetector=a,this.notificationService=u,this.form=this.formBuilder.group({apiKey:["your-api-key"]})}ngOnInit(){var t=this;return(0,l.Z)(function*(){yield t.dataService.query(d).mapStream(i=>i.myparcelConfig).subscribe(i=>t.form.controls.apiKey.setValue(i.apiKey))})()}save(){var t=this;return(0,l.Z)(function*(){try{if(t.form.dirty){const i=t.form.value;yield t.dataService.mutate(y,{input:{apiKey:i.apiKey}}).toPromise()}t.form.markAsPristine(),t.changeDetector.markForCheck(),t.notificationService.success("common.notify-update-success",{entity:"MyparcelConfig"})}catch{t.notificationService.error("common.notify-update-error",{entity:"MyparcelConfig"})}})()}static#e=this.\u0275fac=function(i){return new(i||c)(e.Y36(o.qu),e.Y36(n.DoR),e.Y36(e.sBO),e.Y36(n.gqp))};static#t=this.\u0275cmp=e.Xpm({type:c,selectors:[["myparcel-component"]],decls:8,vars:2,consts:[[1,"clr-row"],[1,"clr-col"],[1,"form",3,"formGroup"],[1,"form-block"],["label","MyParcel apikey","for","apiKey"],["id","apiKey","type","text","formControlName","apiKey"],[1,"btn","btn-primary",3,"disabled","click"]],template:function(i,a){1&i&&(e.TgZ(0,"div",0)(1,"div",1)(2,"form",2)(3,"section",3)(4,"vdr-form-field",4),e._UZ(5,"input",5),e.qZA(),e.TgZ(6,"button",6),e.NdJ("click",function(){return a.save()}),e._uU(7," Save "),e.qZA()()()()()),2&i&&(e.xp6(2),e.Q6J("formGroup",a.form),e.xp6(4),e.Q6J("disabled",a.form.invalid||a.form.pristine))},dependencies:[o._Y,o.Fj,o.JJ,o.JL,o.sg,o.u,n.hgI,n.y_K],encapsulation:2})}class s{static#e=this.\u0275fac=function(i){return new(i||s)};static#t=this.\u0275mod=e.oAB({type:s});static#i=this.\u0275inj=e.cJS({providers:[(0,n.e$Y)({id:"myparcel",label:"MyParcel",routerLink:["/extensions/myparcel"],icon:"cursor-hand-open"},"settings")],imports:[n.m81,f.Bz.forChild([{path:"",pathMatch:"full",component:c,data:{breadcrumb:"MyParcel"}}])]})}}}]);
//# sourceMappingURL=637.69322d4fb881cebd.js.map
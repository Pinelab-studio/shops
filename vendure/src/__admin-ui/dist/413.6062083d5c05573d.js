"use strict";(self.webpackChunkvendure_admin=self.webpackChunkvendure_admin||[]).push([[413],{9413:(h,l,i)=>{i.r(l),i.d(l,{MyparcelModule:()=>s});var f=i(2703),n=i(734),p=i(5774),m=i(5972);const y=m.Ay`
  mutation updateMyparcelConfig($input: MyparcelConfigInput!) {
    updateMyparcelConfig(input: $input) {
      apiKey
    }
  }
`,d=m.Ay`
  query myparcelConfig {
    myparcelConfig {
      apiKey
    }
  }
`;var e=i(5220),o=i(4725);class c{constructor(t,r,a,u){this.formBuilder=t,this.dataService=r,this.changeDetector=a,this.notificationService=u,this.form=this.formBuilder.group({apiKey:["your-api-key"]})}ngOnInit(){var t=this;return(0,p.A)(function*(){yield t.dataService.query(d).mapStream(r=>r.myparcelConfig).subscribe(r=>t.form.controls.apiKey.setValue(r.apiKey))})()}save(){var t=this;return(0,p.A)(function*(){try{if(t.form.dirty){const r=t.form.value;yield t.dataService.mutate(y,{input:{apiKey:r.apiKey}}).toPromise()}t.form.markAsPristine(),t.changeDetector.markForCheck(),t.notificationService.success("common.notify-update-success",{entity:"MyparcelConfig"})}catch{t.notificationService.error("common.notify-update-error",{entity:"MyparcelConfig"})}})()}static#e=this.\u0275fac=function(r){return new(r||c)(e.rXU(o.ok),e.rXU(n.uSP),e.rXU(e.gRc),e.rXU(n.JEu))};static#t=this.\u0275cmp=e.VBU({type:c,selectors:[["myparcel-component"]],decls:8,vars:2,consts:[[1,"clr-row"],[1,"clr-col"],[1,"form",3,"formGroup"],[1,"form-block"],["label","MyParcel apikey","for","apiKey"],["id","apiKey","type","text","formControlName","apiKey"],[1,"btn","btn-primary",3,"click","disabled"]],template:function(r,a){1&r&&(e.j41(0,"div",0)(1,"div",1)(2,"form",2)(3,"section",3)(4,"vdr-form-field",4),e.nrm(5,"input",5),e.k0s(),e.j41(6,"button",6),e.bIt("click",function(){return a.save()}),e.EFF(7," Save "),e.k0s()()()()()),2&r&&(e.R7$(2),e.Y8G("formGroup",a.form),e.R7$(4),e.Y8G("disabled",a.form.invalid||a.form.pristine))},dependencies:[o.qT,o.me,o.BC,o.cb,o.j4,o.JD,n.KSf,n.Vr5],encapsulation:2})}class s{static#e=this.\u0275fac=function(r){return new(r||s)};static#t=this.\u0275mod=e.$C({type:s});static#r=this.\u0275inj=e.G2t({providers:[(0,n.VqZ)({id:"myparcel",label:"MyParcel",routerLink:["/extensions/myparcel"],icon:"cursor-hand-open"},"settings")],imports:[n.GgS,f.iI.forChild([{path:"",pathMatch:"full",component:c,data:{breadcrumb:"MyParcel"}}])]})}}}]);
//# sourceMappingURL=413.6062083d5c05573d.js.map
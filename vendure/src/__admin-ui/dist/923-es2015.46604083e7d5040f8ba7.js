"use strict";(self.webpackChunkvendure_admin_ui=self.webpackChunkvendure_admin_ui||[]).push([[923],{11923:function(e,n,r){r.r(n),r.d(n,{LoginComponent:function(){return m},LoginGuard:function(){return f},LoginModule:function(){return Z},loginRoutes:function(){return b}});var t=r(51694),o=r(41460),a=r(90417),i=r(37097),s=r(21067),c=r(56258),l=r(70942),g=r(53198);function d(e,n){1&e&&(t.TgZ(0,"span"),t._uU(1,"-"),t.qZA())}function p(e,n){if(1&e&&(t.TgZ(0,"span"),t._uU(1),t.YNc(2,d,2,0,"span",12),t.qZA()),2&e){const e=t.oxw();t.xp6(1),t.hij("",e.brand," "),t.xp6(1),t.Q6J("ngIf",!e.hideVendureBranding||!e.hideVersion)}}function u(e,n){1&e&&(t.TgZ(0,"span"),t._uU(1,"vendure"),t.qZA())}function h(e,n){if(1&e&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&e){const e=t.oxw();t.xp6(1),t.hij("v",e.version,"")}}class m{constructor(e,n){this.authService=e,this.router=n,this.username="",this.password="",this.rememberMe=!1,this.version=a.s5M,this.brand=(0,a.hq7)().brand,this.hideVendureBranding=(0,a.hq7)().hideVendureBranding,this.hideVersion=(0,a.hq7)().hideVersion}logIn(){this.errorMessage=void 0,this.authService.logIn(this.username,this.password,this.rememberMe).subscribe(e=>{switch(e.__typename){case"CurrentUser":const n=this.getRedirectRoute();this.router.navigateByUrl(n||"/");break;case"InvalidCredentialsError":case"NativeAuthStrategyError":this.errorMessage=e.message}})}getRedirectRoute(){let e;const n=new RegExp(`${a.ONw}=(.*)`);try{const r=window.location.search.match(n);r&&1<r.length&&(e=atob(decodeURIComponent(r[1])))}catch(r){}return e}}m.\u0275fac=function(e){return new(e||m)(t.Y36(a.e80),t.Y36(o.F0))},m.\u0275cmp=t.Xpm({type:m,selectors:[["vdr-login"]],decls:25,vars:24,consts:[[1,"login-wrapper"],[1,"login"],[1,"title"],["src","assets/logo-300px.png"],[1,"login-group"],["type","text","name","username","id","login_username",1,"username",3,"ngModel","placeholder","ngModelChange"],["name","password","type","password","id","login_password",1,"password",3,"ngModel","placeholder","ngModelChange"],[1,"login-error",3,"clrAlertType","clrAlertClosable"],[1,"alert-text"],["type","checkbox","clrCheckbox","","id","rememberme","name","rememberme",3,"ngModel","ngModelChange"],["type","submit",1,"btn","btn-primary",3,"disabled","click"],[1,"version"],[4,"ngIf"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"form",1),t.TgZ(2,"label",2),t._UZ(3,"img",3),t.qZA(),t.TgZ(4,"div",4),t.TgZ(5,"input",5),t.NdJ("ngModelChange",function(e){return n.username=e}),t.ALo(6,"translate"),t.qZA(),t.TgZ(7,"input",6),t.NdJ("ngModelChange",function(e){return n.password=e}),t.ALo(8,"translate"),t.qZA(),t.TgZ(9,"clr-alert",7),t.TgZ(10,"clr-alert-item"),t.TgZ(11,"span",8),t._uU(12),t.qZA(),t.qZA(),t.qZA(),t.TgZ(13,"clr-checkbox-wrapper"),t.TgZ(14,"input",9),t.NdJ("ngModelChange",function(e){return n.rememberMe=e}),t.qZA(),t.TgZ(15,"label"),t._uU(16),t.ALo(17,"translate"),t.qZA(),t.qZA(),t.TgZ(18,"button",10),t.NdJ("click",function(){return n.logIn()}),t._uU(19),t.ALo(20,"translate"),t.qZA(),t.qZA(),t.TgZ(21,"div",11),t.YNc(22,p,3,2,"span",12),t.YNc(23,u,2,0,"span",12),t.YNc(24,h,2,1,"span",12),t.qZA(),t.qZA(),t.qZA()),2&e&&(t.xp6(5),t.Q6J("ngModel",n.username)("placeholder",t.lcZ(6,16,"common.username")),t.xp6(2),t.Q6J("ngModel",n.password)("placeholder",t.lcZ(8,18,"common.password")),t.xp6(2),t.ekj("visible",n.errorMessage),t.Q6J("clrAlertType","danger")("clrAlertClosable",!1),t.xp6(3),t.hij(" ",n.errorMessage," "),t.xp6(2),t.Q6J("ngModel",n.rememberMe),t.xp6(2),t.Oqu(t.lcZ(17,20,"common.remember-me")),t.xp6(2),t.Q6J("disabled",!n.username||!n.password),t.xp6(1),t.hij(" ",t.lcZ(20,22,"common.login")," "),t.xp6(3),t.Q6J("ngIf",n.brand),t.xp6(1),t.Q6J("ngIf",!n.hideVendureBranding),t.xp6(1),t.Q6J("ngIf",!n.hideVersion))},directives:[s._Y,s.JL,s.F,c.MgK,a.y_K,s.Fj,s.JJ,s.On,c.TIm,c.CyW,c.I9z,c.PEh,s.Wl,c.KKC,l.O5],pipes:[g.X$],styles:[".login-wrapper[_ngcontent-%COMP%]{background:var(--login-page-bg);background-size:auto;justify-content:center}.title[_ngcontent-%COMP%]{text-align:center}.version[_ngcontent-%COMP%]{flex:1;display:flex;align-items:flex-end;justify-content:center;color:var(--color-grey-300)}.version[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] + span[_ngcontent-%COMP%]{margin-left:5px}.login-error[_ngcontent-%COMP%]{max-height:0;overflow:hidden}.login-error.visible[_ngcontent-%COMP%]{max-height:46px;transition:max-height .2s;animation:shake .82s cubic-bezier(.36,.07,.19,.97) both;animation-delay:.2s;transform:translate(0);-webkit-backface-visibility:hidden;backface-visibility:hidden;perspective:1000px}@keyframes shake{10%,90%{transform:translate(-1px)}20%,80%{transform:translate(2px)}30%,50%,70%{transform:translate(-4px)}40%,60%{transform:translate(4px)}}"]}),m.ctorParameters=()=>[{type:a.e80},{type:o.F0}];class f{constructor(e,n){this.router=e,this.authService=n}canActivate(e){return this.authService.checkAuthenticatedStatus().pipe((0,i.U)(e=>(e&&this.router.navigate(["/"]),!e)))}}f.\u0275fac=function(e){return new(e||f)(t.LFG(o.F0),t.LFG(a.e80))},f.\u0275prov=t.Yz7({factory:function(){return new f(t.LFG(o.F0),t.LFG(a.e80))},token:f,providedIn:"root"}),f.ctorParameters=()=>[{type:o.F0},{type:a.e80}];const b=[{path:"",component:m,pathMatch:"full",canActivate:[f]}];class Z{}Z.\u0275fac=function(e){return new(e||Z)},Z.\u0275mod=t.oAB({type:Z}),Z.\u0275inj=t.cJS({imports:[[a.m81,o.Bz.forChild(b)]]})}}]);
//# sourceMappingURL=923-es2015.46604083e7d5040f8ba7.js.map
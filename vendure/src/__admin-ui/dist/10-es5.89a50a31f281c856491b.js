!function(){function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{d55m:function(n,r,c){"use strict";c.r(r),c.d(r,"LoginComponent",(function(){return f})),c.d(r,"LoginGuard",(function(){return v})),c.d(r,"LoginModule",(function(){return w})),c.d(r,"loginRoutes",(function(){return y}));var a=c("EM62"),i=c("sEIs"),o=c("ixhn"),s=c("YtkY"),l=c("nIj0"),u=c("Kej3"),d=c("2kYt"),h=c("s2Ay");function p(e,n){1&e&&(a.ic(0,"span"),a.Wc(1,"-"),a.hc())}function g(e,n){if(1&e&&(a.ic(0,"span"),a.Wc(1),a.Uc(2,p,2,0,"span",12),a.hc()),2&e){var t=a.rc();a.Rb(1),a.Yc("",t.brand," "),a.Rb(1),a.yc("ngIf",!t.hideVendureBranding||!t.hideVersion)}}function b(e,n){1&e&&(a.ic(0,"span"),a.Wc(1,"vendure"),a.hc())}function m(e,n){if(1&e&&(a.ic(0,"span"),a.Wc(1),a.hc()),2&e){var t=a.rc();a.Rb(1),a.Yc("v",t.version,"")}}var f=function(){function n(t,r){e(this,n),this.authService=t,this.router=r,this.username="",this.password="",this.rememberMe=!1,this.version=o.a,this.brand=Object(o.ec)().brand,this.hideVendureBranding=Object(o.ec)().hideVendureBranding,this.hideVersion=Object(o.ec)().hideVersion}return t(n,[{key:"logIn",value:function(){var e=this;this.errorMessage=void 0,this.authService.logIn(this.username,this.password,this.rememberMe).subscribe((function(n){switch(n.__typename){case"CurrentUser":var t=e.getRedirectRoute();e.router.navigateByUrl(t||"/");break;case"InvalidCredentialsError":case"NativeAuthStrategyError":e.errorMessage=n.message}}))}},{key:"getRedirectRoute",value:function(){var e,n=new RegExp("".concat(o.b,"=(.*)"));try{var t=window.location.search.match(n);t&&1<t.length&&(e=atob(decodeURIComponent(t[1])))}catch(r){}return e}}]),n}();f.\u0275fac=function(e){return new(e||f)(a.cc(o.u),a.cc(i.e))},f.\u0275cmp=a.Wb({type:f,selectors:[["vdr-login"]],decls:25,vars:24,consts:[[1,"login-wrapper"],[1,"login"],[1,"title"],["src","assets/logo-300px.png"],[1,"login-group"],["type","text","name","username","id","login_username",1,"username",3,"ngModel","placeholder","ngModelChange"],["name","password","type","password","id","login_password",1,"password",3,"ngModel","placeholder","ngModelChange"],[1,"login-error",3,"clrAlertType","clrAlertClosable"],[1,"alert-text"],["type","checkbox","clrCheckbox","","id","rememberme","name","rememberme",3,"ngModel","ngModelChange"],["type","submit",1,"btn","btn-primary",3,"disabled","click"],[1,"version"],[4,"ngIf"]],template:function(e,n){1&e&&(a.ic(0,"div",0),a.ic(1,"form",1),a.ic(2,"label",2),a.dc(3,"img",3),a.hc(),a.ic(4,"div",4),a.ic(5,"input",5),a.pc("ngModelChange",(function(e){return n.username=e})),a.sc(6,"translate"),a.hc(),a.ic(7,"input",6),a.pc("ngModelChange",(function(e){return n.password=e})),a.sc(8,"translate"),a.hc(),a.ic(9,"clr-alert",7),a.ic(10,"clr-alert-item"),a.ic(11,"span",8),a.Wc(12),a.hc(),a.hc(),a.hc(),a.ic(13,"clr-checkbox-wrapper"),a.ic(14,"input",9),a.pc("ngModelChange",(function(e){return n.rememberMe=e})),a.hc(),a.ic(15,"label"),a.Wc(16),a.sc(17,"translate"),a.hc(),a.hc(),a.ic(18,"button",10),a.pc("click",(function(){return n.logIn()})),a.Wc(19),a.sc(20,"translate"),a.hc(),a.hc(),a.ic(21,"div",11),a.Uc(22,g,3,2,"span",12),a.Uc(23,b,2,0,"span",12),a.Uc(24,m,2,1,"span",12),a.hc(),a.hc(),a.hc()),2&e&&(a.Rb(5),a.yc("ngModel",n.username)("placeholder",a.tc(6,16,"common.username")),a.Rb(2),a.yc("ngModel",n.password)("placeholder",a.tc(8,18,"common.password")),a.Rb(2),a.Ub("visible",n.errorMessage),a.yc("clrAlertType","danger")("clrAlertClosable",!1),a.Rb(3),a.Yc(" ",n.errorMessage," "),a.Rb(2),a.yc("ngModel",n.rememberMe),a.Rb(2),a.Xc(a.tc(17,20,"common.remember-me")),a.Rb(2),a.yc("disabled",!n.username||!n.password),a.Rb(1),a.Yc(" ",a.tc(20,22,"common.login")," "),a.Rb(3),a.yc("ngIf",n.brand),a.Rb(1),a.yc("ngIf",!n.hideVendureBranding),a.Rb(1),a.yc("ngIf",!n.hideVersion))},directives:[l.E,l.q,l.r,u.u,o.fb,l.b,l.p,l.s,u.f,u.g,u.h,u.k,l.a,u.i,d.o],pipes:[h.d],styles:[".login-wrapper[_ngcontent-%COMP%]{background:var(--login-page-bg);background-size:auto;justify-content:center}.title[_ngcontent-%COMP%]{text-align:center}.version[_ngcontent-%COMP%]{align-items:flex-end;color:var(--color-grey-300);display:flex;flex:1;justify-content:center}.version[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] + span[_ngcontent-%COMP%]{margin-left:5px}.login-error[_ngcontent-%COMP%]{max-height:0;overflow:hidden}.login-error.visible[_ngcontent-%COMP%]{-webkit-animation:shake .82s cubic-bezier(.36,.07,.19,.97) both;-webkit-animation-delay:.2s;-webkit-backface-visibility:hidden;animation:shake .82s cubic-bezier(.36,.07,.19,.97) both;animation-delay:.2s;backface-visibility:hidden;max-height:46px;perspective:1000px;transform:translateZ(0);transition:max-height .2s}@-webkit-keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(2px,0,0)}30%,50%,70%{transform:translate3d(-4px,0,0)}40%,60%{transform:translate3d(4px,0,0)}}@keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(2px,0,0)}30%,50%,70%{transform:translate3d(-4px,0,0)}40%,60%{transform:translate3d(4px,0,0)}}"]}),f.ctorParameters=function(){return[{type:o.u},{type:i.e}]};var v=function(){function n(t,r){e(this,n),this.router=t,this.authService=r}return t(n,[{key:"canActivate",value:function(e){var n=this;return this.authService.checkAuthenticatedStatus().pipe(Object(s.a)((function(e){return e&&n.router.navigate(["/"]),!e})))}}]),n}();v.\u0275fac=function(e){return new(e||v)(a.mc(i.e),a.mc(o.u))},v.\u0275prov=Object(a.Yb)({factory:function(){return new v(Object(a.mc)(i.e),Object(a.mc)(o.u))},token:v,providedIn:"root"}),v.ctorParameters=function(){return[{type:i.e},{type:o.u}]};var y=[{path:"",component:f,pathMatch:"full",canActivate:[v]}],w=function n(){e(this,n)};w.\u0275mod=a.ac({type:w}),w.\u0275inj=a.Zb({factory:function(e){return new(e||w)},imports:[[o.Nb,i.i.forChild(y)]]})}}])}();
//# sourceMappingURL=10-es5.89a50a31f281c856491b.js.map
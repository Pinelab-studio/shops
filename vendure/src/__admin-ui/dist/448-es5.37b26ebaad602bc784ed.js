!function(){"use strict";var e,t,r;function o(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */o=function(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},i=n.iterator||"@@iterator",a=n.asyncIterator||"@@asyncIterator",c=n.toStringTag||"@@toStringTag";function s(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{s({},"")}catch(_){s=function(e,t,r){return e[t]=r}}function u(e,t,r,o){var n=t&&t.prototype instanceof f?t:f,i=Object.create(n.prototype),a=new Z(o||[]);return i._invoke=function(e,t,r){var o="suspendedStart";return function(n,i){if("executing"===o)throw new Error("Generator is already running");if("completed"===o){if("throw"===n)throw i;return K()}for(r.method=n,r.arg=i;;){var a=r.delegate;if(a){var c=w(a,r);if(c){if(c===d)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===o)throw o="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o="executing";var s=l(e,t,r);if("normal"===s.type){if(o=r.done?"completed":"suspendedYield",s.arg===d)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(o="completed",r.method="throw",r.arg=s.arg)}}}(e,r,a),i}function l(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(_){return{type:"throw",arg:_}}}e.wrap=u;var d={};function f(){}function h(){}function p(){}var y={};s(y,i,function(){return this});var b=Object.getPrototypeOf,v=b&&b(b(W([])));v&&v!==t&&r.call(v,i)&&(y=v);var m=p.prototype=f.prototype=Object.create(y);function k(e){["next","throw","return"].forEach(function(t){s(e,t,function(e){return this._invoke(t,e)})})}function g(e,t){function o(n,i,a,c){var s=l(e[n],e,i);if("throw"!==s.type){var u=s.arg,d=u.value;return d&&"object"==typeof d&&r.call(d,"__await")?t.resolve(d.__await).then(function(e){o("next",e,a,c)},function(e){o("throw",e,a,c)}):t.resolve(d).then(function(e){u.value=e,a(u)},function(e){return o("throw",e,a,c)})}c(s.arg)}var n;this._invoke=function(e,r){function i(){return new t(function(t,n){o(e,r,t,n)})}return n=n?n.then(i,i):i()}}function w(e,t){var r=e.iterator[t.method];if(void 0===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,w(e,t),"throw"===t.method))return d;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var o=l(r,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,d;var n=o.arg;return n?n.done?(t[e.resultName]=n.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,d):n:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,d)}function x(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function U(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function Z(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(x,this),this.reset(!0)}function W(e){if(e){var t=e[i];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,n=function t(){for(;++o<e.length;)if(r.call(e,o))return t.value=e[o],t.done=!1,t;return t.value=void 0,t.done=!0,t};return n.next=n}}return{next:K}}function K(){return{value:void 0,done:!0}}return h.prototype=p,s(m,"constructor",p),s(p,"constructor",h),h.displayName=s(p,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===h||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,s(e,c,"GeneratorFunction")),e.prototype=Object.create(m),e},e.awrap=function(e){return{__await:e}},k(g.prototype),s(g.prototype,a,function(){return this}),e.AsyncIterator=g,e.async=function(t,r,o,n,i){void 0===i&&(i=Promise);var a=new g(u(t,r,o,n),i);return e.isGeneratorFunction(r)?a:a.next().then(function(e){return e.done?e.value:a.next()})},k(m),s(m,c,"Generator"),s(m,i,function(){return this}),s(m,"toString",function(){return"[object Generator]"}),e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var o=t.pop();if(o in e)return r.value=o,r.done=!1,r}return r.done=!0,r}},e.values=W,Z.prototype={constructor:Z,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(U),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function o(r,o){return a.type="throw",a.arg=e,t.next=r,o&&(t.method="next",t.arg=void 0),!!o}for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n],a=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),s=r.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(e,t){for(var o=this.tryEntries.length-1;o>=0;--o){var n=this.tryEntries[o];if(n.tryLoc<=this.prev&&r.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),d},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),U(r),d}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var o=r.completion;if("throw"===o.type){var n=o.arg;U(r)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:W(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),d}},e}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function a(e,t,r){return t&&i(e.prototype,t),r&&i(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function c(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(self.webpackChunkvendure_admin_ui=self.webpackChunkvendure_admin_ui||[]).push([[448],{6738:function(e,t){var r=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==r)return r;throw new Error("unable to locate global object")}();e.exports=t=r.fetch,r.fetch&&(t.default=r.fetch.bind(r)),t.Headers=r.Headers,t.Request=r.Request,t.Response=r.Response},15448:function(i,s,u){u.r(s),u.d(s,{GoedgepicktModule:function(){return K}});var l=u(41460),d=u(37625),f=u(3189),h=u(83974),p=h.ZP(e||(e=c(["\n  mutation updateGoedgepicktConfig($input: GoedgepicktConfigInput!) {\n    updateGoedgepicktConfig(input: $input) {\n      ... on GoedgepicktConfig {\n        enabled\n        apiKey\n        webshopUuid\n        orderWebhookKey\n        orderWebhookUrl\n        stockWebhookKey\n        stockWebhookUrl\n      }\n      ... on GoedgepicktError {\n        message\n      }\n    }\n  }\n"]))),y=h.ZP(t||(t=c(["\n  query goedgepicktConfig {\n    goedgepicktConfig {\n      enabled\n      apiKey\n      webshopUuid\n      orderWebhookKey\n      orderWebhookUrl\n      stockWebhookKey\n      stockWebhookUrl\n    }\n  }\n"]))),b=h.ZP(r||(r=c(["\n  mutation runGoedgepicktFullSync {\n    runGoedgepicktFullSync\n  }\n"]))),v=u(6738),m=u.n(v),k=u(51694),g=u(21067),w=u(56258),x=u(70942);function U(e,t){if(1&e&&(k.TgZ(0,"vdr-chip",24),k._UZ(1,"clr-icon",25),k._uU(2),k.qZA()),2&e){var r=k.oxw();k.xp6(2),k.hij(" ",r.testFailed," ")}}function Z(e,t){if(1&e&&(k.TgZ(0,"vdr-chip",26),k._UZ(1,"clr-icon",27),k._uU(2),k.qZA()),2&e){var r=k.oxw();k.xp6(2),k.hij(" ",r.testResultName," ")}}var W=function(){function e(t,r,o,i){n(this,e),this.formBuilder=t,this.dataService=r,this.changeDetector=o,this.notificationService=i,this.loadingSync=!1,this.form=this.formBuilder.group({enabled:["enabled"],apiKey:["your-api-key"],webshopUuid:["webshopUuid"],orderWebhookUrl:["orderWebhookUrl"],orderWebhookKey:["orderWebhookKey"],stockWebhookUrl:["stockWebhookUrl"],stockWebhookKey:["stockWebhookKey"]})}return a(e,[{key:"ngOnInit",value:function(){return(0,f.mG)(this,void 0,void 0,o().mark(function e(){var t=this;return o().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.dataService.query(y).mapStream(function(e){return e.goedgepicktConfig}).subscribe(function(e){t.form.controls.enabled.setValue(e.enabled),t.form.controls.apiKey.setValue(e.apiKey),t.form.controls.webshopUuid.setValue(e.webshopUuid),t.form.controls.orderWebhookUrl.setValue(e.orderWebhookUrl),t.form.controls.orderWebhookKey.setValue(e.orderWebhookKey),t.form.controls.stockWebhookUrl.setValue(e.stockWebhookUrl),t.form.controls.stockWebhookKey.setValue(e.stockWebhookKey)});case 2:case"end":return e.stop()}},e,this)}))}},{key:"save",value:function(){return(0,f.mG)(this,void 0,void 0,o().mark(function e(){var t,r,n;return o().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!this.form.dirty){e.next=8;break}return t=this.form.value,e.next=5,this.dataService.mutate(p,{input:{enabled:t.enabled,apiKey:t.apiKey,webshopUuid:t.webshopUuid}}).toPromise();case 5:r=e.sent,n=r.updateGoedgepicktConfig,this.form.controls.enabled.setValue(n.enabled),this.form.controls.apiKey.setValue(n.apiKey),this.form.controls.webshopUuid.setValue(n.webshopUuid),this.form.controls.orderWebhookUrl.setValue(n.orderWebhookUrl),this.form.controls.orderWebhookKey.setValue(n.orderWebhookKey),this.form.controls.stockWebhookUrl.setValue(n.stockWebhookUrl),this.form.controls.stockWebhookKey.setValue(n.stockWebhookKey);case 8:this.form.markAsPristine(),this.changeDetector.markForCheck(),this.notificationService.success("common.notify-update-success",{entity:"GoedgepicktConfig"}),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),this.notificationService.error("common.notify-update-error",{entity:"GoedgepicktConfig"});case 14:case"end":return e.stop()}},e,this,[[0,11]])}))}},{key:"fullSync",value:function(){return(0,f.mG)(this,void 0,void 0,o().mark(function e(){return o().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,this.loadingSync=!0,e.next=4,this.dataService.mutate(b).toPromise();case 4:this.notificationService.success("common.notify-update-success",{entity:"products and stocklevels"}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),this.notificationService.error(e.t0.message);case 10:return e.prev=10,this.loadingSync=!1,e.finish(10);case 13:case"end":return e.stop()}},e,this,[[0,7,10,13]])}))}},{key:"test",value:function(){var e;return(0,f.mG)(this,void 0,void 0,o().mark(function t(){var r,n,i=this;return o().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.testFailed=void 0,this.testResultName=void 0,t.next=3,m()("https://account.goedgepickt.nl/api/v1/webshops",{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(this.form.controls.apiKey.value)},redirect:"follow"});case 3:if(200===(r=t.sent).status){t.next=6;break}return t.abrupt("return",void(this.testFailed="Invalid ApiKey"));case 6:return t.next=8,r.json();case 8:if(t.t1=e=t.sent.items,t.t0=null===t.t1,t.t0){t.next=12;break}t.t0=void 0===e;case 12:if(!t.t0){t.next=16;break}t.t2=void 0,t.next=17;break;case 16:t.t2=e.find(function(e){return e.uuid===i.form.controls.webshopUuid.value});case 17:(n=t.t2)?this.testResultName=n.name:this.testFailed="Apikey is correct, but cannot find webshopUuid";case 19:case"end":return t.stop()}},t,this)}))}}]),e}();W.\u0275fac=function(e){return new(e||W)(k.Y36(g.qu),k.Y36(d.DoR),k.Y36(k.sBO),k.Y36(d.gqp))},W.\u0275cmp=k.Xpm({type:W,selectors:[["goedgepickt-component"]],decls:32,vars:5,consts:[[1,"clr-row"],[1,"clr-col"],[1,"btn","btn-secondary",3,"disabled","click"],["content","Pushes products and pulls stocklevels from Goedgepickt"],[1,"form",3,"formGroup"],[1,"form-block"],["label","Enabled","for","enabled"],["type","checkbox","name","enabled","clrCheckbox","","formControlName","enabled"],["label","apikey","for","apiKey"],["id","apiKey","type","text","formControlName","apiKey"],["label","webshopUuid","for","webshopUuid"],["id","webshopUuid","type","text","formControlName","webshopUuid"],[1,"btn","btn-primary",3,"disabled","click"],[1,"btn","btn-secondary",3,"click"],["title","Failed","colorType","error",4,"ngIf"],["title","Success!","colorType","success",4,"ngIf"],["label","Order webhook","for","orderWebhookUrl","tooltip","Goedgepickt will call this URL for order status updates"],["id","orderWebhookUrl","type","text","formControlName","orderWebhookUrl","disabled","disabled"],["label","Webhook auth secret","for","orderWebhookKey"],["id","orderWebhookKey","type","text","formControlName","orderWebhookKey","disabled","disabled"],["label","Stock webhook","for","stockWebhookUrl","tooltip","Goedgepickt will call this URL for stocklevel updates"],["id","stockWebhookUrl","type","text","formControlName","stockWebhookUrl","disabled","disabled"],["label","Webhook auth secret","for","stockWebhookKey"],["id","stockWebhookKey","type","text","formControlName","stockWebhookKey","disabled","disabled"],["title","Failed","colorType","error"],["shape","error-standard"],["title","Success!","colorType","success"],["shape","check-circle"]],template:function(e,t){1&e&&(k.TgZ(0,"div",0),k.TgZ(1,"div",1),k.TgZ(2,"button",2),k.NdJ("click",function(){return t.fullSync()}),k._uU(3," Synchronize "),k.qZA(),k._UZ(4,"vdr-help-tooltip",3),k.TgZ(5,"form",4),k.TgZ(6,"section",5),k.TgZ(7,"vdr-form-field",6),k._UZ(8,"input",7),k.qZA(),k.TgZ(9,"vdr-form-field",8),k._UZ(10,"input",9),k.qZA(),k.TgZ(11,"vdr-form-field",10),k._UZ(12,"input",11),k.qZA(),k.TgZ(13,"button",12),k.NdJ("click",function(){return t.save()}),k._uU(14," Save "),k.qZA(),k.TgZ(15,"button",13),k.NdJ("click",function(){return t.test()}),k._uU(16,"Test"),k.qZA(),k.YNc(17,U,3,1,"vdr-chip",14),k.YNc(18,Z,3,1,"vdr-chip",15),k.qZA(),k.TgZ(19,"section",5),k.TgZ(20,"p"),k._uU(21," The following settings are set automatically and cannot be edited "),k.qZA(),k._UZ(22,"br"),k.TgZ(23,"vdr-form-field",16),k._UZ(24,"input",17),k.qZA(),k.TgZ(25,"vdr-form-field",18),k._UZ(26,"input",19),k.qZA(),k.qZA(),k.TgZ(27,"section",5),k.TgZ(28,"vdr-form-field",20),k._UZ(29,"input",21),k.qZA(),k.TgZ(30,"vdr-form-field",22),k._UZ(31,"input",23),k.qZA(),k.qZA(),k.qZA(),k.qZA(),k.qZA()),2&e&&(k.xp6(2),k.Q6J("disabled",t.loadingSync),k.xp6(3),k.Q6J("formGroup",t.form),k.xp6(8),k.Q6J("disabled",t.form.invalid||t.form.pristine),k.xp6(4),k.Q6J("ngIf",t.testFailed),k.xp6(1),k.Q6J("ngIf",t.testResultName))},directives:[d.opf,g._Y,g.JL,g.sg,d.hgI,d.y_K,g.Wl,w.KKC,g.JJ,g.u,g.Fj,x.O5,d.Ywx,w.qvL],encapsulation:2});var K=a(function e(){n(this,e)});K.\u0275fac=function(e){return new(e||K)},K.\u0275mod=k.oAB({type:K}),K.\u0275inj=k.cJS({providers:[(0,d.e$Y)({id:"goedgepickt",label:"Goedgepickt",routerLink:["/extensions/goedgepickt"],icon:"cursor-hand-open"},"settings")],imports:[[d.m81,l.Bz.forChild([{path:"",pathMatch:"full",component:W,data:{breadcrumb:"Goedgepickt"}}])]]})}}])}();
//# sourceMappingURL=448-es5.37b26ebaad602bc784ed.js.map
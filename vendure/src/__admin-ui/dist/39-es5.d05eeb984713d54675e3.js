!function(){"use strict";function e(e){return function(e){if(Array.isArray(e))return t(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,n){if(!e)return;if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return t(e,n)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}function o(e,t){return(o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var n,r=u(e);if(t){var o=u(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return a(this,n)}}function a(e,t){if(t&&("object"==typeof t||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return i(e)}function i(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function s(e,t,n){return(s="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=u(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(self.webpackChunkvendure_admin_ui=self.webpackChunkvendure_admin_ui||[]).push([[39],{63039:function(t,n,a){a.r(n),a.d(n,{HealthCheckComponent:function(){return Y},JobListComponent:function(){return R},JobStateLabelComponent:function(){return F},SystemModule:function(){return G},systemRoutes:function(){return B},"\u02750":function(){return M},"\u02751":function(){return $}});var p=a(51694),d=a(49594),f=a(21067),g=a(41460),Z=a(46347),h=a(8603),m=a(90026),b=a(37097),y=a(24791),v=a(70942),A=a(86123),q=a(53198),x=a(38564);function T(e,t){1&e&&(p.ynx(0),p._uU(1),p.ALo(2,"translate"),p.BQk()),2&e&&(p.xp6(1),p.hij(" ",p.lcZ(2,1,"system.health-all-systems-up")," "))}function _(e,t){1&e&&(p._uU(0),p.ALo(1,"translate")),2&e&&p.hij(" ",p.lcZ(1,1,"system.health-error")," ")}var j=function(e,t){return{"is-success":e,"is-danger":t}};function w(e,t){if(1&e&&(p.TgZ(0,"div",7),p.TgZ(1,"div",8),p._UZ(2,"clr-icon",9),p.qZA(),p.TgZ(3,"div",10),p.YNc(4,T,3,3,"ng-container",11),p.YNc(5,_,2,3,"ng-template",null,12,p.W1O),p.TgZ(7,"div",13),p._uU(8),p.ALo(9,"translate"),p.ALo(10,"localeDate"),p.ALo(11,"async"),p.qZA(),p.qZA(),p.qZA()),2&e){var n=t.ngIf,r=p.MAs(6),o=p.oxw();p.xp6(2),p.Q6J("ngClass",p.WLB(13,j,"ok"===n,"ok"!==n)),p.uIk("shape","ok"===n?"check-circle":"exclamation-circle"),p.xp6(2),p.Q6J("ngIf","ok"===n)("ngIfElse",r),p.xp6(4),p.AsE(" ",p.lcZ(9,6,"system.health-last-checked"),": ",p.xi3(10,8,p.lcZ(11,11,o.healthCheckService.lastCheck$),"mediumTime")," ")}}function O(e,t){1&e&&(p.ynx(0),p._UZ(1,"clr-icon",17),p._uU(2),p.ALo(3,"translate"),p.BQk()),2&e&&(p.xp6(2),p.hij(" ",p.lcZ(3,1,"system.health-status-up")," "))}function U(e,t){1&e&&(p._UZ(0,"clr-icon",18),p._uU(1),p.ALo(2,"translate")),2&e&&(p.xp6(1),p.hij(" ",p.lcZ(2,1,"system.health-status-down")," "))}function k(e,t){if(1&e&&(p.TgZ(0,"tr"),p.TgZ(1,"td",14),p._uU(2),p.qZA(),p.TgZ(3,"td",14),p.TgZ(4,"vdr-chip",15),p.YNc(5,O,4,3,"ng-container",11),p.YNc(6,U,3,3,"ng-template",null,16,p.W1O),p.qZA(),p.qZA(),p.TgZ(8,"td",14),p._uU(9),p.qZA(),p.qZA()),2&e){var n=t.$implicit,r=p.MAs(7);p.xp6(2),p.Oqu(n.key),p.xp6(2),p.Q6J("colorType","up"===n.result.status?"success":"error"),p.xp6(1),p.Q6J("ngIf","up"===n.result.status)("ngIfElse",r),p.xp6(4),p.Oqu(n.result.message)}}function L(e,t){1&e&&(p.ynx(0),p._uU(1),p.ALo(2,"translate"),p.BQk()),2&e&&(p.xp6(1),p.hij(" ",p.lcZ(2,1,"system.all-job-queues")," "))}function I(e,t){if(1&e&&(p.TgZ(0,"vdr-chip",8),p._uU(1),p.qZA()),2&e){var n=p.oxw().item;p.Q6J("colorFrom",n.name),p.xp6(1),p.Oqu(n.name)}}function C(e,t){if(1&e&&(p.YNc(0,L,3,3,"ng-container",6),p.YNc(1,I,2,2,"ng-template",null,7,p.W1O)),2&e){var n=t.item,r=p.MAs(2);p.Q6J("ngIf","all"===n.name)("ngIfElse",r)}}function N(e,t){if(1&e&&(p.TgZ(0,"vdr-dropdown"),p.TgZ(1,"button",14),p.ALo(2,"translate"),p._UZ(3,"clr-icon",15),p.qZA(),p.TgZ(4,"vdr-dropdown-menu"),p.TgZ(5,"div",16),p._UZ(6,"vdr-object-tree",17),p.qZA(),p.qZA(),p.qZA()),2&e){var n=p.oxw().item;p.xp6(1),p.Q6J("title",p.lcZ(2,2,"system.job-data")),p.xp6(5),p.Q6J("value",n.data)}}function J(e,t){if(1&e&&(p.TgZ(0,"vdr-dropdown"),p.TgZ(1,"button",18),p._UZ(2,"clr-icon",15),p._uU(3),p.ALo(4,"translate"),p.qZA(),p.TgZ(5,"vdr-dropdown-menu"),p.TgZ(6,"div",16),p._UZ(7,"vdr-object-tree",17),p.qZA(),p.qZA(),p.qZA()),2&e){var n=p.oxw().item;p.xp6(3),p.hij(" ",p.lcZ(4,2,"system.job-result")," "),p.xp6(4),p.Q6J("value",n.result)}}function P(e,t){if(1&e&&(p.TgZ(0,"vdr-dropdown"),p.TgZ(1,"button",18),p._UZ(2,"clr-icon",19),p._uU(3),p.ALo(4,"translate"),p.qZA(),p.TgZ(5,"vdr-dropdown-menu"),p.TgZ(6,"div",16),p._uU(7),p.qZA(),p.qZA(),p.qZA()),2&e){var n=p.oxw().item;p.xp6(3),p.hij(" ",p.lcZ(4,2,"system.job-error")," "),p.xp6(4),p.hij(" ",n.error," ")}}var S=function(){return["DeleteSettings","DeleteSystem"]};function Q(e,t){if(1&e){var n=p.EpF();p.TgZ(0,"vdr-dropdown"),p.TgZ(1,"button",20),p._UZ(2,"clr-icon",21),p.qZA(),p.TgZ(3,"vdr-dropdown-menu",22),p.TgZ(4,"button",23),p.NdJ("click",function(){p.CHM(n);var e=p.oxw().item;return p.oxw().cancelJob(e.id)}),p.ALo(5,"hasPermission"),p._UZ(6,"clr-icon",24),p._uU(7),p.ALo(8,"translate"),p.qZA(),p.qZA(),p.qZA()}2&e&&(p.xp6(4),p.Q6J("disabled",!p.lcZ(5,2,p.DdM(6,S))),p.xp6(3),p.hij(" ",p.lcZ(8,4,"common.cancel")," "))}function E(e,t){if(1&e&&(p.TgZ(0,"td",9),p._UZ(1,"vdr-entity-info",10),p.qZA(),p.TgZ(2,"td",9),p.YNc(3,N,7,4,"vdr-dropdown",11),p.TgZ(4,"vdr-chip",8),p._uU(5),p.qZA(),p.qZA(),p.TgZ(6,"td",9),p._uU(7),p.ALo(8,"timeAgo"),p.qZA(),p.TgZ(9,"td",9),p._UZ(10,"vdr-job-state-label",12),p.qZA(),p.TgZ(11,"td",9),p._uU(12),p.ALo(13,"duration"),p.qZA(),p.TgZ(14,"td",9),p.YNc(15,J,8,4,"vdr-dropdown",11),p.YNc(16,P,8,4,"vdr-dropdown",11),p.qZA(),p.TgZ(17,"td",13),p.YNc(18,Q,9,7,"vdr-dropdown",11),p.qZA()),2&e){var n=t.item,r=p.oxw();p.xp6(1),p.Q6J("entity",n),p.xp6(2),p.Q6J("ngIf",n.data),p.xp6(1),p.Q6J("colorFrom",n.queueName),p.xp6(1),p.Oqu(n.queueName),p.xp6(2),p.Oqu(p.lcZ(8,10,n.createdAt)),p.xp6(3),p.Q6J("job",n),p.xp6(2),p.Oqu(p.lcZ(13,12,n.duration)),p.xp6(3),p.Q6J("ngIf",r.hasResult(n)),p.xp6(1),p.Q6J("ngIf",n.error),p.xp6(2),p.Q6J("ngIf",!n.isSettled&&"FAILED"!==n.state)}}function D(e,t){if(1&e&&(p.TgZ(0,"span",2),p._uU(1),p.ALo(2,"percent"),p.qZA()),2&e){var n=p.oxw();p.xp6(1),p.hij(" ",p.lcZ(2,1,n.job.progress/100)," ")}}var Y=function e(t){l(this,e),this.healthCheckService=t};Y.\u0275fac=function(e){return new(e||Y)(p.Y36(d.Gpz))},Y.\u0275cmp=p.Xpm({type:Y,selectors:[["vdr-health-check"]],decls:25,vars:18,consts:[["class","system-status-header",4,"ngIf"],["locationId","system-status"],[1,"btn","btn-secondary",3,"click"],["shape","refresh"],[1,"table"],[1,"left"],[4,"ngFor","ngForOf"],[1,"system-status-header"],[1,"status-icon"],["size","48",3,"ngClass"],[1,"status-detail"],[4,"ngIf","ngIfElse"],["error",""],[1,"last-checked"],[1,"align-middle","left"],[3,"colorType"],["down",""],["shape","check-circle"],["shape","exclamation-circle"]],template:function(e,t){1&e&&(p.TgZ(0,"vdr-action-bar"),p.TgZ(1,"vdr-ab-left"),p.YNc(2,w,12,16,"div",0),p.ALo(3,"async"),p.qZA(),p.TgZ(4,"vdr-ab-right"),p._UZ(5,"vdr-action-bar-items",1),p.TgZ(6,"button",2),p.NdJ("click",function(){return t.healthCheckService.refresh()}),p._UZ(7,"clr-icon",3),p._uU(8),p.ALo(9,"translate"),p.qZA(),p.qZA(),p.qZA(),p.TgZ(10,"table",4),p.TgZ(11,"thead"),p.TgZ(12,"tr"),p.TgZ(13,"th",5),p._uU(14),p.ALo(15,"translate"),p.qZA(),p.TgZ(16,"th",5),p._uU(17),p.ALo(18,"translate"),p.qZA(),p.TgZ(19,"th",5),p._uU(20),p.ALo(21,"translate"),p.qZA(),p.qZA(),p.qZA(),p.TgZ(22,"tbody"),p.YNc(23,k,10,5,"tr",6),p.ALo(24,"async"),p.qZA(),p.qZA()),2&e&&(p.xp6(2),p.Q6J("ngIf",p.lcZ(3,6,t.healthCheckService.status$)),p.xp6(6),p.hij(" ",p.lcZ(9,8,"system.health-refresh")," "),p.xp6(6),p.hij(" ",p.lcZ(15,10,"common.name")," "),p.xp6(3),p.hij(" ",p.lcZ(18,12,"system.health-status")," "),p.xp6(3),p.hij(" ",p.lcZ(21,14,"system.health-message")," "),p.xp6(3),p.Q6J("ngForOf",p.lcZ(24,16,t.healthCheckService.details$)))},directives:[d.KkL,d.BND,v.O5,d.mz,d.WWO,A.qvL,v.sg,v.mk,d.Ywx],pipes:[v.Ov,q.X$,d.HbD],styles:[".system-status-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:flex-start}.system-status-header[_ngcontent-%COMP%]   .status-detail[_ngcontent-%COMP%]{font-weight:bold}.system-status-header[_ngcontent-%COMP%]   .last-checked[_ngcontent-%COMP%]{font-weight:normal;color:var(--color-grey-500)}"],changeDetection:0}),Y.ctorParameters=function(){return[{type:d.Gpz}]};var R=function(t){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)}(a,t);var n=c(a);function a(e,t,r,o,c){var p,g;return l(this,a),(g=n.call(this,o,c)).dataService=e,g.modalService=t,g.notificationService=r,g.liveUpdate=new f.NI(!0),g.hideSettled=new f.NI(!0),g.queueFilter=new f.NI("all"),s((p=i(g),u(a.prototype)),"setQueryFn",p).call(p,function(){var e;return(e=g.dataService.settings).getAllJobs.apply(e,arguments)},function(e){return e.jobs},function(e,t){var n="all"===g.queueFilter.value?null:{queueName:{eq:g.queueFilter.value}},r=g.hideSettled.value;return{options:{skip:e,take:t,filter:Object.assign(Object.assign({},n),r?{isSettled:{eq:!1}}:{}),sort:{createdAt:d.Asd.DESC}}}}),g}return r(a,[{key:"ngOnInit",value:function(){var t=this;s(u(a.prototype),"ngOnInit",this).call(this),(0,Z.H)(5e3,2e3).pipe((0,h.R)(this.destroy$),(0,m.h)(function(){return t.liveUpdate.value})).subscribe(function(){t.refresh()}),this.queues$=this.dataService.settings.getJobQueues().mapStream(function(e){return e.jobQueues}).pipe((0,b.U)(function(t){return[{name:"all",running:!0}].concat(e(t))}))}},{key:"hasResult",value:function(e){var t=e.result;return null!=t&&("object"!=typeof t||Object.keys(t).length>0)}},{key:"cancelJob",value:function(e){var t=this;this.dataService.settings.cancelJob(e).subscribe(function(){return t.refresh()})}}]),a}(d.t7C);R.\u0275fac=function(e){return new(e||R)(p.Y36(d.DoR),p.Y36(d.Z7U),p.Y36(d.gqp),p.Y36(g.F0),p.Y36(g.gz))},R.\u0275cmp=p.Xpm({type:R,selectors:[["vdr-job-list"]],features:[p.qOj],decls:41,vars:45,consts:[["type","checkbox","clrCheckbox","","name","live-update",3,"formControl"],["type","checkbox","clrCheckbox","","name","hide-settled",3,"formControl","change"],["bindValue","name",3,"addTag","items","hideSelected","multiple","markFirst","clearable","searchable","formControl","change"],["ng-label-tmp","","ng-option-tmp",""],["locationId","job-list"],[3,"items","itemsPerPage","totalItems","currentPage","pageChange","itemsPerPageChange"],[4,"ngIf","ngIfElse"],["others",""],[3,"colorFrom"],[1,"left","align-middle"],[3,"entity"],[4,"ngIf"],[3,"job"],[1,"right","align-middle"],["vdrDropdownTrigger","",1,"btn","btn-link","btn-icon",3,"title"],["shape","details"],[1,"result-detail"],[3,"value"],["vdrDropdownTrigger","",1,"btn","btn-link","btn-sm","details-button"],["shape","exclamation-circle"],["vdrDropdownTrigger","",1,"icon-button"],["shape","ellipsis-vertical"],["vdrPosition","bottom-right"],["type","button","vdrDropdownItem","",1,"delete-button",3,"disabled","click"],["shape","ban",1,"is-danger"]],template:function(e,t){1&e&&(p.TgZ(0,"vdr-action-bar"),p.TgZ(1,"vdr-ab-left"),p.TgZ(2,"clr-checkbox-container"),p.TgZ(3,"clr-checkbox-wrapper"),p._UZ(4,"input",0),p.TgZ(5,"label"),p._uU(6),p.ALo(7,"translate"),p.qZA(),p.qZA(),p.TgZ(8,"clr-checkbox-wrapper"),p.TgZ(9,"input",1),p.NdJ("change",function(){return t.refresh()}),p.qZA(),p.TgZ(10,"label"),p._uU(11),p.ALo(12,"translate"),p.qZA(),p.qZA(),p.qZA(),p.qZA(),p.TgZ(13,"vdr-ab-right"),p.TgZ(14,"ng-select",2),p.NdJ("change",function(){return t.refresh()}),p.ALo(15,"async"),p.YNc(16,C,3,2,"ng-template",3),p.qZA(),p._UZ(17,"vdr-action-bar-items",4),p.qZA(),p.qZA(),p.TgZ(18,"vdr-data-table",5),p.NdJ("pageChange",function(e){return t.setPageNumber(e)})("itemsPerPageChange",function(e){return t.setItemsPerPage(e)}),p.ALo(19,"async"),p.ALo(20,"async"),p.ALo(21,"async"),p.ALo(22,"async"),p._UZ(23,"vdr-dt-column"),p.TgZ(24,"vdr-dt-column"),p._uU(25),p.ALo(26,"translate"),p.qZA(),p.TgZ(27,"vdr-dt-column"),p._uU(28),p.ALo(29,"translate"),p.qZA(),p.TgZ(30,"vdr-dt-column"),p._uU(31),p.ALo(32,"translate"),p.qZA(),p.TgZ(33,"vdr-dt-column"),p._uU(34),p.ALo(35,"translate"),p.qZA(),p.TgZ(36,"vdr-dt-column"),p._uU(37),p.ALo(38,"translate"),p.qZA(),p._UZ(39,"vdr-dt-column"),p.YNc(40,E,19,14,"ng-template"),p.qZA()),2&e&&(p.xp6(4),p.Q6J("formControl",t.liveUpdate),p.xp6(2),p.Oqu(p.lcZ(7,21,"common.live-update")),p.xp6(3),p.Q6J("formControl",t.hideSettled),p.xp6(2),p.Oqu(p.lcZ(12,23,"system.hide-settled-jobs")),p.xp6(3),p.Q6J("addTag",!1)("items",p.lcZ(15,25,t.queues$))("hideSelected",!0)("multiple",!1)("markFirst",!1)("clearable",!1)("searchable",!1)("formControl",t.queueFilter),p.xp6(4),p.Q6J("items",p.lcZ(19,27,t.items$))("itemsPerPage",p.lcZ(20,29,t.itemsPerPage$))("totalItems",p.lcZ(21,31,t.totalItems$))("currentPage",p.lcZ(22,33,t.currentPage$)),p.xp6(7),p.Oqu(p.lcZ(26,35,"system.job-queue-name")),p.xp6(3),p.Oqu(p.lcZ(29,37,"common.created-at")),p.xp6(3),p.Oqu(p.lcZ(32,39,"system.job-state")),p.xp6(3),p.Oqu(p.lcZ(35,41,"system.job-duration")),p.xp6(3),p.Oqu(p.lcZ(38,43,"system.job-result")))},directives:function(){return[d.KkL,d.BND,A.Y_4,A.PEh,d.y_K,f.Wl,A.KKC,f.JJ,f.oH,A.MgK,d.mz,x.w9,x.bb,x.Z2,d.WWO,d.Qj_,d.Egy,v.O5,d.Ywx,d.Vqt,F,d.JOL,d.UaT,A.qvL,d.N9E,d._8q,d.HH4]},pipes:function(){return[q.X$,v.Ov,d.eGd,d.uGI,d.j$k]},styles:[".result-detail[_ngcontent-%COMP%]{margin:0 12px}"],changeDetection:0}),R.ctorParameters=function(){return[{type:d.DoR},{type:d.Z7U},{type:d.gqp},{type:g.F0},{type:g.gz}]};var F=function(){function e(){l(this,e)}return r(e,[{key:"iconShape",get:function(){switch(this.job.state){case d.Zyh.COMPLETED:return"check-circle";case d.Zyh.FAILED:return"exclamation-circle";case d.Zyh.CANCELLED:return"ban";case d.Zyh.PENDING:case d.Zyh.RETRYING:return"hourglass";case d.Zyh.RUNNING:return"sync"}}},{key:"colorType",get:function(){switch(this.job.state){case d.Zyh.COMPLETED:return"success";case d.Zyh.FAILED:case d.Zyh.CANCELLED:return"error";case d.Zyh.PENDING:case d.Zyh.RETRYING:return"";case d.Zyh.RUNNING:return"warning"}}}]),e}();F.\u0275fac=function(e){return new(e||F)},F.\u0275cmp=p.Xpm({type:F,selectors:[["vdr-job-state-label"]],inputs:{job:"job"},decls:5,vars:6,consts:[[3,"colorType"],["class","progress",4,"ngIf"],[1,"progress"]],template:function(e,t){1&e&&(p.TgZ(0,"vdr-chip",0),p._UZ(1,"clr-icon"),p._uU(2),p.ALo(3,"titlecase"),p.YNc(4,D,3,3,"span",1),p.qZA()),2&e&&(p.Q6J("colorType",t.colorType),p.xp6(1),p.uIk("shape",t.iconShape),p.xp6(1),p.hij(" ",p.lcZ(3,4,t.job.state)," "),p.xp6(2),p.Q6J("ngIf","RUNNING"===t.job.state))},directives:[d.Ywx,A.qvL,v.O5],pipes:[v.rS,v.Zx],styles:[".progress[_ngcontent-%COMP%]{margin-left:3px}clr-icon[_ngcontent-%COMP%]{min-width:12px}"],changeDetection:0}),F.propDecorators={job:[{type:p.IIB}]};var M={breadcrumb:(0,y.J)("breadcrumb.job-queue")},$={breadcrumb:(0,y.J)("breadcrumb.system-status")},B=[{path:"jobs",component:R,data:M},{path:"system-status",component:Y,data:$}],G=function e(){l(this,e)};G.\u0275fac=function(e){return new(e||G)},G.\u0275mod=p.oAB({type:G}),G.\u0275inj=p.cJS({imports:[[d.m81,g.Bz.forChild(B)]]})}}])}();
//# sourceMappingURL=39-es5.d05eeb984713d54675e3.js.map
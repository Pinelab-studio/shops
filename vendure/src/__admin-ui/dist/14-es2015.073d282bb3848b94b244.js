(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{"R/tn":function(c,e,t){"use strict";t.r(e),t.d(e,"HealthCheckComponent",function(){return O}),t.d(e,"JobListComponent",function(){return N}),t.d(e,"JobStateLabelComponent",function(){return q}),t.d(e,"SystemModule",function(){return M}),t.d(e,"systemRoutes",function(){return x}),t.d(e,"\u02750",function(){return F}),t.d(e,"\u02751",function(){return X});var n=t("Iq5M"),s=t("FWuv"),r=t("RlrJ"),a=t("oIEy"),i=t("0kj6"),o=t("umQr"),l=t("cipv"),u=t("kpJz"),d=t("48Dx"),b=t("HKMU"),m=t("OLIJ"),h=t("Tm5P"),p=t("rCZF");function g(c,e){1&c&&(n.hc(0),n.Vc(1),n.tc(2,"translate"),n.gc()),2&c&&(n.Sb(1),n.Xc(" ",n.uc(2,1,"system.health-all-systems-up")," "))}function f(c,e){1&c&&(n.Vc(0),n.tc(1,"translate")),2&c&&n.Xc(" ",n.uc(1,1,"system.health-error")," ")}const j=function(c,e){return{"is-success":c,"is-danger":e}};function v(c,e){if(1&c&&(n.jc(0,"div",7),n.jc(1,"div",8),n.ec(2,"clr-icon",9),n.ic(),n.jc(3,"div",10),n.Tc(4,g,3,3,"ng-container",11),n.Tc(5,f,2,3,"ng-template",null,12,n.Uc),n.jc(7,"div",13),n.Vc(8),n.tc(9,"translate"),n.tc(10,"localeDate"),n.tc(11,"async"),n.ic(),n.ic(),n.ic()),2&c){const c=e.ngIf,t=n.Jc(6),s=n.sc();n.Sb(2),n.zc("ngClass",n.Ec(13,j,"ok"===c,"ok"!==c)),n.Tb("shape","ok"===c?"check-circle":"exclamation-circle"),n.Sb(2),n.zc("ngIf","ok"===c)("ngIfElse",t),n.Sb(4),n.Yc(" ",n.uc(9,6,"system.health-last-checked"),": ",n.vc(10,8,n.uc(11,11,s.healthCheckService.lastCheck$),"mediumTime")," ")}}function y(c,e){1&c&&(n.hc(0),n.ec(1,"clr-icon",17),n.Vc(2),n.tc(3,"translate"),n.gc()),2&c&&(n.Sb(2),n.Xc(" ",n.uc(3,1,"system.health-status-up")," "))}function S(c,e){1&c&&(n.ec(0,"clr-icon",18),n.Vc(1),n.tc(2,"translate")),2&c&&(n.Sb(1),n.Xc(" ",n.uc(2,1,"system.health-status-down")," "))}function k(c,e){if(1&c&&(n.jc(0,"tr"),n.jc(1,"td",14),n.Vc(2),n.ic(),n.jc(3,"td",14),n.jc(4,"vdr-chip",15),n.Tc(5,y,4,3,"ng-container",11),n.Tc(6,S,3,3,"ng-template",null,16,n.Uc),n.ic(),n.ic(),n.jc(8,"td",14),n.Vc(9),n.ic(),n.ic()),2&c){const c=e.$implicit,t=n.Jc(7);n.Sb(2),n.Wc(c.key),n.Sb(2),n.zc("colorType","up"===c.result.status?"success":"error"),n.Sb(1),n.zc("ngIf","up"===c.result.status)("ngIfElse",t),n.Sb(4),n.Wc(c.result.message)}}function I(c,e){1&c&&(n.hc(0),n.Vc(1),n.tc(2,"translate"),n.gc()),2&c&&(n.Sb(1),n.Xc(" ",n.uc(2,1,"system.all-job-queues")," "))}function C(c,e){if(1&c&&(n.jc(0,"vdr-chip",8),n.Vc(1),n.ic()),2&c){const c=n.sc().item;n.zc("colorFrom",c.name),n.Sb(1),n.Wc(c.name)}}function w(c,e){if(1&c&&(n.Tc(0,I,3,3,"ng-container",6),n.Tc(1,C,2,2,"ng-template",null,7,n.Uc)),2&c){const c=e.item,t=n.Jc(2);n.zc("ngIf","all"===c.name)("ngIfElse",t)}}function P(c,e){if(1&c&&(n.jc(0,"vdr-dropdown"),n.jc(1,"button",14),n.tc(2,"translate"),n.ec(3,"clr-icon",15),n.ic(),n.jc(4,"vdr-dropdown-menu"),n.jc(5,"div",16),n.ec(6,"vdr-object-tree",17),n.ic(),n.ic(),n.ic()),2&c){const c=n.sc().item;n.Sb(1),n.zc("title",n.uc(2,2,"system.job-data")),n.Sb(5),n.zc("value",c.data)}}function T(c,e){if(1&c&&(n.jc(0,"vdr-dropdown"),n.jc(1,"button",18),n.ec(2,"clr-icon",15),n.Vc(3),n.tc(4,"translate"),n.ic(),n.jc(5,"vdr-dropdown-menu"),n.jc(6,"div",16),n.ec(7,"vdr-object-tree",17),n.ic(),n.ic(),n.ic()),2&c){const c=n.sc().item;n.Sb(3),n.Xc(" ",n.uc(4,2,"system.job-result")," "),n.Sb(4),n.zc("value",c.result)}}function V(c,e){if(1&c&&(n.jc(0,"vdr-dropdown"),n.jc(1,"button",18),n.ec(2,"clr-icon",19),n.Vc(3),n.tc(4,"translate"),n.ic(),n.jc(5,"vdr-dropdown-menu"),n.jc(6,"div",16),n.Vc(7),n.ic(),n.ic(),n.ic()),2&c){const c=n.sc().item;n.Sb(3),n.Xc(" ",n.uc(4,2,"system.job-error")," "),n.Sb(4),n.Xc(" ",c.error," ")}}function z(c,e){if(1&c){const c=n.kc();n.jc(0,"vdr-dropdown"),n.jc(1,"button",20),n.ec(2,"clr-icon",21),n.ic(),n.jc(3,"vdr-dropdown-menu",22),n.jc(4,"button",23),n.qc("click",function(){n.Mc(c);const e=n.sc().item;return n.sc().cancelJob(e.id)}),n.tc(5,"hasPermission"),n.ec(6,"clr-icon",24),n.Vc(7),n.tc(8,"translate"),n.ic(),n.ic(),n.ic()}2&c&&(n.Sb(4),n.zc("disabled",!n.uc(5,2,"DeleteSettings")),n.Sb(3),n.Xc(" ",n.uc(8,4,"common.cancel")," "))}function D(c,e){if(1&c&&(n.jc(0,"td",9),n.ec(1,"vdr-entity-info",10),n.ic(),n.jc(2,"td",9),n.Tc(3,P,7,4,"vdr-dropdown",11),n.jc(4,"vdr-chip",8),n.Vc(5),n.ic(),n.ic(),n.jc(6,"td",9),n.Vc(7),n.tc(8,"timeAgo"),n.ic(),n.jc(9,"td",9),n.ec(10,"vdr-job-state-label",12),n.ic(),n.jc(11,"td",9),n.Vc(12),n.tc(13,"duration"),n.ic(),n.jc(14,"td",9),n.Tc(15,T,8,4,"vdr-dropdown",11),n.Tc(16,V,8,4,"vdr-dropdown",11),n.ic(),n.jc(17,"td",13),n.Tc(18,z,9,6,"vdr-dropdown",11),n.ic()),2&c){const c=e.item,t=n.sc();n.Sb(1),n.zc("entity",c),n.Sb(2),n.zc("ngIf",c.data),n.Sb(1),n.zc("colorFrom",c.queueName),n.Sb(1),n.Wc(c.queueName),n.Sb(2),n.Wc(n.uc(8,10,c.createdAt)),n.Sb(3),n.zc("job",c),n.Sb(2),n.Wc(n.uc(13,12,c.duration)),n.Sb(3),n.zc("ngIf",t.hasResult(c)),n.Sb(1),n.zc("ngIf",c.error),n.Sb(2),n.zc("ngIf",!c.isSettled&&"FAILED"!==c.state)}}function E(c,e){if(1&c&&(n.jc(0,"span",2),n.Vc(1),n.tc(2,"percent"),n.ic()),2&c){const c=n.sc();n.Sb(1),n.Xc(" ",n.uc(2,1,c.job.progress/100)," ")}}class O{constructor(c){this.healthCheckService=c}}O.\u0275fac=function(c){return new(c||O)(n.dc(s.kb))},O.\u0275cmp=n.Xb({type:O,selectors:[["vdr-health-check"]],decls:25,vars:18,consts:[["class","system-status-header",4,"ngIf"],["locationId","system-status"],[1,"btn","btn-secondary",3,"click"],["shape","refresh"],[1,"table"],[1,"left"],[4,"ngFor","ngForOf"],[1,"system-status-header"],[1,"status-icon"],["size","48",3,"ngClass"],[1,"status-detail"],[4,"ngIf","ngIfElse"],["error",""],[1,"last-checked"],[1,"align-middle","left"],[3,"colorType"],["down",""],["shape","check-circle"],["shape","exclamation-circle"]],template:function(c,e){1&c&&(n.jc(0,"vdr-action-bar"),n.jc(1,"vdr-ab-left"),n.Tc(2,v,12,16,"div",0),n.tc(3,"async"),n.ic(),n.jc(4,"vdr-ab-right"),n.ec(5,"vdr-action-bar-items",1),n.jc(6,"button",2),n.qc("click",function(){return e.healthCheckService.refresh()}),n.ec(7,"clr-icon",3),n.Vc(8),n.tc(9,"translate"),n.ic(),n.ic(),n.ic(),n.jc(10,"table",4),n.jc(11,"thead"),n.jc(12,"tr"),n.jc(13,"th",5),n.Vc(14),n.tc(15,"translate"),n.ic(),n.jc(16,"th",5),n.Vc(17),n.tc(18,"translate"),n.ic(),n.jc(19,"th",5),n.Vc(20),n.tc(21,"translate"),n.ic(),n.ic(),n.ic(),n.jc(22,"tbody"),n.Tc(23,k,10,5,"tr",6),n.tc(24,"async"),n.ic(),n.ic()),2&c&&(n.Sb(2),n.zc("ngIf",n.uc(3,6,e.healthCheckService.status$)),n.Sb(6),n.Xc(" ",n.uc(9,8,"system.health-refresh")," "),n.Sb(6),n.Xc(" ",n.uc(15,10,"common.name")," "),n.Sb(3),n.Xc(" ",n.uc(18,12,"system.health-status")," "),n.Sb(3),n.Xc(" ",n.uc(21,14,"system.health-message")," "),n.Sb(3),n.zc("ngForOf",n.uc(24,16,e.healthCheckService.details$)))},directives:[s.c,s.e,b.o,s.f,s.d,m.o,b.n,b.m,s.D],pipes:[b.b,h.d,s.Bb],styles:[".system-status-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:flex-start}.system-status-header[_ngcontent-%COMP%]   .status-detail[_ngcontent-%COMP%]{font-weight:700}.system-status-header[_ngcontent-%COMP%]   .last-checked[_ngcontent-%COMP%]{font-weight:400;color:var(--color-grey-500)}"],changeDetection:0}),O.ctorParameters=()=>[{type:s.kb}];class N extends s.y{constructor(c,e,t,n,a){super(n,a),this.dataService=c,this.modalService=e,this.notificationService=t,this.liveUpdate=new r.f(!0),this.hideSettled=new r.f(!0),this.queueFilter=new r.f("all"),super.setQueryFn((...c)=>this.dataService.settings.getAllJobs(...c),c=>c.jobs,(c,e)=>{const t="all"===this.queueFilter.value?null:{queueName:{eq:this.queueFilter.value}},n=this.hideSettled.value;return{options:{skip:c,take:e,filter:Object.assign(Object.assign({},t),n?{isSettled:{eq:!1}}:{}),sort:{createdAt:s.Pb.DESC}}}})}ngOnInit(){super.ngOnInit(),Object(i.a)(5e3,2e3).pipe(Object(o.a)(this.destroy$),Object(l.a)(()=>this.liveUpdate.value)).subscribe(()=>{this.refresh()}),this.queues$=this.dataService.settings.getJobQueues().mapStream(c=>c.jobQueues).pipe(Object(u.a)(c=>[{name:"all",running:!0},...c]))}hasResult(c){const e=c.result;return null!=e&&("object"!=typeof e||Object.keys(e).length>0)}cancelJob(c){this.dataService.settings.cancelJob(c).subscribe(()=>this.refresh())}}N.\u0275fac=function(c){return new(c||N)(n.dc(s.M),n.dc(s.Db),n.dc(s.Eb),n.dc(a.e),n.dc(a.a))},N.\u0275cmp=n.Xb({type:N,selectors:[["vdr-job-list"]],features:[n.Pb],decls:41,vars:45,consts:[["type","checkbox","clrCheckbox","","name","live-update",3,"formControl"],["type","checkbox","clrCheckbox","","name","hide-settled",3,"formControl","change"],["bindValue","name",3,"addTag","items","hideSelected","multiple","markFirst","clearable","searchable","formControl","change"],["ng-label-tmp","","ng-option-tmp",""],["locationId","job-list"],[3,"items","itemsPerPage","totalItems","currentPage","pageChange","itemsPerPageChange"],[4,"ngIf","ngIfElse"],["others",""],[3,"colorFrom"],[1,"left","align-middle"],[3,"entity"],[4,"ngIf"],[3,"job"],[1,"right","align-middle"],["vdrDropdownTrigger","",1,"btn","btn-link","btn-icon",3,"title"],["shape","details"],[1,"result-detail"],[3,"value"],["vdrDropdownTrigger","",1,"btn","btn-link","btn-sm","details-button"],["shape","exclamation-circle"],["vdrDropdownTrigger","",1,"icon-button"],["shape","ellipsis-vertical"],["vdrPosition","bottom-right"],["type","button","vdrDropdownItem","",1,"delete-button",3,"disabled","click"],["shape","ban",1,"is-danger"]],template:function(c,e){1&c&&(n.jc(0,"vdr-action-bar"),n.jc(1,"vdr-ab-left"),n.jc(2,"clr-checkbox-container"),n.jc(3,"clr-checkbox-wrapper"),n.ec(4,"input",0),n.jc(5,"label"),n.Vc(6),n.tc(7,"translate"),n.ic(),n.ic(),n.jc(8,"clr-checkbox-wrapper"),n.jc(9,"input",1),n.qc("change",function(){return e.refresh()}),n.ic(),n.jc(10,"label"),n.Vc(11),n.tc(12,"translate"),n.ic(),n.ic(),n.ic(),n.ic(),n.jc(13,"vdr-ab-right"),n.jc(14,"ng-select",2),n.qc("change",function(){return e.refresh()}),n.tc(15,"async"),n.Tc(16,w,3,2,"ng-template",3),n.ic(),n.ec(17,"vdr-action-bar-items",4),n.ic(),n.ic(),n.jc(18,"vdr-data-table",5),n.qc("pageChange",function(c){return e.setPageNumber(c)})("itemsPerPageChange",function(c){return e.setItemsPerPage(c)}),n.tc(19,"async"),n.tc(20,"async"),n.tc(21,"async"),n.tc(22,"async"),n.ec(23,"vdr-dt-column"),n.jc(24,"vdr-dt-column"),n.Vc(25),n.tc(26,"translate"),n.ic(),n.jc(27,"vdr-dt-column"),n.Vc(28),n.tc(29,"translate"),n.ic(),n.jc(30,"vdr-dt-column"),n.Vc(31),n.tc(32,"translate"),n.ic(),n.jc(33,"vdr-dt-column"),n.Vc(34),n.tc(35,"translate"),n.ic(),n.jc(36,"vdr-dt-column"),n.Vc(37),n.tc(38,"translate"),n.ic(),n.ec(39,"vdr-dt-column"),n.Tc(40,D,19,14,"ng-template"),n.ic()),2&c&&(n.Sb(4),n.zc("formControl",e.liveUpdate),n.Sb(2),n.Wc(n.uc(7,21,"common.live-update")),n.Sb(3),n.zc("formControl",e.hideSettled),n.Sb(2),n.Wc(n.uc(12,23,"system.hide-settled-jobs")),n.Sb(3),n.zc("addTag",!1)("items",n.uc(15,25,e.queues$))("hideSelected",!0)("multiple",!1)("markFirst",!1)("clearable",!1)("searchable",!1)("formControl",e.queueFilter),n.Sb(4),n.zc("items",n.uc(19,27,e.items$))("itemsPerPage",n.uc(20,29,e.itemsPerPage$))("totalItems",n.uc(21,31,e.totalItems$))("currentPage",n.uc(22,33,e.currentPage$)),n.Sb(7),n.Wc(n.uc(26,35,"system.job-queue-name")),n.Sb(3),n.Wc(n.uc(29,37,"common.created-at")),n.Sb(3),n.Wc(n.uc(32,39,"system.job-state")),n.Sb(3),n.Wc(n.uc(35,41,"system.job-duration")),n.Sb(3),n.Wc(n.uc(38,43,"system.job-result")))},directives:function(){return[s.c,s.e,m.j,m.k,s.fb,r.a,m.i,r.p,r.g,m.u,s.f,p.a,p.e,p.d,s.d,s.O,s.N,b.o,s.D,s.bb,q,s.U,s.X,m.o,s.W,s.Fb,s.V]},pipes:function(){return[h.d,b.b,s.Ub,s.Y,s.jb]},styles:[".result-detail[_ngcontent-%COMP%]{margin:0 12px}"],changeDetection:0}),N.ctorParameters=()=>[{type:s.M},{type:s.Db},{type:s.Eb},{type:a.e},{type:a.a}];class q{get iconShape(){switch(this.job.state){case s.ub.COMPLETED:return"check-circle";case s.ub.FAILED:return"exclamation-circle";case s.ub.CANCELLED:return"ban";case s.ub.PENDING:case s.ub.RETRYING:return"hourglass";case s.ub.RUNNING:return"sync"}}get colorType(){switch(this.job.state){case s.ub.COMPLETED:return"success";case s.ub.FAILED:case s.ub.CANCELLED:return"error";case s.ub.PENDING:case s.ub.RETRYING:return"";case s.ub.RUNNING:return"warning"}}}q.\u0275fac=function(c){return new(c||q)},q.\u0275cmp=n.Xb({type:q,selectors:[["vdr-job-state-label"]],inputs:{job:"job"},decls:5,vars:6,consts:[[3,"colorType"],["class","progress",4,"ngIf"],[1,"progress"]],template:function(c,e){1&c&&(n.jc(0,"vdr-chip",0),n.ec(1,"clr-icon"),n.Vc(2),n.tc(3,"titlecase"),n.Tc(4,E,3,3,"span",1),n.ic()),2&c&&(n.zc("colorType",e.colorType),n.Sb(1),n.Tb("shape",e.iconShape),n.Sb(1),n.Xc(" ",n.uc(3,4,e.job.state)," "),n.Sb(2),n.zc("ngIf","RUNNING"===e.job.state))},directives:[s.D,m.o,b.o],pipes:[b.y,b.v],styles:[".progress[_ngcontent-%COMP%]{margin-left:3px}clr-icon[_ngcontent-%COMP%]{min-width:12px}"],changeDetection:0}),q.propDecorators={job:[{type:n.E}]};const F={breadcrumb:Object(d.a)("breadcrumb.job-queue")},X={breadcrumb:Object(d.a)("breadcrumb.system-status")},x=[{path:"jobs",component:N,data:F},{path:"system-status",component:O,data:X}];class M{}M.\u0275fac=function(c){return new(c||M)},M.\u0275mod=n.bc({type:M}),M.\u0275inj=n.ac({imports:[[s.Nb,a.i.forChild(x)]]})}}]);
//# sourceMappingURL=14-es2015.073d282bb3848b94b244.js.map
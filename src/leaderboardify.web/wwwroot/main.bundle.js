webpackJsonp([1,4],{

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_components_shared_components__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_services__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_shared__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AthleteComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var modalOptions = { size: 'sm' };
var AthleteComponent = (function () {
    function AthleteComponent(router, modal, lbApi, identityService) {
        this.router = router;
        this.modal = modal;
        this.lbApi = lbApi;
        this.athletePerf = new __WEBPACK_IMPORTED_MODULE_6__shared_shared__["b" /* AthletePerformance */]();
        this.editable = false;
        this.identityInfo = identityService.info;
    }
    AthleteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.params.subscribe(function (params) {
            var userIdParam = params['userId'];
            if (_this.identityInfo.isAuthenticated) {
                _this.userId = (userIdParam === 'me' ? _this.identityInfo.userId : userIdParam);
                _this.editable = (_this.identityInfo.userId === _this.userId);
            }
            else {
                if (userIdParam === 'me') {
                    window.location.href = '/account/login';
                }
                else {
                    _this.userId = userIdParam;
                }
            }
            _this.busyEntries = _this.lbApi.getUserEntries(_this.userId).subscribe(function (data) {
                _this.workoutEntries = data;
            });
            _this.busy = _this.refreshAthletePerformance();
        });
    };
    AthleteComponent.prototype.addNewEntry = function () {
        var _this = this;
        this.modal.open(__WEBPACK_IMPORTED_MODULE_3__components__["c" /* EntryEditorModal */], modalOptions).result.then(function (result) {
            _this.busy = _this.lbApi.addWorkoutEntry(result).subscribe(function (data) {
                _this.workoutEntries.push(data);
                return _this.refreshAthletePerformance();
            });
        }, function (reason) { return reason; });
    };
    AthleteComponent.prototype.editEntry = function (entry) {
        var _this = this;
        var modalRef = this.modal.open(__WEBPACK_IMPORTED_MODULE_3__components__["c" /* EntryEditorModal */], modalOptions);
        modalRef.componentInstance.entry = entry;
        modalRef.result.then(function (result) {
            _this.busy = _this.lbApi.updateWorkoutEntry(result).subscribe(function (data) {
                __WEBPACK_IMPORTED_MODULE_7_lodash__["assign"](entry, data);
                return _this.refreshAthletePerformance();
            });
        }, function (reason) { return reason; });
    };
    AthleteComponent.prototype.deleteEntry = function (entry) {
        var _this = this;
        var modalRef = this.modal.open(__WEBPACK_IMPORTED_MODULE_4__shared_components_shared_components__["a" /* ConfirmModalComponent */]);
        modalRef.componentInstance.properties = { title: 'Delete?', message: 'Are you sure you want to delete this entry?', buttons: ['Yes', 'No'] };
        modalRef.result.then(function (result) {
            _this.busy = _this.lbApi.deleteWorkoutEntry(entry.id).subscribe(function (result) {
                __WEBPACK_IMPORTED_MODULE_7_lodash__["remove"](_this.workoutEntries, entry);
                return _this.refreshAthletePerformance();
            });
        }, function (reason) { return reason; });
    };
    AthleteComponent.prototype.getProgressBarType = function (type) {
        var pct = (this.athletePerf[type + 'Total'] / this.athletePerf[type + "Target"]) * 100;
        if (pct <= 25) {
            return 'success';
        }
        else if (pct > 25 && pct <= 50) {
            return 'info';
        }
        else if (pct > 50 && pct <= 75) {
            return 'warning';
        }
        else if (pct > 75) {
            return 'danger';
        }
    };
    AthleteComponent.prototype.refreshAthletePerformance = function () {
        var _this = this;
        return this.lbApi.getAthletePerformance(this.userId).subscribe(function (data) {
            if (data) {
                _this.athletePerf = data;
            }
        });
    };
    AthleteComponent.prototype.setTargets = function () {
        var _this = this;
        var modalRef = this.modal.open(__WEBPACK_IMPORTED_MODULE_3__components__["d" /* PerformanceTargetsModal */], modalOptions);
        modalRef.componentInstance.perfTarget = this.athletePerf;
        modalRef.result.then(function (performance) {
            _this.busy = _this.lbApi.saveAthletePerformance(performance, _this.identityInfo.userId).subscribe(function (performance) { return _this.athletePerf = performance; });
        }, function (reason) { return reason; });
    };
    AthleteComponent.prototype.formatDate = function (entryDate) {
        var date = __WEBPACK_IMPORTED_MODULE_8_moment__(entryDate);
        return date.month() + 1 + "/" + date.date() + "/" + date.year();
    };
    AthleteComponent.prototype.formatNumber = function (num) {
        return num ? num.toLocaleString() : '';
    };
    AthleteComponent.prototype.formatTotal = function (num) {
        var temp = this.formatNumber(num);
        return temp.length === 0 ? '0' : temp;
    };
    AthleteComponent.prototype.formatTarget = function (num) {
        var temp = this.formatNumber(num);
        return temp.length === 0 ? '{No goal set}' : temp;
    };
    AthleteComponent.prototype.percentComplete = function (total, target) {
        if (total && target) {
            var pct = total / target;
            return Math.round(pct * 100);
        }
        else {
            return '';
        }
    };
    return AthleteComponent;
}());
AthleteComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-athlete',
        template: __webpack_require__(443),
        styles: [__webpack_require__(432)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__services_services__["a" /* LbApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_services__["a" /* LbApiService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__services_services__["b" /* IdentityInfoService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_services__["b" /* IdentityInfoService */]) === "function" && _d || Object])
], AthleteComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=athlete.component.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_shared__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntryEditorModal; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EntryEditorModal = (function () {
    function EntryEditorModal(activeModal) {
        this.activeModal = activeModal;
        this.action = 'Add';
        this.editableItem = new __WEBPACK_IMPORTED_MODULE_2__shared_shared__["a" /* WorkoutEntry */]();
        //this.workoutDate = new Date();
    }
    EntryEditorModal.prototype.ngOnInit = function () {
        if (this.entry) {
            this.action = 'Edit';
            this.editableItem = __WEBPACK_IMPORTED_MODULE_3_lodash__["cloneDeep"](this.entry);
        }
        this.initDate(this.entry);
    };
    EntryEditorModal.prototype.initDate = function (entry) {
        var entryDate = (entry ? __WEBPACK_IMPORTED_MODULE_4_moment__(entry.date) : __WEBPACK_IMPORTED_MODULE_4_moment__());
        this.workoutDate = { month: entryDate.month() + 1, day: entryDate.date(), year: entryDate.year() };
    };
    EntryEditorModal.prototype.save = function () {
        //TODO: check for valiation here
        this.editableItem.date = this.workoutDate.year + "-" + this.workoutDate.month + "-" + this.workoutDate.day;
        this.activeModal.close(this.editableItem);
    };
    EntryEditorModal.prototype.milesToMeters = function (milesString) {
        var miles = __WEBPACK_IMPORTED_MODULE_3_lodash__["toNumber"](milesString);
        return __WEBPACK_IMPORTED_MODULE_3_lodash__["isFinite"](miles) ? Math.round(miles * 1609.34) : '0';
    };
    return EntryEditorModal;
}());
EntryEditorModal = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-entry-editor-modal',
        template: __webpack_require__(444),
        styles: [__webpack_require__(433)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbActiveModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbActiveModal */]) === "function" && _a || Object])
], EntryEditorModal);

var _a;
//# sourceMappingURL=entry-editor-modal.component.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_services_services__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoginComponent = (function () {
    function LoginComponent(identityService) {
        this.identityInfo = identityService.info;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'login',
        template: __webpack_require__(446),
        styles: [__webpack_require__(435)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_services_services__["b" /* IdentityInfoService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_services_services__["b" /* IdentityInfoService */]) === "function" && _a || Object])
], LoginComponent);

var _a;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_services_services__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavMenuComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NavMenuComponent = (function () {
    function NavMenuComponent(identityService) {
        this.identityInfo = identityService.info;
    }
    NavMenuComponent.prototype.ngOnInit = function () {
    };
    return NavMenuComponent;
}());
NavMenuComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'nav-menu',
        template: __webpack_require__(447),
        styles: [__webpack_require__(436)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_services_services__["b" /* IdentityInfoService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_services_services__["b" /* IdentityInfoService */]) === "function" && _a || Object])
], NavMenuComponent);

var _a;
//# sourceMappingURL=nav-menu.component.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerformanceTargetsModal; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PerformanceTargetsModal = (function () {
    function PerformanceTargetsModal(activeModal) {
        this.activeModal = activeModal;
    }
    PerformanceTargetsModal.prototype.ngOnInit = function () {
        this.editableItem = __WEBPACK_IMPORTED_MODULE_2_lodash__["cloneDeep"](this.perfTarget);
    };
    PerformanceTargetsModal.prototype.save = function () {
        //TODO: need to put validation in
        this.activeModal.close(this.editableItem);
    };
    return PerformanceTargetsModal;
}());
PerformanceTargetsModal = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-performance-targets-modal',
        template: __webpack_require__(448),
        styles: [__webpack_require__(437)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbActiveModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbActiveModal */]) === "function" && _a || Object])
], PerformanceTargetsModal);

var _a;
//# sourceMappingURL=performance-targets-modal.component.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmModalComponent; });
/* unused harmony export ConfirmModalProperties */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConfirmModalComponent = (function () {
    function ConfirmModalComponent(activeModal) {
        this.activeModal = activeModal;
    }
    ConfirmModalComponent.prototype.ngOnInit = function () { };
    return ConfirmModalComponent;
}());
ConfirmModalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'confirm-modal',
        template: __webpack_require__(449)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbActiveModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbActiveModal */]) === "function" && _a || Object])
], ConfirmModalComponent);

var ConfirmModalProperties = (function () {
    function ConfirmModalProperties() {
    }
    return ConfirmModalProperties;
}());

var _a;
//# sourceMappingURL=confirm-modal.component.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MilesToMetersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MilesToMetersComponent = (function () {
    function MilesToMetersComponent() {
    }
    MilesToMetersComponent.prototype.ngOnInit = function () { };
    MilesToMetersComponent.prototype.milesToMeters = function (milesString) {
        var miles = __WEBPACK_IMPORTED_MODULE_1_lodash__["toNumber"](milesString);
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["isFinite"](miles) ? Math.round(miles * 1609.34) : '0';
    };
    return MilesToMetersComponent;
}());
MilesToMetersComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'miles-to-meters',
        template: __webpack_require__(450)
    }),
    __metadata("design:paramtypes", [])
], MilesToMetersComponent);

//# sourceMappingURL=miles-to-meters.component.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__confirm_modal_confirm_modal_component__ = __webpack_require__(171);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__confirm_modal_confirm_modal_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__miles_to_meters_miles_to_meters_component__ = __webpack_require__(172);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__miles_to_meters_miles_to_meters_component__["a"]; });


//# sourceMappingURL=shared-components.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__workout_entry__ = __webpack_require__(368);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__workout_entry__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__athlete_performance__ = __webpack_require__(366);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__athlete_performance__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__identity_info__ = __webpack_require__(367);
/* unused harmony namespace reexport */



//# sourceMappingURL=shared.js.map

/***/ }),

/***/ 346:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 346;


/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(369);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_components__ = __webpack_require__(90);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2_app_components__["a" /* HomeComponent */] },
    { path: 'athlete/:userId', component: __WEBPACK_IMPORTED_MODULE_2_app_components__["b" /* AthleteComponent */] },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works2!';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'leaderboardify-app',
        template: __webpack_require__(442),
        styles: [__webpack_require__(431)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_busy__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_busy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_busy__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_routing_module__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__nav_menu_nav_menu_component__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__login_login_component__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__athlete_athlete_component__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__performance_targets_modal_performance_targets_modal_component__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__entry_editor_modal_entry_editor_modal_component__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shared_components_shared_components__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_services__ = __webpack_require__(39);
/* unused harmony export initApp */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// Third Party




//import { HomeComponent } from './home/home.component';








function initApp(identityService) {
    return function () { return identityService.load(); };
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_15__shared_components_shared_components__["a" /* ConfirmModalComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_10__nav_menu_nav_menu_component__["a" /* NavMenuComponent */],
            __WEBPACK_IMPORTED_MODULE_11__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_15__shared_components_shared_components__["b" /* MilesToMetersComponent */],
            __WEBPACK_IMPORTED_MODULE_12__athlete_athlete_component__["a" /* AthleteComponent */],
            __WEBPACK_IMPORTED_MODULE_13__performance_targets_modal_performance_targets_modal_component__["a" /* PerformanceTargetsModal */],
            __WEBPACK_IMPORTED_MODULE_14__entry_editor_modal_entry_editor_modal_component__["a" /* EntryEditorModal */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_6_angular2_busy__["BusyModule"],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_7__app_routing_module__["a" /* AppRoutingModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_16__services_services__["a" /* LbApiService */],
            __WEBPACK_IMPORTED_MODULE_16__services_services__["b" /* IdentityInfoService */],
            {
                provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["APP_INITIALIZER"],
                useFactory: initApp,
                deps: [__WEBPACK_IMPORTED_MODULE_16__services_services__["b" /* IdentityInfoService */]],
                multi: true
            }
            //LbApiService
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_15__shared_components_shared_components__["a" /* ConfirmModalComponent */],
            __WEBPACK_IMPORTED_MODULE_14__entry_editor_modal_entry_editor_modal_component__["a" /* EntryEditorModal */],
            __WEBPACK_IMPORTED_MODULE_15__shared_components_shared_components__["b" /* MilesToMetersComponent */],
            __WEBPACK_IMPORTED_MODULE_13__performance_targets_modal_performance_targets_modal_component__["a" /* PerformanceTargetsModal */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_services__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomeComponent = (function () {
    function HomeComponent(router, lbApi) {
        this.router = router;
        this.lbApi = lbApi;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.busy = this.lbApi.getAllPerformance().subscribe(function (result) {
            _this.performances = result;
        });
    };
    HomeComponent.prototype.gotoPolicyEditor = function () {
        var link = ['policy-editor'];
        this.router.navigate(link);
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home',
        template: __webpack_require__(445),
        styles: [__webpack_require__(434)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_services__["a" /* LbApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_services__["a" /* LbApiService */]) === "function" && _b || Object])
], HomeComponent);

var _a, _b;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IdentityInfoService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//const baseUrl = 'https://localhost:5001';
var baseUrl = '';
var IdentityInfoService = (function () {
    function IdentityInfoService(http) {
        this.http = http;
    }
    IdentityInfoService.prototype.load = function () {
        var _this = this;
        //let url = 'http://localhost:5000/api/identity';
        var url = baseUrl + "/api/identity";
        return new Promise(function (resolve, reject) {
            _this.http.get(url)
                .map(function (res) { return res.json(); })
                .catch(function (error) {
                console.log('Configuration endpoint could not be read');
                resolve(true);
                return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].throw(error.json().error || 'Server error');
            })
                .subscribe(function (response) {
                console.log('****GOT A RESPONSE:', response);
                _this.info = response;
                resolve(true);
            });
        });
    };
    return IdentityInfoService;
}());
IdentityInfoService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], IdentityInfoService);

var _a;
//# sourceMappingURL=identity-info.service.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LbApiService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//const baseUrl = 'https://localhost:5001';
var baseUrl = '';
var LbApiService = (function () {
    //constructor(private http: Http, @Inject('IdentityInfo') private identityInfo: any) { }
    function LbApiService(http) {
        this.http = http;
        //this.identityInfo = identityService.info;
    }
    LbApiService.prototype.addWorkoutEntry = function (entry) {
        return this.http.post(baseUrl + "/api/workout-entries", entry).map(function (response) { return response.json(); });
    };
    LbApiService.prototype.updateWorkoutEntry = function (entry) {
        return this.http.put(baseUrl + "/api/workout-entries/" + entry.id, entry).map(function (response) { return response.json(); });
    };
    LbApiService.prototype.getUserEntries = function (userId) {
        return this.http.get(baseUrl + "/api/workout-entries/user/" + userId).map(function (response) { return response.json(); });
    };
    LbApiService.prototype.deleteWorkoutEntry = function (id) {
        return this.http.delete(baseUrl + "/api/workout-entries/" + id);
    };
    LbApiService.prototype.getAllPerformance = function () {
        return this.http.get(baseUrl + "/api/performances").map(function (response) { return response.json(); });
    };
    LbApiService.prototype.getAthletePerformance = function (userId) {
        //let userId = this.identityInfo.userId;
        return this.http.get(baseUrl + "/api/performances/" + userId).map(function (response) { return response.json(); });
    };
    LbApiService.prototype.saveAthletePerformance = function (performance, userId) {
        //let userId = this.identityInfo.userId;
        performance.userId = userId;
        return this.http.put(baseUrl + "/api/performances/" + userId, performance).map(function (response) { return response.json(); });
    };
    return LbApiService;
}());
LbApiService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], LbApiService);

var _a;
//# sourceMappingURL=lb-api.service.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AthletePerformance; });
var AthletePerformance = (function () {
    function AthletePerformance() {
        this.rowTarget = 0;
        this.rowTotal = 0;
        this.runTarget = 0;
        this.runTotal = 0;
        this.bikeTarget = 0;
        this.bikeTotal = 0;
    }
    return AthletePerformance;
}());

//# sourceMappingURL=athlete-performance.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* unused harmony export IdentityInfo */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var IdentityInfo = (function () {
    function IdentityInfo() {
    }
    return IdentityInfo;
}());
IdentityInfo = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], IdentityInfo);

//# sourceMappingURL=identity-info.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkoutEntry; });
var WorkoutEntry = (function () {
    function WorkoutEntry() {
    }
    return WorkoutEntry;
}());

//# sourceMappingURL=workout-entry.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lb_api_service__ = __webpack_require__(365);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__lb_api_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__identity_info_service__ = __webpack_require__(364);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__identity_info_service__["a"]; });


//# sourceMappingURL=services.js.map

/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 437:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 441:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 189,
	"./af.js": 189,
	"./ar": 196,
	"./ar-dz": 190,
	"./ar-dz.js": 190,
	"./ar-kw": 191,
	"./ar-kw.js": 191,
	"./ar-ly": 192,
	"./ar-ly.js": 192,
	"./ar-ma": 193,
	"./ar-ma.js": 193,
	"./ar-sa": 194,
	"./ar-sa.js": 194,
	"./ar-tn": 195,
	"./ar-tn.js": 195,
	"./ar.js": 196,
	"./az": 197,
	"./az.js": 197,
	"./be": 198,
	"./be.js": 198,
	"./bg": 199,
	"./bg.js": 199,
	"./bn": 200,
	"./bn.js": 200,
	"./bo": 201,
	"./bo.js": 201,
	"./br": 202,
	"./br.js": 202,
	"./bs": 203,
	"./bs.js": 203,
	"./ca": 204,
	"./ca.js": 204,
	"./cs": 205,
	"./cs.js": 205,
	"./cv": 206,
	"./cv.js": 206,
	"./cy": 207,
	"./cy.js": 207,
	"./da": 208,
	"./da.js": 208,
	"./de": 211,
	"./de-at": 209,
	"./de-at.js": 209,
	"./de-ch": 210,
	"./de-ch.js": 210,
	"./de.js": 211,
	"./dv": 212,
	"./dv.js": 212,
	"./el": 213,
	"./el.js": 213,
	"./en-au": 214,
	"./en-au.js": 214,
	"./en-ca": 215,
	"./en-ca.js": 215,
	"./en-gb": 216,
	"./en-gb.js": 216,
	"./en-ie": 217,
	"./en-ie.js": 217,
	"./en-nz": 218,
	"./en-nz.js": 218,
	"./eo": 219,
	"./eo.js": 219,
	"./es": 221,
	"./es-do": 220,
	"./es-do.js": 220,
	"./es.js": 221,
	"./et": 222,
	"./et.js": 222,
	"./eu": 223,
	"./eu.js": 223,
	"./fa": 224,
	"./fa.js": 224,
	"./fi": 225,
	"./fi.js": 225,
	"./fo": 226,
	"./fo.js": 226,
	"./fr": 229,
	"./fr-ca": 227,
	"./fr-ca.js": 227,
	"./fr-ch": 228,
	"./fr-ch.js": 228,
	"./fr.js": 229,
	"./fy": 230,
	"./fy.js": 230,
	"./gd": 231,
	"./gd.js": 231,
	"./gl": 232,
	"./gl.js": 232,
	"./gom-latn": 233,
	"./gom-latn.js": 233,
	"./he": 234,
	"./he.js": 234,
	"./hi": 235,
	"./hi.js": 235,
	"./hr": 236,
	"./hr.js": 236,
	"./hu": 237,
	"./hu.js": 237,
	"./hy-am": 238,
	"./hy-am.js": 238,
	"./id": 239,
	"./id.js": 239,
	"./is": 240,
	"./is.js": 240,
	"./it": 241,
	"./it.js": 241,
	"./ja": 242,
	"./ja.js": 242,
	"./jv": 243,
	"./jv.js": 243,
	"./ka": 244,
	"./ka.js": 244,
	"./kk": 245,
	"./kk.js": 245,
	"./km": 246,
	"./km.js": 246,
	"./kn": 247,
	"./kn.js": 247,
	"./ko": 248,
	"./ko.js": 248,
	"./ky": 249,
	"./ky.js": 249,
	"./lb": 250,
	"./lb.js": 250,
	"./lo": 251,
	"./lo.js": 251,
	"./lt": 252,
	"./lt.js": 252,
	"./lv": 253,
	"./lv.js": 253,
	"./me": 254,
	"./me.js": 254,
	"./mi": 255,
	"./mi.js": 255,
	"./mk": 256,
	"./mk.js": 256,
	"./ml": 257,
	"./ml.js": 257,
	"./mr": 258,
	"./mr.js": 258,
	"./ms": 260,
	"./ms-my": 259,
	"./ms-my.js": 259,
	"./ms.js": 260,
	"./my": 261,
	"./my.js": 261,
	"./nb": 262,
	"./nb.js": 262,
	"./ne": 263,
	"./ne.js": 263,
	"./nl": 265,
	"./nl-be": 264,
	"./nl-be.js": 264,
	"./nl.js": 265,
	"./nn": 266,
	"./nn.js": 266,
	"./pa-in": 267,
	"./pa-in.js": 267,
	"./pl": 268,
	"./pl.js": 268,
	"./pt": 270,
	"./pt-br": 269,
	"./pt-br.js": 269,
	"./pt.js": 270,
	"./ro": 271,
	"./ro.js": 271,
	"./ru": 272,
	"./ru.js": 272,
	"./sd": 273,
	"./sd.js": 273,
	"./se": 274,
	"./se.js": 274,
	"./si": 275,
	"./si.js": 275,
	"./sk": 276,
	"./sk.js": 276,
	"./sl": 277,
	"./sl.js": 277,
	"./sq": 278,
	"./sq.js": 278,
	"./sr": 280,
	"./sr-cyrl": 279,
	"./sr-cyrl.js": 279,
	"./sr.js": 280,
	"./ss": 281,
	"./ss.js": 281,
	"./sv": 282,
	"./sv.js": 282,
	"./sw": 283,
	"./sw.js": 283,
	"./ta": 284,
	"./ta.js": 284,
	"./te": 285,
	"./te.js": 285,
	"./tet": 286,
	"./tet.js": 286,
	"./th": 287,
	"./th.js": 287,
	"./tl-ph": 288,
	"./tl-ph.js": 288,
	"./tlh": 289,
	"./tlh.js": 289,
	"./tr": 290,
	"./tr.js": 290,
	"./tzl": 291,
	"./tzl.js": 291,
	"./tzm": 293,
	"./tzm-latn": 292,
	"./tzm-latn.js": 292,
	"./tzm.js": 293,
	"./uk": 294,
	"./uk.js": 294,
	"./ur": 295,
	"./ur.js": 295,
	"./uz": 297,
	"./uz-latn": 296,
	"./uz-latn.js": 296,
	"./uz.js": 297,
	"./vi": 298,
	"./vi.js": 298,
	"./x-pseudo": 299,
	"./x-pseudo.js": 299,
	"./yo": 300,
	"./yo.js": 300,
	"./zh-cn": 301,
	"./zh-cn.js": 301,
	"./zh-hk": 302,
	"./zh-hk.js": 302,
	"./zh-tw": 303,
	"./zh-tw.js": 303
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 441;


/***/ }),

/***/ 442:
/***/ (function(module, exports) {

module.exports = "<div>\n  <nav-menu></nav-menu>\n  <router-outlet></router-outlet>\n  <ng-template ngbModalContainer></ng-template>\n</div>"

/***/ }),

/***/ 443:
/***/ (function(module, exports) {

module.exports = "<div>\n  <div [ngBusy]=\"[busy, busyEntries]\"></div>\n\n  <div class=\"card\">\n    <div class=\"card-block\">\n      <div class=\"row\">\n        <h4 class=\"card-title\">\n          Athlete: {{athletePerf.firstName}} {{athletePerf.lastName}} - Grand Total: {{formatNumber(athletePerf.grandTotal)}} meters\n        </h4>\n        <!--<div class=\"col-md-3\">\n                    <h4 class=\"card-title\">Athlete: {{athletePerf.firstName}} {{athletePerf.lastName}}</h4>\n                </div>\n                <div class=\"col-md-3\">\n                    <button type=\"button\" class=\"btn btn-primary float-left\" (click)=\"setTargets()\">Set Performance Targets</button>\n                </div>-->\n      </div>\n      <div class=\"row\">\n        <button type=\"button\" *ngIf=\"editable\" class=\"btn btn-primary btn-sm float-left\" (click)=\"setTargets()\">Set Performance Targets</button>\n      </div>\n    </div>\n    <div class=\"card-block\">\n      <span class=\"card-text\">Total Distance Rowed ({{formatTotal(athletePerf.rowTotal)}} / {{formatTarget(athletePerf.rowTarget)}} meters) - \n        {{percentComplete(athletePerf.rowTotal, athletePerf.rowTarget)}}% complete</span>\n      <ngb-progressbar [type]=\"getProgressBarType('row')\" [value]=\"athletePerf.rowTotal\" [max]=\"athletePerf.rowTarget\"></ngb-progressbar>\n    </div>\n    <div class=\"card-block\">\n      <span class=\"card-text\">Total Distance Run ({{formatTotal(athletePerf.runTotal)}} / {{formatTarget(athletePerf.runTarget)}} meters) -\n         {{percentComplete(athletePerf.runTotal, athletePerf.runTarget)}}% complete</span>\n      <ngb-progressbar [type]=\"getProgressBarType('run')\" [value]=\"athletePerf.runTotal\" [max]=\"athletePerf.runTarget\"></ngb-progressbar>\n    </div>\n    <div class=\"card-block\">\n      <span class=\"card-text\">Total Distance Biked ({{formatTotal(athletePerf.bikeTotal)}} / {{formatTarget(athletePerf.bikeTarget)}} meters) -\n         {{percentComplete(athletePerf.bikeTotal, athletePerf.bikeTarget)}}% complete</span>\n      <ngb-progressbar [type]=\"getProgressBarType('bike')\" [value]=\"athletePerf.bikeTotal\" [max]=\"athletePerf.bikeTarget\"></ngb-progressbar>\n    </div>\n  </div>\n\n  <div class=\"card\">\n    <div class=\"card-block\">\n      <div class=\"row\">\n        <div class=\"col-md-3\">\n          <h4 class=\"card-title\">Workout Entries</h4>\n        </div>\n        <div class=\"col-md-3\">\n          <button type=\"button\" *ngIf=\"editable\" class=\"btn btn-primary float-left\" (click)=\"addNewEntry()\">Add New Entry</button>\n        </div>\n      </div>\n    </div>\n    <div class=\"card-block\">\n\n      <div class=\"row\">\n        <div class=\"col-md-5\">\n\n          <table class=\"table table-striped table-hover table-sm\">\n            <thead>\n              <th>Date</th>\n              <th>Type</th>\n              <th>Distance</th>\n              <th></th>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let entry of workoutEntries\">\n                <td>{{formatDate(entry.date)}}</td>\n                <td>{{entry.type}}</td>\n                <td>{{entry.distance.toLocaleString()}}</td>\n                <td>\n                  <button *ngIf=\"editable\" class=\"btn btn-info\" (click)=\"editEntry(entry)\">Edit</button>\n                  <button *ngIf=\"editable\" class=\"btn btn-danger\" (click)=\"deleteEntry(entry)\">Delete</button>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n\n</div>"

/***/ }),

/***/ 444:
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n  <h4 class=\"modal-title\">{{action}} Entry</h4>\n</div>\n<div class=\"modal-body\">\n  <form>\n    <div class=\"form-group\">\n      <label>Date:</label>\n      <div class=\"input-group\">\n        <input class=\"form-control\" placeholder=\"mm-dd-yyyy\" name=\"dp\" [(ngModel)]=\"workoutDate\" ngbDatepicker #d=\"ngbDatepicker\"\n        />\n        <!--<div class=\"input-group-addon\">\n                <button type=\"button\" class=\"btn btn-secondary input-group-addon\" aria-label=\"Left Align\">\n                    <span class=\"glyphicon glyphicon-calendar\" aria-hidden=\"true\"></span>\n                </button>\n                </div>-->\n        <div class=\"input-group-addon\" (click)=\"d.toggle()\">\n          <img src=\"images/calendar-icon.svg\" style=\"width: 1.2rem; height: 1rem; cursor: pointer;\" />\n        </div>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label>Type:</label>\n      <select class=\"form-control\" required name=\"type\" [(ngModel)]=\"editableItem.type\">\n                <option value=\"\" selected>(Select)</option>\n                <option value=\"Row\">Row</option>\n                <option value=\"Run\">Run</option>\n                <option value=\"Bike\">Bike</option>\n            </select>\n    </div>\n    <div class=\"form-group\">\n      <label>Distance (meters):</label>\n      <input type=\"text\" class=\"form-control\" name=\"distance\" [(ngModel)]=\"editableItem.distance\" />\n    </div>\n  </form>\n\n  <miles-to-meters></miles-to-meters>\n  <!--<ngb-accordion #acc=\"ngbAccordion\">\n        <ngb-panel title=\"Miles to Meters Converter\">\n            <template ngbPanelContent>\n                <div class=\"input-group\">\n                    <input type=\"text\" class=\"form-control\" placeholder=\"Miles\" name=\"foo\" [(ngModel)]=\"foo\">\n                    <div class=\"input-group-addon\">{{milesToMeters(foo)}} meters</div>\n                </div>\n            </template>\n        </ngb-panel>\n    </ngb-accordion>-->\n</div>\n<div class=\"modal-footer\">\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"save()\">Save</button>\n  <button type=\"button\" class=\"btn btn-secondary\" (click)=\"activeModal.dismiss('Cancelled')\">Cancel</button>\n</div>"

/***/ }),

/***/ 445:
/***/ (function(module, exports) {

module.exports = "<div>\n  <div [ngBusy]=\"busy\"></div>\n  <h1>Leaderboard</h1>\n\n  <table class=\"table table-striped\">\n    <!--<thead class=\"thead-inverse\">-->\n    <thead>\n      <th>Rank</th>\n      <th>Athlete</th>\n      <th>Total (meters)</th>\n      <th></th>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let perf of performances; let i = index\">\n        <td>{{i+1}}</td>\n        <td>\n          <a [routerLink]=\"['/athlete', perf.userId]\">\n                        {{perf.firstName}} {{perf.lastName}}\n                    </a>\n        </td>\n        <td>{{perf.grandTotal}}</td>\n        <td></td>\n      </tr>\n    </tbody>\n\n  </table>\n</div>"

/***/ }),

/***/ 446:
/***/ (function(module, exports) {

module.exports = "<form class=\"form-inline navbar-nav nav float-xs-right\" *ngIf=\"this.identityInfo.isAuthenticated\" action=\"/account/logoff\"\n  method=\"post\" id=\"logoutForm\" #logoutForm>\n  \n  <a class=\"nav-item nav-link\" href=\"Manage\" title=\"Manage\">Hello {{this.identityInfo.authenticatedUserName}}</a>\n\n  <button type=\"submit\" class=\"nav-item btn btn-link nav-link\" (click)=\"logoutForm.submit()\">Log off</button>\n</form>\n\n<div class=\"nav navbar-nav float-xs-right\" *ngIf=\"!this.identityInfo.isAuthenticated\">\n  <a class=\"nav-item nav-link\" href=\"/account/register\">Register</a>\n  <a class=\"nav-item nav-link\" href=\"/account/login\">Log in</a>\n</div>"

/***/ }),

/***/ 447:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-toggleable-md fixed-top navbar-inverse bg-primary\">\n  <a class=\"navbar-brand\" [routerLink]=\"['/']\">Leaderboardify</a>\n\n  <div class=\"collapse navbar-collapse xnavbar-nav xnav\">\n\n    <ul class=\"navbar-nav mr-auto\">\n      <li class=\"nav-item\">\n        <a class=\"nav-item nav-link\" [routerLink]=\"['/']\" [routerLinkActive]=\"['active']\">\n            <span class='fa fa-home'></span> Home\n        </a>\n      </li>\n      <li class=\"nav-item\" *ngIf=\"this.identityInfo.isAuthenticated\">\n        <a class=\"nav-item nav-link\" [routerLink]=\"['/athlete', 'me']\" [routerLinkActive]=\"['link-active']\">\n            <span class='fa fa-user'></span> My Performance\n        </a>\n      </li>\n\n    </ul>\n\n    <login></login>\n\n  </div>\n</nav>"

/***/ }),

/***/ 448:
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <h4 class=\"modal-title\">Your Performance Targets</h4>\n</div>\n\n<div class=\"modal-body\">\n  <form>\n    <div class=\"form-group\">\n      <label>Row Target (meters):</label>\n      <input type=\"text\" class=\"form-control\" name=\"rowTarget\" [(ngModel)]=\"editableItem.rowTarget\" />\n    </div>\n    <div class=\"form-group\">\n      <label>Run Target (meters):</label>\n      <input type=\"text\" class=\"form-control\" name=\"runTarget\" [(ngModel)]=\"editableItem.runTarget\" />\n    </div>\n    <div class=\"form-group\">\n      <label>Bike Target (meters):</label>\n      <input type=\"text\" class=\"form-control\" name=\"bikeTarget\" [(ngModel)]=\"editableItem.bikeTarget\" />\n    </div>\n  </form>\n\n  <miles-to-meters></miles-to-meters>\n\n</div>\n\n<div class=\"modal-footer\">\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"save()\">Save</button>\n  <button type=\"button\" class=\"btn btn-secondary\" (click)=\"activeModal.dismiss('Cancelled')\">Cancel</button>\n</div>"

/***/ }),

/***/ 449:
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n    <h4 class=\"modal-title\">{{properties.title}}</h4>\r\n</div>\r\n\r\n<div class=\"modal-body\">\r\n    {{properties.message}}\r\n</div>\r\n\r\n<div class=\"modal-footer\">\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"activeModal.close()\">{{properties.buttons[0]}}</button>\r\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"activeModal.dismiss('Cancelled')\">{{properties.buttons[1]}}</button>\r\n</div>"

/***/ }),

/***/ 450:
/***/ (function(module, exports) {

module.exports = "<ngb-accordion #acc=\"ngbAccordion\">\r\n    <ngb-panel title=\"Miles to Meters Converter\">\r\n        <ng-template ngbPanelContent>\r\n            <div class=\"input-group\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Miles\" name=\"miles\" [(ngModel)]=\"miles\">\r\n                <div class=\"input-group-addon\">{{milesToMeters(miles)}} meters</div>\r\n            </div>\r\n        </ng-template>\r\n    </ngb-panel>\r\n</ngb-accordion>"

/***/ }),

/***/ 718:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(347);


/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__athlete_athlete_component__ = __webpack_require__(166);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__athlete_athlete_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entry_editor_modal_entry_editor_modal_component__ = __webpack_require__(167);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__entry_editor_modal_entry_editor_modal_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home_component__ = __webpack_require__(363);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__home_home_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login_component__ = __webpack_require__(168);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nav_menu_nav_menu_component__ = __webpack_require__(169);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__performance_targets_modal_performance_targets_modal_component__ = __webpack_require__(170);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_5__performance_targets_modal_performance_targets_modal_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_components_confirm_modal_confirm_modal_component__ = __webpack_require__(171);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_components_miles_to_meters_miles_to_meters_component__ = __webpack_require__(172);
/* unused harmony namespace reexport */








//# sourceMappingURL=components.js.map

/***/ })

},[718]);
//# sourceMappingURL=main.bundle.js.map
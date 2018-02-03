webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    height: 100%;\n}\n\n.sidebar {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: 250px;\n    background-color: #f3f3f3;\n}\n\n.chart {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 0px;\n            flex: 1 1 0;\n    min-width: 500px;\n    padding-right: 50px;\n}\n\n.chart-svg {\n    margin-top: 50px;\n    width: 100%;\n    height: 250px;\n}\n\n.chart-controls {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    height: 46px;\n}\n\n.chart-label {\n    font: 14px/1 'Helvetica', sans-serif;\n    margin: 0 16px;\n}\n\n#line {\n    stroke: #2296f3;\n    stroke-linecap: round;\n    stroke-linejoin: round;\n    stroke-width: 4px;\n}\n\n.button {\n    display: block;\n    cursor: pointer;\n    background-color: #f3f3f3;\n    color: #000;\n    font: 14px/1 'Helvetica', sans-serif;\n    padding: 16px 20px;\n}\n\n.button:hover {\n    background-color: #e2e2e2;\n}\n\n.button.active {\n    background-color: #2296f3;\n    color: #fff;\n}\n\n.button.active:hover {\n    background-color: #3da3f5;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar\">\n  <div class=\"button\" role=\"button\" [class.active]=\"isActiveView('temperatures')\" (click)=\"changeView('temperatures')\">\n    Temperature\n  </div>\n  <div class=\"button\" role=\"button\" [class.active]=\"isActiveView('precipitations')\" (click)=\"changeView('precipitations')\">\n    Precipitation\n  </div>\n</div>\n<div class=\"chart\">\n  <div class=\"chart-controls\">\n    <label class=\"chart-label\" for=\"control-1\">Start date: </label>\n    <select id=\"control-1\" class=\"chart-control\" [value]=\"range.start\" (change)=\"changeRange($event, 'start')\">\n      <option *ngFor=\"let option of startOptions\" [value]=\"option\">{{ option }}</option>\n    </select>\n    <label class=\"chart-label\" for=\"control-2\">End date: </label>\n    <select id=\"control-2\" class=\"chart-control\" [value]=\"range.end\" (change)=\"changeRange($event, 'end')\">\n      <option *ngFor=\"let option of endOptions\" [value]=\"option\">{{ option }}</option>\n    </select>    \n  </div>\n  <svg #svg class=\"chart-svg\">\n    <g class=\"y-axis\" transform=\"translate(50, 0)\"> </g>\n    <g>\n        <path fill=\"none\" id=\"line\"></path>\n    </g>\n    <g class=\"labels\"></g>\n    <g class=\"points\"></g>\n  </svg> \n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3__ = __webpack_require__("../../../../d3/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_date_fns__ = __webpack_require__("../../../../date-fns/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_date_fns___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_date_fns__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var isLocal = window.location.origin.includes('localhost');
var AppComponent = /** @class */ (function () {
    function AppComponent(http) {
        this.http = http;
        this.currentView = 'temperatures';
        this.range = {
            start: 1881,
            end: 2006
        };
        this.START_YEAR = 1881;
        this.END_YEAR = 2006;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._worker = new Worker((isLocal ? '' : '/tinkoff') + "/assets/worker.js");
        this._worker.onmessage = function (_a) {
            var data = _a.data;
            var chunks = data.chunks;
            _this.renderChart(chunks);
        };
        this._temSubscription = this.http.get('./assets/temperature.json').subscribe(function (temperatures) {
            _this.temperatures = temperatures;
            _this.updateChart();
        });
        this._preSubscription = this.http.get('./assets/precipitation.json').subscribe(function (precipitations) {
            _this.precipitations = precipitations;
        });
        this.updateOptions();
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this._worker.terminate();
        this._preSubscription.unsubscribe();
        this._temSubscription.unsubscribe();
    };
    AppComponent.prototype.changeView = function (view) {
        this.currentView = view;
        this.updateChart();
    };
    AppComponent.prototype.changeRange = function (event, field) {
        var value = event.target.value;
        var selectedYear = Number(value);
        this.range[field] = selectedYear;
        this.updateChart();
        this.updateOptions();
    };
    AppComponent.prototype.updateChart = function () {
        var offsetLeft = this.getOffset(this.START_YEAR, this.range.start);
        var offsetRight = (this[this.currentView].length - 1) - this.getOffset(this.range.end, this.END_YEAR);
        var data = this[this.currentView].slice(offsetLeft, offsetRight);
        this._worker.postMessage({ data: data });
    };
    AppComponent.prototype.getOffset = function (start, end) {
        return Object(__WEBPACK_IMPORTED_MODULE_3_lodash__["range"])(start, end).reduce(function (acc, year) {
            acc += Object(__WEBPACK_IMPORTED_MODULE_4_date_fns__["getDaysInYear"])(new Date(year, 1, 1));
            return acc;
        }, 0);
    };
    AppComponent.prototype.updateOptions = function () {
        var _a = this.range, start = _a.start, end = _a.end;
        this.startOptions = Object(__WEBPACK_IMPORTED_MODULE_3_lodash__["range"])(this.START_YEAR, end + 1);
        this.endOptions = Object(__WEBPACK_IMPORTED_MODULE_3_lodash__["range"])(start, this.END_YEAR + 1);
    };
    AppComponent.prototype.isActiveView = function (view) {
        return this.currentView === view;
    };
    AppComponent.prototype.renderChart = function (data) {
        if (data === void 0) { data = this._cachedData; }
        var _a = this.svg.nativeElement, height = _a.clientHeight, width = _a.clientWidth;
        this._cachedData = data;
        var margin = {
            top: 25,
            bottom: 25,
            left: 50,
            right: 50
        };
        var minMax = Object(__WEBPACK_IMPORTED_MODULE_2_d3__["b" /* extent */])(data);
        var yScale = Object(__WEBPACK_IMPORTED_MODULE_2_d3__["e" /* scaleLinear */])()
            .domain(minMax)
            .range([height - margin.bottom, margin.top]);
        var yAxis = Object(__WEBPACK_IMPORTED_MODULE_2_d3__["a" /* axisLeft */])(yScale)
            .ticks(6)
            .tickSizeInner(-width + margin.right + margin.left);
        var $svg = Object(__WEBPACK_IMPORTED_MODULE_2_d3__["f" /* select */])(this.svg.nativeElement);
        var format = Object(__WEBPACK_IMPORTED_MODULE_2_d3__["c" /* format */])('.3n');
        var xScale = Object(__WEBPACK_IMPORTED_MODULE_2_d3__["e" /* scaleLinear */])()
            .domain([0, data.length - 1])
            .rangeRound([margin.left, width - margin.right]);
        var line = Object(__WEBPACK_IMPORTED_MODULE_2_d3__["d" /* line */])()
            .x(function (data, index) { return xScale(index); })
            .y(yScale);
        var d = line(data);
        var $axis = $svg
            .select('.y-axis')
            .call(yAxis);
        $axis.selectAll('line')
            .attr('stroke', '#f3f3f3')
            .attr('stroke-dasharray', '5 5');
        $axis.selectAll('text')
            .attr('text-anchor', 'middle')
            .attr('x', -25)
            .attr('fill', '#676767');
        $axis
            .select('.domain')
            .remove();
        $svg
            .select('#line')
            .transition()
            .attr('d', d);
        var labels = $svg
            .select('.labels')
            .selectAll('text')
            .data(data)
            .enter()
            .append('text');
        $svg
            .select('.labels')
            .selectAll('text')
            .text(format)
            .attr('x', function (data, index) { return xScale(index); })
            .attr('y', yScale)
            .attr('text-anchor', 'middle')
            .attr('dy', -15)
            .attr('font-size', '10px')
            .attr('font-family', 'Helvetica');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* ViewChild */])('svg'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* ElementRef */])
    ], AppComponent.prototype, "svg", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* HostListener */])('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "renderChart", null);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClientModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map
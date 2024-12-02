/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/components/header/index.js":
/*!****************************************!*\
  !*** ./app/components/header/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _header_html_txt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header.html.txt */ "./app/components/header/header.html.txt");
/* harmony import */ var _utils_custom_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/custom-element */ "./utils/custom-element.js");
/* harmony import */ var _style_scss_txt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss.txt */ "./app/components/header/style.scss.txt");



(0,_utils_custom_element__WEBPACK_IMPORTED_MODULE_1__.createCustomElement)('header-component', function () {}, _header_html_txt__WEBPACK_IMPORTED_MODULE_0__["default"], _style_scss_txt__WEBPACK_IMPORTED_MODULE_2__["default"]);

/***/ }),

/***/ "./app/components/input/index.js":
/*!***************************************!*\
  !*** ./app/components/input/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types_text_input_html_txt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types/text-input.html.txt */ "./app/components/input/types/text-input.html.txt");
/* harmony import */ var _types_textarea_input_html_txt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types/textarea-input.html.txt */ "./app/components/input/types/textarea-input.html.txt");
/* harmony import */ var _utils_custom_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/custom-element */ "./utils/custom-element.js");
/* harmony import */ var _style_scss_txt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss.txt */ "./app/components/input/style.scss.txt");




(0,_utils_custom_element__WEBPACK_IMPORTED_MODULE_2__.createCustomElement)('input-component', function () {
  console.log('input-component loaded');
  // set slot
  // Evaluate the template (initially with default context)
  // const defaultContext = {
  //     fieldName: this.getAttribute('fieldName') || 'defaultFieldName',
  //     alias: this.getAttribute('alias') || 'defaultAlias',
  //     capitalizeFirstLetter: (str) => str.charAt(0).toUpperCase() + str.slice(1),
  //     required: this.getAttribute('required') || false,
  //     type: this.getAttribute('type') || 'text',
  // };

  // const evaluatedTemplate = evaluateTemplate(inputTemplate, defaultContext);

  // this.querySelector('input').setAttribute('type', defaultContext.type);
  // if(defaultContext.required) {
  // this.querySelector('input').setAttribute('required', true);
  // }

  moveLabel.bind(this)();

  // // Set listeners on all inputs for the label to float

  // console.log("evaluatedTemplate", evaluatedTemplate);
  // console.log({ styles })
}, _types_text_input_html_txt__WEBPACK_IMPORTED_MODULE_0__["default"], _style_scss_txt__WEBPACK_IMPORTED_MODULE_3__["default"]);
(0,_utils_custom_element__WEBPACK_IMPORTED_MODULE_2__.createCustomElement)('textarea-component', function () {
  moveLabel.bind(this)();
}, _types_textarea_input_html_txt__WEBPACK_IMPORTED_MODULE_1__["default"], _style_scss_txt__WEBPACK_IMPORTED_MODULE_3__["default"]);
function moveLabel() {
  this.querySelectorAll('input, textarea').forEach(function (el) {
    el.addEventListener('focus', function (e) {
      var target = e.target;
      target.closest('label').classList.add('moveLabel');
      target.closest('label').querySelector('[part]').setAttribute('part', 'labelText moveLabel');
    });
    el.addEventListener('blur', function (e) {
      var target = e.target;
      if (target.value === '') {
        target.closest('label').classList.remove('moveLabel');
        target.closest('label').querySelector('[part]').setAttribute('part', 'labelText');
      }
    });
    el.addEventListener('change', function (e) {
      var target = e.target;
      if (target.value === '') {
        target.closest('label').classList.remove('moveLabel');
        target.closest('label').querySelector('[part]').setAttribute('part', 'labelText');
      } else {
        target.closest('label').classList.add('moveLabel');
        target.closest('label').querySelector('[part]').setAttribute('part', 'labelText moveLabel');
      }
    });
  });
}

/***/ }),

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_input_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/input/index.js */ "./app/components/input/index.js");
/* harmony import */ var _components_header_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/header/index.js */ "./app/components/header/index.js");



/***/ }),

/***/ "./utils/custom-element.js":
/*!*********************************!*\
  !*** ./utils/custom-element.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCustomElement: () => (/* binding */ createCustomElement),
/* harmony export */   evaluateTemplate: () => (/* binding */ evaluateTemplate)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function createCustomElement(_x, _x2, _x3, _x4) {
  return _createCustomElement.apply(this, arguments);
}
function _createCustomElement() {
  _createCustomElement = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(name, onload, html, css) {
    var template, customElementType;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // create an HTML template element
          template = document.createElement('template');
          template.innerHTML = "\n        <style>\n            ".concat(css, "\n        </style>\n        ").concat(html, "\n    ");
          customElementType = /*#__PURE__*/function (_HTMLElement) {
            function customElementType() {
              var _this;
              _classCallCheck(this, customElementType);
              _this = _callSuper(this, customElementType);
              if (_this.innerHTML) {
                _this.innerHTML = template.content.cloneNode(true).outerHTML;
              }
              return _this;
            }
            _inherits(customElementType, _HTMLElement);
            return _createClass(customElementType, [{
              key: "connectedCallback",
              value: function connectedCallback() {
                document.addEventListener('DOMContentLoaded', onload.bind(this));
                this.updateTemplate();
              }
            }, {
              key: "attributeChangedCallback",
              value: function attributeChangedCallback(name, oldValue, newValue) {
                if (oldValue !== newValue) {
                  this.updateTemplate();
                }
              }
            }, {
              key: "updateTemplate",
              value: function updateTemplate() {
                var context = {
                  fieldName: this.getAttribute('fieldName') || 'defaultFieldName',
                  alias: this.getAttribute('alias') || 'defaultAlias',
                  required: this.hasAttribute('required') || false,
                  capitalizeFirstLetter: function capitalizeFirstLetter(str) {
                    return str.charAt(0).toUpperCase() + str.slice(1);
                  },
                  type: this.getAttribute('type') || 'text'
                };
                var evaluatedTemplate = evaluateTemplate(html, context);
                this.innerHTML = "\n                <style>\n                ".concat(css, "\n                </style>\n                ").concat(evaluatedTemplate, "\n                ");
              }
            }], [{
              key: "observedAttributes",
              get: function get() {
                return ['fieldName', 'alias']; // Add all attributes you want to observe
              }
            }]);
          }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
          customElements.define(name, customElementType);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _createCustomElement.apply(this, arguments);
}
function evaluateTemplate(template, context) {
  // console.log({ template, context });
  return _construct(Function, _toConsumableArray(Object.keys(context)).concat(["return `".concat(template, "`;")])).apply(void 0, _toConsumableArray(Object.values(context)));
}

/***/ }),

/***/ "./app/components/header/header.html.txt":
/*!***********************************************!*\
  !*** ./app/components/header/header.html.txt ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<header>\n    <a href=\"https://gigharboropenstudiotour.org/members\">Go back to members page</a>\n</header>");

/***/ }),

/***/ "./app/components/header/style.scss.txt":
/*!**********************************************!*\
  !*** ./app/components/header/style.scss.txt ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("");

/***/ }),

/***/ "./app/components/input/style.scss.txt":
/*!*********************************************!*\
  !*** ./app/components/input/style.scss.txt ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("label {\r\n    font-size: 1.2rem;\r\n    position: relative;\r\n    margin-bottom: 5px;\r\n    margin-top: 5px;\r\n    display: inline-block;\r\n\r\n    .text {\r\n        position: absolute;\r\n        z-index: 1;\r\n        transition: all 0.5s;\r\n        transform: translate(8px, 14px);\r\n        user-select: none;\r\n        cursor: text;\r\n    }\r\n\r\n    &.moveLabel {\r\n        .text {\r\n            transform: translate(0px, -7px);\r\n            font-size: 0.75rem;\r\n            font-weight: bold;\r\n        }\r\n    }\r\n    .password-container{\r\n        position: relative;\r\n        // background-color: #ccc;\r\n        .password-toggle {\r\n            width: 24px;\r\n            position: absolute;\r\n            top: 27px;\r\n            translate: -100% -50%;\r\n            right: 0;\r\n            scale: .8;\r\n            cursor: pointer;\r\n            font-size: 12px;\r\n        }\r\n    }\r\n\r\n    .static-label-text {\r\n        font-size: 0.75rem;\r\n        white-space: nowrap;\r\n        margin-top: 4px;\r\n    }\r\n\r\n    &[for=\"remember-me\"] {\r\n        translate: -44px 0;\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: center;\r\n\r\n        input {\r\n            scale: 1.3;\r\n            translate: 5px -5px;\r\n            transform-origin: top left;\r\n            cursor: pointer;\r\n        }\r\n    }\r\n\r\n    input, textarea{\r\n        width: 80%;\r\n        margin: 10px 0 0 0;\r\n        padding: 10px;\r\n        border: 1px solid #ccc;\r\n        border-radius: 5px;\r\n    }\r\n\r\n    textarea {\r\n        resize: vertical;\r\n        min-height: 100px;\r\n    }\r\n\r\n    .hide-password {\r\n        display: none;\r\n    }\r\n\r\n    .show-password {\r\n        display: block;\r\n    }\r\n\r\n    &[password-toggle=\"show\"] {\r\n        .hide-password {\r\n            display: block;\r\n        }\r\n\r\n        .show-password {\r\n            display: none;\r\n        }\r\n    }\r\n\r\n    .error-message {\r\n        font-size: 0.8rem;\r\n        user-select: none;\r\n        z-index: 1;\r\n        line-height: 12px;\r\n    }\r\n}");

/***/ }),

/***/ "./app/components/input/types/text-input.html.txt":
/*!********************************************************!*\
  !*** ./app/components/input/types/text-input.html.txt ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\r\n\r\n\r\n<label for=\"${fieldName}\" >\r\n    <small class=\"text\" part=\"labelText\">${alias || capitalizeFirstLetter(fieldName)} ${required ? \"*\" : \"\"}</small>\r\n    <input type=\"${type}\" id=\"${fieldName}\" name=\"${fieldName}\" />\r\n    <div id=\"${fieldName}-error\" class=\"error-message\"></div>\r\n</label>");

/***/ }),

/***/ "./app/components/input/types/textarea-input.html.txt":
/*!************************************************************!*\
  !*** ./app/components/input/types/textarea-input.html.txt ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\r\n\r\n\r\n<label for=\"${fieldName}\" >\r\n    <small class=\"text\" part=\"labelText\">${alias || capitalizeFirstLetter(fieldName)} ${required ? \"*\" : \"\"}</small>\r\n    <textarea id=\"${fieldName}\" name=\"${fieldName}\"></textarea>\r\n    <div id=\"${fieldName}-error\" class=\"error-message\"></div>\r\n</label>");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/index.js */ "./app/index.js");

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
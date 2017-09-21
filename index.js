(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showWithAction = exports.show = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(2);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _defer = __webpack_require__(3);

var _defer2 = _interopRequireDefault(_defer);

var _Snackbar = __webpack_require__(4);

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _MuiThemeProvider = __webpack_require__(5);

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _getMuiTheme = __webpack_require__(6);

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cleanup = function cleanup(element) {
  _reactDom2.default.unmountComponentAtNode(element);
  document.body.removeChild(element);
};

/* eslint react/no-multi-comp: 0 */
var showSnackbar = function showSnackbar(snackbar, duration) {
  var div = document.createElement('div');
  document.body.appendChild(div);

  var dlg = _reactDom2.default.render(snackbar, div); // eslint-disable-line react/no-render-return-value

  return dlg.promise.then(function (result) {
    setTimeout(function () {
      return cleanup(div);
    }, duration + 1000);
    return result;
  });
};

var defaultOptions = {
  duration: 3000,
  theme: {}
};

var simpleSnackbarOptions = Object.assign({}, defaultOptions, {
  centered: true
});

var show = exports.show = function show(message) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var snackbarOptions = Object.assign({}, simpleSnackbarOptions, options);

  var SnackbarContainer = function (_Component) {
    _inherits(SnackbarContainer, _Component);

    function SnackbarContainer() {
      _classCallCheck(this, SnackbarContainer);

      var _this = _possibleConstructorReturn(this, (SnackbarContainer.__proto__ || Object.getPrototypeOf(SnackbarContainer)).call(this));

      _this.deferred = (0, _defer2.default)();
      _this.promise = _this.deferred.promise;
      _this.state = {
        open: false
      };
      return _this;
    }

    _createClass(SnackbarContainer, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _this2 = this;

        setTimeout(function () {
          _this2.setState({ open: true });
          // setTimeout(() => {
          // this.setState({ open: false });
          // }, snackbarOptions.duration);
        }, 200);
      }
    }, {
      key: 'handleRequestClose',
      value: function handleRequestClose() {
        this.setState({
          open: false
        });
        this.deferred.resolve();
      }
    }, {
      key: 'render',
      value: function render() {
        var theme = (0, _getMuiTheme2.default)(snackbarOptions.theme);
        return _react2.default.createElement(
          _MuiThemeProvider2.default,
          { muiTheme: theme },
          _react2.default.createElement(_Snackbar2.default, {
            bodyStyle: { textAlign: snackbarOptions.centered ? 'center' : 'left' },
            open: this.state.open,
            message: message,
            autoHideDuration: snackbarOptions.duration,
            onRequestClose: this.handleRequestClose.bind(this)
          })
        );
      }
    }]);

    return SnackbarContainer;
  }(_react.Component);

  return showSnackbar(_react2.default.createElement(SnackbarContainer, null), snackbarOptions.duration);
};

var withActionOptions = Object.assign({}, defaultOptions, { primaryButton: true });

var showWithAction = exports.showWithAction = function showWithAction(message, action) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var snackbarOptions = Object.assign({}, defaultOptions, options);

  var SnackbarContainer = function (_Component2) {
    _inherits(SnackbarContainer, _Component2);

    function SnackbarContainer() {
      _classCallCheck(this, SnackbarContainer);

      var _this3 = _possibleConstructorReturn(this, (SnackbarContainer.__proto__ || Object.getPrototypeOf(SnackbarContainer)).call(this));

      _this3.deferred = (0, _defer2.default)();
      _this3.promise = _this3.deferred.promise;
      _this3.state = {
        open: false
      };
      return _this3;
    }

    _createClass(SnackbarContainer, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _this4 = this;

        setTimeout(function () {
          _this4.setState({ open: true });
          // setTimeout(() => {
          //   this.setState({ open: false });
          // }, snackbarOptions.duration);
        }, 200);
      }
    }, {
      key: 'handleRequestClose',
      value: function handleRequestClose() {
        this.setState({
          open: false
        });
        this.deferred.resolve();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this5 = this;

        var theme = (0, _getMuiTheme2.default)(snackbarOptions.theme);
        return _react2.default.createElement(
          _MuiThemeProvider2.default,
          { muiTheme: theme },
          _react2.default.createElement(_Snackbar2.default, {
            open: this.state.open,
            message: message,
            action: action,
            onActionTouchTap: function onActionTouchTap() {
              _this5.setState({ open: false });
              _this5.deferred.resolve(true);
            },
            autoHideDuration: snackbarOptions.duration,
            onRequestClose: this.handleRequestClose.bind(this)
          })
        );
      }
    }]);

    return SnackbarContainer;
  }(_react.Component);

  return showSnackbar(_react2.default.createElement(SnackbarContainer, null), snackbarOptions.duration);
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _resolve = void 0,
      _reject = void 0;
  var promise = new Promise(function (resolve, reject) {
    _resolve = resolve;
    _reject = reject;
  });

  return Object.freeze(Object.create({}, {
    resolve: {
      value: _resolve,
      enumerable: true
    },
    reject: {
      value: _reject,
      enumerable: true
    },
    promise: {
      value: promise,
      enumerable: true
    }
  }));
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("material-ui/Snackbar");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("material-ui/styles/MuiThemeProvider");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("material-ui/styles/getMuiTheme");

/***/ })
/******/ ])));
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AvatarImageCropper = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (window.ReactDOM);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SliderBtn = function (_Component) {
    _inherits(SliderBtn, _Component);

    function SliderBtn(props) {
        _classCallCheck(this, SliderBtn);

        var _this = _possibleConstructorReturn(this, (SliderBtn.__proto__ || Object.getPrototypeOf(SliderBtn)).call(this, props));

        _this.ifMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        _this.sliderW = 0;
        _this.offsetLeft = 0;
        _this.sliderStyle = Object.assign({
            width: '90%',
            maxWidth: '250px',
            height: '7px',
            backgroundColor: '#e6ecf0',
            position: 'relative',
            border: 0,
            boxShadow: 'inset 0 0 3px rgba(0,0,0,0.15)'
        });
        _this.sliderBtnStyle = Object.assign({
            position: 'absolute',
            zIndex: '2',
            width: '16px',
            height: '16px',
            top: '-5px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            left: '0%',
            cursor: 'pointer',
            boxShadow: '0 0 3px rgba(0,0,0,0.1)',
            border: '1px solid #c5c5c5'
        });

        _this._onStart = function (e) {
            if (_this.ifMobile) {
                document.addEventListener('touchmove', _this._onMove);
                document.addEventListener('touchend', _this._onUp);
            } else {
                document.addEventListener('mousemove', _this._onMove);
                document.addEventListener('mouseup', _this._onUp);
            }

            e.preventDefault();
        };

        _this._onMove = function (e) {
            var x = _this.ifMobile ? e.touches[0].clientX : e.clientX;
            var relX = (x - _this.offsetLeft) / _this.sliderW * 100;
            relX = relX > 100 ? 100 : relX;
            relX = relX < 0 ? 0 : relX;
            _this.setState({
                relX: relX
            });
            _this.props.resize(relX);
            e.preventDefault();
        };

        _this._onUp = function (e) {
            if (_this.ifMobile) {
                document.removeEventListener('touchmove', _this._onMove);
                document.removeEventListener('touchend', _this._onUp);
            } else {
                document.removeEventListener('mousemove', _this._onMove);
                document.removeEventListener('mouseup', _this._onUp);
            }
            e.preventDefault();
        };

        _this.state = {
            relX: 0
        };
        return _this;
    }

    _createClass(SliderBtn, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var ele = _reactDom2.default.findDOMNode(this);
            this.sliderW = ele.offsetWidth;
            this.offsetLeft = ele.getBoundingClientRect().left;
            if (this.ifMobile) {
                ele.children[0].addEventListener('touchstart', this._onStart);
            } else {
                ele.children[0].addEventListener('mousedown', this._onStart);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: this.sliderStyle },
                _react2.default.createElement('span', { style: Object.assign({}, this.sliderBtnStyle, { left: this.state.relX + '%' })
                })
            );
        }
    }]);

    return SliderBtn;
}(_react.Component);

var AvatarImageCropper = function (_Component2) {
    _inherits(AvatarImageCropper, _Component2);

    function AvatarImageCropper(props) {
        _classCallCheck(this, AvatarImageCropper);

        var _this2 = _possibleConstructorReturn(this, (AvatarImageCropper.__proto__ || Object.getPrototypeOf(AvatarImageCropper)).call(this, props));

        _this2.color = _this2.props.isBack ? '#ffffff' : 'rgba(148,148,148,1)';
        _this2.ifMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        _this2.iconStyle = Object.assign({
            display: 'inline-block',
            color: _this2.color,
            fill: 'currentcolor',
            height: 32,
            width: 32,
            userSelect: 'none'
        }, _this2.props.iconStyle);
        _this2.textStyle = Object.assign({
            color: _this2.color,
            fontSize: '18px'
        }, _this2.props.textStyle);
        _this2.rootStyle = Object.assign({
            textAlign: 'center',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }, _this2.props.rootStyle);
        _this2.inputStyle = Object.assign({
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            opacity: 0,
            zIndex: 8,
            width: '100%',
            cursor: 'pointer'
        });
        _this2.previewStyle = Object.assign({
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 9,
            backgroundRepeat: 'no-repeat',
            cursor: 'move',
            backgroundPosition: '0% 0%'
        });
        _this2.cropStyle = Object.assign({
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
        });
        _this2.avatarStyle = Object.assign({
            height: '100%',
            display: 'block',
            position: 'relative',
            backgroundColor: _this2.props.isBack ? 'rgba(0,0,0,0.4)' : 'transparent'
        }, _this2.props.avatarStyle);
        _this2.sliderConStyle = Object.assign({
            position: 'absolute',
            top: '100%',
            right: 0,
            left: 0,
            zIndex: 9,
            backgroundColor: '#222',
            display: 'flex',
            justifyContent: 'center'
        }, _this2.props.sliderConStyle);
        _this2.btnStyle = {
            display: 'inline-block',
            fontSize: '14px',
            fontWeight: 400,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            verticalAlign: 'middle',
            cursor: 'pointer',
            border: '1px solid transparent',
            borderRadius: '4px',
            margin: '5px'
        };
        _this2.cancelBtnStyle = Object.assign({}, _this2.btnStyle, {
            color: '#333',
            backgroundColor: '#fff',
            borderColor: '#ccc'
        }, _this2.props.cancelBtnStyle);
        _this2.applyBtnStyle = Object.assign({}, _this2.btnStyle, {
            color: '#fff',
            backgroundColor: '#5cb85c',
            borderColor: '#4cae4c'
        }, _this2.props.applyBtnStyle);
        _this2.ele = null;
        _this2.avatar2D = {
            width: 0,
            height: 0,
            ratio: 0
        };
        _this2.img2D = {
            width: 0,
            height: 0,
            ratio: 0
        };
        _this2.origin = {
            width: 0,
            height: 0
        };
        _this2.img = null;

        _this2.onDrop = function (evt) {
            var fileList = evt.target.files;
            var acceptedFiles = [];
            var maxsize = _this2.props.maxsize ? _this2.props.maxsize : 1024 * 1024 * 2;
            var file = fileList[0];

            var ifImage = file.type.indexOf('png') >= 0 || file.type.indexOf('jpg') >= 0 || file.type.indexOf('jpeg') >= 0;

            if (ifImage && file.size <= maxsize) {
                acceptedFiles.push(file);
                var src = window.URL.createObjectURL(file);
                var img = new Image();
                img.src = src;
                img.onload = function () {
                    _this2.img = img;
                    _this2.img2D.width = img.width;
                    _this2.img2D.height = img.height;
                    _this2.img2D.ratio = img.width / img.height;
                    var sizeW = _this2.img2D.ratio >= 1 ? _this2.avatar2D.height * _this2.img2D.ratio : _this2.avatar2D.width;
                    sizeW = sizeW < _this2.avatar2D.width ? _this2.avatar2D.width : sizeW;
                    var sizeH = sizeW / _this2.img2D.ratio;
                    _this2.setState({
                        sizeW: Math.ceil(sizeW),
                        sizeH: sizeH,
                        errorMsg: ''
                    });
                    _this2.origin = {
                        width: sizeW,
                        height: sizeH
                    };
                };

                file.preview = src;
            } else if (!ifImage) {
                if (_this2.props.errorHandler) {
                    _this2.props.errorHandler('not_image');
                    return;
                } else {
                    _this2.setState({
                        errorMsg: 'Please upload png/jpg/jpeg image'
                    });
                }
            } else if (file.size > maxsize) {
                if (_this2.props.errorHandler) {
                    _this2.props.errorHandler('maxsize');
                    return;
                } else {
                    _this2.setState({
                        errorMsg: 'The size of image is too large'
                    });
                }
            }

            if (acceptedFiles.length) {
                _this2.setState({ preview: acceptedFiles[0].preview });
                if (_this2.props.onDrop) {
                    _this2.props.onDrop(acceptedFiles[0]);
                }
            }
        };

        _this2._onMouseDown = function (e) {
            if (_this2.ifMobile) {
                _this2.setState({
                    x: e.touches[0].clientX - _this2.state.relX,
                    y: e.touches[0].clientY - _this2.state.relY
                });
                document.addEventListener('touchmove', _this2._onMove);
                document.addEventListener('touchend', _this2._onMouseUp);
            } else {
                _this2.setState({
                    x: e.clientX - _this2.state.relX,
                    y: e.clientY - _this2.state.relY
                });
                document.addEventListener('mousemove', _this2._onMove);
                document.addEventListener('mouseup', _this2._onMouseUp);
            }

            e.preventDefault();
        };

        _this2._onMove = function (e) {
            var x = _this2.ifMobile ? e.touches[0].clientX : e.clientX;
            var y = _this2.ifMobile ? e.touches[0].clientY : e.clientY;
            var relX = _this2.state.x - x;
            var relY = _this2.state.y - y;
            if (relX < _this2.state.sizeW - _this2.avatar2D.width && relX > 0) {
                _this2.setState({
                    relX: -relX
                });
            }
            if (relY < _this2.state.sizeH - _this2.avatar2D.height && relY > 0) {
                _this2.setState({
                    relY: -relY
                });
            }

            e.preventDefault();
        };

        _this2._onMouseUp = function (e) {
            if (_this2.ifMobile) {
                document.removeEventListener('touchmove', _this2._onMove);
                document.removeEventListener('touchend', _this2._onMouseUp);
            } else {
                document.removeEventListener('mousemove', _this2._onMove);
                document.removeEventListener('mouseup', _this2._onMouseUp);
            }

            e.preventDefault();
        };

        _this2._resize = function (val) {
            var sizeW = _this2.origin.width * (1 + val / 50);
            var sizeH = _this2.origin.height * (1 + val / 50);
            var avW = sizeW - _this2.avatar2D.width;
            var avH = sizeH - _this2.avatar2D.height;
            var relX = -_this2.state.relX > avW ? -avW : _this2.state.relX;
            var relY = -_this2.state.relY > avH ? -avH : _this2.state.relY;
            _this2.setState({
                sizeH: sizeH,
                sizeW: sizeW,
                relX: relX,
                relY: relY
            });
        };

        _this2._apply = function () {
            var crop_canvas = document.createElement('canvas');
            crop_canvas.width = _this2.avatar2D.width;
            crop_canvas.height = _this2.avatar2D.height;
            var ratio = _this2.state.sizeW / _this2.img2D.width;
            crop_canvas.getContext('2d').drawImage(_this2.img, -_this2.state.relX / ratio, -_this2.state.relY / ratio, _this2.img2D.width, _this2.img2D.height, 0, 0, _this2.state.sizeW, _this2.state.sizeH);
            crop_canvas.toBlob(function (blob) {
                _this2.ele.children[0].children[1].value = "";
                _this2.setState({
                    preview: null
                });
                _this2.props.apply(blob);
            });
        };

        _this2._cancel = function () {
            _this2.ele.children[0].children[1].value = "";
            _this2.setState({
                preview: null
            });
            if (_this2.props.cancel) {
                _this2.props.cancel();
            }
        };

        _this2.state = {
            preview: null,
            x: 0,
            y: 0,
            relX: 0,
            relY: 0,
            sizeW: 0,
            sizeH: 0,
            errorMsg: ''
        };
        return _this2;
    }

    _createClass(AvatarImageCropper, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.ele = _reactDom2.default.findDOMNode(this);
            this.avatar2D.width = this.ele.offsetWidth;
            this.avatar2D.height = this.ele.offsetHeight;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                relX = _state.relX,
                relY = _state.relY,
                sizeW = _state.sizeW,
                sizeH = _state.sizeH;

            var actions = this.props.actions ? this.props.actions.map(function (ele, key) {
                var res = null;
                switch (key) {
                    case 0:
                        res = _react2.default.cloneElement(ele, { onClick: _this3._cancel });
                        break;
                    case 1:
                        res = _react2.default.cloneElement(ele, { onClick: _this3._apply });
                    default:
                        break;
                }
                return res;
            }) : null;
            return _react2.default.createElement(
                'avatar-image',
                { 'class': this.props.className,
                    style: this.avatarStyle },
                _react2.default.createElement(
                    'div',
                    { style: this.rootStyle },
                    _react2.default.createElement(
                        'div',
                        null,
                        this.props.icon ? this.props.icon : _react2.default.createElement(
                            'svg',
                            { viewBox: '0 0 24 24', style: this.iconStyle },
                            _react2.default.createElement('circle', { cx: '12', cy: '12', r: '3.2' }),
                            _react2.default.createElement('path', {
                                d: 'M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z' })
                        ),
                        _react2.default.createElement(
                            'p',
                            { style: this.textStyle },
                            this.props.text ? this.props.text : 'Upload photo'
                        ),
                        _react2.default.createElement(
                            'p',
                            { style: { color: 'red' } },
                            this.state.errorMsg
                        )
                    ),
                    _react2.default.createElement('input', {
                        style: this.inputStyle,
                        type: 'file',
                        accept: 'image/*',
                        onChange: function onChange(e) {
                            _this3.onDrop(e);
                        } }),
                    this.state.preview && _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('div', {
                            onMouseDown: this._onMouseDown,
                            onTouchStart: this._onMouseDown,
                            style: Object.assign({}, this.previewStyle, {
                                backgroundImage: 'url(' + this.state.preview + ')',
                                backgroundSize: sizeW + 'px ' + sizeH + 'px',
                                backgroundPosition: '' + relX + 'px ' + relY + 'px'
                            }) })
                    )
                ),
                this.state.preview && _react2.default.createElement(
                    'div',
                    { style: this.sliderConStyle },
                    _react2.default.createElement(
                        'div',
                        { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '600px', width: '100%' } },
                        _react2.default.createElement(
                            'div',
                            { style: { height: '20px', margin: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' } },
                            _react2.default.createElement(SliderBtn, { resize: this._resize })
                        ),
                        _react2.default.createElement(
                            'div',
                            { name: 'action-con', style: { display: 'flex' } },
                            actions ? actions : [_react2.default.createElement(
                                'button',
                                { style: this.cancelBtnStyle, key: 0, onClick: this._cancel },
                                _react2.default.createElement(
                                    'svg',
                                    { fill: '#000000', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
                                    _react2.default.createElement('path', { d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' }),
                                    _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
                                )
                            ), _react2.default.createElement(
                                'button',
                                { style: this.applyBtnStyle, key: 1, onClick: this._apply },
                                _react2.default.createElement(
                                    'svg',
                                    { fill: '#ffffff', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
                                    _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
                                    _react2.default.createElement('path', { d: 'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' })
                                )
                            )]
                        )
                    )
                )
            );
        }
    }]);

    return AvatarImageCropper;
}(_react.Component);

AvatarImageCropper.propTypes = {
    /**
     * Should be used to pass `icon` components.
     */
    isBack: _propTypes2.default.bool,
    /**
     * Should be used to pass `icon` components.
     */
    icon: _propTypes2.default.node,
    /**
    * Should be used to pass text.
    */
    text: _propTypes2.default.string,
    /**
     * Should be used to pass `actions` array of components.
     */
    actions: _propTypes2.default.array,
    /**
     * Should be used to for file maxsize.
     */
    maxsize: _propTypes2.default.number,
    /**
     * The css class name of the root element.
     */
    className: _propTypes2.default.string,
    /**
     * Override the inline-styles of the initial icon style.
     */
    iconStyle: _propTypes2.default.object,
    /**
     * Override the inline-styles of the initial text style.
     */
    textStyle: _propTypes2.default.object,
    /**
     * Override the inline-styles of the root element.
     */
    rootStyle: _propTypes2.default.object,
    /**
     * Override the inline-styles of the slider conatiner.
     */
    sliderConStyle: _propTypes2.default.object,
    /**
    * Override the inline-styles of the cancel button.
    */
    cancelBtnStyle: _propTypes2.default.object,
    /**
    * Override the inline-styles of the apply button.
    */
    applyBtnStyle: _propTypes2.default.object,
    /**
     * Called when apply clicked
     */
    apply: _propTypes2.default.func,
    /**
     * Called when canceled.
     */
    cancel: _propTypes2.default.func,
    /**
     * error with file.
     */
    errorHandler: _propTypes2.default.func
};
exports.default = AvatarImageCropper;
module.exports = exports['default'];

},{"prop-types":9}],2:[function(require,module,exports){
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],3:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
}).call(this,require('_process'))
},{"_process":5}],4:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var emptyFunction = require('./emptyFunction');

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
}).call(this,require('_process'))
},{"./emptyFunction":2,"_process":5}],5:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],6:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

if (process.env.NODE_ENV !== 'production') {
  var invariant = require('fbjs/lib/invariant');
  var warning = require('fbjs/lib/warning');
  var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

}).call(this,require('_process'))
},{"./lib/ReactPropTypesSecret":10,"_process":5,"fbjs/lib/invariant":3,"fbjs/lib/warning":4}],7:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

},{"./lib/ReactPropTypesSecret":10,"fbjs/lib/emptyFunction":2,"fbjs/lib/invariant":3}],8:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
var checkPropTypes = require('./checkPropTypes');

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

}).call(this,require('_process'))
},{"./checkPropTypes":6,"./lib/ReactPropTypesSecret":10,"_process":5,"fbjs/lib/emptyFunction":2,"fbjs/lib/invariant":3,"fbjs/lib/warning":4}],9:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}

}).call(this,require('_process'))
},{"./factoryWithThrowingShims":7,"./factoryWithTypeCheckers":8,"_process":5}],10:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}]},{},[1])(1)
});
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

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
        _this.sliderStyle = {
            width: '90%',
            maxWidth: '250px',
            height: '7px',
            backgroundColor: '#e6ecf0',
            position: 'relative',
            border: 0,
            boxShadow: 'inset 0 0 3px rgba(0,0,0,0.15)'
        };
        _this.sliderBtnStyle = {
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
        };

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
            this.sliderW = this.ele.offsetWidth;
            this.offsetLeft = this.ele.getBoundingClientRect().left;
            if (this.ifMobile) {
                this.ele.children[0].addEventListener('touchstart', this._onStart);
            } else {
                this.ele.children[0].addEventListener('mousedown', this._onStart);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { ref: function ref(ele) {
                        return _this2.ele = ele;
                    }, style: _extends({}, this.sliderStyle, this.props.sliderStyle) },
                _react2.default.createElement('span', { style: _extends({}, this.sliderBtnStyle, this.props.sliderBtnStyle, { left: this.state.relX + '%' })
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

        var _this3 = _possibleConstructorReturn(this, (AvatarImageCropper.__proto__ || Object.getPrototypeOf(AvatarImageCropper)).call(this, props));

        _this3.color = _this3.props.isBack ? '#ffffff' : 'rgba(148,148,148,1)';
        _this3.ifMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        _this3.iconStyle = {
            display: 'inline-block',
            color: _this3.color,
            fill: 'currentcolor',
            height: 32,
            width: 32,
            userSelect: 'none'
        };
        _this3.textStyle = {
            color: _this3.color,
            fontSize: '18px'
        };
        _this3.rootStyle = {
            textAlign: 'center',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        };
        _this3.inputStyle = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            opacity: 0,
            height: '100%',
            zIndex: 8,
            width: '100%',
            cursor: 'pointer'
        };
        _this3.previewStyle = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 9,
            backgroundRepeat: 'no-repeat',
            cursor: 'move',
            backgroundPosition: '0% 0%'
        };
        _this3.cropStyle = {
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
        };
        _this3.avatarStyle = {
            height: '100%',
            display: 'block',
            position: 'relative',
            backgroundColor: _this3.props.isBack ? 'rgba(0,0,0,0.4)' : 'transparent'
        };
        _this3.sliderConStyle = {
            position: 'absolute',
            top: '100%',
            right: 0,
            left: 0,
            zIndex: 9,
            backgroundColor: '#222',
            display: 'flex',
            justifyContent: 'center'
        };
        _this3.sliderChildrenDiv = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '600px',
            width: '100%'
        };
        _this3.sliderDiv = { height: '20px', margin: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' };
        _this3.btnStyle = {
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
        _this3.cancelBtnStyle = _extends({}, _this3.btnStyle, {
            color: '#333',
            backgroundColor: '#fff',
            borderColor: '#ccc'
        });
        _this3.applyBtnStyle = _extends({}, _this3.btnStyle, {
            color: '#fff',
            backgroundColor: '#5cb85c',
            borderColor: '#4cae4c'
        });
        _this3.ele = null;
        _this3.filename = '';
        _this3.avatar2D = {
            width: 0,
            height: 0,
            ratio: 0
        };
        _this3.img2D = {
            width: 0,
            height: 0,
            ratio: 0
        };
        _this3.origin = {
            width: 0,
            height: 0
        };
        _this3.img = null;

        _this3.resetOrientation = function (file) {
            return new Promise(function (resolve, reject) {
                var getOrientation = function getOrientation() {
                    return new Promise(function (resolve) {
                        var reader = new FileReader();
                        reader.onload = function (event) {
                            var view = new DataView(event.target.result);

                            if (view.getUint16(0, false) != 0xFFD8) return resolve(-2);

                            var length = view.byteLength,
                                offset = 2;

                            while (offset < length) {
                                var marker = view.getUint16(offset, false);
                                offset += 2;

                                if (marker == 0xFFE1) {
                                    if (view.getUint32(offset += 2, false) != 0x45786966) {
                                        return resolve(-1);
                                    }
                                    var little = view.getUint16(offset += 6, false) == 0x4949;
                                    offset += view.getUint32(offset + 4, little);
                                    var tags = view.getUint16(offset, little);
                                    offset += 2;

                                    for (var i = 0; i < tags; i++) {
                                        if (view.getUint16(offset + i * 12, little) == 0x0112) return resolve(view.getUint16(offset + i * 12 + 8, little));
                                    }
                                } else if ((marker & 0xFF00) != 0xFF00) break;else offset += view.getUint16(offset, false);
                            }
                            return resolve(-1);
                        };
                        reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
                    });
                };
                var reset = function reset(or) {
                    return new Promise(function (resolve) {
                        if (or === 1) {
                            return resolve(file);
                        }
                        var src = window.URL.createObjectURL(file);
                        var img = new Image();
                        img.src = src;
                        img.onload = function () {
                            var width = img.width,
                                height = img.height,
                                canvas = document.createElement('canvas'),
                                ctx = canvas.getContext("2d");
                            if (4 < or && or < 9) {
                                canvas.width = height;
                                canvas.height = width;
                            } else {
                                canvas.width = width;
                                canvas.height = height;
                            }

                            // transform context before drawing image
                            switch (or) {
                                case 2:
                                    ctx.transform(-1, 0, 0, 1, width, 0);break;
                                case 3:
                                    ctx.transform(-1, 0, 0, -1, width, height);break;
                                case 4:
                                    ctx.transform(1, 0, 0, -1, 0, height);break;
                                case 5:
                                    ctx.transform(0, 1, 1, 0, 0, 0);break;
                                case 6:
                                    ctx.transform(0, 1, -1, 0, height, 0);break;
                                case 7:
                                    ctx.transform(0, -1, -1, 0, height, width);break;
                                case 8:
                                    ctx.transform(0, -1, 1, 0, 0, width);break;
                                default:
                                    break;
                            }

                            // draw image
                            ctx.drawImage(img, 0, 0);
                            canvas.toBlob(function (blob) {
                                blob.name = file.name;
                                resolve(blob);
                            });
                        };
                    });
                };
                Promise.resolve().then(getOrientation).then(reset).then(resolve).catch(reject);
            });
        };

        _this3.onDrop = function (evt) {
            var fileList = evt.target.files;
            var acceptedFiles = [];
            var maxsize = _this3.props.maxsize ? _this3.props.maxsize : 1024 * 1024 * 2;
            var file = fileList[0];
            if (!file) {
                return;
            }
            var ifImage = file.type.indexOf('png') >= 0 || file.type.indexOf('jpg') >= 0 || file.type.indexOf('jpeg') >= 0;

            if (ifImage && file.size <= maxsize) {
                _this3.setState({
                    loading: true,
                    x: 0,
                    y: 0,
                    relX: 0,
                    relY: 0
                });
                _this3.resetOrientation(file).then(function (file) {
                    acceptedFiles.push(file);
                    var src = window.URL.createObjectURL(file);
                    var img = new Image();
                    img.src = src;
                    img.onload = function () {
                        _this3.img = img;
                        _this3.img2D.width = img.width;
                        _this3.img2D.height = img.height;
                        _this3.img2D.ratio = img.width / img.height;
                        var sizeW = _this3.img2D.ratio >= 1 ? _this3.avatar2D.height * _this3.img2D.ratio : _this3.avatar2D.width;
                        sizeW = sizeW < _this3.avatar2D.width ? _this3.avatar2D.width : sizeW;
                        var sizeH = sizeW / _this3.img2D.ratio;
                        _this3.setState({
                            sizeW: Math.ceil(sizeW),
                            sizeH: sizeH,
                            errorMsg: '',
                            loading: false
                        });
                        _this3.origin = {
                            width: sizeW,
                            height: sizeH
                        };
                    };
                    file.preview = src;

                    if (acceptedFiles.length) {
                        _this3.filename = acceptedFiles[0].name;
                        _this3.setState({ preview: acceptedFiles[0].preview });
                        if (_this3.props.onDrop) {
                            _this3.props.onDrop(acceptedFiles[0]);
                        }
                    }
                }).catch(function () {
                    _this3.setState({
                        loading: false
                    });
                });
            } else if (!ifImage) {
                if (_this3.props.errorHandler) {
                    _this3.props.errorHandler('not_image');
                    return;
                } else {
                    _this3.setState({
                        errorMsg: 'Please upload png/jpg/jpeg image'
                    });
                }
            } else if (file.size > maxsize) {
                if (_this3.props.errorHandler) {
                    _this3.props.errorHandler('maxsize');
                    return;
                } else {
                    _this3.setState({
                        errorMsg: 'The size of image is too large'
                    });
                }
            }
        };

        _this3._onMouseDown = function (e) {
            if (_this3.ifMobile) {
                _this3.setState({
                    x: e.touches[0].clientX - _this3.state.relX,
                    y: e.touches[0].clientY - _this3.state.relY
                });
                document.addEventListener('touchmove', _this3._onMove);
                document.addEventListener('touchend', _this3._onMouseUp);
            } else {
                _this3.setState({
                    x: e.clientX - _this3.state.relX,
                    y: e.clientY - _this3.state.relY
                });
                document.addEventListener('mousemove', _this3._onMove);
                document.addEventListener('mouseup', _this3._onMouseUp);
            }

            e.preventDefault();
        };

        _this3._onMove = function (e) {
            var x = _this3.ifMobile ? e.touches[0].clientX : e.clientX;
            var y = _this3.ifMobile ? e.touches[0].clientY : e.clientY;
            var relX = _this3.state.x - x;
            var relY = _this3.state.y - y;
            if (relX < _this3.state.sizeW - _this3.avatar2D.width && relX > 0) {
                _this3.setState({
                    relX: -relX
                });
            }
            if (relY < _this3.state.sizeH - _this3.avatar2D.height && relY > 0) {
                _this3.setState({
                    relY: -relY
                });
            }

            e.preventDefault();
        };

        _this3._onMouseUp = function (e) {
            if (_this3.ifMobile) {
                document.removeEventListener('touchmove', _this3._onMove);
                document.removeEventListener('touchend', _this3._onMouseUp);
            } else {
                document.removeEventListener('mousemove', _this3._onMove);
                document.removeEventListener('mouseup', _this3._onMouseUp);
            }

            e.preventDefault();
        };

        _this3._resize = function (val) {
            var sizeW = _this3.origin.width * (1 + val / 50);
            var sizeH = _this3.origin.height * (1 + val / 50);
            var avW = sizeW - _this3.avatar2D.width;
            var avH = sizeH - _this3.avatar2D.height;
            var relX = -_this3.state.relX > avW ? -avW : _this3.state.relX;
            var relY = -_this3.state.relY > avH ? -avH : _this3.state.relY;
            _this3.setState({
                sizeH: sizeH,
                sizeW: sizeW,
                relX: relX,
                relY: relY
            });
        };

        _this3._apply = function () {
            var crop_canvas = document.createElement('canvas');
            crop_canvas.width = _this3.avatar2D.width;
            crop_canvas.height = _this3.avatar2D.height;
            var ratio = _this3.state.sizeW / _this3.img2D.width;
            crop_canvas.getContext('2d').drawImage(_this3.img, -_this3.state.relX / ratio, -_this3.state.relY / ratio, _this3.img2D.width, _this3.img2D.height, 0, 0, _this3.state.sizeW, _this3.state.sizeH);
            crop_canvas.toBlob(function (blob) {
                _this3.ele.children[0].children[1].value = "";
                _this3.setState({
                    preview: null
                });
                blob.name = _this3.filename;
                _this3.props.apply(blob);
            });
        };

        _this3._cancel = function () {
            _this3.ele.children[0].children[1].value = "";
            _this3.setState({
                preview: null
            });
            if (_this3.props.cancel) {
                _this3.props.cancel();
            }
        };

        _this3.state = {
            preview: null,
            loading: false,
            x: 0,
            y: 0,
            relX: 0,
            relY: 0,
            sizeW: 0,
            sizeH: 0,
            errorMsg: ''
        };
        return _this3;
    }

    _createClass(AvatarImageCropper, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.avatar2D.width = this.ele.offsetWidth;
            this.avatar2D.height = this.ele.offsetHeight;
            if (this.avatar2D.width < 200) {
                this.sliderChildrenDiv = _extends({}, this.sliderChildrenDiv, { flexDirection: 'column' });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _state = this.state,
                relX = _state.relX,
                relY = _state.relY,
                sizeW = _state.sizeW,
                sizeH = _state.sizeH;

            var actions = this.props.actions ? this.props.actions.map(function (ele, key) {
                var res = null;
                switch (key) {
                    case 0:
                        res = _react2.default.cloneElement(ele, { onClick: _this4._cancel });
                        break;
                    case 1:
                        res = _react2.default.cloneElement(ele, { onClick: _this4._apply });
                    default:
                        break;
                }
                return res;
            }) : null;
            return _react2.default.createElement(
                'avatar-image',
                { ref: function ref(node) {
                        return _this4.ele = node;
                    }, 'class': this.props.className,
                    style: _extends({}, this.avatarStyle, this.props.avatarStyle) },
                _react2.default.createElement(
                    'div',
                    { style: _extends({}, this.rootStyle, this.props.rootStyle) },
                    this.state.loading ? this.props.loadingNode ? this.props.loadingNode : _react2.default.createElement(
                        'div',
                        null,
                        'Loading...'
                    ) : _react2.default.createElement(
                        'div',
                        null,
                        !this.props.noWaterMark && _react2.default.createElement(
                            'div',
                            null,
                            this.props.icon ? this.props.icon : _react2.default.createElement(
                                'svg',
                                { viewBox: '0 0 24 24', style: _extends({}, this.iconStyle, this.props.iconStyle) },
                                _react2.default.createElement('circle', { cx: '12', cy: '12', r: '3.2' }),
                                _react2.default.createElement('path', {
                                    d: 'M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { style: _extends({}, this.textStyle, this.props.textStyle) },
                                this.props.text ? this.props.text : 'Upload photo'
                            )
                        ),
                        _react2.default.createElement(
                            'p',
                            { style: { color: 'red' } },
                            this.state.errorMsg
                        )
                    ),
                    _react2.default.createElement('input', {
                        style: _extends({}, this.inputStyle),
                        type: 'file',
                        accept: 'image/*',
                        onChange: function onChange(e) {
                            _this4.onDrop(e);
                        } }),
                    this.state.preview && _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('div', {
                            onMouseDown: this._onMouseDown,
                            onTouchStart: this._onMouseDown,
                            style: _extends({}, this.previewStyle, {
                                backgroundImage: 'url(' + this.state.preview + ')',
                                backgroundSize: sizeW + 'px ' + sizeH + 'px',
                                backgroundPosition: '' + relX + 'px ' + relY + 'px'
                            }) })
                    )
                ),
                this.state.preview && _react2.default.createElement(
                    'div',
                    { style: _extends({}, this.sliderConStyle, this.props.sliderConStyle) },
                    _react2.default.createElement(
                        'div',
                        { style: _extends({}, this.sliderChildrenDiv, this.props.sliderChildrenDiv) },
                        _react2.default.createElement(
                            'div',
                            { style: _extends({}, this.sliderDiv, this.props.sliderDivStyle) },
                            _react2.default.createElement(SliderBtn, { sliderBtnStyle: this.props.sliderBtnStyle, sliderStyle: this.props.sliderStyle, resize: this._resize })
                        ),
                        _react2.default.createElement(
                            'div',
                            { name: 'action-con', style: { display: 'flex', minWidth: '100px' } },
                            actions ? actions : [_react2.default.createElement(
                                'button',
                                { style: _extends({}, this.cancelBtnStyle, this.props.cancelBtnStyle), key: 0, onClick: this._cancel },
                                _react2.default.createElement(
                                    'svg',
                                    { fill: '#000000', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
                                    _react2.default.createElement('path', { d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' }),
                                    _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
                                )
                            ), _react2.default.createElement(
                                'button',
                                { style: _extends({}, this.applyBtnStyle, this.props.applyBtnStyle), key: 1, onClick: this._apply },
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

/* canvas-toBlob.js
 * A canvas.toBlob() implementation.
 * 2016-05-26
 * 
 * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr
 * License: MIT
 *   See https://github.com/eligrey/canvas-toBlob.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */

AvatarImageCropper.propTypes = {
    /**
     * Should be used to determine if has background.
     */
    isBack: _propTypes2.default.bool,
    /**
     * Should be used to determine if has water mark.
     */
    noWaterMark: _propTypes2.default.bool,
    /**
     * Should be used to pass `icon` components.
     */
    icon: _propTypes2.default.element,
    /**
    * Should be used to pass loading component.
    */
    loadingNode: _propTypes2.default.element,
    /**
    * Should be used to pass text or component.
    */
    text: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string]),
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
     * Override the inline-styles of the slider conatiner children div.
     */
    sliderChildrenDiv: _propTypes2.default.object,
    /**
     * Override the inline-styles of the slider div.
     */
    sliderDivStyle: _propTypes2.default.object,
    /**
     * Override the inline-styles of the slider.
     */
    sliderStyle: _propTypes2.default.object,
    /**
     * Override the inline-styles of the slider drag button.
     */
    sliderBtnStyle: _propTypes2.default.object,
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
(function (view) {
    "use strict";

    var Uint8Array = view.Uint8Array,
        HTMLCanvasElement = view.HTMLCanvasElement,
        canvas_proto = HTMLCanvasElement && HTMLCanvasElement.prototype,
        is_base64_regex = /\s*;\s*base64\s*(?:;|$)/i,
        to_data_url = "toDataURL",
        base64_ranks,
        decode_base64 = function decode_base64(base64) {
        var len = base64.length,
            buffer = new Uint8Array(len / 4 * 3 | 0),
            i = 0,
            outptr = 0,
            last = [0, 0],
            state = 0,
            save = 0,
            rank,
            code,
            undef;
        while (len--) {
            code = base64.charCodeAt(i++);
            rank = base64_ranks[code - 43];
            if (rank !== 255 && rank !== undef) {
                last[1] = last[0];
                last[0] = code;
                save = save << 6 | rank;
                state++;
                if (state === 4) {
                    buffer[outptr++] = save >>> 16;
                    if (last[1] !== 61 /* padding character */) {
                            buffer[outptr++] = save >>> 8;
                        }
                    if (last[0] !== 61 /* padding character */) {
                            buffer[outptr++] = save;
                        }
                    state = 0;
                }
            }
        }
        // 2/3 chance there's going to be some null bytes at the end, but that
        // doesn't really matter with most image formats.
        // If it somehow matters for you, truncate the buffer up outptr.
        return buffer;
    };
    if (Uint8Array) {
        base64_ranks = new Uint8Array([62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]);
    }
    if (HTMLCanvasElement && (!canvas_proto.toBlob || !canvas_proto.toBlobHD)) {
        if (!canvas_proto.toBlob) canvas_proto.toBlob = function (callback, type /*, ...args*/) {
            if (!type) {
                type = "image/png";
            }if (this.mozGetAsFile) {
                callback(this.mozGetAsFile("canvas", type));
                return;
            }if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(type)) {
                callback(this.msToBlob());
                return;
            }

            var args = Array.prototype.slice.call(arguments, 1),
                dataURI = this[to_data_url].apply(this, args),
                header_end = dataURI.indexOf(","),
                data = dataURI.substring(header_end + 1),
                is_base64 = is_base64_regex.test(dataURI.substring(0, header_end)),
                blob;
            if (Blob.fake) {
                // no reason to decode a data: URI that's just going to become a data URI again
                blob = new Blob();
                if (is_base64) {
                    blob.encoding = "base64";
                } else {
                    blob.encoding = "URI";
                }
                blob.data = data;
                blob.size = data.length;
            } else if (Uint8Array) {
                if (is_base64) {
                    blob = new Blob([decode_base64(data)], { type: type });
                } else {
                    blob = new Blob([decodeURIComponent(data)], { type: type });
                }
            }
            callback(blob);
        };

        if (!canvas_proto.toBlobHD && canvas_proto.toDataURLHD) {
            canvas_proto.toBlobHD = function () {
                to_data_url = "toDataURLHD";
                var blob = this.toBlob();
                to_data_url = "toDataURL";
                return blob;
            };
        } else {
            canvas_proto.toBlobHD = canvas_proto.toBlob;
        }
    }
})(typeof self !== "undefined" && self || typeof window !== "undefined" && window || undefined.content || undefined);

exports.default = AvatarImageCropper;
module.exports = exports['default'];
//# sourceMappingURL=react-avatar-image-cropper.js.map
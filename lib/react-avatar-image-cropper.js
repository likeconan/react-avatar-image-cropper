'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

        _this._onMouseDown = function (e) {
            document.addEventListener('mousemove', _this._onMouseMove);
            document.addEventListener('mouseup', _this._onMouseUp);
            e.preventDefault();
        };

        _this._onMouseMove = function (e) {
            var relX = (e.clientX - _this.offsetLeft) / _this.sliderW * 100;
            relX = relX > 100 ? 100 : relX;
            relX = relX < 0 ? 0 : relX;
            _this.setState({
                relX: relX
            });
            _this.props.resize(relX);
            e.preventDefault();
        };

        _this._onMouseUp = function (e) {
            document.removeEventListener('mousemove', _this._onMouseMove);
            document.removeEventListener('mouseup', _this._onMouseUp);
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
            this.sliderW = _reactDom2.default.findDOMNode(this).offsetWidth;
            this.offsetLeft = _reactDom2.default.findDOMNode(this).getBoundingClientRect().left;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: this.sliderStyle },
                _react2.default.createElement('span', { style: Object.assign({}, this.sliderBtnStyle, { left: this.state.relX + '%' }),
                    onMouseDown: this._onMouseDown })
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

        _this2.iconStyle = Object.assign({
            display: 'inline-block',
            fill: 'rgba(148,148,148,1)',
            height: 32,
            width: 32,
            userSelect: 'none'
        }, _this2.props.iconStyle);
        _this2.textStyle = Object.assign({
            color: 'rgba(148,148,148,1)',
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
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = fileList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var file = _step.value;

                    if ((file.type.indexOf('png') >= 0 || file.type.indexOf('jpg') >= 0 || file.type.indexOf('jpeg') >= 0) && file.size < maxsize) {
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
                                sizeH: sizeH

                            });
                            _this2.origin = {
                                width: sizeW,
                                height: sizeH
                            };
                        };

                        file.preview = src;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
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
            _this2.setState({
                x: e.clientX - _this2.state.relX,
                y: e.clientY - _this2.state.relY
            });
            document.addEventListener('mousemove', _this2._onMouseMove);
            document.addEventListener('mouseup', _this2._onMouseUp);
            e.preventDefault();
        };

        _this2._onMouseMove = function (e) {
            var relX = _this2.state.x - e.clientX;
            var relY = _this2.state.y - e.clientY;
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
            document.removeEventListener('mousemove', _this2._onMouseMove);
            document.removeEventListener('mouseup', _this2._onMouseUp);
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
                _this2.props.apply(blob);
            });
        };

        _this2._cancel = function () {
            _this2.ele.children[0].children[1].value = "";
            _this2.setState({
                preview: null
            });
        };

        _this2.state = {
            preview: null,
            x: 0,
            y: 0,
            relX: 0,
            relY: 0,
            sizeW: 0,
            sizeH: 0
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


            return _react2.default.createElement(
                'avatar-image',
                { 'class': this.props.className,
                    style: { height: '100%', display: 'block', position: 'relative' } },
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
                            'Upload photo'
                        )
                    ),
                    _react2.default.createElement('input', {
                        style: this.inputStyle,
                        type: 'file',
                        accept: 'images/*',
                        onChange: function onChange(e) {
                            _this3.onDrop(e);
                        } }),
                    this.state.preview && _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('div', {
                            onMouseDown: this._onMouseDown,
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
                            null,
                            this.props.actions ? this.props.actions : _react2.default.createElement(
                                'div',
                                { style: { display: 'flex' } },
                                _react2.default.createElement(
                                    'button',
                                    { style: this.cancelBtnStyle, onClick: this._cancel },
                                    _react2.default.createElement(
                                        'svg',
                                        { fill: '#000000', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
                                        _react2.default.createElement('path', { d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' }),
                                        _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
                                    )
                                ),
                                _react2.default.createElement(
                                    'button',
                                    { style: this.applyBtnStyle, onClick: this._apply },
                                    _react2.default.createElement(
                                        'svg',
                                        { fill: '#ffffff', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
                                        _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
                                        _react2.default.createElement('path', { d: 'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' })
                                    )
                                )
                            )
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
    icon: _propTypes2.default.node,
    /**
     * Should be used to pass `actions` components.
     */
    actions: _propTypes2.default.node,
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
    cancel: _propTypes2.default.func
};
exports.default = AvatarImageCropper;
module.exports = exports['default'];
//# sourceMappingURL=react-avatar-image-cropper.js.map
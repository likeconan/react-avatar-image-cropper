'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

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
        }, _this.props.sliderStyle);
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
        }, _this.props.sliderBtnStyle);

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

exports.default = SliderBtn;
//# sourceMappingURL=sliderBtn.js.map
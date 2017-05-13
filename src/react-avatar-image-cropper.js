import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class SliderBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relX: 0
        }
    }

    componentDidMount() {
        this.sliderW = ReactDOM.findDOMNode(this).offsetWidth;
        this.offsetLeft = ReactDOM.findDOMNode(this).getBoundingClientRect().left
    }

    sliderW = 0;
    offsetLeft = 0;

    sliderStyle = Object.assign({
        width: '90%',
        maxWidth: '250px',
        height: '7px',
        backgroundColor: '#e6ecf0',
        position: 'relative',
        border: 0,
        boxShadow: 'inset 0 0 3px rgba(0,0,0,0.15)',
    })

    sliderBtnStyle = Object.assign({
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
    })

    _onMouseDown = (e) => {
        document.addEventListener('mousemove', this._onMouseMove);
        document.addEventListener('mouseup', this._onMouseUp);
        e.preventDefault();
    }
    _onMouseMove = (e) => {
        var relX = (e.clientX - this.offsetLeft) / this.sliderW * 100;
        relX = relX > 100 ? 100 : relX;
        relX = relX < 0 ? 0 : relX;
        this.setState({
            relX: relX
        })
        this.props.resize(relX);
        e.preventDefault();
    }
    _onMouseUp = (e) => {
        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('mouseup', this._onMouseUp);
        e.preventDefault();
    }

    render() {
        return (
            <div style={this.sliderStyle}>
                <span style={Object.assign({},
                    this.sliderBtnStyle, { left: this.state.relX + '%' })}
                    onMouseDown={this._onMouseDown}></span>
            </div>
        );
    }
}

class AvatarImageCropper extends Component {
    static propTypes = {
        /**
         * Should be used to pass `icon` components.
         */
        isBack: PropTypes.bool,
        /**
         * Should be used to pass `icon` components.
         */
        icon: PropTypes.node,
        /**
        * Should be used to pass text.
        */
        text: PropTypes.string,
        /**
         * Should be used to pass `actions` array of components.
         */
        actions: PropTypes.array,
        /**
         * Should be used to for file maxsize.
         */
        maxsize: PropTypes.number,
        /**
         * The css class name of the root element.
         */
        className: PropTypes.string,
        /**
         * Override the inline-styles of the initial icon style.
         */
        iconStyle: PropTypes.object,
        /**
         * Override the inline-styles of the initial text style.
         */
        textStyle: PropTypes.object,
        /**
         * Override the inline-styles of the root element.
         */
        rootStyle: PropTypes.object,
        /**
         * Override the inline-styles of the slider conatiner.
         */
        sliderConStyle: PropTypes.object,
        /**
        * Override the inline-styles of the cancel button.
        */
        cancelBtnStyle: PropTypes.object,
        /**
        * Override the inline-styles of the apply button.
        */
        applyBtnStyle: PropTypes.object,
        /**
         * Called when apply clicked
         */
        apply: PropTypes.func,
        /**
         * Called when canceled.
         */
        cancel: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            preview: null,
            x: 0,
            y: 0,
            relX: 0,
            relY: 0,
            sizeW: 0,
            sizeH: 0,
        }
    }
    color = this.props.isBack ? '#ffffff' : 'rgba(148,148,148,1)';
    iconStyle = Object.assign({
        display: 'inline-block',
        color: this.color,
        fill: 'currentcolor',
        height: 32,
        width: 32,
        userSelect: 'none'
    }, this.props.iconStyle);

    textStyle = Object.assign({
        color: this.color,
        fontSize: '18px'
    }, this.props.textStyle);

    rootStyle = Object.assign({
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
    }, this.props.rootStyle);

    inputStyle = Object.assign({
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

    previewStyle = Object.assign({
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 9,
        backgroundRepeat: 'no-repeat',
        cursor: 'move',
        backgroundPosition: '0% 0%'
    })

    cropStyle = Object.assign({
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    })

    avatarStyle = {
        height: '100%',
        display: 'block',
        position: 'relative',
        backgroundColor: this.props.isBack ? 'rgba(0,0,0,0.4)' : 'transparent'
    }

    sliderConStyle = Object.assign({
        position: 'absolute',
        top: '100%',
        right: 0,
        left: 0,
        zIndex: 9,
        backgroundColor: '#222',
        display: 'flex',
        justifyContent: 'center'
    }, this.props.sliderConStyle)

    btnStyle = {
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
    }
    cancelBtnStyle = Object.assign({}, this.btnStyle, {
        color: '#333',
        backgroundColor: '#fff',
        borderColor: '#ccc'
    }, this.props.cancelBtnStyle)
    applyBtnStyle = Object.assign({}, this.btnStyle,
        {
            color: '#fff',
            backgroundColor: '#5cb85c',
            borderColor: '#4cae4c'
        }, this.props.applyBtnStyle)

    ele = null;

    avatar2D = {
        width: 0,
        height: 0,
        ratio: 0
    }
    img2D = {
        width: 0,
        height: 0,
        ratio: 0
    }
    origin = {
        width: 0,
        height: 0
    }
    img = null


    componentDidMount() {
        this.ele = ReactDOM.findDOMNode(this);
        this.avatar2D.width = this.ele.offsetWidth;
        this.avatar2D.height = this.ele.offsetHeight;
    }

    onDrop = (evt) => {
        var fileList = evt.target.files
        var acceptedFiles = [];
        var maxsize = this.props.maxsize
            ? this.props.maxsize
            : 1024 * 1024 * 2;
        for (let file of fileList) {
            if ((file.type.indexOf('png') >= 0 || file.type.indexOf('jpg') >= 0 || file.type.indexOf('jpeg') >= 0) && file.size < maxsize) {
                acceptedFiles.push(file);
                var src = window
                    .URL
                    .createObjectURL(file);
                var img = new Image();
                img.src = src;
                img.onload = () => {
                    this.img = img;
                    this.img2D.width = img.width;
                    this.img2D.height = img.height;
                    this.img2D.ratio = img.width / img.height;
                    var sizeW = this.img2D.ratio >= 1 ? this.avatar2D.height * this.img2D.ratio : this.avatar2D.width;
                    sizeW = sizeW < this.avatar2D.width ? this.avatar2D.width : sizeW
                    var sizeH = sizeW / this.img2D.ratio;
                    this.setState({
                        sizeW: Math.ceil(sizeW),
                        sizeH: sizeH,

                    })
                    this.origin = {
                        width: sizeW,
                        height: sizeH
                    }
                };

                file.preview = src;
            }
        }

        if (acceptedFiles.length) {
            this.setState({ preview: acceptedFiles[0].preview })

            if (this.props.onDrop) {
                this
                    .props
                    .onDrop(acceptedFiles[0]);
            }
        }

    }

    _onMouseDown = (e) => {
        this.setState({
            x: e.clientX - this.state.relX,
            y: e.clientY - this.state.relY
        })
        document.addEventListener('mousemove', this._onMouseMove);
        document.addEventListener('mouseup', this._onMouseUp);
        e.preventDefault();
    }
    _onMouseMove = (e) => {
        var relX = this.state.x - e.clientX;
        var relY = this.state.y - e.clientY;
        if (relX < this.state.sizeW - this.avatar2D.width && relX > 0) {
            this.setState({
                relX: -relX
            })
        }
        if (relY < this.state.sizeH - this.avatar2D.height && relY > 0) {
            this.setState({
                relY: -relY
            })
        }

        e.preventDefault();
    }
    _onMouseUp = (e) => {
        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('mouseup', this._onMouseUp);
        e.preventDefault();
    }
    _resize = (val) => {
        var sizeW = this.origin.width * (1 + val / 50);
        var sizeH = this.origin.height * (1 + val / 50);
        var avW = sizeW - this.avatar2D.width;
        var avH = sizeH - this.avatar2D.height;
        var relX = -this.state.relX > avW ? -avW : this.state.relX
        var relY = -this.state.relY > avH ? -avH : this.state.relY
        this.setState({
            sizeH: sizeH,
            sizeW: sizeW,
            relX: relX,
            relY: relY
        });
    }
    _apply = () => {
        var crop_canvas = document.createElement('canvas');
        crop_canvas.width = this.avatar2D.width;
        crop_canvas.height = this.avatar2D.height;
        var ratio = this.state.sizeW / this.img2D.width;
        crop_canvas.getContext('2d').drawImage(this.img, -this.state.relX / ratio, -this.state.relY / ratio, this.img2D.width, this.img2D.height, 0, 0, this.state.sizeW, this.state.sizeH);
        crop_canvas.toBlob((blob) => {
            this._cancel();
            this.props.apply(blob);
        });

    }
    _cancel = () => {
        this.ele.children[0].children[1].value = ""
        this.setState({
            preview: null
        })
    }

    render() {
        const { relX, relY, sizeW, sizeH } = this.state;
        var actions = this.props.actions ?
            this.props.actions.map((ele, key) => {
                var res = null;
                switch (key) {
                    case 0:
                        res = React.cloneElement(
                            ele,
                            { onClick: this._cancel }
                        );
                        break;
                    case 1:
                        res = React.cloneElement(
                            ele,
                            { onClick: this._apply }
                        );
                    default:
                        break;
                }
                return res
            })
            :
            null
        return (
            <avatar-image class={this.props.className}
                style={this.avatarStyle}>
                <div style={this.rootStyle}>
                    <div>
                        {this.props.icon
                            ? this.props.icon
                            :
                            (
                                <svg viewBox="0 0 24 24" style={this.iconStyle}>
                                    <circle cx="12" cy="12" r="3.2"></circle>
                                    <path
                                        d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>
                                </svg>
                            )
                        }
                        <p style={this.textStyle}>{this.props.text ? this.props.text : 'Upload photo'}</p>
                    </div>
                    <input
                        style={this.inputStyle}
                        type='file'
                        accept='images/*'
                        onChange={(e) => {
                            this.onDrop(e)
                        }} />
                    {
                        this.state.preview &&
                        (
                            <div>
                                <div
                                    onMouseDown={this._onMouseDown}
                                    style={Object.assign({}, this.previewStyle, {
                                        backgroundImage: 'url(' + this.state.preview + ')',
                                        backgroundSize: sizeW + 'px ' + sizeH + 'px',
                                        backgroundPosition: '' + relX + 'px ' + relY + 'px'
                                    })}>
                                </div>

                            </div>

                        )
                    }

                </div>
                {
                    this.state.preview &&
                    (
                        <div style={this.sliderConStyle}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '600px', width: '100%' }}>
                                <div style={{ height: '20px', margin: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                    <SliderBtn resize={this._resize} />
                                </div>
                                <div name='action-con' style={{ display: 'flex' }}>
                                    {
                                        actions ?
                                            actions
                                            :
                                            [
                                                <button style={this.cancelBtnStyle} key={0} onClick={this._cancel}>
                                                    <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                                        <path d="M0 0h24v24H0z" fill="none" />
                                                    </svg>
                                                </button>,
                                                <button style={this.applyBtnStyle} key={1} onClick={this._apply}>
                                                    <svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                                                    </svg>
                                                </button>
                                            ]
                                    }
                                </div>
                            </div>

                        </div>
                    )
                }
            </avatar-image>

        );
    }
}

export default AvatarImageCropper;

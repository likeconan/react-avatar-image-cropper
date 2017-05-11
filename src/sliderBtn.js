import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
    }, this.props.sliderStyle)

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
    }, this.props.sliderBtnStyle)

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

export default SliderBtn;
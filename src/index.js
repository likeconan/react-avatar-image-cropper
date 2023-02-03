import React from 'react'
import PropTypes from 'prop-types'

class SliderBtn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      relX: 0
    }
  }

  componentDidMount() {
    this.sliderW = this.ele.offsetWidth
    this.offsetLeft = this.ele.getBoundingClientRect().left
    if (this.ifMobile) {
      this.ele.children[0].addEventListener('touchstart', this._onStart)
    } else {
      this.ele.children[0].addEventListener('mousedown', this._onStart)
    }
  }

  ifMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

  sliderW = 0
  offsetLeft = 0

  sliderStyle = {
    width: '90%',
    maxWidth: '250px',
    height: '7px',
    backgroundColor: '#e6ecf0',
    position: 'relative',
    border: 0,
    boxShadow: 'inset 0 0 3px rgba(0,0,0,0.15)'
  }

  sliderBtnStyle = {
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
  }

  _onStart = (e) => {
    if (this.ifMobile) {
      document.addEventListener('touchmove', this._onMove)
      document.addEventListener('touchend', this._onUp)
    } else {
      document.addEventListener('mousemove', this._onMove)
      document.addEventListener('mouseup', this._onUp)
    }

    e.preventDefault()
  }

  _onMove = (e) => {
    var x = this.ifMobile ? e.touches[0].clientX : e.clientX
    var relX = ((x - this.offsetLeft) / this.sliderW) * 100
    relX = relX > 100 ? 100 : relX
    relX = relX < 0 ? 0 : relX
    this.setState({
      relX: relX
    })
    this.props.resize(relX)
    e.preventDefault()
  }

  _onUp = (e) => {
    if (this.ifMobile) {
      document.removeEventListener('touchmove', this._onMove)
      document.removeEventListener('touchend', this._onUp)
    } else {
      document.removeEventListener('mousemove', this._onMove)
      document.removeEventListener('mouseup', this._onUp)
    }
    e.preventDefault()
  }

  render() {
    return (
      <div
        ref={(ele) => (this.ele = ele)}
        style={{ ...this.sliderStyle, ...this.props.sliderStyle }}
      >
        <span
          style={{
            ...this.sliderBtnStyle,
            ...this.props.sliderBtnStyle,
            left: this.state.relX + '%'
          }}
        />
      </div>
    )
  }
}

class AvatarImageCropper extends React.Component {
  static propTypes = {
    /**
     * Should be used to determine if has background.
     */
    isBack: PropTypes.bool,
    /**
     * Should be used to determine if has water mark.
     */
    noWaterMark: PropTypes.bool,
    /**
     * Should be used to pass `icon` components.
     */
    icon: PropTypes.element,
    /**
     * Should be used to pass loading component.
     */
    loadingNode: PropTypes.element,
    /**
     * Should be used to pass text or component.
     */
    text: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
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
     * Border Radius to apply to the preview.
     */
    previewBorderRadius: PropTypes.string,
    /**
     * Override the inline-styles of the initial icon style.
     */
    iconStyle: PropTypes.object,
    /**
     * Override the inline-styles of the initial text style.
     */
    textStyle: PropTypes.object,
    /**
     * Override the inline-styles of the error text style.
     */
    errorStyle: PropTypes.object,
    /**
     * Override the inline-styles of the root element.
     */
    rootStyle: PropTypes.object,
    /**
     * Override the inline-styles of the slider conatiner.
     */
    sliderConStyle: PropTypes.object,
    /**
     * Override the inline-styles of the slider conatiner children div.
     */
    sliderChildrenDiv: PropTypes.object,
    /**
     * Override the inline-styles of the slider div.
     */
    sliderDivStyle: PropTypes.object,
    /**
     * Override the inline-styles of the slider.
     */
    sliderStyle: PropTypes.object,
    /**
     * Override the inline-styles of the slider drag button.
     */
    sliderBtnStyle: PropTypes.object,
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
    /**
     * error with file.
     */
    errorHandler: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      preview: null,
      loading: false,
      x: 0,
      y: 0,
      relX: 0,
      relY: 0,
      sizeW: 0,
      sizeH: 0,
      errorMsg: ''
    }
  }

  color = this.props.isBack ? '#ffffff' : 'rgba(148,148,148,1)'

  ifMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

  iconStyle = {
    display: 'inline-block',
    color: this.color,
    fill: 'currentcolor',
    height: 32,
    width: 32,
    userSelect: 'none'
  }

  textStyle = {
    color: this.color,
    fontSize: '18px'
  }

  rootStyle = {
    textAlign: 'center',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  }

  inputStyle = {
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
  }
  previewStyle = {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 9,
    backgroundRepeat: "no-repeat",
    cursor: "move",
    backgroundPosition: "0% 0%",
    borderRadius: this.props.previewBorderRadius,
  };

  cropStyle = {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  }

  avatarStyle = {
    height: '100%',
    display: 'block',
    position: 'relative',
    borderRadius: this.props.previewBorderRadius,
    backgroundColor: this.props.isBack ? 'rgba(0,0,0,0.4)' : 'transparent'
  }

  sliderConStyle = {
    position: 'absolute',
    top: '100%',
    right: 0,
    left: 0,
    zIndex: 9,
    backgroundColor: '#222',
    display: 'flex',
    justifyContent: 'center'
  }

  sliderChildrenDiv = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '600px',
    width: '100%'
  }

  sliderDiv = {
    height: '20px',
    margin: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }

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

  cancelBtnStyle = {
    ...this.btnStyle,
    color: '#333',
    backgroundColor: '#fff',
    borderColor: '#ccc'
  }

  applyBtnStyle = {
    ...this.btnStyle,
    color: '#fff',
    backgroundColor: '#5cb85c',
    borderColor: '#4cae4c'
  }

  ele = null
  filename = ''
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
    this.avatar2D.width = this.ele.offsetWidth
    this.avatar2D.height = this.ele.offsetHeight
    if (this.avatar2D.width < 200) {
      this.sliderChildrenDiv = {
        ...this.sliderChildrenDiv,
        flexDirection: 'column'
      }
    }
  }

  onDrop = (evt) => {
    var fileList = evt.target.files
    var acceptedFiles = []
    var maxsize = this.props.maxsize ? this.props.maxsize : 1024 * 1024 * 2
    var file = fileList[0]
    if (!file) {
      return
    }
    var ifImage =
      file.type.indexOf('png') >= 0 ||
      file.type.indexOf('jpg') >= 0 ||
      file.type.indexOf('jpeg') >= 0

    if (ifImage && file.size <= maxsize) {
      this.setState({
        loading: true,
        x: 0,
        y: 0,
        relX: 0,
        relY: 0
      })
      acceptedFiles.push(file)
      var src = window.URL.createObjectURL(file)
      var img = new window.Image()
      img.src = src
      img.onload = () => {
        this.img = img
        this.img2D.width = img.width
        this.img2D.height = img.height
        this.img2D.ratio = img.width / img.height
        var sizeW =
          this.img2D.ratio >= 1
            ? this.avatar2D.height * this.img2D.ratio
            : this.avatar2D.width
        sizeW = sizeW < this.avatar2D.width ? this.avatar2D.width : sizeW
        var sizeH = sizeW / this.img2D.ratio
        this.setState({
          sizeW: Math.ceil(sizeW),
          sizeH: sizeH,
          errorMsg: '',
          loading: false
        })
        this.origin = {
          width: sizeW,
          height: sizeH
        }
      }
      file.preview = src

      if (acceptedFiles.length) {
        this.filename = acceptedFiles[0].name
        this.setState({ preview: acceptedFiles[0].preview })
        if (this.props.onDrop) {
          this.props.onDrop(acceptedFiles[0])
        }
      }
    } else if (!ifImage) {
      if (this.props.errorHandler) {
        this.props.errorHandler('not_image')
      } else {
        this.setState({
          errorMsg: 'Please upload png/jpg/jpeg image'
        })
      }
    } else if (file.size > maxsize) {
      if (this.props.errorHandler) {
        this.props.errorHandler('maxsize')
      } else {
        this.setState({
          errorMsg: 'The size of image is too large'
        })
      }
    }
  }

  _onMouseDown = (e) => {
    if (this.ifMobile) {
      this.setState({
        x: e.touches[0].clientX - this.state.relX,
        y: e.touches[0].clientY - this.state.relY
      })
      document.addEventListener('touchmove', this._onMove)
      document.addEventListener('touchend', this._onMouseUp)
    } else {
      this.setState({
        x: e.clientX - this.state.relX,
        y: e.clientY - this.state.relY
      })
      document.addEventListener('mousemove', this._onMove)
      document.addEventListener('mouseup', this._onMouseUp)
    }

    e.preventDefault()
  }

  _onMove = (e) => {
    var x = this.ifMobile ? e.touches[0].clientX : e.clientX
    var y = this.ifMobile ? e.touches[0].clientY : e.clientY
    var relX = this.state.x - x
    var relY = this.state.y - y
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

    e.preventDefault()
  }

  _onMouseUp = (e) => {
    if (this.ifMobile) {
      document.removeEventListener('touchmove', this._onMove)
      document.removeEventListener('touchend', this._onMouseUp)
    } else {
      document.removeEventListener('mousemove', this._onMove)
      document.removeEventListener('mouseup', this._onMouseUp)
    }

    e.preventDefault()
  }

  _resize = (val) => {
    var sizeW = this.origin.width * (1 + val / 50)
    var sizeH = this.origin.height * (1 + val / 50)
    var avW = sizeW - this.avatar2D.width
    var avH = sizeH - this.avatar2D.height
    var relX = -this.state.relX > avW ? -avW : this.state.relX
    var relY = -this.state.relY > avH ? -avH : this.state.relY
    this.setState({
      sizeH: sizeH,
      sizeW: sizeW,
      relX: relX,
      relY: relY
    })
  }

  _apply = () => {
    var crop_canvas = document.createElement('canvas')
    crop_canvas.width = this.avatar2D.width
    crop_canvas.height = this.avatar2D.height
    var ratio = this.state.sizeW / this.img2D.width
    crop_canvas
      .getContext('2d')
      .drawImage(
        this.img,
        -this.state.relX / ratio,
        -this.state.relY / ratio,
        this.img2D.width,
        this.img2D.height,
        0,
        0,
        this.state.sizeW,
        this.state.sizeH
      )
    crop_canvas.toBlob(async (blob) => {
      this.ele.children[0].children[1].value = ''
      this.setState({
        preview: null,
        loading: true
      })
      blob.name = this.filename
      try {
        await this.props.apply(blob)
        this.setState({
          loading: false
        })
      } catch (error) {
        this.setState({
          loading: false
        })
      }
    })
  }

  _cancel = () => {
    this.ele.children[0].children[1].value = ''
    this.setState({
      preview: null
    })
    if (this.props.cancel) {
      this.props.cancel()
    }
  }

  render() {
    const { relX, relY, sizeW, sizeH } = this.state
    var actions = this.props.actions
      ? this.props.actions.map((ele, key) => {
          var res = null
          switch (key) {
            case 0:
              res = React.cloneElement(ele, { onClick: this._cancel })
              break
            case 1:
              res = React.cloneElement(ele, { onClick: this._apply })
              break
            default:
              break
          }
          return res
        })
      : null
    return (
      <avatar-image
        ref={(node) => (this.ele = node)}
        class={this.props.className}
        style={{ ...this.avatarStyle, ...this.props.avatarStyle }}
      >
        <div style={{ ...this.rootStyle, ...this.props.rootStyle }}>
          {this.state.loading ? (
            this.props.loadingNode ? (
              this.props.loadingNode
            ) : (
              <div>Loading...</div>
            )
          ) : (
            <div>
              {!this.props.noWaterMark && (
                <div>
                  {this.props.icon ? (
                    this.props.icon
                  ) : (
                    <svg
                      viewBox='0 0 24 24'
                      style={{ ...this.iconStyle, ...this.props.iconStyle }}
                    >
                      <circle cx='12' cy='12' r='3.2' />
                      <path d='M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z' />
                    </svg>
                  )}
                  <div style={{ ...this.textStyle, ...this.props.textStyle }}>
                    {this.props.text ? this.props.text : 'Upload photo'}
                  </div>
                </div>
              )}
              {this.state.errorMsg && (
                <p style={{ color: 'red', ...this.props.errorStyle }}>
                  {this.state.errorMsg}
                </p>
              )}
            </div>
          )}
          <input
            style={{ ...this.inputStyle }}
            type='file'
            accept='image/*'
            onChange={(e) => {
              this.onDrop(e)
            }}
          />
          {this.state.preview && (
            <div>
              <div
                onMouseDown={this._onMouseDown}
                onTouchStart={this._onMouseDown}
                style={{
                  ...this.previewStyle,
                  backgroundImage: 'url(' + this.state.preview + ')',
                  backgroundSize: sizeW + 'px ' + sizeH + 'px',
                  backgroundPosition: '' + relX + 'px ' + relY + 'px'
                }}
              />
            </div>
          )}
        </div>
        {this.state.preview && (
          <div style={{ ...this.sliderConStyle, ...this.props.sliderConStyle }}>
            <div
              style={{
                ...this.sliderChildrenDiv,
                ...this.props.sliderChildrenDiv
              }}
            >
              <div style={{ ...this.sliderDiv, ...this.props.sliderDivStyle }}>
                <SliderBtn
                  sliderBtnStyle={this.props.sliderBtnStyle}
                  sliderStyle={this.props.sliderStyle}
                  resize={this._resize}
                />
              </div>
              <div
                name='action-con'
                style={{ display: 'flex', minWidth: '100px' }}
              >
                {actions || [
                  <button
                    style={{
                      ...this.cancelBtnStyle,
                      ...this.props.cancelBtnStyle
                    }}
                    key={0}
                    onClick={this._cancel}
                  >
                    <svg
                      fill='#000000'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
                      <path d='M0 0h24v24H0z' fill='none' />
                    </svg>
                  </button>,
                  <button
                    style={{
                      ...this.applyBtnStyle,
                      ...this.props.applyBtnStyle
                    }}
                    key={1}
                    onClick={this._apply}
                  >
                    <svg
                      fill='#ffffff'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M0 0h24v24H0z' fill='none' />
                      <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' />
                    </svg>
                  </button>
                ]}
              </div>
            </div>
          </div>
        )}
      </avatar-image>
    )
  }
}

/* canvas-toBlob.js
 * A canvas.toBlob() implementation.
 * 2016-05-26
 *
 * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr
 * License: MIT
 *   See https://github.com/eligrey/canvas-toBlob.js/blob/master/LICENSE.md
 */

/* global self */

/* jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */

;(function (view) {
  'use strict'
  var Uint8Array = view.Uint8Array
  var HTMLCanvasElement = view.HTMLCanvasElement
  var canvas_proto = HTMLCanvasElement && HTMLCanvasElement.prototype
  var is_base64_regex = /\s*;\s*base64\s*(?:;|$)/i
  var to_data_url = 'toDataURL'
  var base64_ranks
  var decode_base64 = function (base64) {
    var len = base64.length
    var buffer = new Uint8Array(((len / 4) * 3) | 0)
    var i = 0
    var outptr = 0
    var last = [0, 0]
    var state = 0
    var save = 0
    var rank
    var code
    var undef
    while (len--) {
      code = base64.charCodeAt(i++)
      rank = base64_ranks[code - 43]
      if (rank !== 255 && rank !== undef) {
        last[1] = last[0]
        last[0] = code
        save = (save << 6) | rank
        state++
        if (state === 4) {
          buffer[outptr++] = save >>> 16
          if (last[1] !== 61 /* padding character */) {
            buffer[outptr++] = save >>> 8
          }
          if (last[0] !== 61 /* padding character */) {
            buffer[outptr++] = save
          }
          state = 0
        }
      }
    }
    // 2/3 chance there's going to be some null bytes at the end, but that
    // doesn't really matter with most image formats.
    // If it somehow matters for you, truncate the buffer up outptr.
    return buffer
  }
  if (Uint8Array) {
    base64_ranks = new Uint8Array([
      62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0,
      -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
      18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29,
      30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
      48, 49, 50, 51
    ])
  }
  if (HTMLCanvasElement && (!canvas_proto.toBlob || !canvas_proto.toBlobHD)) {
    if (!canvas_proto.toBlob)
      canvas_proto.toBlob = function (callback, type /*, ...args */) {
        if (!type) {
          type = 'image/png'
        }
        if (this.mozGetAsFile) {
          callback(this.mozGetAsFile('canvas', type))
          return
        }
        if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(type)) {
          callback(this.msToBlob())
          return
        }

        var args = Array.prototype.slice.call(arguments, 1)
        var dataURI = this[to_data_url].apply(this, args)
        var header_end = dataURI.indexOf(',')
        var data = dataURI.substring(header_end + 1)
        var is_base64 = is_base64_regex.test(dataURI.substring(0, header_end))
        var blob
        if (window.Blob.fake) {
          // no reason to decode a data: URI that's just going to become a data URI again
          blob = new window.Blob()
          if (is_base64) {
            blob.encoding = 'base64'
          } else {
            blob.encoding = 'URI'
          }
          blob.data = data
          blob.size = data.length
        } else if (Uint8Array) {
          if (is_base64) {
            blob = new window.Blob([decode_base64(data)], { type: type })
          } else {
            blob = new window.Blob([decodeURIComponent(data)], { type: type })
          }
        }
        callback(blob)
      }

    if (!canvas_proto.toBlobHD && canvas_proto.toDataURLHD) {
      canvas_proto.toBlobHD = function () {
        to_data_url = 'toDataURLHD'
        var blob = this.toBlob()
        to_data_url = 'toDataURL'
        return blob
      }
    } else {
      canvas_proto.toBlobHD = canvas_proto.toBlob
    }
  }
})(
  (typeof self !== 'undefined' && self) ||
    (typeof window !== 'undefined' && window) ||
    this.content ||
    this
)

export default AvatarImageCropper

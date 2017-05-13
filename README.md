# React Avatar Image Cropper

A light library without any dependencies cropping tool for React.

# Demo

## <a href="https://jsfiddle.net/LeeConan/cmre14xm/" target="_blank">Online Demo</a>

# Installation

    npm i react-avatar-image-cropper --save

# Usage

Include the main js module, e.g:

```js
var AvatarImageCropper = require('react-avatar-image-cropper');
//or es6:
import AvatarImageCropper from 'react-avatar-image-cropper';

```
also you can implement the library as external js, add the script in build directory like below:

```js
<script src="/dist/avatar-image-cropper.min.js"></script>
```
you will get the AvatarImageCropper in window object.

Set the container for cropper and pass apply function for handling cropped file, e.g:

```js    
apply = (file) => {
    // handle the blob file you want
    // such as get the image src
    var src = window.URL.createObjectURL(file);
}
render() {
    return (
        <div style={{ width: '250px', height: '250px', margin: 'auto', border: '1px solid black' }}>
            <AvatarImageCr apply={this.apply} />
        </div>
    );
}
```

# Props

Most of the props is used for customizing the display:

### apply(required, function)

The apply function will get the cropped blob file, you can handle it whatever you want.

### cancel(optional, function)

The cancel function fired when you cancel cropping.

### errorHandler(optional, function)

When the file is not image of png/jpg/jpeg or the file size exceed maxsize(default is 2M),
the error message will displayed inside container as default.
You can handle the error with errorHandler, then the default behavoir will not be fired again.
With errorHandler, when file is not image return "not_image", when exceeded size return "maxsize".

```js
errorHandler = (type) => {
        console.log(type);
}
<AvatarImageCr apply={this.apply} errorHandler={this.errorHandler} />

```
### isBack(optional, bool, default:false)

when there is a background image in container, pass true to change the avatar background and text color

### text(optional, string, default:Upload photo)

replace the initial text.

### actions(optional, array of react components)

replace the cancel/apply buttons with customized button.
The first one must be as cancel, and the second one must be as apply

```js
const actions = [
        <button key={0}>test_cancel</button>,
        <button key={1}>test_apply</button>,
    ]
    <AvatarImageCr apply={this.apply} actions={actions} />
```

### errorHandler(optional, function)

You can set errorHandler to display error messages when the file is not a image or the size is too big.


### icon(optional, react component)

replace the initial display of icon.
  
```js
const icon = (
                <svg viewBox="0 0 24 24" style={this.iconStyle}>
                    <circle cx="12" cy="12" r="3.2"></circle>
                    <path
                        d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>
                </svg>
                )

<AvatarImageCr apply={this.apply} icon={icon}/>
```

### maxsize(optional, number)

set the maxsize of uploaded image, default value is 2M

```js
const maxsize= 1024 * 1024 *5

<AvatarImageCr apply={this.apply} maxsize={maxsize}/>
```

### className(optional, string)

set the class for the root element

### iconStyle(optional, object)

set the initial icon style

### textStyle(optional, object)

set the initial text style


### rootStyle(optional, object)

set the root element  style



### sliderConStyle(optional, object)

set the container of slider style


### cancelBtnStyle(optional, object)

set the cancel button style(if the there is actions prop, then the style is no working)

### applyBtnStyle(optional, object)

set the apply button style(if the there is actions prop, then the style is no working)

# Contributing / Developing

To view the demo or develop,open the demo directory and under it, 
    
    npm install
    npm start

you can open localhost:8080 in a browser to try.


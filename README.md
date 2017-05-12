# React Avatar Image Cropper

A light library without any dependencies cropping tool for React.

# Installation

    npm i react-avatar-image-cropper --save

# Usage

Include the main js module, e.g:

    var AvatarImageCropper = require('react-avatar-image-cropper');
    //or es6:
    import AvatarImageCropper from 'react-avatar-image-cropper';

Set the container for cropper and pass apply function for handling cropped file, e.g:
    
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

# Props

Most of the props is used for customizing the display:

### actions(optional, react component)

replace the cancel/apply buttons with customized button

### icon(optional, react component)

replace the initial display of icon.
  
    const icon = (
                    <svg viewBox="0 0 24 24" style={this.iconStyle}>
                        <circle cx="12" cy="12" r="3.2"></circle>
                        <path
                            d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>
                    </svg>
                 )

    <AvatarImageCr apply={this.apply} icon={icon}/>

### maxsize(optional, number)

set the maxsize of uploaded image, default value is 2M

    const maxsize= 1024 * 1024 *5

    <AvatarImageCr apply={this.apply} maxsize={maxsize}/>

### className(optional, string)

set the class for the root element

    <AvatarImageCr apply={this.apply} className='avatar'/>

### iconStyle(optional, object)

set the initial icon style

     <AvatarImageCr apply={this.apply} iconStyle={{fill:'#fff'}}/>

### textStyle(optional, object)

set the initial text style

     <AvatarImageCr apply={this.apply} textStyle={{color:'#fff'}}/>

### rootStyle(optional, object)

set the root element  style

     <AvatarImageCr apply={this.apply} rootStyle={{backgroundColor:'#fff'}}/>

### sliderConStyle(optional, object)

set the container of slider style

     <AvatarImageCr apply={this.apply} sliderConStyle={{backgroundColor:'#fff'}}/>

### cancelBtnStyle(optional, object)

set the cancel button style(if the there is actions prop, then the style is no working)

     <AvatarImageCr apply={this.apply} cancelBtnStyle={{fontSize:'16px'}}/>

### applyBtnStyle(optional, object)

set the apply button style(if the there is actions prop, then the style is no working)

     <AvatarImageCr apply={this.apply} applyBtnStyle={{fontSize:'16px'}}/>

# Contributing / Developing

To view the demo or develop,open the demo directory and under it, 
    
    npm install
    npm start

you can open localhost:8080 in a browser to try.


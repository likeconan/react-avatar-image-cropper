import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import AvatarImageCropper from 'react-avatar-image-cropper';

class App extends Component {
    apply = (file) => {
        console.log(file);
    }
    render() {
        return (
            <div style={{ width: '250px', height: '250px', margin: 'auto', border: '1px solid #ccc' }}>
                <AvatarImageCropper apply={this.apply} />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root'));
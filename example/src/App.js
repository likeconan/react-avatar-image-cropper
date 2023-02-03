import React from 'react'

import AvatarImageCropper from 'react-avatar-image-cropper'

const App = () => {

  const apply = (file) => {
    console.log(file)
  }

  return (
    <div style={{ width: '250px', height: '250px', margin: 'auto', border: '1px solid #ccc' }}>
      <AvatarImageCropper maxsize={10*1024*1024} apply={apply} />
    </div>
  )
}

export default App

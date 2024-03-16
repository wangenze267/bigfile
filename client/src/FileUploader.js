import { InboxOutlined } from '@ant-design/icons'
import { useRef } from 'react'
import './FileUploader.css';
import useDrag from './useDrag.js'
function FileUploader() {
  const uploadContainerRef = useRef(null)
  useDrag(uploadContainerRef)
  return (
    <div className='uploader-container' ref={ uploadContainerRef }>
      <InboxOutlined/>
    </div>
  )
}

export default FileUploader;
import { InboxOutlined } from '@ant-design/icons'
import { useRef } from 'react'
import './FileUploader.css';
import useDrag from './useDrag.js'
function FileUploader() {
  const uploadContainerRef = useRef(null)
  const { selectedFile, filePreview } = useDrag(uploadContainerRef)
  return (
    <>
      <div className='uploader-container' ref={ uploadContainerRef }>
        {renderFilePreview(filePreview)}
      </div>
    </>
  )
}
// 显示文件预览
function renderFilePreview(filePreview) {
  const { url, type} = filePreview
  if(url) {
    console.log(url)
    if (type.startsWith('image/')) {
      return <img src={ url } alt="preview"></img>
    } else if (type.startsWith('video/')) {
      return <video src={ url } alt="preview"></video>
    } else {
      return url
    }
  } else {
    return <InboxOutlined />
  }
}

export default FileUploader;
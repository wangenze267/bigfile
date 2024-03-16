import { useState,useEffect, useCallback } from 'react'
import { message } from 'antd'
import { MAX_FILE_SIZE } from './constant'

function useDrag(uploadContainerRef) {
  // 定义一个状态用来保存用户选中的文件
  const [ selectedFile, setSelectedFile ] = useState(null)
  // 存放文件预览信息 url 是预览地址 type 是文件类型
  const [filePreview, setFilePreview] = useState({ url: null, type: null })
  const handleDrag = useCallback((event) => {
    event.preventDefault() // 阻止默认行为
    event.stopPropagation() // 阻止事件传播
  },[])
  const checkFile = (files) => {
    const file = files[0]
    if (!file) {
      message.error('没有选择任何文件')
      return
    }
    // 文件大小不能超过2G
    if (file.size > MAX_FILE_SIZE) {
      message.error('大小不能超过2G！')
      return
    }
    // 判断文件类型 限制图片和视频
    if (!(file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      message.error('文件类型必须是图片或视频文件！')
      return
    }
    setSelectedFile(file)
  }
  const handleDrop = useCallback((event) => {
    event.preventDefault() // 阻止默认行为
    event.stopPropagation() // 阻止事件传播
    checkFile(event.dataTransfer.files)
  },[])
  useEffect(() => {
    if(!selectedFile) {
      return
    }
    const url = URL.createObjectURL(selectedFile)
    setFilePreview({ url, type:selectedFile.type })
    // useEffect 会返回一个销毁函数
    return () => {
      URL.revokeObjectURL(url)
    }
  },[selectedFile])
  // useCallback 如果不给第二个参数 是没有缓存效果的 每一次都是新的
  useEffect(() => {
    const uploadContainer = uploadContainerRef.current
    uploadContainer.addEventListener('dragenter', handleDrag)
    uploadContainer.addEventListener('dragover', handleDrag)
    uploadContainer.addEventListener('drop', handleDrop)
    uploadContainer.addEventListener('dragleave', handleDrag)
    return () => {
      uploadContainer.removeEventListener('dragenter', handleDrag)
      uploadContainer.removeEventListener('dragover', handleDrag)
      uploadContainer.removeEventListener('drop', handleDrop)
      uploadContainer.removeEventListener('dragleave', handleDrag)
    }
  },[])
  return { selectedFile, filePreview }
}
export default useDrag
import { useState,useEffect, useCallback } from 'react'

function useDrag(uploadContainerRef) {
  const handleDrag = useCallback((event) => {
    event.preventDefault() // 阻止默认行为
    event.stopPropagation() // 阻止事件传播
  },[])
  const handleDrop = useCallback((event) => {
    event.preventDefault() // 阻止默认行为
    event.stopPropagation() // 阻止事件传播
    const {files} = event.dataTransfer
    console.log(files)
  },[])
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
  return {}
}
export default useDrag
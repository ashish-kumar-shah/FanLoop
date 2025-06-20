import React from 'react'
import PostLayout from '../PostElement/PostLayout'

const ContentBar = () => {
  return (
   <div className="w-full h-full border bg-white flex flex-col justify-start items-center  overflow-y-auto gap-2 hide-scrollbar">
    <PostLayout/>
   

   </div>
  )
}

export default ContentBar
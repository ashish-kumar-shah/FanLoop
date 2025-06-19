import React from 'react'
import TopBar from '../Component/HomeElement/TopBar'
import ContentBar from '../Component/HomeElement/ContentBar'

const Home = () => {
  return (
    <div className='w-full p-1 h-full flex flex-col gap-0.5'>

   <TopBar/>
   <ContentBar/>
    </div>
  )
}

export default Home
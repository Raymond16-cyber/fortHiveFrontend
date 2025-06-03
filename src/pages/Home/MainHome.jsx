import React from 'react'
import HomeHeader from './HomeHeader'
import HomeBody from './HomeBody'
import HomeFooter from './HomeFooter'

const MainHome = () => {
  return (
    <div className='flex flex-col w-full'>
        <HomeHeader />
        <HomeBody />
        <HomeFooter />
    </div>
  )
}

export default MainHome
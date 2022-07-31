import React from 'react';
import Nav from './nav'
import Top from './top'
function Home(){
  return(
    <div className='Home'>
      <Top text="Home Page" />
      <Nav />
    </div>
  )
}

export default Home;
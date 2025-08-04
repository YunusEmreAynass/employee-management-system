import React from 'react'
import Header from './Header'
import UncontrolledExample from './sliders/UncontrolledExample'
import Footer from './Footer'
import Cards from './cards/Cards'


function HomePage() {
  return (
    <div>
      <Header />
      <UncontrolledExample />
      <Cards />
      <Footer />
    </div>
  )
}

export default HomePage
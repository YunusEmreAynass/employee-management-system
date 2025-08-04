import React from 'react'

function ExampleCarouselImage({ image }) {//sliderdaki resimleri ayrı bir componentte oluşturuyoruz
  return (
      <div style={{backgroundImage: `url(${image})`, height: '500px', backgroundSize: 'cover', backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}}>
          
    </div>
  )
}

export default ExampleCarouselImage
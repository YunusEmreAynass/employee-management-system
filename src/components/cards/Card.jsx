import React from 'react'
import { useNavigate } from 'react-router-dom'

function Card({ img, title, description,t , id }) {
  const navigate = useNavigate();

  return (
    <div className='card-layout'>
      <img src={img} alt="" className='card-image' />
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={() => {navigate('/'+t(`home.cards.${id}.slug`))}} className='card-button'>{t("home.cards.button")}</button>
    </div>
  )
}

export default Card
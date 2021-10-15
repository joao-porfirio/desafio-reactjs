import React from 'react'
import star from '../../assets/star.png'
import '../../css/style.css'
const Card = (props) => {

  return (
    <section className="card">
      <article className="card__conteudo">
        <h1 className="card__titulo">{props.title}</h1>
        <p className="card__descricao">{props.descricao}</p>
        <div className="card__stats stats">
          <img className="stats__icon" src={star} alt=""/> 
          <span className="stats__stars">{props.stars}</span>
          <span className="stats__lastUpdate">{props.update}</span>
        </div>
      </article>
    </section>
  )
}

export default Card

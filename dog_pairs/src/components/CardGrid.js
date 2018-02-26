import React from 'react';
import Card from './Card';

const CardGrid = (props) => {
  const cards = props.deck.map((card, index) => {
    return <Card url={card.url} key={index} handleCardClick={props.handleCardClick} position={index} endOfTurn={props.endOfTurn} />
  })

  return <div id="card-grid"> {cards} </div>
}

export default CardGrid;
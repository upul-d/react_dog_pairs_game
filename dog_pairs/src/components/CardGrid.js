import React from 'react';
import Card from './Card';

const CardGrid = (props) => {
  const cards = props.images.map((image, index) => {
    return <Card url={image} key={index} />
  })

  return <div> {cards} </div>
}

export default CardGrid;
import React from 'react';

const Card = (props) => {
  return (
    <div className="card" onClick={ () => {props.handleCardClick(props.position)} }><img src={props.url} /></div>
  )
}

export default Card;
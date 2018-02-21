import React from 'react';

const Card = (props) => {
  if (props.url === "x") {
    return <div className="card"></div>
  } else {
    return <div className="card" onClick={ () => {props.handleCardClick(props.position)} }><img src={props.url} /></div>
  }
}

export default Card;
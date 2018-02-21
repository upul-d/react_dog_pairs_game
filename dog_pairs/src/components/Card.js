import React from 'react';

const Card = (props) => {
  return (
    <div className="card"><img src={props.url} /></div>
  )
}

export default Card;
import React, { Component } from 'react';
import CardGrid from '../components/CardGrid';

class GameContainer extends Component {

  componentDidMount() {
    const url = 'https://dog.ceo/api/breed/retriever/images';
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.addEventListener('load', function(){
      const jsonString = xhr.responseText;
      const data = JSON.parse(jsonString);
      // console.log(data);
      const firstTwentyData = data.message.slice(0, 20);
    })

    xhr.send();
  }

  render() {
    return (
      <CardGrid />
    );
  }
}

export default GameContainer;

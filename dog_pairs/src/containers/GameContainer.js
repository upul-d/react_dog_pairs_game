import React, { Component } from 'react';
import CardGrid from '../components/CardGrid';

class GameContainer extends Component {

  constructor() {
    super();

    this.state = {
      dogsImages: []
    }
  }

  componentDidMount() {
    const url = 'https://dog.ceo/api/breed/retriever/images';
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.addEventListener('load', () => {
      const jsonString = xhr.responseText;
      const data = JSON.parse(jsonString);
      const firstTwentyData = data.message.slice(0, 20);

      this.setState({dogsImages: firstTwentyData});
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

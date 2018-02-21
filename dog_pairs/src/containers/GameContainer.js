import React, { Component } from 'react';
import CardGrid from '../components/CardGrid';
import Request from '../services/Request';

class GameContainer extends Component {

  constructor() {
    super();

    this.state = {
      dogsImages: []
    }
  }

  onRequestComplete(data) {
    const firstTwentyData = data.message.slice(0, 20);
    this.setState({dogsImages: firstTwentyData});
  }

  componentDidMount() {
    const request = new Request('https://dog.ceo/api/breed/retriever/images');
    request.get()
      .then(this.onRequestComplete.bind(this))
      .catch(console.error)
  }

  render() {
    return (
      <CardGrid />
    );
  }
}

export default GameContainer;

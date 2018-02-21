import React, { Component } from 'react';
import CardGrid from '../components/CardGrid';
import Request from '../services/Request';

class GameContainer extends Component {

  constructor() {
    super();

    this.state = {
      dogsImages: [],
      pairs: []
    }

    this.handleCardClick = this.handleCardClick.bind(this);
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

  handleCardClick(index) {
    const clickedCard = this.state.dogsImages[index];
    const pairs = this.state.pairs
    pairs.push(clickedCard);
    this.setState({pairs: pairs});
  }

  render() {
    return (
      <CardGrid images={this.state.dogsImages} handleCardClick={this.handleCardClick}/>
    );
  }
}

export default GameContainer;

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
    const firstData = data.message.slice(0, 10);
    const duplicatedData = [...firstData, ...firstData];
    const shuffledData = duplicatedData.sort(() => Math.random() - 0.5)
    this.setState({dogsImages: shuffledData});
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

    if (pairs[0] === pairs[1]) {
      console.log("correct");
    } else {
      console.log("incorrect");
    }

    if (pairs.length === 2) {
      pairs.length = 0
      this.setState({pairs: pairs});
    }
  }

  render() {
    return (
      <CardGrid images={this.state.dogsImages} handleCardClick={this.handleCardClick}/>
    );
  }
}

export default GameContainer;

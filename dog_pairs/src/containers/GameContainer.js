import React, { Component } from 'react';
import CardGrid from '../components/CardGrid';
import Request from '../services/Request';

class GameContainer extends Component {

  constructor() {
    super();

    this.state = {
      dogsImages: [],
      pairs: [],
      endOfTurn: false
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

  handleMatchedPair(images, pairs) {
    images[pairs[0]] = "x";
    images[pairs[1]] = "x";
    this.setState({dogsImages: images});
  }

  checkForMatchingPair() {
    const pairs = this.state.pairs;
    const images = this.state.dogsImages;
    if (images[pairs[0]] === images[pairs[1]]) {
      this.handleMatchedPair(images, pairs)
    } else {
      console.log("incorrect");
    }
  }

  endTurn() {
    const pairs = this.state.pairs;
    if (pairs.length === 2) {
      pairs.length = 0
      this.setState({pairs: pairs, endOfTurn: true});
    }
  }

  handleCardClick(index) {

    if (this.state.pairs.length === 0) {
        this.setState({endOfTurn: false})
    }
    const pairs = this.state.pairs;
    pairs.push(index);
    this.setState({pairs: pairs});

    this.checkForMatchingPair();
    this.endTurn();
  }

  render() {
    return (
      <CardGrid images={this.state.dogsImages} handleCardClick={this.handleCardClick} endOfTurn={this.state.endOfTurn}/>
    );
  }
}

export default GameContainer;

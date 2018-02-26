import React, { Component } from 'react';
import CardGrid from '../components/CardGrid';
import Request from '../services/Request';
import Deck from '../models/Deck'
import Card from '../models/Card'

class GameContainer extends Component {

  constructor() {
    super();

    this.state = {
      deck: [],
      pairs: [],
      endOfTurn: false,
      gameWon: false
    }

    this.handleCardClick = this.handleCardClick.bind(this);
    this.buildDeck = this.buildDeck.bind(this);
  }

  // this.setState({dogsImages: shuffledData});

  componentDidMount() {
    const deck = new Deck('https://dog.ceo/api/breed/retriever/images');
    deck.makeRequest(this.buildDeck)
  }

  buildDeck(data) {
      const initialData = data.message.slice(0, 10);
      const duplicatedData = [...initialData, ...initialData];
      const cardsArray = duplicatedData.map( (imageUrl) => {
        return new Card(imageUrl, "hidden", true)
      })

      const shuffledCards = cardsArray.sort(() => Math.random() - 0.5);
      this.setState({deck: shuffledCards});
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
    }
  }

  endTurn() {
    const pairs = this.state.pairs;
    if (pairs.length === 2) {
      pairs.length = 0
      this.setState({pairs: pairs, endOfTurn: true});
    }
    this.checkForWin()
  }

  checkForWin() {
    if (this.state.dogsImages.every(imageUrl => imageUrl === "x")) {
      this.setState({ gameWon: true })
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
    let message = "Keep guessing!"
    if (this.state.gameWon) {
      message = <h1>You Won!</h1>
    }
    return (
      <div>
        {message}
        {/* <CardGrid images={this.state.dogsImages} handleCardClick={this.handleCardClick} endOfTurn={this.state.endOfTurn}/> */}
      </div>
    );
  }
}

export default GameContainer;

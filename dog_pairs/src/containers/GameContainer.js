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
      gameWon: false
    }

    this.handleCardClick = this.handleCardClick.bind(this);
    this.buildDeck = this.buildDeck.bind(this);
  }


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

  handleMatchedPair(deck, pairs) {
      deck[pairs[0]] = "x";
      deck[pairs[1]] = "x";
      this.setState({deck: deck});
  }

  checkForMatchingPair() {
    const pairs = this.state.pairs;
    const deck = this.state.deck;
    if (deck[pairs[0]] === deck[pairs[1]]) {
      this.handleMatchedPair(deck, pairs)
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
    if (this.state.deck.every(imageUrl => imageUrl === "x")) {
      this.setState({ gameWon: true })
    }
  }

  handleCardClick(index) {

    let pairs = this.state.pairs;
    pairs.push(index);

    if (pairs.length === 3) {
      const deck = this.state.deck
      deck[pairs[0]].status.clickable = true;
      deck[pairs[0]].status.display = "hidden";
      deck[pairs[1]].status.clickable = true;
      deck[pairs[1]].status.display = "hidden";
      const clickedCard = deck[index]
      clickedCard.status.clickable = false;
      clickedCard.status.display = "shown";
      deck[index] = clickedCard;
      pairs = [index];
      this.setState({deck: deck, pairs: pairs});
    }

    else {
      const deck = this.state.deck
      const clickedCard = deck[index]
      clickedCard.status.clickable = false;
      clickedCard.status.display = "shown";
      deck[index] = clickedCard;
      this.setState({deck: deck});
    }


    // this.checkForMatchingPair();
    // this.endTurn();
  }

  render() {
    let message = "Keep guessing!"
    if (this.state.gameWon) {
      message = <h1>You Won!</h1>
    }
    return (
      <div>
        {message}
        <CardGrid deck={this.state.deck} handleCardClick={this.handleCardClick} endOfTurn={this.state.endOfTurn}/>
      </div>
    );
  }
}

export default GameContainer;

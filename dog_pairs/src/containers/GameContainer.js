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
      const initialData = data.message.slice(0, 2);
      const duplicatedData = [...initialData, ...initialData];
      const cardsArray = duplicatedData.map( (imageUrl) => {
        return new Card(imageUrl, "hidden", true)
      })

      const shuffledCards = cardsArray.sort(() => Math.random() - 0.5);
      this.setState({deck: shuffledCards});
  }

  handleMatchedPair(deck, pairs) {
      deck[pairs[0]].status.clickable = false;
      deck[pairs[1]].status.clickable = false;
      deck[pairs[0]].status.display = "completed";
      deck[pairs[1]].status.display = "completed";
      this.checkForWin(deck);
      return deck;
  }

  checkForMatchingPair() {
    const pairs = this.state.pairs;
    let deck = this.state.deck;
    if (deck[pairs[0]].url === deck[pairs[1]].url) {
      deck = this.handleMatchedPair(deck, pairs)
    }
    return deck;
  }

  checkForWin(deck) {
    let counter = 0;
    deck.forEach((card) => {
      if (card.status.display === "completed") {
        counter++;
      }
    })

    if (counter === deck.length - 2) {
      this.setState({ gameWon: true })
    }
  }

  handleCardClick(index) {
    console.log('handle card click running again');

    let pairs = this.state.pairs;
    pairs.push(index);
    let deck = this.state.deck;

    if (pairs.length === 3) {
      deck[pairs[0]].status.clickable = true;
      deck[pairs[0]].status.display = "hidden";
      deck[pairs[1]].status.clickable = true;
      deck[pairs[1]].status.display = "hidden";
      const clickedCard = deck[index]
      clickedCard.status.clickable = false;
      clickedCard.status.display = "shown";
      deck[index] = clickedCard;
      pairs = [index];

      deck = this.checkForMatchingPair()

      this.setState({deck: deck, pairs: pairs});
    }

    else {
      const clickedCard = deck[index]
      clickedCard.status.clickable = false;
      clickedCard.status.display = "shown";
      deck[index] = clickedCard;
      this.setState({deck: deck});
    }

  }

  render() {
    let message = "Keep guessing!"
    if (this.state.gameWon) {
      message = <h1>You Won!</h1>
    }
    return (
      <div>
        {message}
        <CardGrid deck={this.state.deck} handleCardClick={this.handleCardClick} />
      </div>
    );
  }
}

export default GameContainer;

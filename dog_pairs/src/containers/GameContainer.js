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
    const images = this.state.dogsImages;
    const pairs = this.state.pairs;

    pairs.push(index);
    this.setState({pairs: pairs});

    if (images[pairs[0]] === images[pairs[1]]) {
      images[pairs[0]] = "x";
      images[pairs[1]] = "x";
      this.setState({dogsImages: images});
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

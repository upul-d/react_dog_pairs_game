import Request from '../services/Request';
import Card from './Card'

class Deck {
  constructor(url) {
    this.url = url;
    this.cards = [];
  }

  makeRequest(onComplete) {
    const request = new Request(this.url);
    request.get()
      .then(onComplete)
      .catch(console.error)
  }

}

export default Deck
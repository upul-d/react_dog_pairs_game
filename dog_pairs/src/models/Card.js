class Card {
  constructor(url, displayStatus, clickableStatus) {
    this.url = url;
    this.status = {
      display: displayStatus,
      clickable: clickableStatus
    }
  }
}

export default Card;
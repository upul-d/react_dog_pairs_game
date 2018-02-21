import React, {Component} from 'react';

class Card extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false
    }

    this.onCardClick = this.onCardClick.bind(this);
  }

  onCardClick() {
    this.setState({ active: true});
    this.props.handleCardClick(this.props.position);
  }

  render() {

    if (this.props.url === "x") {
      return <div className="card"></div>
    }
    else if (!this.state.active) {
      return <div className="card hidden" onClick={ this.onCardClick }></div>
    }
    else {
      return <div className="card"><img src={this.props.url} /></div>
    }
  }

}

export default Card;
import React, {Component} from 'react';

class Card extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.url === "x") {
      return <div className="card"></div>
    } else {
      return <div className="card" onClick={ () => {this.props.handleCardClick(this.props.position)} }><img src={this.props.url} /></div>
    }
  }

}

export default Card;
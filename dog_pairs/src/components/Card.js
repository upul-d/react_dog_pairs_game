import React, {Component} from 'react';

class Card extends Component {
  constructor(props) {
    super(props)

    this.onCardClick = this.onCardClick.bind(this);
  }

  onCardClick() {
    this.props.handleCardClick(this.props.position);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.endOfTurn) {
      setTimeout(() => {
        this.setState({ active: false});
      }, 1000)
    }
  }

  render() {

    if (this.props.status.display === "hidden" && this.props.status.clickable) {
      return <div className={`card ${this.props.status.display}`} onClick={ this.onCardClick }></div>
    }
    else if (this.props.status.display === "shown" && !this.props.status.clickable) {
      return <div className={`card ${this.props.status.display}`} ><img src={this.props.url}/></div>
    }
    else if (this.props.status.display === "hidden" && !this.props.status.clickable) {
      return <div className={`card ${this.props.status.display}`} ></div>
    }
    else {
      return <div className="card"></div>
    }

  }

}


export default Card;
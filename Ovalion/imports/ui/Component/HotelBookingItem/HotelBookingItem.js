import React, { Component } from 'react';
import './HotelBookingItem.css';

export default class HotelBookingItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hotel: props.hotel,
      active: props.active,
      parentHandler: props.parentHandler,
    }
  }


  componentWillReceiveProps(props) {
    this.setState({ active: props.active });
  }


  getStars = () => {
    let stars = [];
    for (let i = 0, ii = this.state.hotel.stars; i < ii; i ++) {
      stars[i] = i;
    }
    let starsHtml =
      (<div className="hotelbookingitem-stars">
        { stars.map((star) => {
          return <span><img key={this.state.hotel.id + star} src="./assets/icons/star.svg"/></span>
        } )}
      </div>);


    return starsHtml;
  }

  setHotel = () => {
    this.state.parentHandler(this.state.hotel.id, this.state.hotel.prix);
  }


  render() {
    let masterCssClass = (this.state.active) ? 'hotelbookingitem-master hotelbookingitem-active' : 'hotelbookingitem-master';
    return (
      <div className={ masterCssClass } onClick={ this.setHotel }>

        { this.getStars() }

        <div className="hotelbookingitem-name">
          <p>{ this.state.hotel.name }</p>
        </div>

        <div className="hotelbookingitem-price">
          <p>{ this.state.hotel.prix + '€'}</p>
        </div>

      </div>
    );
  }

}

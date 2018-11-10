import React, { Component } from 'react';
import './BusBookingItem.css';
import dateParser from '../../../dateParser/dateParser';


export default class BusBookingItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      trip: props.trip,
      localizedString: props.localizedString.BusBookingItem,
      active: props.active,
      parentHandler: props.parentHandler,
    }
  }


  componentWillReceiveProps(props) {
    this.setState({ localizedString: props.localizedString.BusBookingItem, active: props.active});
  }

  setBus = () => {
    this.state.parentHandler(this.state.trip.id, this.state.trip.prix);
  }


  render() {
    let dateDepartStr = dateParser.getTimeOnly(this.state.trip.dateDepart);
    let dateArriveeStr = dateParser.getTimeOnly(this.state.trip.dateArrivee);
    let duree = dateParser.getTimeOnly(this.state.trip.duree);
    let masterCssClass = (this.state.active) ? "busbookingitem-master busbookingitem-active" : "busbookingitem-master";

    return (
        <div className={ masterCssClass } onClick={ this.setBus }>
          <div className="busbookingitem-cities">
            <p>{ this.state.trip.cityDepart }</p>
            <p className="busbookingitem-sep">></p>
            <p>{ this.state.trip.cityArrivee }</p>
          </div>
          <div className="busbookingitem-hours">
            <p>{ dateDepartStr }</p>
            <p className="busbookingitem-sep">></p>
            <p>{ dateArriveeStr }</p>
            <p className="busbookingitem-sep"/>
            <p>{ this.state.localizedString.duree + ': ' + duree }</p>
          </div>
          <div className="busbookingitem-price">
            <p>{ this.state.trip.prix + '€'}</p>
          </div>
        </div>
    );
  }

}

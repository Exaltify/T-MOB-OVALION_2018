import React, { Component } from 'react';
import './BusBookingItem.css';
import dateParser from '../../../dateParser/dateParser';


export default class BusBookingItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      trip: props.trip,
      localizedString: props.localizedString.BusBookingItem,
    }
  }


  componentWillReceiveProps(props) {
    this.setState({ localizedString: props.localizedString.BusBookingItem });
  }


  render() {
    let dateDepartStr = dateParser.getTimeOnly(this.state.trip.dateDepart);
    let dateArriveeStr = dateParser.getTimeOnly(this.state.trip.dateArrivee);
    let duree = dateParser.getTimeOnly(this.state.trip.duree);

    return (
        <div className='busbookingitem-master'>
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

import React, { Component } from 'react';
import './TripBookingStep.css';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import BusBookingItem from '../../Component/BusBookingItem/BusBookingItem'

let tripType = {
  SIMPLE: 0,
  FULL: 1,
}

let ticketType = {
  VIP: 0,
  FRONT: 1,
  TURN: 2,
}

export default class TripBookingStep extends Component {

  constructor(props) {
    super(props);
    this.state = {
      match: props.match,
      chosenTripType: null,
      chosenTicketType: null,
      localizedString: this.props.localizedString.TripBookingStep,
      homeMatchCity: props.match.cityLocation,
    }

    let trips = this.generateTrips();

    this.state = {
      match: props.match,
      chosenTripType: null,
      chosenTicketType: null,
      localizedString: this.props.localizedString.TripBookingStep,
      homeMatchCity: this.props.homeMatchCity,
      busTrips: trips[0],
      busTripsBack: trips[1],
    }
  }

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  componentWillReceiveProps(props) {
    this.setState({ localizedString: props.localizedString.TripBookingStep });
  }

  onChangeTripType = (value) => {
    this.setState({ chosenTripType: value });
  }

  onChangeTicketType = (value) => {
    this.setState({ chosenTicketType: value });
  }

  generateBusTravel = (distance, hourBefore) => {
    let duree = (distance / 70) * 60 * 60 * 1000;
    let dateArrivee = this.state.match.date - (hourBefore * 3600 * 1000);
    let dateDepart = dateArrivee - duree;
    let cityDepart = Meteor.user().profile.city;
    let cityArrivee = this.state.homeMatchCity.city;
    let prix = this.getRandomInt(5, 30);

    return { distance, duree, dateArrivee, dateDepart, cityDepart, cityArrivee, prix };
  }

  generateBackBusTravel = (distance, hourAfter) => {
    let duree = (distance / 70) * 60 * 60 * 1000;
    let dateDepart = this.state.match.date +   + (hourAfter * 3600 * 1000);
    let dateArrivee = dateDepart + duree;
    let cityArrivee = Meteor.user().profile.city;
    let cityDepart = this.state.homeMatchCity.city;
    let prix = this.getRandomInt(5, 30);

    return { distance, duree, dateArrivee, dateDepart, cityDepart, cityArrivee, prix };
  }

  generateTrips = () => {
    let distance = this.getRandomInt(100, 800);
    let trips = [[], []];
    for (let i = 0; i < 3; i++) {
        trips[0][i] = this.generateBusTravel(distance, i);
        trips[1][i] = this.generateBackBusTravel(distance, i);
    }
    return trips;
  }

  render() {
    return (
      <div className="tripbookingstep-master">
        <div className="tripbookingstep-chosetype-container">
          <div className="tripbookingstep-chosetype-title"> <p>{ this.state.localizedString.offertitle }</p></div>
            <RadioGroup onChange={ this.onChangeTripType } horizontal>
              <RadioButton value="0">
                { this.state.localizedString.simpletrip }
              </RadioButton>
              <RadioButton value="1">
                { this.state.localizedString.fulltrip }
              </RadioButton>
            </RadioGroup>
        </div>
        <div className="tripbookingstep-chosetype-container">
          <div className="tripbookingstep-chosetype-title"> <p>{ this.state.localizedString.billettitle }</p></div>
          <RadioGroup onChange={ this.onChangeTicketType } horizontal>
            <RadioButton value="0">
              VIP - 80€
            </RadioButton>
            <RadioButton value="1">
              { this.state.localizedString.front + ' - 60€' }
            </RadioButton>
            <RadioButton value="2">
              { this.state.localizedString.turn + ' - 40€' }
            </RadioButton>
          </RadioGroup>
        </div>
        <div className="tripbookingstep-chosetype-title"> <p>{ this.state.localizedString.chosebus }</p></div>
        { this.state.busTrips.map((trip) => {
          return <BusBookingItem key={ trip.duree + trip.prix } trip={ trip } localizedString={ this.props.localizedString }/>
        })}
        <div className="tripbookingstep-chosetype-title"> <p>{ this.state.localizedString.chosebusback }</p></div>
        { this.state.busTripsBack.map((trip) => {
          return <BusBookingItem key={ trip.prix + trip.duree } trip={ trip } localizedString={ this.props.localizedString }/>
        })}
      </div>
    );
  }
}

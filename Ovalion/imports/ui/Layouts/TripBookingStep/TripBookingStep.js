import React, { Component } from 'react';
import './TripBookingStep.css';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import BusBookingItem from '../../Component/BusBookingItem/BusBookingItem';
import HotelBookingItem from '../../Component/HotelBookingItem/HotelBookingItem';
import { Random } from 'meteor/random';

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
    let trips = this.generateTrips(props.match);
    let hotels = this.generateHotels(props.match);
    this.state = {
      match: props.match,
      chosenTripType: null,
      chosenTicketType: null,
      localizedString: this.props.localizedString.TripBookingStep,
      busTrips: trips[0],
      busTripsBack: trips[1],
      busTripsBackAfterHotel: trips[2],
      hotels: hotels,
      chosenBus: -1,
      chosenBusBack: -1,
      chosenHotel: -1,
      chosenBusPrice: 0,
      chosenBusBackPrice: 0,
      chosenHotelPrice: 0,
      chosenTicketPrice: 0,
      errorString: '',
      retourString: '',
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
    let price = 0;
    switch (value) {
      case '0':
        price = 80;
        break;
      case '1':
        price = 60;
        break;
      case '2':
        price = 40;
        break;
    }
    this.setState({ chosenTicketType: value , chosenTicketPrice: price });
  }

  generateBusTravel = (match, distance, hourBefore) => {
    let id = Random.id();
    let duree = (distance / 70) * 60 * 60 * 1000;
    let dateArrivee = match.date - (hourBefore * 3600 * 1000) - (10 * 60 * 1000);
    let dateDepart = dateArrivee - duree - (60 * 60 * 1000);
    let cityDepart = Meteor.user().profile.city;
    let cityArrivee = match.cityLocation;
    let prix = this.getRandomInt(5, 30);

    return {id, distance, duree, dateArrivee, dateDepart, cityDepart, cityArrivee, prix };
  }

  generateBackBusTravel = (match, distance, hourAfter) => {
    let id = Random.id();
    let duree = (distance / 70) * 60 * 60 * 1000;
    let dateDepart = match.date + (90 * 60 * 1000)  + (hourAfter * 3600 * 1000) + (10 * 60 * 1000);
    let dateArrivee = dateDepart + duree + (60 * 60 * 1000);
    let cityArrivee = Meteor.user().profile.city;
    let cityDepart = match.cityLocation;
    let prix = this.getRandomInt(5, 30);

    return { id, distance, duree, dateArrivee, dateDepart, cityDepart, cityArrivee, prix };
  }

  generateBackBusTravelAfterHotel = (match, distance, hourAfter) => {
    let id = Random.id();
    let duree = (distance / 70) * 60 * 60 * 1000;
    let dateDepart = match.date + (90 * 60 * 1000)  + ((hourAfter + 12) * 60 * 60 * 1000);
    let dateArrivee = dateDepart + duree + (60 * 60 * 1000);
    let cityArrivee = Meteor.user().profile.city;
    let cityDepart = match.cityLocation;
    let prix = this.getRandomInt(5, 30);

    return {id, distance, duree, dateArrivee, dateDepart, cityDepart, cityArrivee, prix };
  }

  generateTrips = (match) => {
    let distance = this.getRandomInt(100, 800);
    let trips = [[], [], []];
    for (let i = 0; i < 3; i++) {
        trips[0][i] = this.generateBusTravel(match, distance, i);
        trips[1][i] = this.generateBackBusTravel(match, distance, i);
        trips[2][i] = this.generateBackBusTravelAfterHotel(match, distance, i);
    }
    return trips;
  }

  generateHotel = (match) => {
    let id = Random.id();
    let hotelsNamesRef = ['Du Brisson', 'De La Roche', 'Caseneuve', 'De La Place Soleil', 'La Longue Marche', 'Paradis', 'La Fistinière'];
    let city = match.cityLocation;
    let stars = this.getRandomInt(1, 5);
    let prix = this.getRandomInt(20, 80) * ((stars + 1) / 2);
    let name = 'Hôtel ' + hotelsNamesRef[this.getRandomInt(0, 6)];

    return { id, city, stars, prix, name };
  }

  generateHotels = (match) => {
    let hotels = [];
    for (let i = 0; i < 3; i++) {
      hotels[i]= this.generateHotel(match);
    }
    return hotels;
  }

  getBackTrips = () => {
    if (this.state.chosenTripType === "0")
      return (
        <div>
          <div className="tripbookingstep-chosetype-title"> <p>{ this.state.localizedString.chosebusback }</p></div>
          { this.state.busTripsBack.map((trip) => {
            let active = (trip.id == this.state.chosenBusBack);
            return <BusBookingItem key={ trip.id } active={ active } trip={ trip } localizedString={ this.props.localizedString }
            parentHandler={ this.setBackBus }/>
          })}
        </div>
      )
    else if (this.state.chosenTripType === "1")
      return (
        <div>
          <div className="tripbookingstep-chosetype-title"> <p> { this.state.localizedString.chosebusback } </p> </div>
          { this.state.busTripsBackAfterHotel.map((trip) => {
            let active = (trip.id == this.state.chosenBusBack);
            return <BusBookingItem key={ trip.id } active={ active } trip={ trip } localizedString={ this.props.localizedString }
            parentHandler={ this.setBackBus }/>
          })}
        </div>
      )
    else
      return null;
  }

  getHotels = () => {
    if (this.state.chosenTripType === "1")
      return (
        <div>
          <div className="tripbookingstep-chosetype-title"> <p>{ this.state.localizedString.choseHotel }</p></div>
          { this.state.hotels.map((hotel) => {
            let active = (hotel.id == this.state.chosenHotel);
            return <HotelBookingItem key={ hotel.id } active={ active } hotel={ hotel } parentHandler={ this.setHotel }/>
          })}
        </div>
      )
  }

  setBus = (id, price) => {
    this.setState({ chosenBus: id, chosenBusPrice: price });
  }

  setBackBus = (id, price) => {
    this.setState({ chosenBusBack: id, chosenBusBackPrice: price  });
  }

  setHotel = (id, price) => {
    this.setState({ chosenHotel: id, chosenHotelPrice: price  });
  }

  book = () => {
    this.setState({ errorString: ''});
    if (this.state.chosenTripType === null) {
      this.setState({ errorString: this.state.localizedString.errorTrip });
      return;
    }
    if (this.state.chosenTicketType === null) {
      this.setState({ errorString: this.state.localizedString.errorTicket });
      return;
    }
    if (this.state.chosenBus === -1) {
      this.setState({ errorString: this.state.localizedString.errorBus });
      return;
    }
    if (this.state.chosenBusBack === -1) {
      this.setState({ errorString: this.state.localizedString.errorBusBack });
      return;
    }
    if (this.state.chosenTripType === "1" && this.state.chosenHotel === -1) {
      this.setState({ errorString: this.state.localizedString.errorHotel });
      return;
    }

    let trip = null;
    let tripback = null;
    let hotel = null;

    for (let tripI of this.state.busTrips) {
      if (tripI.id === this.state.chosenBus)
        trip = tripI;
    }
    for (let tripI of this.state.busTripsBack) {
      if (tripI.id === this.state.chosenBusBack)
        tripback = tripI;
    }
    for (let tripI of this.state.busTripsBackAfterHotel) {
      if (tripI.id === this.state.chosenBusBack)
        tripback = tripI;
    }
    for (let hotelI of this.state.hotels) {
      if (hotelI.id === this.state.chosenHotel)
        hotel = hotelI;
    }

    Meteor.call('user.setTrip', Meteor.userId(), trip, tripback, hotel);
    this.setState({ retourString: this.state.localizedString.retourOkay });

  }

  render() {
    let totalPrice = this.state.chosenTicketPrice + this.state.chosenBusPrice + this.state.chosenBusBackPrice + this.state.chosenHotelPrice;
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
          let active = (trip.id == this.state.chosenBus);
          return <BusBookingItem key={ trip.id} active={ active } trip={ trip } localizedString={ this.props.localizedString } parentHandler={ this.setBus }/>
        })}
        { this.getBackTrips() }
        { this.getHotels() }
        <div><p className="tripbookingstep-error"> { this.state.errorString } </p></div>
        <div><p className="tripbookingstep-retour"> { this.state.retourString } </p></div>
        <div className="tripbookingstep-submit" onClick={ this.book }> { this.state.localizedString.book + totalPrice + '€' } </div>
      </div>
    );
  }
}

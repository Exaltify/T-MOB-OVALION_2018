import React, { Component } from 'react';
import BusBookingItem from '../../Component/BusBookingItem/BusBookingItem'
import HotelBookingItem from '../../Component/HotelBookingItem/HotelBookingItem'
import dateParser from '../../../dateParser/dateParser';
import './MesVoyages.css';

export default class MesVoyages extends Component {

    constructor(props) {
        super(props);
        let trips;
        if (Meteor.user().profile.trips)
          trips = Meteor.user().profile.trips;
        else
          trips = [];
        this.state = {
          trips: trips,
          localizedString: this.props.localizedString.MesVoyages,
        }
    }

  componentWillReceiveProps(props) {
    this.setState({ localizedString: props.localizedString.MesVoyages });
  }

    render() {
        return ( (this.state.trips.length === 0) ?
          <div className="mesvoyages-master">
            <div><p className="mesvoyages-title"> { this.state.localizedString.notrips } </p></div>
          </div>
          :
          <div className="mesvoyages-master">
            { this.state.trips.map((tripFull) => {
              let trip = tripFull.trip;
              let tripback = tripFull.tripback;
              let hotel = tripFull.hotel;
              let date = dateParser.getDateString(trip.dateDepart, this.state.localizedString.localeIdentifier);
              return (
                ( hotel != null) ?
                <div className="mesvoyages-trip-container">
                  <div><p className="mesvoyages-title"> { date } </p> </div>
                  <div><p className="mesvoyages-title"> { this.state.localizedString.bus } </p></div>
                  <BusBookingItem key={ trip.id } active={ false } trip={ trip } localizedString={ this.props.localizedString } parentHandler={() => false }/>
                  <div><p className="mesvoyages-title"> { this.state.localizedString.busback } </p></div>
                  <BusBookingItem key={ tripback.id } active={ false } trip={ tripback } localizedString={ this.props.localizedString } parentHandler={() => false }/>
                  <div><p className="mesvoyages-title"> { this.state.localizedString.hotel } </p></div>
                  <HotelBookingItem key={ hotel.id } active={ false } hotel={ hotel } parentHandler={ () => false }/>
                </div>
              :
                  <div className="mesvoyages-trip-container">
                    <div><p className="mesvoyages-title"> { date } </p> </div>
                    <div><p className="mesvoyages-title"> { this.state.localizedString.bus } </p></div>
                    <BusBookingItem key={ trip.id } active={ false } trip={ trip } localizedString={ this.props.localizedString } parentHandler={() => false }/>
                    <div><p className="mesvoyages-title"> { this.state.localizedString.busback } </p></div>
                    <BusBookingItem key={ tripback.id } active={ false } trip={ tripback } localizedString={ this.props.localizedString } parentHandler={() => false }/>
                  </div>
              )
            })}

          </div>
        );
    }
}

import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendrier.css';
import dateParser from '../../../dateParser/dateParser';

import globalize from 'globalize'
import dbMatch from "../../../api/model/modelMatch";
import dbTeam from "../../../api/model/modelTeam";
import { withTracker } from 'meteor/react-meteor-data';
import Popup from "../../Component/Popup/Popup"
import TripBookingStep from "../TripBookingStep/TripBookingStep";

//import Popup from 'reactjs-popup'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.


//require('globalize/lib/cultures/globalize.culture.fr')

const momentLocalizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Calendrier extends Component {

  getTeamFromId = (teamId) => {
    let teams =  dbTeam.find({}).fetch();
    for (let team of teams) {
      if (team._id === teamId)
        return team;
    }
    return null;
  }

  Event({ event }) {

    return (
      <div className="calendar-item">
        <div className="calendar-item-logo"><img src={event.home.logoSrc} /></div>
        <div className="calendar-item-logo"><img src={event.away.logoSrc} /></div>

      </div>
    )
  }

  EventAgenda({ event }) {
    let current = Date.now();
    let date = event.match.date;

    let userTeam = Meteor.user().profile.team;
    let userTeamMatch;

    if (userTeam === event.home._id)
      userTeamMatch = event.home._id;
    if (userTeam === event.away._id)
      userTeamMatch = event.away._id;


    return (
      <div className='popup_inner'>
        <div className="popup-container">
          <div className="team-formater popup-team">
            <div className="popup-logo">
              <img src={ event.home.logoSrc } />
            </div>
            <div><p>{ event.home.name }</p></div>
          </div>

          {current > date ?
            <div className="popup-versus">

              {userTeamMatch ?
                <div>

                  {event.match.result[0] > event.match.result[1] ?
                    <div>
                      {userTeamMatch === event.home._id ?
                        <div className="green"><b>{event.match.result[0]}</b> - {event.match.result[1]}</div>
                        :
                        <div className="red"><b>{event.match.result[0]}</b> - {event.match.result[1]}</div>
                      }

                    </div>
                    :
                    <div>

                      {userTeamMatch === event.away._id ?
                        <div className="green">{event.match.result[0]} - <b>{event.match.result[1]}</b></div>
                        :
                        <div className="red">{event.match.result[0]} - <b>{event.match.result[1]}</b></div>
                      }


                    </div>

                  }

                </div>

                :
                <div>{event.match.result[0]} - {event.match.result[1]}</div>
              }


              <p>{dateParser.getDateEvent(event.match.date, 'Fr')}</p>
              <p>{event.match.cityLocation}</p>

            </div>
            :
            <div className="popup-versus">
              <p>XX - YY</p>

              <p>{dateParser.getDateEvent(event.match.date, 'Fr')}</p>
              <p>{event.match.cityLocation}</p>

            </div>

          }



          <div className="team-formater popup-team">
            <div className="popup-logo">
              <img src={ event.away.logoSrc } />
            </div>
            <div><p>{ event.away.name }</p></div>
          </div>
        </div>

        {current < date ?
          <button className="popup-button-reserver" onClick={this.toggleReservation.bind(this, event.match)}>Reserver</button>
          :
          null
        }

      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      localizer: momentLocalizer,
      localizedString: this.props.localizedString.Calendar,
      matchs: this.props.matchs,
      teams: this.props.teams,
      events: this.getTeamMatches(props.matchs),
      showPopup: false,
      popupInfo: {},
      reservationOn: false,
      currentMatch: {},
    }
  }

  toggleReservation(match){
    this.setState({ reservationOn: !this.state.reservationOn, currentMatch: match });
  }

  togglePopup(event) {
    this.setState({
      showPopup: !this.state.showPopup,
      popupInfo: event,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({ localizedString: props.localizedString.Calendar })
  }

  filterMatchByTeam = (match) => {
    let userTeam = Meteor.user().profile.team;
    return userTeam === 0 ? true : (userTeam === match.homeTeam || userTeam === match.awayTeam);
  }

  getTeamMatches = (matchs) => {
    let events = [];
    matchs.filter(this.filterMatchByTeam).map((match) => {
      let event = {
        allDay: false,
        start:  new Date(dateParser.getDateEvent(match.date, 'En')),
        end: new Date(dateParser.getDateEvent(match.date + 90*60*1000, 'En')),
        title: 'Un match',
        match: match,
        away: this.getTeamFromId(match.awayTeam),
        home: this.getTeamFromId(match.homeTeam),
      }
      events.push(event);
    })
    return events
  }

  getComponent = () => {
    return this.state.reservationOn ?
      (
        <div>
          <div className="popup-button-reserver button-retour" onClick={this.toggleReservation.bind(this, this.state.currentMatch)}>retour</div>
          <TripBookingStep localizedString={ this.props.localizedString } match={ this.state.currentMatch } />
        </div>
      )
    :
    (
      <div className="calendar-master">
        <BigCalendar
          localizer={this.state.localizer}
          messages={this.state.localizedString}
          events={this.state.events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={event => this.togglePopup(event)}
          components={{
            event: this.Event,
            agenda: {
              event: this.EventAgenda.bind(this),
            },
          }}
        />

        {this.state.showPopup ?
          <Popup
            closePopup={this.togglePopup.bind(this)}
            popupInfo={this.state.popupInfo}
            toggleReservation={this.toggleReservation.bind(this)}
          />
          : null
        }
      </div>
    );
  }


  render() {
    return (
      this.getComponent()
    )
  }
}

export default withTracker((props) => {
  const subscriptionMatches = Meteor.subscribe('matchs');
  const subscriptionTeams = Meteor.subscribe('teams');

  return {
    loading: !subscriptionMatches.ready() || !subscriptionTeams.ready(),
    matchs: dbMatch.find({}).fetch(),
    teams: dbTeam.find({}).fetch(),
    props,
  };
})(Calendrier);

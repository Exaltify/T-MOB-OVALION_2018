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

import Popup from 'reactjs-popup'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.


//require('globalize/lib/cultures/globalize.culture.fr')

const momentLocalizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer



class Calendrier extends Component {

  Event({ event }) {
    return (
      <span>
      <strong>{event.match.homeTeam} VS {event.match.awayTeam}</strong>

    </span>
    )
  }

  EventAgenda({ event }) {
    return (
      <span>
      <em>{event.title}</em>
      <p>{event.desc}</p>
    </span>
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      localizer: momentLocalizer,
      localizedString: this.props.localizedString.Calendar,
      matchs: this.props.matchs,
      teams: this.props.teams,
      events: this.getTeamMatches(props.matchs),
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ localizedString: props.localizedString.Calendar })
  }

  handleSelect(event){
    console.log(event);
  }

  getTeamFromId = (teamId) => {
    for (let team of this.state.teams) {
      if (team._id === teamId)
        return team;
    }
    return null;
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
      }
      events.push(event);
    })
    return events
  }


  render() {
    return (
      <div className="calendar-master">
        <BigCalendar
          localizer={this.state.localizer}
          messages={this.state.localizedString}
          events={this.state.events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={event => this.handleSelect(event)}
          components={{
            event: this.Event,
            agenda: {
              event: this.EventAgenda,
            },
          }}
        />
      </div>
        );
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

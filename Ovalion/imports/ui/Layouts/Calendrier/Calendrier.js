import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendrier.css';

import globalize from 'globalize'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.


//require('globalize/lib/cultures/globalize.culture.fr')

const momentLocalizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer




export default class Calendrier extends Component {

  constructor(props) {
    super(props);
    this.state = {
      localizer: momentLocalizer,
      localizedString: this.props.localizedString.Calendar,
      events: [
        {
          end: new Date('November 14, 2018 11:13:00'),
          start: new Date('November 13, 2018 11:13:00'),
          title: 'Event1',
        },
      ],
    }
  }

  componentWillReceiveProps(props) {
    console.log(props);
    this.setState({ localizedString: props.localizedString.Calendar })
  }

  handleSelect(event){
    console.log(event);
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
        />
      </div>
        );
    }
}

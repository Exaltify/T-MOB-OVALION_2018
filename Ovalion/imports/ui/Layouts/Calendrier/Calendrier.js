import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const momentLocalizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

export default class Calendrier extends Component {

  constructor(props) {
    super(props);
    this.state = {
      localizer: momentLocalizer,
      events: [],
    }
  }

  render() {
    return (
      <div>
        <BigCalendar
          localizer={this.state.localizer}
          events={this.state.events}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
        );
    }
}

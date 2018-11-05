import React, { Component } from 'react';
import dbMatch from '../../../api/model/modelMatch';
import { withTracker } from 'meteor/react-meteor-data'
import './Reserver.css';
import MatchBookingItem from '../../Component/MatchBookingItem/MatchBookingItem';
import dbTeam from '../../../api/model/modelTeam'

let bookingSteps = {
  'CHOSE_MATCH': 0,
  'CHOSE_TRIP': 1,
  'PAYMENT': 2,
}

class Reserver extends Component {

  constructor(props) {
    super(props);

    this.state = {
      matchs: props.matchs,
      teams: props.teams,
      step: bookingSteps.CHOSE_MATCH,
      localizedString : props.localizedString.Reserver,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ matchs: props.matchs, teams: props.teams, localizedString: props.localizedString.Reserver });
  }

  filterMatchByTeam = (match) => {
    let userTeam = Meteor.user().profile.team;
    return userTeam === 0 ? true : (userTeam === match.homeTeam || userTeam === match.awayTeam);
  }

  sortMatchByDate = (matchA, matchB) => (matchA.date > matchB.date) ? -1 : ((matchA.date < matchB.date) ? 1 : 0);

  filterMatchByDate = (match) => {
    let dateMatch = new Date(match.date);
    dateMatch.setMonth(dateMatch.getMonth() - 1);
    return dateMatch.getTime() < Date.now() && match.date > Date.now();
  }

  getHeaderTitle = () => {
    switch(this.state.step) {
      case bookingSteps.CHOSE_MATCH:
        return this.state.localizedString.choseMatch;
      case bookingSteps.CHOSE_TRIP:
        return this.state.localizedString.choseTrip;
      case bookingSteps.PAYMENT:
        return this.state.localizedString.payment;
    }
  }

  getTeam = (teamId) => {
    return this.state.teams.filter((team) => team._id === teamId)[0];
  }

  getComponent = () => {
    switch(this.state.step) {
      case bookingSteps.CHOSE_MATCH:
        return (
          <div>
            <div className="reserver-matchbooking-header-master">
              <div className="reserver-matchbooking-header-date">
                <p className="reserver-matchbooking-header-label">DATE</p>
              </div>
              <div className="reserver-matchbooking-header-team">
                <p className="reserver-matchbooking-header-label">{ this.state.localizedString.home }</p>
              </div>
              <div className="reserver-matchbooking-header-team">
                <p className="reserver-matchbooking-header-label">{ this.state.localizedString.away }</p>
              </div>
            </div>
          { this.state.matchs.filter(this.filterMatchByTeam).filter(this.filterMatchByDate).sort(this.sortMatchByDate).map((match) => {
              let teams = [];
              teams[0] = this.getTeam(match.homeTeam);
              teams[1] = this.getTeam(match.awayTeam);

              return <MatchBookingItem
                key={ match._id }
                match={ match }
                teams= { teams }
                localizedString={ this.props.localizedString }
              />
          })}
          </div>
        );
      case bookingSteps.CHOSE_TRIP:
        return null;
      case bookingSteps.PAYMENT:
        return null;
    }
  }

  render() {
      return (
        <div className="reserver-master">
          <div className="reserver-header">
            <p> { this.getHeaderTitle() }</p>
          </div>
          { this.getComponent() }
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
})(Reserver);

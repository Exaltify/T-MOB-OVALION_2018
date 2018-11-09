import React, { Component } from 'react';
import './MatchHistoryItem.css';
import dateParser from '../../../dateParser/dateParser';

export default class MatchHistoryItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      match: props.match,
      teams: props.teams,
      localizedString: props.localizedString.MatchHistoryItem,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ match: props.match, teams: props.teams, localizedString: props.localizedString.MatchHistoryItem });
  }

  render() {
    let dateStr = dateParser.getDateString(this.state.match.date, this.state.localizedString.localeIdentifier);
    return (
      <div className='matchhistoryitem-master'>
        <div className="matchhistoryitem-date"><p> { dateStr } </p></div>
        <div className="team-formater">
          <div className="matchhistoryitem-logo-container">
            <img className="matchhistoryitem-logo" src={ this.state.teams[0].logoSrc } />
          </div>
          <div className="matchhistoryitem-name"><p>{ this.state.teams[0].name }</p></div>
        </div>
        <div className="matchhistoryitem-score"><p>{ this.state.match.result[0] + ' - ' + this.state.match.result[1] }</p> </div>
        <div className="team-formater">
          <div className="matchhistoryitem-logo-container">
            <img className="matchhistoryitem-logo" src={ this.state.teams[1].logoSrc } />
          </div>
          <div className="matchhistoryitem-name"><p>{ this.state.teams[1].name }</p></div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import './MatchBookingItem.css';
import dateParser from '../../../dateParser/dateParser';

export default class MatchBookingItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      match: props.match,
      teams: props.teams,
      localizedString: props.localizedString.MatchBookingItem,
      expanded: false,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ match: props.match, teams: props.teams, localizedString: props.localizedString.MatchBookingItem });
  }

  expand = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    let dateStr = dateParser.getDateStringWithTime(this.state.match.date, this.state.localizedString.localeIdentifier);
    if (!this.state.expanded) {
      return (
        <div className='matchbookingitem-master' onClick={ this.expand }>
          <div className="matchbookingitem-date"><p> {dateStr} </p></div>
          <div className="matchbookingitem-logo-container">
            <img className="matchbookingitem-logo" src={this.state.teams[0].logoSrc}/>
          </div>
          <div className="matchbookingitem-team"><p>{this.state.teams[0].name}</p></div>
          <div className="matchbookingitem-separator" />
          <div className="matchbookingitem-team"><p>{this.state.teams[1].name}</p></div>
          <div className="matchbookingitem-logo-container">
            <img className="matchbookingitem-logo" src={this.state.teams[1].logoSrc}/>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className='matchbookingitem-master matchbookingitem-master-expanded'>
          <div className="matchbookingitem-date-expanded"><p> {dateStr} </p></div>
          <div className="matchbookingitem-row-expanded">
            <p>{ this.state.localizedString.hometeam + ': '}</p>
            <p>{ this.state.teams[0].name }</p>
            <img className="matchbookingitem-logo-expanded" src={this.state.teams[0].logoSrc}/>
          </div>
          <div className="matchbookingitem-row-expanded">
            <p>{ this.state.localizedString.awayteam + ': '}</p>
            <p>{ this.state.teams[1].name }</p>
            <img className="matchbookingitem-logo-expanded" src={this.state.teams[1].logoSrc}/>
          </div>
          <div className="matchbookingitem-row-expanded">
            <p>{ this.state.localizedString.stade + ': '}</p>
            <p>{ 'Stade ' + this.state.teams[0].stadiumName }</p>
          </div>
          <span className="matchbookingitem-button" onClick={(event) => event.preventDefault()}>{ this.state.localizedString.chose }</span>
          <img className="matchbookingitem-icon" src="assets/icons/expand_less.svg" onClick={ this.expand } />
        </div>
      );
    }
  }
}

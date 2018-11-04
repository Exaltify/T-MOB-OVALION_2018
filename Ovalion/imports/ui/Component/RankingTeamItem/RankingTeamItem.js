import React, { Component } from 'react';
import './RankingTeamItem.css';

export default class RankingTeamItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      team: props.team,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ team: props.team });
  }

  setContent = () => {
    this.state.setContent(this.state.contentCode);
  }

  render() {
    return (
      <div className='rankingteamitem-master'>
        <div className="rankingteamitem-logo-container">
          <img className="rankingteamitem-logo" src={ this.state.team.logoSrc } />
        </div>
        <p className="rankingteamitem-name">{ this.state.team.name }</p>
        <p className="rankingteamitem-score">{ this.state.team.score }</p>
      </div>
    );
  }
}

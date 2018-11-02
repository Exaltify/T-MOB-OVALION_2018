import React, { Component } from 'react';
import './TeamContainer.css';
import { Meteor } from "meteor/meteor"

export default class TeamContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.team.name,
      logoSrc: this.props.team.logoSrc,
      city: this.props.team.city,
      score: this.props.team.score,
      onClickFn: this.props.onClickFn,
      showScore: this.props.showScore,
      active: this.props.active,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ team: props.team, showScore: props.showScore, active: props.active });
  }


  render() {
    let teamContainerCssClass = this.state.active ? "team-container-master team-container-active" : "team-container-master";
    return (
      <div className={teamContainerCssClass} onClick={ this.state.onClickFn }>
        <img className="team-container-logo" src={ this.state.logoSrc } />
        <p className="team-container-name"> { this.state.name } </p>
        <p className="team-container-city"> { this.state.city } </p>
        { this.state.showScore ? <p className="team-container-score"> Score: { this.state.score } </p> : '' }
      </div>
    );
  }

}

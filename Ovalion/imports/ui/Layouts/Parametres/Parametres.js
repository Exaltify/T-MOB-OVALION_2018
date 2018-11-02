import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import dbTeam from '../../../api/model/modelTeam'
import TeamContainer from '../../Component/TeamContainer/TeamContainer'
import './Parametres.css';
import Switch from "react-switch";

class Parametres extends Component {

    constructor(props) {
      super(props);
      this.state = {
        teams: this.props.teams,
        localizedString: this.props.localizedString.Parametres,
        userId: Meteor.userId(),
        team: this.getMyTeam(),
        checked: false,
      }
    }

    componentWillReceiveProps(props) {
      this.setState({ teams: props.teams, localizedString: props.localizedString.Parametres, team: this.getMyTeam() });
    }

    setUserTeam = (teamId) => {
      if (!this.state.userId) {
        this.setState({ userId: Meteor.userId() }, this.setUserTeam(teamId));
        return;
      }
      Meteor.call('user.setTeam', this.state.userId, teamId, this.setState.bind(this, ({ team: this.getMyTeam(teamId)})));
    }

    getMyTeam = (pTeamId) => {
      let teamId = (pTeamId) ? pTeamId : Meteor.user().profile.team;
      console.log(teamId);
      if (teamId === -1)
        return false;
      for (let team of this.props.teams) {
        if (team._id === teamId)
          return team;
      }
      this.render();
    }

    handleChange = () => {
      this.setState({ checked: !this.state.checked });
    }

    render() {
        let team = this.state.team;
        return (
          <div className="parameter-master">
            <p>{ this.state.localizedString.title }</p>
            <label htmlFor="material-switch">
              <span>Suivre toutes les équipes</span>
              <Switch
                checked={this.state.checked}
                onChange={this.handleChange}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch"
                id="material-switch"
              />
            </label>
            <div className="parameter-team-container">
            {
              this.state.teams.map( ( iTeam ) => {
                if (team && team._id === iTeam._id) {
                  return <TeamContainer key={iTeam._id}
                                        team={iTeam}
                                        showScore={false}
                                        onClickFn={this.setUserTeam.bind(this, iTeam._id)}
                                        active={true}
                  />
                }
                else
                {
                  return <TeamContainer key={iTeam._id}
                                        team={iTeam}
                                        showScore={false}
                                        onClickFn={this.setUserTeam.bind(this, iTeam._id)}
                                        active={false}
                  />
                }
              })
            }
            </div>
          </div>
        );
    }
}

export default withTracker((props) => {
  const subscription = Meteor.subscribe('teams');

  return {
    loading: !subscription.ready(),
    teams: dbTeam.find({}).fetch(),
    props,
  };
})(Parametres);

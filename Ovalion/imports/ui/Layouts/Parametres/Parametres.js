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
        checked: this.getMyTeam() === false,
      }
    }

    componentWillReceiveProps(props) {
      this.setState({ teams: props.teams, localizedString: props.localizedString.Parametres, team: this.getMyTeam(), checked: this.getMyTeam() === false });
    }

    setUserTeam = (teamId) => {
      if (!this.state.userId) {
        this.setState({ userId: Meteor.userId() }, this.setUserTeam(teamId));
        return;
      }
      if (teamId === 0)
        this.setState({ checked: true });
      else
        this.setState({ checked: false });
      Meteor.call('user.setTeam', this.state.userId, teamId, this.setState.bind(this, ({ team: this.getMyTeam(teamId)})));
    }

    getMyTeam = (pTeamId) => {
      let teamId = (pTeamId !== undefined) ? pTeamId : Meteor.user().profile.team;
      if (teamId === 0)
        return false;
      else if (teamId === -1)
        return null;
      for (let team of this.props.teams) {
        if (team._id === teamId)
          return team;
      }
    }

    handleChange = () => {
      this.setState({ checked: !this.state.checked }, () => {
        if (this.state.checked)
          this.setUserTeam(0);
        else
          this.setUserTeam(-1);
      });
    }

    render() {
        let team = this.state.team;
        let followString;
        if (team === null) {
          followString = this.state.localizedString.noFollow + '.';
        }
        else if (team === false) {
          followString = this.state.localizedString.follow +  ' ' + this.state.localizedString.allteams;
        }
        else {
          followString = this.state.localizedString.follow + ' ' + this.state.team.name;
        }
        return (
          <div className="parameter-master">
            <p className="parameter-follow-string">{ followString } </p>
            <p className="parameter-title">{ this.state.localizedString.title }</p>
            <div className="parameter-switch-container">
              <span className="parameter-switch-label">{ this.state.localizedString.followAll }</span>
              <Switch
                checked={this.state.checked}
                onChange={this.handleChange}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={15}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={25}
                width={54}
                className="react-switch"
                id="material-switch"
              />
            </div>
            <div className="parameter-team-container">
            {
              this.state.teams.map( ( iTeam ) => {
                if ((team && team._id === iTeam._id) || team === false) {
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

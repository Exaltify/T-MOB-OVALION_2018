import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import dbTeam from '../../../api/model/modelTeam'
import TeamContainer from '../../Component/TeamContainer/TeamContainer'
import './Parametres.css';

class Parametres extends Component {

    constructor(props) {
      super(props);
      this.state = {
        teams: this.props.teams,
      }
    }

    setUserTeam = (name) => {

    }

    render() {
        return (
          <div className="parameter-master">
            <div className="parameter-team-container">
            {
              this.state.teams.map( ( iTeam ) => {
                return <TeamContainer key={ iTeam.id } team={ iTeam } showScore={ false } onClickFn = { this.setUserTeam.bind(this, iTeam.name) } />
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

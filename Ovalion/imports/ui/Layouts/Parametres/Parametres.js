import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import dbTeam from '../../../api/model/modelTeam'

class Parametres extends Component {

    constructor(props) {
      super(props);
    }

    render() {
        return (
            <div className="global-content-container">PARAMETRES</div>
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

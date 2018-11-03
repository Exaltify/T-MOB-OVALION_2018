import React, { Component } from 'react';
import dbMatch from '../../../api/model/modelMatch'
import { withTracker } from 'meteor/react-meteor-data';
import './MonEquipe.css';

let tabs = {
  CLASSEMENT: 0,
  HISTORIQUE: 1,
  EQUIPE: 2,
}

class MonEquipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      matchs: this.props.matchs,
      localizedString: this.props.localizedString.MonEquipe,
      currentTab: tabs.CLASSEMENT,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ matchs: props.matchs, localizedString: props.localizedString.MonEquipe });
  }

  setCurrentTab = (tabIndex) => {
    this.setState({ currentTab: tabIndex });
  }

  render() {
    let rankingCssClassName = (this.state.currentTab === tabs.CLASSEMENT) ? "monEquipe-tab tab-active" : "monEquipe-tab";
    let historyCssClassName = (this.state.currentTab === tabs.HISTORIQUE) ? "monEquipe-tab tab-active" : "monEquipe-tab";
    let teamCssClassName = (this.state.currentTab === tabs.EQUIPE) ? "monEquipe-tab tab-active" : "monEquipe-tab";
    return (
          <div className="monEquipe-master">
            <div className="monEquipe-tabs-master">
              <div className={rankingCssClassName} onClick={this.setCurrentTab.bind(this, tabs.CLASSEMENT)} >
                { this.state.localizedString.rank }
              </div>
              <div className={historyCssClassName} onClick={this.setCurrentTab.bind(this, tabs.HISTORIQUE)} >
                { this.state.localizedString.history }
              </div>
              <div className={teamCssClassName} onClick={this.setCurrentTab.bind(this, tabs.EQUIPE)} >
                { this.state.localizedString.equipe }
              </div>
            </div>
          </div>
      );
  }
}

export default withTracker((props) => {
  const subscription = Meteor.subscribe('matchs');

  return {
    loading: !subscription.ready(),
    matchs: dbMatch.find({}).fetch(),
    props,
  };
})(MonEquipe);

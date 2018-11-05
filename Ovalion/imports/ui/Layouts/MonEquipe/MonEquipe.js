import React, { Component } from 'react';
import dbMatch from '../../../api/model/modelMatch';
import dbTeam from '../../../api/model/modelTeam';
import { withTracker } from 'meteor/react-meteor-data';
import './MonEquipe.css';
import RankingTeamItem from '../../Component/RankingTeamItem/RankingTeamItem'
import MatchHistoryItem from '../../Component/MatchHistoryItem/MatchHistoryItem'

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
      teams: this.props.teams,
      localizedString: this.props.localizedString.MonEquipe,
      currentTab: tabs.CLASSEMENT,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ matchs: props.matchs, teams: props.teams, localizedString: props.localizedString.MonEquipe });
  }

  setCurrentTab = (tabIndex) => {
    this.setState({ currentTab: tabIndex });
  }

  getTeamFromId = (teamId) => {
    for (let team of this.state.teams) {
      if (team._id === teamId)
        return team;
    }
    return null;
  }

  sortMatchByDate = (matchA, matchB) => (matchA.date > matchB.date) ? -1 : ((matchA.date < matchB.date) ? 1 : 0);

  filterMatchByTeam = (match) => {
    let userTeam = Meteor.user().profile.team;
    return userTeam === 0 ? true : (userTeam === match.homeTeam || userTeam === match.awayTeam);
  }

  filterMatchByDate = (match) => match.date < Date.now();

  sortTeamByScore = (teamA, teamB) => (teamA.score > teamB.score) ? -1 : ((teamA.score < teamB.score) ? 1 : 0);

  getCurrentTab = () => {
    if (Meteor.user().profile.team === -1)
      return (<div><p>{ this.state.localizedString.noteam }</p></div>);

    switch (this.state.currentTab) {
      case tabs.CLASSEMENT:
        return (
          <div>
            { this.state.teams.sort(this.sortTeamByScore).map((team) => {
              return <RankingTeamItem key={ team._id } team={ team }/>
            })}
          </div>
        )
        break;
      case tabs.HISTORIQUE:
        return (
          <div>
            <div className="monEquipe-history-header-master">
              <div className="monEquipe-history-header-date">
                <p className="monEquipe-history-header-label">DATE</p>
              </div>
              <div className="monEquipe-history-header-team">
                <p className="monEquipe-history-header-label">{ this.state.localizedString.home }</p>
              </div>
              <div className="monEquipe-history-header-score">
                <p className="monEquipe-history-header-label">SCORE</p>
              </div>
              <div className="monEquipe-history-header-team">
                <p className="monEquipe-history-header-label">{ this.state.localizedString.away }</p>
              </div>
            </div>

            { this.state.matchs.filter(this.filterMatchByDate).filter(this.filterMatchByTeam).sort(this.sortMatchByDate).map((match) => {
                let teamHome = this.getTeamFromId(match.homeTeam);
                let teamAway = this.getTeamFromId(match.awayTeam);

                return <MatchHistoryItem
                  key={ match._id }
                  match={match}
                  teams={ [teamHome, teamAway] }
                  localizedString={ this.props.localizedString }
                />
            })}
          </div>
        )
        break;
      case tabs.EQUIPE:
        break;
      default:
        return null;
        break;
    }
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
            { this.getCurrentTab() }
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
})(MonEquipe);

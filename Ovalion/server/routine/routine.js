import modelMatch from '../../imports/api/model/modelMatch';
import modelTeam from '../../imports/api/model/modelTeam';

let updateTeamScore = () => {

  let matchs = modelMatch.find().fetch();

  for (let match of matchs) {
    if (match.scoreCounted || (match.date > Date.now()))
      continue;
    let points = match.result[0] === match.result[1] ? 1 : 2;

    if (points === 1) {
      modelTeam.update({_id: match.homeTeam }, { $inc: { score: points }});
      modelTeam.update({_id: match.awayTeam }, { $inc: { score: points }});
    }
    else if (points === 2) {
      let winner = match.result[0] > match.result[1] ? match.homeTeam : match.awayTeam;
      modelTeam.update({ _id: winner }, { $inc: { score: points }});
    }

    modelMatch.update(match._id, { $set: { scoreCounted: true }});
  }
}

let routine = () => {
  updateTeamScore();

  console.log('Routine done at ' + new Date(Date.now()).toString());
}

let init = () => {
  routine();
  Meteor.setInterval(routine, 5 * 60 * 1000);
}

export default init;

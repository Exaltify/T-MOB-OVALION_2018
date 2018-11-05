import modelMatch from '../../../imports/api/model/modelMatch';
import modelTeam from '../../../imports/api/model/modelTeam';

let doInsert = false;
let deleteBeforeInsert = false;

let refIdTeams = modelTeam.find().fetch().map((team) => team._id);

let getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let getRandomTeamsId = () => {
  let homeTeamId = refIdTeams[getRandomInt(0, refIdTeams.length)];
  let awayTeamId = '';

  do {
    awayTeamId = refIdTeams[getRandomInt(0, refIdTeams.length)];
  } while (homeTeamId === awayTeamId)

  return [homeTeamId, awayTeamId];

}

let randomResult = () => {
  let totalScore = getRandomInt(30, 90);
  let scHome = getRandomInt(0, totalScore);
  let scAway = totalScore - scHome;

  if ((scHome % 3 === 0 || scHome % 5 === 0 || scHome % 8 === 0)
    && (scAway % 3 === 0 || scAway % 5 === 0 || scAway % 8 === 0)) {

    return [scHome, scAway];

  }

  return randomResult();
}

if (doInsert) {

  if (deleteBeforeInsert)
    modelMatch.remove({});

  let possibleHours = ['19', '20', '21', '22'];
  let possibleMins = ['00', '15', '30', '45'];

  for (let i = 0; i < 20; i++) {
    let dateStr = '12/';
    dateStr += getRandomInt(1, 30).toString() + '/';
    dateStr += '2018 ';
    dateStr += possibleHours[getRandomInt(0, 3)] + ':';
    dateStr += possibleMins[getRandomInt(0, 3)] + ':00';
    let datetimestamp = Date.parse(dateStr);

    let result = randomResult();

    let teams = getRandomTeamsId();

    let homeCity = modelTeam.find({_id: teams[0]}).fetch()[0];

    let cityLocation = homeCity.city;

    let stadiumName = homeCity.stadiumName;

    let match = {
      homeTeam: teams[0],
      awayTeam: teams[1],
      date: datetimestamp,
      result: result,
      cityLocation: cityLocation,
      stadiumName: stadiumName,
      scoreCounted: false,
    };

    modelMatch.insert(match);
  }
}

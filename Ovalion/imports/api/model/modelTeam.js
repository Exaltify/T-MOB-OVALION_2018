import { Mongo } from 'meteor/mongo';

const modelTeam = new Mongo.Collection('Team');

const modelTeamSchema = new SimpleSchema({
  name: { type: String },
  logoSrc: { type: String },
  city: { type: String },
  score: { type: Number },
});

modelTeam.schema = modelTeamSchema;

export default modelTeam;

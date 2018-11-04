import { Mongo } from 'meteor/mongo';

const modelmatch = new Mongo.Collection('Match');

const modelmatchSchema = new SimpleSchema({
  homeTeam: { type: String },
  awayTeam: { type: String },
  date: { type: Number },
  result: { type: [Number] },
  cityLocation: { type: String },
  stadiumName: { type: String },
  scoreCounted: { type: Boolean },
});

modelmatch.schema = modelmatchSchema;

export default modelmatch;

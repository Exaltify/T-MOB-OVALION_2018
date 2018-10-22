/* eslint-disable curly */
import { Meteor } from 'meteor/meteor';
import dbMatch from './model/modelMatch';
import dbTeam from './model/modelTeam';
import { createAdminAccount } from './accounts'
import createAccount from './accounts'

if (Meteor.isServer) {

  Meteor.publish('match', () => [
    dbMatch.find(),
  ]);

  Meteor.publish('team', () => [
    dbTeam.find(),
  ])
}

Meteor.methods({

  /****** MATCH ******/

  'dbMatch.insert': (newMatch) => {
    console.log('inserting new match ...');
    try {
      dbMatch.insert(newMatch);
    } catch (e) {
      console.error('failed match insert :');
      console.log(e);
      console.log('------ when trying to insert : ----------');
      console.log(newMatch);
    }
  },

  /****** TEAM ******/

  'dbTeam.insert': (newTeam) => {
    console.log('inserting new team ...');
    try {
      dbTeam.insert(newTeam);
    } catch (e) {
      console.error('failed team insert :');
      console.log(e);
      console.log('------ when trying to insert : ----------');
      console.log(newTeam);
    }
  },


  /****** USER  ******/

  'user.isAdmin': (userId) => {
    const user = Meteor.users.findOne({ _id: userId });
    return user.admin && user.admin === 1;
  },

  'users.getAll': () => {
    const users = Meteor.users.find({}).fetch();
    return users;
  },

  'user.insert': (admin, mail, password, city) => {
    console.log(password);
    if (admin === 1)
      createAdminAccount(mail, password);
    else
      createAccount(mail, password, city);
  },

  'user.delete': (userId) => {
    Meteor.users.remove({_id: userId});
  },

});

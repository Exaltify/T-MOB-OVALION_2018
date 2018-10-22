/* eslint-disable max-len */
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const trimInput = val => val.replace(/^\s*|\s*$/g, '');

const createAccount = (mail, password, city) => {
  const email = trimInput(mail);

  const id = Accounts.createUser({
    email, password, city, team: -1,
  });

  if (!id) console.log('Error creating user');
  else {
    console.log('User inserted !');
    const user = Meteor.users.find(id).fetch();
    console.log(user);
  }

};

export const createAdminAccount = (mail, password) => {
  const email = trimInput(mail);
  const id = Accounts.createUser({
    email, password, admin: 1,
  });
  if (!id) { console.log('Error creating admin user'); } else {
    console.log('Admin user inserted !');
    const user = Meteor.users.find(id).fetch();
    console.log(user);
  }
}

export const deleteAllAccounts = () => {
  Accounts.users.remove({});
};

Accounts.onCreateUser((options, pUser) => {
  const user = pUser;
  user.profile = options.profile || {};
  if (options.admin && options.admin === 1) {
    user.admin = 1;
    return user;
  }
  user.admin = 0;
  user.profile.city = options.city;
  user.profile.team = options.team;
  return user;
});

export default createAccount;

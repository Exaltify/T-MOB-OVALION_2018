import { Meteor } from 'meteor/meteor';
import '../imports/startup/serverStartup';
import './dataGen/importDataGen';

import initRoutine from './routine/routine';

Meteor.startup(() => {
  initRoutine();
});

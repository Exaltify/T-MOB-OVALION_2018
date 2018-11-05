let getFrDateString = (timeStamp) => {
  let dayStr = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  let dayRef = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  let monthStr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août',
    'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  let monthRef = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let date = new Date(timeStamp).toString();
  let splitted = date.split(' ');
  let day = dayStr[dayRef.indexOf(splitted[0])];
  let dayNumber = splitted[2];
  if (dayNumber[0] === '0') {
    dayNumber = dayNumber[1];
  }
  let month = monthStr[monthRef.indexOf(splitted[1])];

  return day + ' ' + dayNumber + ' ' + month;
}

let getEnDateString = (timeStamp) => {

}

let getEnDateEvent = (timeStamp) => {
  let dayStr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let dayRef = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  let monthStr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguste',
    'September', 'October', 'November', 'December'];
  let monthRef = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let date = new Date(timeStamp).toString();
  let splitted = date.split(' ');
  let day = dayStr[dayRef.indexOf(splitted[0])];
  let dayNumber = splitted[2];
  if (dayNumber[0] === '0') {
    dayNumber = dayNumber[1];
  }
  let month = monthStr[monthRef.indexOf(splitted[1])];
  let year = splitted[3];
  let hour = splitted[4];

  return month + ' ' + dayNumber + ', ' + year + ' ' + hour

}

let getFrDateStringWithTime = (timeStamp) => {
  let dayStr = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  let dayRef = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  let monthStr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août',
    'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  let monthRef = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let date = new Date(timeStamp).toString();
  let splitted = date.split(' ');
  let day = dayStr[dayRef.indexOf(splitted[0])];
  let monthNumber = splitted[2];
  if (monthNumber[0] === '0') {
    monthNumber = monthNumber[1];
  }
  let month = monthStr[monthRef.indexOf(splitted[1])];
  let hour = splitted[4];

  return day + ' ' + monthNumber + ' ' + month + ' ' + hour;
}

let getEnDateStringWithTime = (timeStamp) => {

}

let dateParser = {

  getDateString: (timeStamp, localeIdentifier) => {

    switch (localeIdentifier) {
      case 'En':
        return getEnDateString(timeStamp);
      case 'Fr':
        return getFrDateString(timeStamp);
    }
  },

  getDateStringWithTime: (timeStamp, localeIndentifier) => {

    switch (localeIndentifier) {
      case 'En':
        return getEnDateStringWithTime(timeStamp);
      case 'Fr':
        return getFrDateStringWithTime(timeStamp);
    }
  },

  getDateEvent: (timeStamp, localeIdentifier) => {
    switch (localeIdentifier) {
      case 'En':
        return getEnDateEvent(timeStamp);
      case 'Fr':
        return getEnDateEvent(timeStamp);
    }
  },
}

export default dateParser;

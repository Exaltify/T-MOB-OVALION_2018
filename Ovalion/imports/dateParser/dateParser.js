let getFrDateString = (timeStamp) => {
  let dayStr = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  let dayRef = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  let monthStr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août',
    'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  let monthRef = ['', '', '', '', '', '', '', '', 'Sep', 'Oct', '', ''];

  let date = new Date(timeStamp).toString();
  let splitted = date.split(' ');
  let day = dayStr[dayRef.indexOf(splitted[0])];
  let monthNumber = splitted[2];
  if (monthNumber[0] === '0') {
    monthNumber = monthNumber[1];
  }
  let month = monthStr[monthRef.indexOf(splitted[1])];

  return day + ' ' + monthNumber + ' ' + month;
}

let getEnDateString = (timeStamp) => {

}

let dateParser = {

  getDateString: (timeStamp, localeIndentifier) => {

    switch (localeIndentifier) {
      case 'En':
        return getEnDateString(timeStamp);
      case 'Fr':
        return getFrDateString(timeStamp);
    }
  }


}

export default dateParser;

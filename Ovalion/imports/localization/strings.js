import LocalizedStrings from "react-localization";

export let MenuBarStrings = new LocalizedStrings({
  En:{
    Cal:"Calendar",
    Eq:"My team",
    Res:"Reservation",
    Voy:"My trips",
    Par:"Parameters",
  },
  Fr: {
    Cal:"Calendrier",
    Eq:"Mon equipe",
    Res:"Reservation",
    Voy:"Mes voyages",
    Par:"Paramètres",
  }
});

let strings = [MenuBarStrings];


export let updateAllStrings = (identifier) => {
  console.log('lol');
  console.log(identifier);
  for (let str of strings) {
    str.setLanguage(identifier);
  }
}
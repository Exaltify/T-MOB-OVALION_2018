import modelTeam from '../../imports/api/model/modelTeam';

let doInsert = false;

let refTeamsName = [
  "SPORTING UNION AGEN LOT-ET-GARONNE",

  "UNION BORDEAUX-BÈGLES",

  "CASTRES OLYMPIQUE",

  "ASM CLERMONT AUVERGNE",

  "F.C. GRENOBLE RUGBY",

  "STADE ROCHELAIS",

  "LYON OLYMPIQUE UNIVERSITAIRE RUGBY",

  "MONTPELLIER HÉRAULT RUGBY",

  "STADE FRANÇAIS PARIS",

  "SECTION PALOISE BÉARN PYRÉNÉES",

  "UNION SPORTIVE ARLEQUINS PERPIGNAN",

  "RACING 92",

  "RUGBY CLUB TOULONNAIS",

  "STADE TOULOUSAIN RUGBY",
];

let refTeamsLogo = [
  'rugby-club-sporting-union-agen-lot-et-garonne',

  'logo_ubb_transparent',

  'logo-co',

  'Club-Rugby-Clermont-auvergne-ASM',

  'logo_grenoble_-_png',

  'fsdf',

  'Club-Rugby-Lyon-lou-rugby',

  'Club-rugby-montpellier-herault',

  'sfp_3dlogo_rose',

  'logo_maillot_section',

  'logoperpignan_0',

  'logo_racing92_2015',

  'logo_toulon_rct_2016_2017',

  'logo_st_bichromie_cercle_noir_cmjn',
];

let refTeamsCity = [
  "Agen",

  "Bordeaux",

  "Castres",

  "Clermont-Ferrand",

  "Grenoble",

  "La Rochelle",

  "Lyon",

  "Montpellier",

  "Paris",

  "Pau",

  "Perpignan",

  "Paris",

  "Toulon",

  "Toulouse",
]

if (doInsert) {

  modelTeam.remove({});

  for (let i = 0, ii = refTeamsName.length; i < ii; i++) {
    let logoSrc = 'assets/logo/' + refTeamsLogo[i] + '.png';
    let team = { name: refTeamsName[i], logoSrc, city: refTeamsCity[i], score: 0 };
    modelTeam.insert(team);
    console.log('Team ' + team + ' inserted.');
  }

}

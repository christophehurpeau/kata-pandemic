'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _getCity = require('./getCity');

var _getCity2 = _interopRequireDefault(_getCity);

var _getContaminationLevel = require('./getContaminationLevel');

var _getContaminationLevel2 = _interopRequireDefault(_getContaminationLevel);

var _contaminate = require('./contaminate');

var _contaminate2 = _interopRequireDefault(_contaminate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const OUTBREAK_LEVEL = 3;

const doesOutbreakOccurs = (city, disease) => (0, _getContaminationLevel2.default)(city, disease) >= OUTBREAK_LEVEL;

const findLinksCityNames = (links, cityName) => links.reduce((linkedCities, link) => {
  const idx = link.indexOf(cityName);
  if (idx !== -1) {
    linkedCities.push(link[idx === 0 ? 1 : 0]);
  }
  return linkedCities;
}, []);

const findContaminatedCities = (gameMap, cityName, disease) => {
  const affectedCities = [];
  const contaminatedCities = [];
  const findLinksCityNamesForMap = findLinksCityNames.bind(null, gameMap.links);

  (function recursiveFindAffected(linkedCityNames) {
    const outbreakCities = [];

    linkedCityNames.forEach(cityName => {
      if (affectedCities.includes(cityName)) return;

      affectedCities.push(cityName);
      const city = (0, _getCity2.default)(gameMap, cityName);
      if (doesOutbreakOccurs(city, disease)) {
        outbreakCities.push(cityName);
      } else {
        contaminatedCities.push(cityName);
      }
    });

    if (outbreakCities.length) {
      const affectedCities = outbreakCities.map(findLinksCityNamesForMap);
      recursiveFindAffected(affectedCities.reduce((array, cities) => {
        array.push(...cities);
        return array;
      }));
    }
  })(findLinksCityNamesForMap(cityName));

  return contaminatedCities;
};

exports.default = (gameMap, cityName) => {
  const city = (0, _getCity2.default)(gameMap, cityName);
  const disease = gameMap.diseases.find(d => d.name === city.diseaseName);

  if (!doesOutbreakOccurs(city, disease)) {
    return _extends({}, gameMap, {
      cities: gameMap.cities.map(c => c.name === cityName ? (0, _contaminate2.default)(c, disease) : c)
    });
  }

  const contaminatedCities = findContaminatedCities(gameMap, cityName, disease);

  return _extends({}, gameMap, {
    outbreakCount: gameMap.outbreakCount + 1,
    cities: gameMap.cities.map(c => contaminatedCities.includes(c.name) ? (0, _contaminate2.default)(c, disease) : c)
  });
};
//# sourceMappingURL=infect.js.map
import type { CityType, DiseaseType, GameMapType } from './types';
import getCity from './getCity';
import getContaminationLevel from './getContaminationLevel';
import contaminate from './contaminate';

const OUTBREAK_LEVEL = 3;

const doesOutbreakOccurs = (city: CityType, disease: DiseaseType) => (
  getContaminationLevel(city, disease) >= OUTBREAK_LEVEL
);

const findLinksCityNames = (links, cityName) => (
  links.reduce(
      (linkedCities, link) => {
        const idx = link.indexOf(cityName);
        if (idx !== -1) {
          linkedCities.push(link[idx === 0 ? 1 : 0]);
        }
        return linkedCities;
      },
      [],
    )
);

const findContaminatedCities = (gameMap: GameMapType, cityName, disease) => {
  const affectedCities = [];
  const contaminatedCities = [];
  const findLinksCityNamesForMap = findLinksCityNames.bind(null, gameMap.links);

  (function recursiveFindAffected(linkedCityNames: Array<string>) {
    const outbreakCities = [];

    linkedCityNames.forEach(cityName => {
      if (affectedCities.includes(cityName)) return;

      affectedCities.push(cityName);
      const city = getCity(gameMap, cityName);
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
  }(findLinksCityNamesForMap(cityName)));

  return contaminatedCities;
};

export default (gameMap: GameMapType, cityName: string) => {
  const city: CityType = getCity(gameMap, cityName);
  const disease: DiseaseType = gameMap.diseases.find(d => d.name === city.diseaseName);

  if (!doesOutbreakOccurs(city, disease)) {
    return ({
      ...gameMap,
      cities: gameMap.cities.map(c => (c.name === cityName ? contaminate(c, disease) : c)),
    });
  }

  const contaminatedCities = findContaminatedCities(gameMap, cityName, disease);

  return ({
    ...gameMap,
    outbreakCount: gameMap.outbreakCount + 1,
    cities: gameMap.cities.map(c => (
      contaminatedCities.includes(c.name) ? contaminate(c, disease) : c
    )),
  });
};

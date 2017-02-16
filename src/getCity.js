import type { GameMapType, CityType } from './types';

export default (gameMap: GameMapType, name: string): CityType => (
  gameMap.cities.find(city => city.name === name)
);

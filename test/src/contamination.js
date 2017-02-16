/* global suite, test */
import { strictEqual } from 'assert';

import {
  createGameMap,
  createDisease,
  createCity,
  contaminate,
  cure,
  getContaminationLevel,
  getCity,
  infect,
} from '../../src';

suite('contamination', () => {
  const createTestDisease = () => createDisease('DiseaseName');

  const createSimpleTestMap = () => {
    const disease = createTestDisease();
    const city1 = createCity('TestCity1', disease);
    const city2 = createCity('TestCity2', disease);
    return createGameMap({
      diseases: [disease],
      cities: [city1, city2],
      links: [
        [city1.name, city2.name],
      ],
    });
  };


  const createRealCaseTestMap = () => {
    const disease = createDisease('Blue');
    const Atlanta = createCity('Atlanta', disease);
    const Chicago = createCity('Chicago', disease);
    const Washington = createCity('Washington', disease);
    const NewYork = createCity('New York', disease);
    const Montreal = createCity('Montréal', disease);
    const SanFrancisco = createCity('San Francisco', disease);
    return createGameMap({
      diseases: [disease],
      cities: [Atlanta, Washington, NewYork, Montreal, SanFrancisco, Chicago],
      links: [
        [SanFrancisco.name, Chicago.name],
        [Chicago.name, Montreal.name],
        [Montreal.name, NewYork.name],
        [Washington.name, Montreal.name],
        [Washington.name, NewYork.name],
        [Washington.name, Atlanta.name],
        [Chicago.name, Atlanta.name],
      ],
    });
  };

  test('contaminate city', () => {
    const disease = createTestDisease();
    const city = createCity('TestCity', disease);
    const contaminatedCity = contaminate(city, disease);
    strictEqual(getContaminationLevel(contaminatedCity, disease), 1);
  });

  test('contaminate contaminated city', () => {
    const disease = createTestDisease();
    const city = createCity('TestCity', disease);
    const contaminatedCity = contaminate(contaminate(city, disease), disease);
    strictEqual(getContaminationLevel(contaminatedCity, disease), 2);
  });


  test('cure city', () => {
    const disease = createTestDisease();
    const city = createCity('TestCity', disease);
    const contaminatedCity = contaminate(city, disease);
    const curedCity = cure(contaminatedCity, disease);
    strictEqual(getContaminationLevel(curedCity, disease), 0);
  });


  test('infect city', () => {
    let gameMap = createSimpleTestMap();
    const disease = gameMap.diseases[0];
    gameMap = infect(gameMap, gameMap.cities[0].name);
    strictEqual(getContaminationLevel(gameMap.cities[0], disease), 1);
    strictEqual(getContaminationLevel(gameMap.cities[1], disease), 0);
  });

  test('outbreak', () => {
    let gameMap = createSimpleTestMap();
    const disease = gameMap.diseases[0];
    const city1Name = gameMap.cities[0].name;
    gameMap = infect(gameMap, city1Name);
    gameMap = infect(gameMap, city1Name);
    gameMap = infect(gameMap, city1Name);
    strictEqual(gameMap.outbreakCount, 0);
    strictEqual(getContaminationLevel(gameMap.cities[0], disease), 3);
    strictEqual(getContaminationLevel(gameMap.cities[1], disease), 0);

    // outbreak
    gameMap = infect(gameMap, city1Name);
    strictEqual(gameMap.outbreakCount, 1);
    strictEqual(getContaminationLevel(gameMap.cities[0], disease), 3);
    strictEqual(getContaminationLevel(gameMap.cities[1], disease), 1);
  });

  test('chained outbreak', () => {
    let gameMap = createRealCaseTestMap();

    const disease = gameMap.diseases[0];
    gameMap = infect(gameMap, 'Atlanta');
    gameMap = infect(gameMap, 'Atlanta');
    gameMap = infect(gameMap, 'Atlanta');
    gameMap = infect(gameMap, 'Washington');
    gameMap = infect(gameMap, 'Washington');
    gameMap = infect(gameMap, 'Washington');
    strictEqual(getContaminationLevel(getCity(gameMap, 'Atlanta'), disease), 3);
    strictEqual(getContaminationLevel(getCity(gameMap, 'Washington'), disease), 3);
    ['Chicago', 'New York', 'Montréal', 'San Francisco'].forEach(name => (
      strictEqual(getContaminationLevel(getCity(gameMap, name), disease), 0)
    ));

    // outbreak
    gameMap = infect(gameMap, 'Atlanta');
    strictEqual(gameMap.outbreakCount, 1);
    strictEqual(getContaminationLevel(getCity(gameMap, 'Atlanta'), disease), 3);
    strictEqual(getContaminationLevel(getCity(gameMap, 'Washington'), disease), 3);
    ['Chicago', 'New York', 'Montréal'].forEach(name => (
      strictEqual(getContaminationLevel(getCity(gameMap, name), disease), 1)
    ));
    ['San Francisco'].forEach(name => (
      strictEqual(getContaminationLevel(getCity(gameMap, name), disease), 0)
    ));
  });
});

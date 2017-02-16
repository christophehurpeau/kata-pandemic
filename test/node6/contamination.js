'use strict';

var _assert = require('assert');

var _ = require('../..');

/* global suite, test */
suite('contamination', () => {
  const createTestDisease = () => (0, _.createDisease)('DiseaseName');

  const createSimpleTestMap = () => {
    const disease = createTestDisease();
    const city1 = (0, _.createCity)('TestCity1', disease);
    const city2 = (0, _.createCity)('TestCity2', disease);
    return (0, _.createGameMap)({
      diseases: [disease],
      cities: [city1, city2],
      links: [[city1.name, city2.name]]
    });
  };

  const createRealCaseTestMap = () => {
    const disease = (0, _.createDisease)('Blue');
    const Atlanta = (0, _.createCity)('Atlanta', disease);
    const Chicago = (0, _.createCity)('Chicago', disease);
    const Washington = (0, _.createCity)('Washington', disease);
    const NewYork = (0, _.createCity)('New York', disease);
    const Montreal = (0, _.createCity)('Montréal', disease);
    const SanFrancisco = (0, _.createCity)('San Francisco', disease);
    return (0, _.createGameMap)({
      diseases: [disease],
      cities: [Atlanta, Washington, NewYork, Montreal, SanFrancisco, Chicago],
      links: [[SanFrancisco.name, Chicago.name], [Chicago.name, Montreal.name], [Montreal.name, NewYork.name], [Washington.name, Montreal.name], [Washington.name, NewYork.name], [Washington.name, Atlanta.name], [Chicago.name, Atlanta.name]]
    });
  };

  test('contaminate city', () => {
    const disease = createTestDisease();
    const city = (0, _.createCity)('TestCity', disease);
    const contaminatedCity = (0, _.contaminate)(city, disease);
    (0, _assert.strictEqual)((0, _.getContaminationLevel)(contaminatedCity, disease), 1);
  });

  test('contaminate contaminated city', () => {
    const disease = createTestDisease();
    const city = (0, _.createCity)('TestCity', disease);
    const contaminatedCity = (0, _.contaminate)((0, _.contaminate)(city, disease), disease);
    (0, _assert.strictEqual)((0, _.getContaminationLevel)(contaminatedCity, disease), 2);
  });

  test('cure city', () => {
    const disease = createTestDisease();
    const city = (0, _.createCity)('TestCity', disease);
    const contaminatedCity = (0, _.contaminate)(city, disease);
    const curedCity = (0, _.cure)(contaminatedCity, disease);
    (0, _assert.strictEqual)((0, _.getContaminationLevel)(curedCity, disease), 0);
  });

  test('infect city', () => {
    let gameMap = createSimpleTestMap();
    const disease = gameMap.diseases[0];
    gameMap = (0, _.infect)(gameMap, gameMap.cities[0].name);
    (0, _assert.strictEqual)((0, _.getContaminationLevel)(gameMap.cities[0], disease), 1);
    (0, _assert.strictEqual)((0, _.getContaminationLevel)(gameMap.cities[1], disease), 0);
  });

  test('outbreak', () => {
    let gameMap = createSimpleTestMap();
    const disease = gameMap.diseases[0];
    const city1Name = gameMap.cities[0].name;
    gameMap = (0, _.infect)(gameMap, city1Name);
    gameMap = (0, _.infect)(gameMap, city1Name);
    gameMap = (0, _.infect)(gameMap, city1Name);
    (0, _assert.strictEqual)(gameMap.outbreakCount, 0);
    (0, _assert.strictEqual)((0, _.getContaminationLevel)(gameMap.cities[0], disease), 3);
    (0, _assert.strictEqual)((0, _.getContaminationLevel)(gameMap.cities[1], disease), 0);

    // outbreak
    gameMap = (0, _.infect)(gameMap, city1Name);
    (0, _assert.strictEqual)(gameMap.outbreakCount, 1);
    (0, _assert.strictEqual)((0, _.getContaminationLevel)(gameMap.cities[0], disease), 3);
    (0, _assert.strictEqual)((0, _.getContaminationLevel)(gameMap.cities[1], disease), 1);
  });

  test('chained outbreak', () => {
    let gameMap = createRealCaseTestMap();

    const disease = gameMap.diseases[0];
    gameMap = (0, _.infect)(gameMap, 'Atlanta');
    gameMap = (0, _.infect)(gameMap, 'Atlanta');
    gameMap = (0, _.infect)(gameMap, 'Atlanta');
    gameMap = (0, _.infect)(gameMap, 'Washington');
    gameMap = (0, _.infect)(gameMap, 'Washington');
    gameMap = (0, _.infect)(gameMap, 'Washington');
    (0, _assert.strictEqual)((0, _.getContaminationLevel)((0, _.getCity)(gameMap, 'Atlanta'), disease), 3);
    (0, _assert.strictEqual)((0, _.getContaminationLevel)((0, _.getCity)(gameMap, 'Washington'), disease), 3);
    ['Chicago', 'New York', 'Montr\xE9al', 'San Francisco'].forEach(name => (0, _assert.strictEqual)((0, _.getContaminationLevel)((0, _.getCity)(gameMap, name), disease), 0));

    // outbreak
    gameMap = (0, _.infect)(gameMap, 'Atlanta');
    (0, _assert.strictEqual)(gameMap.outbreakCount, 1);
    (0, _assert.strictEqual)((0, _.getContaminationLevel)((0, _.getCity)(gameMap, 'Atlanta'), disease), 3);
    (0, _assert.strictEqual)((0, _.getContaminationLevel)((0, _.getCity)(gameMap, 'Washington'), disease), 3);
    ['Chicago', 'New York', 'Montr\xE9al'].forEach(name => (0, _assert.strictEqual)((0, _.getContaminationLevel)((0, _.getCity)(gameMap, name), disease), 1));
    ['San Francisco'].forEach(name => (0, _assert.strictEqual)((0, _.getContaminationLevel)((0, _.getCity)(gameMap, name), disease), 0));
  });
});
//# sourceMappingURL=contamination.js.map
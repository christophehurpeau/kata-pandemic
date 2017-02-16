import type { CityType, DiseaseType } from './types';

export default (city: CityType, disease: DiseaseType) => (
  city.diseases[disease.name] || 0
);

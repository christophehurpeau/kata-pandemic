import type { CityType, DiseaseType } from './types';

export default (city: CityType, disease: DiseaseType): CityType => ({
  ...city,
  diseases: { ...city.diseases, [disease.name]: (city.diseases[disease.name] || 0) + 1 },
});

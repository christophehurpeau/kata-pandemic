import type { CityType, DiseaseType } from './types';

export default (name: string, disease: DiseaseType): CityType => ({
  name,
  diseaseName: disease.name,
  diseases: {},
});

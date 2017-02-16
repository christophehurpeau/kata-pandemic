import type { DiseaseType } from './types';

export default (name: string): DiseaseType => ({
  name,
  eradicated: false,
});

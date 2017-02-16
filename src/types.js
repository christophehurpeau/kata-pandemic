type DiseaseMap = { [key: string]: number };

export type CityType = {|
  name: string,
  diseaseName: string,
  diseases: DiseaseMap,
|};

export type DiseaseType = {|
  name: string,
  eradicated: boolean,
|};

export type GameMapType = {|
  cities: Array<CityType>,
  links: Array<Array<string>>,
  diseases: Array<DiseaseType>,
  outbreakCount: number,
|};

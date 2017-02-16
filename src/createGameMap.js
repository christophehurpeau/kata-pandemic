import type { GameMapType } from './types';

export default ({ cities, links, diseases }): GameMapType => ({
  cities,
  links,
  diseases,
  outbreakCount: 0,
});

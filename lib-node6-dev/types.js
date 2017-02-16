"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameMapType = exports.DiseaseType = exports.CityType = undefined;

var _tcombForked = require("tcomb-forked");

var _tcombForked2 = _interopRequireDefault(_tcombForked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DiseaseMap = _tcombForked2.default.dict(_tcombForked2.default.String, _tcombForked2.default.Number, "DiseaseMap");

const CityType = exports.CityType = _tcombForked2.default.interface({
  name: _tcombForked2.default.String,
  diseaseName: _tcombForked2.default.String,
  diseases: DiseaseMap
}, {
  name: "CityType",
  strict: true
});

const DiseaseType = exports.DiseaseType = _tcombForked2.default.interface({
  name: _tcombForked2.default.String,
  eradicated: _tcombForked2.default.Boolean
}, {
  name: "DiseaseType",
  strict: true
});

const GameMapType = exports.GameMapType = _tcombForked2.default.interface({
  cities: _tcombForked2.default.list(CityType),
  links: _tcombForked2.default.list(_tcombForked2.default.list(_tcombForked2.default.String)),
  diseases: _tcombForked2.default.list(DiseaseType),
  outbreakCount: _tcombForked2.default.Number
}, {
  name: "GameMapType",
  strict: true
});
//# sourceMappingURL=types.js.map
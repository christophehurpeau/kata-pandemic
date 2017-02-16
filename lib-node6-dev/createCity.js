'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _arguments = arguments;

var _tcombForked = require('tcomb-forked');

var _tcombForked2 = _interopRequireDefault(_tcombForked);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function createCity(name, disease) {
  _assert(name, _tcombForked2.default.String, 'name');

  _assert(disease, _types.DiseaseType, 'disease');

  return _assert(function () {
    return {
      name,
      diseaseName: disease.name,
      diseases: {}
    };
  }.apply(undefined, _arguments), _types.CityType, 'return value');
};

function _assert(x, type, name) {
  if (_tcombForked2.default.isType(type) && type.meta.kind !== 'struct') {
    if (!type.is(x)) {
      type(x, [name + ': ' + _tcombForked2.default.getTypeName(type)]);
    }
  } else if (!(x instanceof type)) {
    _tcombForked2.default.fail('Invalid value ' + _tcombForked2.default.stringify(x) + ' supplied to ' + name + ' (expected a ' + _tcombForked2.default.getTypeName(type) + ')');
  }

  return x;
}
//# sourceMappingURL=createCity.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = (city, disease) => _extends({}, city, {
  diseases: _extends({}, city.diseases, { [disease.name]: (city.diseases[disease.name] || 0) + 1 })
});
//# sourceMappingURL=contaminate.js.map
/* eslint-disable indent */
import * as R from "ramda"; // doc: https://ramdajs.com/docs/

export function zeroPad(d) {
  return d < 10 ? `0${d.toString()}` : d.toString();
}

// usege:
//   return true if (not null && not undefined && not [] && not {} && not '') else false
export const hasData = R.compose(R.not, R.either(R.isNil, R.isEmpty));

// sample:
//   const data = [{ name: 'name1', value: 1 }, { name: 'name2', value: 2 }, { name: 'name3', value: 1 }]
// sumByProp('value')(data)
//   => 4
export const sumByProp = (prop) => (data) =>
  R.compose(R.sum, R.pluck(prop))(data);

// sample:
//   const data1 = { name: 'David', age: 18 }
//   const data2 = undefined
//
// get('name')(data1)
//   => 'David'
// get('name')(data2)
//   => undefined
// get('name')(data1)
//   => 'David'
// data2.name
//   => Uncaught TypeError: Cannot read property 'name' of undefined
export const get = R.prop;

const funcMapper = new Map([
  [`find`, R.find],
  [`filter`, R.filter],
  [`reject`, R.reject],
  [`all`, R.all],
  [`any`, R.any],
  [`findIndex`, R.findIndex],
]);

// sample:
//   const people = [
//    { name: 'David', age: 18, gender: 'M' },
//    { name: 'Double', age: 18, gender: 'F' }
//   ]
//
// getBy('find')({ name: 'David' })(people)
//   => {"age": 18, "gender": "M", "name": "David"}
// getBy('filter')({ name: 'David', age: 18 })(people)
//   => [{"age": 18, "gender": "M", "name": "David"}]
// getBy('reject')({ name: 'David' })(people)
//   => [{"age": 18, "gender": "F", "name": "Double"}]
// getBy('all')({ age: 18 })(people)
//   => true
// getBy('any')({ name: 'David' })(people)
//   => true
//
// *** returns true for empty array in 'all' method ***
export const getBy = (func) => R.compose(funcMapper.get(func), R.whereEq);

// usage:
//   1234567.89 or '1234567.89' -> '1,234,567.89'
export const amtFmt = (amount, digits = 2) =>
  hasData(amount)
    ? parseFloat(amount)
        .toFixed(digits)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1,`)
    : ``;

const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Basic Numerical Assertion', function () {
    // #1 read a whole number input.
    test('read a whole number input', function () {
      assert.strictEqual(23, convertHandler.getNum('23mi'));
      assert.strictEqual(34522, convertHandler.getNum('34522lbs'));
      assert.notEqual(23, convertHandler.getNum('23.2mi'));
      assert.notEqual(2324, convertHandler.getNum('/lbs'));
    })
    // #1 read a decimal number input.
    test('read a decimal number input', function () {
      assert.strictEqual(3.4566, convertHandler.getNum('3.4566mi'));
      assert.notStrictEqual(34522, convertHandler.getNum('34522/2lbs'));
      assert.strictEqual(23.2, convertHandler.getNum('23.2mi'));
      assert.notStrictEqual(2324, convertHandler.getNum('lbs234'));
    })
    // #3 read a fractional input.
    test('read a fractional input', function () {
      assert.strictEqual(1.5, convertHandler.getNum('3/2mi'));
      assert.strictEqual(17261, convertHandler.getNum('34522/2lbs'));
      assert.strictEqual(11.5, convertHandler.getNum('23/2mi'));
      assert.notStrictEqual(2324, convertHandler.getNum('lbs234'));
    })
    // #4 read a fractional input with a decimal.
    test('read a fractional input with a decimal', function () {
      assert.strictEqual(1.25, convertHandler.getNum('3/2.4mi'));
      assert.strictEqual(17.1, convertHandler.getNum('34.2/2lbs'));
      assert.strictEqual(0.9583333333333333, convertHandler.getNum('2.3/2.4mi'));
      assert.notStrictEqual(24, convertHandler.getNum('23.3/4.5/2.3lbs'));      
    })
    // #5 return an error on a double-fraction (i.e. 3/2/3).
    test('return an error on a double-fraction', function () {
      assert.strictEqual("invalid number", convertHandler.getNum('/4.4mi'));
      assert.strictEqual("invalid number", convertHandler.getNum('3/2//4gal'));
      assert.notStrictEqual(0.9583333333333333, convertHandler.getNum('2/3.3/2km'));
      assert.notStrictEqual(24, convertHandler.getNum('23.3/4.5/2.3lbs'));       
    })
    // #6 default to a numerical input of 1 when no numerical input is provided.
    test('default to a numerical input of 1 when no numerical input is provided', function () {
      assert.strictEqual(1, convertHandler.getNum('mi'));
      assert.strictEqual(1, convertHandler.getNum('gal'));
      assert.notStrictEqual(1, convertHandler.getNum('0.9583333333333333km'));
      assert.notStrictEqual(24, convertHandler.getNum('lbs'));
    })

  })
  
  suite('Basic String Assertion', function () {
    // #7 read each valid input unit.
    test('read each valid input unit', function () {
      assert.strictEqual('km', convertHandler.getUnit('12.3km'));
      assert.strictEqual('lbs', convertHandler.getUnit('1.2/45.3lbs'));
      assert.strictEqual('gal', convertHandler.getUnit('1.23gal'));
      assert.strictEqual('kg', convertHandler.getUnit('1.2/45.3kg'));
      assert.strictEqual('mi', convertHandler.getUnit('1.2/4mi'));
      assert.strictEqual('L', convertHandler.getUnit('15/3l'));
    })
    // #8 return an error for an invalid input unit.
    test('return an error for an invalid input unit', function () {
      assert.strictEqual("invalid unit", convertHandler.getUnit('4.4mii'));
      assert.strictEqual("invalid unit", convertHandler.getUnit('3/2//4gasl'));
      assert.notStrictEqual("invalid unit", convertHandler.getUnit('2/3.32km'));
      assert.strictEqual("invalid unit", convertHandler.getUnit('23.3/4.5/2.3'));   
    })
    // #9 return the correct return unit for each valid input unit.
    test('return the correct return unit for each valid input unit', function () {
      assert.strictEqual('mi', convertHandler.getReturnUnit('km'));
      assert.strictEqual('kg', convertHandler.getReturnUnit('lbs'));
      assert.strictEqual('L', convertHandler.getReturnUnit('gal'));
      assert.strictEqual('lbs', convertHandler.getReturnUnit('kg'));
      assert.strictEqual('km', convertHandler.getReturnUnit('mi'));
      assert.strictEqual('gal', convertHandler.getReturnUnit('L'));
    })
    // #10 return the spelled-out string unit for each valid input unit.
    test('return the spelled-out string unit for each valid input unit', function () {
      assert.deepEqual({"initNum":0.5,"initUnit":"mi","returnNum":0.80467,"returnUnit":"km","string":"0.5 miles converts to 0.80467 kilometers"}, convertHandler.getString(0.5, 'mi', 0.80467, 'km'));
      assert.deepEqual({"initNum":0.05077262693156733,"initUnit":"gal","returnNum":0.1922,"returnUnit":"L","string":"0.05077262693156733 gallons converts to 0.1922 liters"}, convertHandler.getString(0.05077262693156733, 'gal', 0.19220, 'L'));
      assert.deepEqual({"initNum":2.33,"initUnit":"lbs","returnNum":1.05687,"returnUnit":"kg","string":"2.33 pounds converts to 1.05687 kilograms"}, convertHandler.getString(2.33, 'lbs', 1.05687, 'kg'));
      assert.strictEqual("invalid number and unit", convertHandler.getString("invalid number", "invalid unit", "invalid unit", 'km'));
      assert.strictEqual("invalid unit", convertHandler.getString(1.2, "invalid unit", "invalid unit", "invalid unit"));
      assert.strictEqual("invalid number", convertHandler.getString('invalid number', 'mi', 'invalid unit', 'km'));
    })

  })
  suite('Conversion Assertion', function () {
    // #11 convert gal to L.
    test('convert gal to L', function () {
      assert.approximately(4.92103, convertHandler.convert(1.3, 'gal'), 0.00003);
      assert.strictEqual(3.74281, convertHandler.convert(0.9887459807073956, 'gal'));
      assert.notStrictEqual(4.92103, convertHandler.convert(1.3, 'gali'));
    })
    // #12 convert L to gal.
    test('convert L to gal', function () {
      assert.strictEqual(0.31701, convertHandler.convert(1.2, 'L'));
      assert.approximately(6.12879, convertHandler.convert(23.2, 'L'), 0.0001);
      assert.notStrictEqual(0.74565, convertHandler.convert(1.2, 'l'));
    })
    // #13 convert mi to km.
    test('convert mi to km', function () {
      assert.strictEqual(1.93121, convertHandler.convert(1.2, 'mi'));
      assert.strictEqual(198.49600, convertHandler.convert(123.34, 'mi'));
      assert.notStrictEqual(0.74565, convertHandler.convert(1.2, 'miles'));
    })
    // #14 convert km to mi.
    test('convert km to mi', function () {
      assert.strictEqual(0.74565, convertHandler.convert(1.2, 'km'));
      assert.approximately(0.36551, convertHandler.convert(0.5882352941176471, 'km'), 0.00003);
      assert.notStrictEqual(0.74565, convertHandler.convert(1.2, 'kmi'));
    })
    // #15 convert lbs to kg.
    test('convert lbs to kg', function () {
      assert.approximately(0.54431, convertHandler.convert(1.2, 'lbs'), 0.00002);
      assert.strictEqual(389.79429, convertHandler.convert(859.35, 'lbs'));
      assert.notStrictEqual(0.54431, convertHandler.convert(1.2, 'pounds'));
    })
    // #16 convert kg to lbs.
    test('convert kg to lbs', function () {
      assert.strictEqual(2.64555, convertHandler.convert(1.2, 'kg'));
      assert.strictEqual(1894.54400, convertHandler.convert(859.35, 'kg'));
      assert.notStrictEqual(0.74565, convertHandler.convert(1.2, 'kilo'));
    })

  })

});
function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    if (input.match(/[a-z]+[^a-z]+$/)) {
      return "invalid number and unit"
    }
    const regex = /^[^a-zA-Z]+/;
    const matches = input.match(regex);
    // console.log(matches);
    if (matches == null) {
      return 1;
    } else if (matches[0].startsWith('/')) {
      return "invalid number";
    }
    // example: 2.1 2/3 2/0.1 3.1/4 23 2.3/2.1
    const regex2 = /(\d+(\.\d+)?(\/(\d+(\.\d+)?)?))|(\d+(\.\d+)?)|(\d+\/\d+(\.\d+)?)|[^\d\/\.]+/g;
    const num = matches[0].match(regex2);
    // console.log(matches[0]);
    if (num.length > 1 || matches[0].split('/').length > 2) {
      result = "invalid number";
    } else {
      [a, b] = num[0].split('/').map(Number);
      // if (b === undefined) {
      //   result = a;
      // } else {
      //   result = parseFloat(a/b.toFixed(4)); 
      // }
      result = b !== undefined ? a / b : a;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    const regex = /[a-z]+/gi;
    const matches = input.match(regex);
    // console.log(matches);
    if (matches == null || matches.length > 1) {
      result = "invalid unit";
    } else {
      result = matches[0].toLowerCase();
    }
    if (['kg','lbs','mi','km','l','gal'].indexOf(result) === -1) {
      return "invalid unit";
    }
    return result === 'l' ? result.toUpperCase() : result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    const conversion = {'kg': 'lbs', 'lbs': 'kg', 'mi': 'km', 'km': 'mi', 'L': 'gal', 'gal': 'L'};
    if (conversion[initUnit]) {
      result = conversion[initUnit];
    } else {
      result = "invalid unit";
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    const fullForm = {'L': 'liters', 'gal': 'gallons', 'km': 'kilometers', 'mi': 'miles', 'kg': 'kilograms', 'lbs': 'pounds'}
    if (fullForm[unit]) {
      result = fullForm[unit];
    } else {
      result = "invalid unit";
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        result = "invalid unit";
    }
    if (result !== "invalid unit") {
      result = parseFloat(result.toFixed(5));
      // console.log(parseFloat(result.toFixed(5)))
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return "invalid number and unit";
    }
    if (initUnit === "invalid unit") {
      return "invalid unit";
    }
    if (initNum === "invalid number" || initNum === "invalid number and unit") {
      return initNum;
    } 
    let result = { 
      initNum,
      initUnit: initUnit === 'l' ? 'L' : initUnit,
      returnNum, 
      returnUnit: returnUnit === 'l' ? 'L' : returnUnit,
      "string": `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    };
    
    return result;
  };
  
}

module.exports = ConvertHandler;

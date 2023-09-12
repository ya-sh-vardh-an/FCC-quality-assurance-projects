// american to british
const americanOnly = require('./american-only.js');
// american : british
const americanToBritishSpelling = require('./american-to-british-spelling.js'); 
const americanToBritishTitles = require("./american-to-british-titles.js");
// british to american
const britishOnly = require('./british-only.js'); 

class Translator {

  hasValue(arr, targetRegex) {
    for (const word of arr) {
      if (targetRegex.test(word)) {
        return true;
      }
    }
    return false;
  }

  americanToBritish(string) {
    let count = 0;
    // const words = 
    const newWords = [];
    if (/^[a-z]/.test(string)) {
      string = string[0],toUpperCase() + string.slice(1);
      count++;
    }
    const dateRegex = /(\d{1,2})[:](\d{1,2})/g
    const matched = [];
    // console.log(americanOnly)
    for (const [key, value] of Object.entries(americanOnly)) {
      const regex = new RegExp(`\\b${key}\\b`, 'i');
      // console.log(key, regex, value)
      if (regex.test(string) && !this.hasValue(matched, regex)) {
        matched.push(value);
        string = string.replace(regex, `<span class=\"highlight\">${value}</span>`);
        count++;
      }
    }
    for (const [key, value] of Object.entries(americanToBritishSpelling)) {
      const regex = new RegExp(`\\b${key}\\b`, 'i');
      if (regex.test(string) && !this.hasValue(matched, regex)) {
        matched.push(value);
        string = string.replace(regex, `<span class=\"highlight\">${value}</span>`);
        count++;
      }
    }
    for (const [key, value] of Object.entries(americanToBritishTitles)) {
      const regex = new RegExp(`(?<=\\W|^)${key}(?=\\W|$)`, 'i');
      // console.log(string, regex)
      if (regex.test(string) && !this.hasValue(matched, regex)) {
        matched.push(value);
        string = string.replace(regex, `<span class=\"highlight\">${value[0].toUpperCase() + value.slice(1)}</span>`);
        count++;
      }
    }
    if (dateRegex.test(string)) {
      string = string.replace(dateRegex, `<span class=\"highlight\">$1.$2</span>`);
      count++;
    }
    // console.log(string);
    if (count === 0) {
      return "Everything looks good to me!";
    } else {
      return string;
    }
    
    // string.split(/[^a-z]/gi).map((extract) => {
    //   const t = extract.match(/[a-z]+/i);
    //   const word = extract.toLowerCase();
    //   if (americanOnly.hasOwnProperty(word)) {
    //     const newExtract = extract.replace(t, `<span class=highlight>${americanOnly[word]}</span>`)
    //     newWords.push(newExtract);
    //     count++;
    //   } else if (americanToBritishSpelling.hasOwnProperty(word)) {
    //     const newExtract = extract.replace(t, `<span class=highlight>${americanToBritishSpelling[word]}</span>`)
    //     newWords.push(newExtract);
    //     count++;
    //   } else if (americanToBritishTitles.hasOwnProperty(word)) {
    //     const newExtract = extract.replace(t, `<span class=highlight>${americanToBritishTitles[word]}</span>`)
    //     newWords.push(newExtract);
    //     count++;
    //   } else if (dateRegex.test(word)) {
    //     newWords.push(extract.replace(dateRegex, "<span class=highlight>$1.$2</span>"));
    //     count++;
    //   } else {
    //     newWords.push(extract);
    //   }
    // })
    
    // let newString = '';
    // if (count === 0) {
    //   newString = "Everything looks good to me!";
    // } else {
    //   newString = newWords.join(" ");
    //   newString = newString[0].toUpperCase() + newString.slice(1);
    // }
    // return newString;
  }

  britishToAmerican(string) {
    let count = 0;
    let newString = '';
    if (/^[a-z]/.test(string)) {
      string = string[0].toUpperCase() + string.slice(1);
      count++;
    }
    const dateRegex = /(\d{1,2})[.](\d{1,2})/g
    const matched = [];

    for (const [key, value] of Object.entries(britishOnly)) {
      const regex = new RegExp(`\\b${key}\\b`, 'i');
      // console.log(key, regex, value)
      if (regex.test(string) && !this.hasValue(matched, regex)) {
        matched.push(value);
        // console.log(`key: ${key}, value: ${value}`)
        string = string.replace(regex, `<span class=\"highlight\">${value}</span>`);
        count++;
      }
    }
    for (const [key, value] of Object.entries(americanToBritishSpelling)) {
      const regex = new RegExp(`\\b${value}\\b`, 'i');
      if (regex.test(string) && !this.hasValue(matched, regex)) {
        matched.push(value);
        string = string.replace(regex, `<span class=\"highlight\">${key}</span>`);
        count++;
      }
    }
    for (const [key, value] of Object.entries(americanToBritishTitles)) {
      const regex = new RegExp(`(?<=\\W|^)${value}(?=\\W|$)`, 'i');
      // console.log(string, regex)
      if (regex.test(string) && !this.hasValue(matched, regex)) {
        matched.push(value);
        string = string.replace(regex, `<span class=\"highlight\">${key[0].toUpperCase() + key.slice(1)}</span>`);
        count++;
      }
    }
    if (dateRegex.test(string)) {
      string = string.replace(dateRegex, `<span class=\"highlight\">$1:$2</span>`);
      count++;
    }
    // console.log(string);
    if (count === 0) {
      return "Everything looks good to me!";
    } else {
      return string;
    }
  }

  translate(string, locale) {
    if (string.length === 0) {
      return { "error": 'No text to translate' }
    }

    let newString = '';
    if (locale == "american-to-british") {
      newString = this.americanToBritish(string);
    } else if (locale == "british-to-american") {
      newString = this.britishToAmerican(string);
    } else {
      return { "error": 'Invalid value for locale field' }
    }

    return { "text": string, "translation": newString };
  }
}

module.exports = Translator;
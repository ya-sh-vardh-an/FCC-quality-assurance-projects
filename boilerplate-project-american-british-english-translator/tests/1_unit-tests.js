const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
  
  suite("Test for Translate to British English", function () {
    
    // Translate Mangoes are my favorite fruit. to British English
    test('Translate Mangoes are my favorite fruit', function () {
      const result = translator.americanToBritish('Mangoes are my favorite fruit.');
      assert.equal(result, 'Mangoes are my <span class="highlight">favourite</span> fruit.');
    })
    // Translate I ate yogurt for breakfast. to British English
    test('Translate I ate yogurt for breakfast', function () {
      const result = translator.americanToBritish('I ate yogurt for breakfast.');
      assert.equal(result, 'I ate <span class="highlight">yoghurt</span> for breakfast.');
    })
    // Translate We had a party at my friend's condo. to British English
    test('Translate We had a party at my friend\'s condo.', function () {
      const result = translator.americanToBritish("We had a party at my friend's condo.");
      assert.equal(result, "We had a party at my friend's <span class=\"highlight\">flat</span>.");
    })
    // Translate Can you toss this in the trashcan for me? to British English
    test('Translate Can you toss this in the trashcan for me?', function () {
      const result = translator.americanToBritish('Can you toss this in the trashcan for me?');
      // console.log(result);
      assert.equal(result, 'Can you toss this in the <span class="highlight">bin</span> for me?');
    })
    // Translate The parking lot was full. to British English
    test('Translate The parking lot was full.', function () {
      const result = translator.americanToBritish('The parking lot was full.');
      assert.equal(result, 'The <span class="highlight">car park</span> was full.');
    })
    // Translate Like a high tech Rube Goldberg machine. to British English
    test('Translate Like a high tech Rube Goldberg machine.', function () {
      const result = translator.americanToBritish('Like a high tech Rube Goldberg machine.');
      assert.equal(result, 'Like a high tech <span class="highlight">Heath Robinson device</span>.');
    })
    // Translate To play hooky means to skip class or work. to British English
    test('Translate To play hooky means to skip class or work.', function () {
      const result = translator.americanToBritish('To play hooky means to skip class or work.');
      assert.equal(result, 'To <span class="highlight">bunk off</span> means to skip class or work.');
    })
    // Translate No Mr. Bond, I expect you to die. to British English
    test('Translate No Mr. Bond, I expect you to die.', function () {
      // console.log(result)
      const result = translator.americanToBritish('No Mr. Bond, I expect you to die.');
      assert.equal(result, 'No <span class="highlight">Mr</span> Bond, I expect you to die.');
    })
    // Translate Dr. Grosh will see you now. to British English
    test('Translate Dr. Grosh will see you now.', function () {
      // console.log(result);
      const result = translator.americanToBritish('Dr. Grosh will see you now.');
      assert.equal(result, '<span class="highlight">Dr</span> Grosh will see you now.');
    })
    // Translate Lunch is at 12:15 today. to British English
    test('Translate Lunch is at 12:15 today.', function () {
      const result = translator.americanToBritish('Lunch is at 12:15 today.');
      // console.log(result);
      assert.equal(result, 'Lunch is at <span class="highlight">12.15</span> today.');
    })
  })

  suite("Test for Translate to American English", function () {
    
    // Translate We watched the footie match for a while. to American English
    test('Translate We watched the footie match for a while.', function () {
      const result = translator.britishToAmerican('We watched the footie match for a while.');
      assert.equal(result, 'We watched the <span class="highlight">soccer</span> match for a while.')
    })
    // Translate Paracetamol takes up to an hour to work. to American English
    test('Translate Paracetamol takes up to an hour to work.', function () {
      const result = translator.britishToAmerican('Paracetamol takes up to an hour to work.');
      assert.equal(result, '<span class="highlight">Tylenol</span> takes up to an hour to work.')
    })
    // Translate First, caramelise the onions. to American English
    test('Translate First, caramelise the onions.', function () {
      const result = translator.britishToAmerican('First, caramelise the onions.');
      assert.equal(result, 'First, <span class="highlight">caramelize</span> the onions.')
    })
    // Translate I spent the bank holiday at the funfair. to American English
    test('Translate I spent the bank holiday at the funfair.', function () {
      const result = translator.britishToAmerican('I spent the bank holiday at the funfair.');
      assert.equal(result, 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.')
    })
    // Translate I had a bicky then went to the chippy. to American English
    test('Translate I had a bicky then went to the chippy.', function () {
      const result = translator.britishToAmerican('I had a bicky then went to the chippy.');
      console.log(result);
      assert.equal(result, 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.')
    })
    // Translate I've just got bits and bobs in my bum bag. to American English
    test('Translate I\'ve just got bits and bobs in my bum bag.', function () {
      const result = translator.britishToAmerican('I\'ve just got bits and bobs in my bum bag.');
      assert.equal(result, 'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.')
    })
    // Translate The car boot sale at Boxted Airfield was called off. to American English
    test('Translate The car boot sale at Boxted Airfield was called off.', function () {
      const result = translator.britishToAmerican('The car boot sale at Boxted Airfield was called off.');
      assert.equal(result, 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.')
    })
    // Translate Have you met Mrs Kalyani? to American English
    test('Translate Have you met Mrs Kalyani?', function () {
      const result = translator.britishToAmerican('Have you met Mrs Kalyani?');
      assert.equal(result, 'Have you met <span class="highlight">Mrs.</span> Kalyani?')
    })
    // Translate Prof Joyner of King's College, London. to American English
    test('Translate Prof Joyner of King\'s College, London.', function () {
      const result = translator.britishToAmerican('Prof Joyner of King\'s College, London.');
      assert.equal(result, '<span class="highlight">Prof.</span> Joyner of King\'s College, London.')
    })
    // Translate Tea time is usually around 4 or 4.30. to American English
    test('Translate Tea time is usually around 4 or 4.30.', function () {
      const result = translator.britishToAmerican('Tea time is usually around 4 or 4.30.');
      assert.equal(result, 'Tea time is usually around 4 or <span class="highlight">4:30</span>.')
    })
  })

  suite("Test for Highlight the translation", function () {
    
    // Highlight translation in Mangoes are my favorite fruit.
    test('Highlight translation in Mangoes is my favorite fruit', function () {
      const result = translator.americanToBritish('Mangoes are my favorite fruit.');
      assert.include(result, '<span class="highlight">favourite</span>', 'It should include the highlight tag on word');
    })
    // Highlight translation in I ate yogurt for breakfast.
    test('Highlight translation in I ate yogurt for breakfast.', function () {
      const result = translator.americanToBritish('I ate yogurt for breakfast.');
      assert.include(result, '<span class="highlight">yoghurt</span>', 'It should include the highlight tag on word');
    })
    // Highlight translation in We watched the footie match for a while.
    test('Highlight translation in We watched the footie match for a while.', function () {
      const result = translator.britishToAmerican('We watched the footie match for a while.');
      assert.include(result, '<span class="highlight">soccer</span>', 'It should include the highlight tag on word');
    })
    // Highlight translation in Paracetamol takes up to an hour to work.
    test('Highlight translation in Paracetamol takes up to an hour to work.', function () {
      const result = translator.britishToAmerican('Paracetamol takes up to an hour to work.');
      assert.include(result, '<span class="highlight">Tylenol</span>', 'It should include the highlight tag on word');
    })
  })

});

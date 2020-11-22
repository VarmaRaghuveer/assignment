### steps to run app

- you will need nodeJs (and npm) installed in the system
- cd in home path of app which is app.js (package.json)
- npm install
- node app

### Assumptions made

- I have discarded empty space from the response, so that we don't hit yandex dictonary for empty text
- I made it generic to scale to n numbers, in question 10 was mentioned so it defaults to 10 top words.
- The response of yandex dictonary yeilds POS at root level for given word, for some it is null, I have added POS of root if present else undefined
- The response of yandex dictonary has syn tag instead of Synonyms which is at multiple levels inside tr tag, I assumed tr tag is what is needed
- since response format was specified in text, I assumed below repsonse structure
  `[ { word: 'the', output: { count: 61197, synonyms: [Array], pos: 'determiner' } }, { word: 'of', output: { count: 34754, synonyms: [Array], pos: 'preposition' } } ]`

### time to complete

- Based on internet speed and machine it takes 15 - 25 seconds to complete

import { initializeRepository, getMatchesQuery } from './repository';

initializeRepository();

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
  console.log('inputChanged: ' + text);
  getMatchesQuery(text, response => {
    const suggestions = [];
    for (let row of response.rows) {
      suggestions.push({
        content: row.url,
        description: row.title,
      });
    }
    console.log({ suggestions });
    suggest(suggestions);
  });
});

chrome.omnibox.onInputEntered.addListener(function(text) {
  console.log('inputEntered: ' + text);
  alert('You just typed "' + text + '"');
});

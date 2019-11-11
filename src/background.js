import { initializeRepository, getMatchesQuery } from './repository';

initializeRepository();

// This event is fired each time the user updates the text in the omnibox,
// as long as the extension's keyword mode is still active.
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

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(function(text) {
  console.log('inputEntered: ' + text);
  alert('You just typed "' + text + '"');
});

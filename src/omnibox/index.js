import { getMatchesQuery } from '../repository';

const omniBoxSuggestions = () => {
  const removeSpecialCharacters = /[^\w\s]/gi;

  let suggestedUrl;
  let suggestedText;
  let hasSuggestion = false;

  const setDefaultSuggestion = description =>
    chrome.omnibox.setDefaultSuggestion({ description });

  const clearSuggestions = () => {
    setDefaultSuggestion('<url>bm</url>');
    hasSuggestion = false;
    suggestedUrl = null;
    suggestedText = null;
  };

  const navigate = url => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.update(tabs[0].id, { url: url });
    });
  };

  chrome.omnibox.onInputChanged.addListener((text, suggest) => {
    getMatchesQuery(text, response => {
      const suggestions = [];

      // todo: prevent duplicates from being inserted into the database
      const urls = new Set();
      for (let row of response.rows) {
        const { url, title } = row;
        if (!urls.has(url)) {
          urls.add(url);
          suggestions.push({
            content: url,
            description: title.replace(removeSpecialCharacters, ''),
          });
        }
      }

      if (suggestions.length == 0) {
        suggest([]);
        clearSuggestions();
        return;
      }

      const { content, description } = suggestions.shift();
      setDefaultSuggestion(`${description} <url>${content}</url>`);
      suggestedText = text;
      suggestedUrl = content;
      hasSuggestion = true;
      suggest(suggestions);
    });
  });

  chrome.omnibox.onInputEntered.addListener((text, disposition) => {
    if (hasSuggestion) {
      text.localeCompare(suggestedText) === 0
        ? navigate(suggestedUrl)
        : navigate(text);
    }
    clearSuggestions();
  });
};

export { omniBoxSuggestions };

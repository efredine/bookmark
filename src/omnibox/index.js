import { getMatchesQuery } from '../repository';

const omniBoxSuggestions = () => {
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
      for (let row of response.rows) {
        suggestions.push({
          content: row.url,
          description: row.title,
        });
      }
      if (suggestions.length > 0) {
        const { content, description } = suggestions[0];
        setDefaultSuggestion(`${description} <url>${content}</url>`);
        suggestedText = text;
        suggestedUrl = content;
        hasSuggestion = true;
      } else {
        clearSuggestions();
      }
      suggest(suggestions);
      console.log('inputChanged', {
        suggestedText,
        suggestedUrl,
        hasSuggestion,
      });
    });
  });

  chrome.omnibox.onInputCancelled.addListener(clearSuggestions);

  chrome.omnibox.onInputEntered.addListener((text, disposition) => {
    console.log({ text, disposition });
    if (hasSuggestion) {
      if (text.localeCompare(suggestedText) === 0) {
        navigate(suggestedUrl);
      } else {
        navigate(text);
      }
    }
    clearSuggestions();
  });
};

export { omniBoxSuggestions };

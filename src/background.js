import { initializeRepository } from './repository';
import { omniBoxSuggestions } from './omnibox';

initializeRepository();
omniBoxSuggestions();
chrome.history.onVisited.addListener(historyItem => {
  console.log('visiting', historyItem);
});
chrome.runtime.onMessage.addListener(({ url }, sender, response) => {
  console.log('background received', url);
  chrome.history.getVisits({ url }, response);
  return true;
});

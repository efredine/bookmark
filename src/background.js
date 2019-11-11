import { prepareDatabase } from './storage';

chrome.runtime.onInstalled.addListener(function() {
  console.log('background lives');
  const db = prepareDatabase(console.error);
  console.log('db prepared', db);
});

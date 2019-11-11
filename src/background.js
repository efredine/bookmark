import { prepareDatabase, query, mutation } from './storage';

let db;

chrome.runtime.onInstalled.addListener(() => {
  console.log('background lives');
  db = prepareDatabase(console.error);
  console.log('db prepared', db);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received in background.js', request);

  if (request.method == 'mutation' && request.sql) {
    mutation(db, request.sql, request.parameters)
      .then((_, result) => sendResponse(result))
      .catch(console.error);
    return true;
  }
});

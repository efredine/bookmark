import { prepareDatabase, query, mutation } from '../storage';

const INSERT_PAGE_SQL = `
INSERT INTO fs_pages (title, url, content)
VALUES (?, ?, ?);
`;

const QUERY_CONTENT_SQL = `
SELECT url, title
FROM fs_pages
WHERE content match ?;
`;

let db;

const initializeRepository = () => {
  chrome.runtime.onInstalled.addListener(() => {
    console.log('background lives');
    db = prepareDatabase(console.error);
    console.log('db prepared', db);
  });
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Dispatching:', request);

    if (request.insertPage) {
      insertPageMutation(request.parameters, sendResponse);
      return true;
    }
  });
};

const insertPageMutation = ({ title, url, content }, sendResponse) =>
  mutation(db, INSERT_PAGE_SQL, [title, url, content])
    .then((_, result) => sendResponse({ insertedPage: true }))
    .catch(console.error);

const insertPage = (page, response) => {
  chrome.runtime.sendMessage(
    {
      insertPage: true,
      parameters: page,
    },
    indexResponse => {
      console.log('indexPage response', indexResponse);
      response({
        insertedPage: true,
      });
    }
  );
};

const getMatchesQuery = (content, sendResponse) => {
  query(db, QUERY_CONTENT_SQL, [content])
    .then(sendResponse)
    .catch(console.error);
};

export { initializeRepository, insertPage, getMatchesQuery };

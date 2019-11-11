import { prepareDatabase, query, mutation } from '../storage';

const INSERT_PAGE_SQL = `
INSERT INTO fs_pages (title, url, content)
VALUES (?, ?, ?);
`;

const QUERY_CONTENT_SQL = `
SELECT url, title
FROM fs_pages
WHERE content match ?
LIMIT 10;
`;

let db;

const initializeRepository = () => {
  chrome.runtime.onInstalled.addListener(() => {
    db = prepareDatabase(console.error);
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
    .then(sendResponse)
    .catch(console.error);

const insertPage = (page, response) => {
  chrome.runtime.sendMessage(
    {
      insertPage: true,
      parameters: page,
    },
    response
  );
};

const getMatchesQuery = (content, sendResponse) => {
  query(db, QUERY_CONTENT_SQL, [content])
    .then(sendResponse)
    .catch(console.error);
};

export { initializeRepository, insertPage, getMatchesQuery };

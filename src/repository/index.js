import { prepareDatabase, query, mutation } from '../storage';

const INSERT_PAGE_SQL = `
INSERT INTO pages (title, url)
VALUES (?, ?);
`;

let db;

const initializeRepository = () => {
  console.log('background lives');
  db = prepareDatabase(console.error);
  console.log('db prepared', db);
};

const dispatcher = (request, sender, sendResponse) => {
  console.log('Dispatching:', request);

  if (request.insertPage) {
    insertPageMutation(request.parameters, sendResponse);
    return true;
  }
};

const insertPageMutation = ({ title, url }, sendResponse) =>
  mutation(db, INSERT_PAGE_SQL, [title, url])
    .then((_, result) => sendResponse(result))
    .catch(console.error);

const insertPage = (title, url, response) => {
  chrome.runtime.sendMessage(
    {
      insertPage: true,
      parameters: { title, url },
    },
    indexResponse => {
      console.log('indexPage response', indexResponse);
      response({
        insertedPage: true,
      });
    }
  );
};

export { initializeRepository, dispatcher, insertPage };

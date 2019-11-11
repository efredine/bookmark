import { insertPage } from '../repository';

const indexPage = (title, url, response) => {
  console.log('indexing page');
  insertPage(title, url, response);
};

export { indexPage };

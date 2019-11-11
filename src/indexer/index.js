import { insertPage } from '../repository';

const indexPage = (title, url, content, response) => {
  console.log('indexing page');
  insertPage(title, url, content, response);
};

export { indexPage };

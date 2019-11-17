import { insertPage } from './repository';

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.bookmarkPage) {
    bookmarkPage(response);
    return true;
  }
});

const bookmarkPage = response => {
  insertPage(
    {
      content: document.documentElement.innerText,
      title: document.title,
      url: window.location.href,
    },
    response
  );
};

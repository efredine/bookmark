const INSERT_PAGE_SQL = `
INSERT INTO pages (title, url)
VALUES (?, ?);
`;

const indexPage = (title, url, response) => {
  console.log('indexing page with send message.');
  chrome.runtime.sendMessage(
    {
      method: 'mutation',
      sql: INSERT_PAGE_SQL,
      parameters: [title, url],
    },
    indexResponse => {
      console.log('indexPage response', indexResponse);
      response({
        bookmarkedPage: true,
      });
    }
  );
  console.log('After the message has been sent.');
};

export { indexPage };

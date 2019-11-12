const bookmarkCurrentPage = () => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { bookmarkPage: true }, response => {
        const $container = document.querySelector('#container');
        $container.innerHTML = 'Bookmarked!';
        setTimeout(() => {
          window.close();
        }, 3000);
      });
    }
  );
};

window.onload = () => {
  bookmarkCurrentPage();
};

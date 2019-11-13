import { insertPage } from './repository';

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.bookmarkPage) {
    bookmarkPage(response);
    return true;
  }
});

function bookmarkPage(response) {
  const treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    function(node) {
      return node.textContent
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    },
    false
  );

  let content = '';
  while (treeWalker.nextNode()) {
    if (treeWalker.currentNode && treeWalker.currentNode.textContent) {
      content += treeWalker.currentNode.textContent;
    }
  }

  insertPage(
    {
      content,
      title: document.title,
      url: window.location.href,
    },
    response
  );
}

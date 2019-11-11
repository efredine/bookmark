import React from 'react';
import ReactDOM from 'react-dom';
import Button from './components/Button';
import { indexPage } from './indexer';

class App extends React.Component {
  render() {
    console.log('Injected into DOM.');
    return (
      <div>
        <Button />
      </div>
    );
  }
}

// Message Listener function
chrome.runtime.onMessage.addListener((request, sender, response) => {
  console.log('Received in main.js:', request);
  // If message is injectApp
  if (request.injectApp) {
    // Inject our app to DOM and send response
    injectApp();
    console.log('Insert injection here.');
    response({
      startedExtension: true,
    });
  }
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
  const page = {
    content,
    title: document.title,
    url: window.location.href,
  };
  // console.log(page);
  indexPage(page, response);
}

function injectApp() {
  const newDiv = document.createElement('div');
  newDiv.setAttribute('id', 'chromeExtensionReactApp');
  document.body.appendChild(newDiv);
  ReactDOM.render(<App />, newDiv);
}

import React from 'react';
import ReactDOM from 'react-dom';

import Button from './components/Button';

class App extends React.Component {
  render() {
    console.log('Injected into DOM.');
    return (
      <div>
        Your App injected to DOM correctly!
        <Button />
      </div>
    );
  }
}

// Message Listener function
chrome.runtime.onMessage.addListener((request, sender, response) => {
  console.log('Received a message.');
  // If message is injectApp
  if (request.injectApp) {
    // Inject our app to DOM and send response
    injectApp();
    console.log('Insert injection here.');
    response({
      startedExtension: true,
    });
  }
});

function injectApp() {
  const newDiv = document.createElement('div');
  newDiv.setAttribute('id', 'chromeExtensionReactApp');
  document.body.appendChild(newDiv);
  ReactDOM.render(<App />, newDiv);
}
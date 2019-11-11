import React from 'react';
import ReactDOM from 'react-dom';
import Button from './components/Button';

function ExtensionApp() {
  return (
    <div>
      Your App injected to DOM correctly!
      <Button />
    </div>
  );
}
console.log('Executing popup.js');

window.onload = () => {
  //   console.log('Window loaded -- from popup.js');
  //   const $startButton = document.querySelector('.start');

  //   $startButton.onclick = () => {
  //     // Get active tab
  //     chrome.tabs.query(
  //       {
  //         active: true,
  //         currentWindow: true,
  //       },
  //       tabs => {
  //         // Send message to script file
  //         chrome.tabs.sendMessage(tabs[0].id, { injectApp: true }, response =>
  //           window.close()
  //         );
  //       }
  //     );
  //   };

  const $container = document.querySelector('#container');
  ReactDOM.render(<ExtensionApp />, $container);
};

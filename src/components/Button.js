import React from 'react';

function Button() {
  function handleClick() {
    console.log('clicked');
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      tabs => {
        // Send message to script file
        chrome.tabs.sendMessage(tabs[0].id, { injectApp: true }, response =>
          window.close()
        );
      }
    );
  }
  return <button onClick={handleClick}>Hello</button>;
}

Button.propTypes = {};

export default Button;

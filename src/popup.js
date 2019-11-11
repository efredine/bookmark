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
  const $container = document.querySelector('#container');
  ReactDOM.render(<ExtensionApp />, $container);
};

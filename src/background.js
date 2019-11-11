import { initializeRepository, dispatcher } from './repository';

chrome.runtime.onInstalled.addListener(initializeRepository);
chrome.runtime.onMessage.addListener(dispatcher);

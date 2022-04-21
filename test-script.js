
// Function called when a new message is received
/* const messagesFromReactAppListener = (
    msg,
    sender,
    sendResponse
) => {
    console.log("testcripts Message received", msg);

    if (msg.greeting)
        createButton();

    sendResponse({ response: 'rayos' });
};

const createButton = () => {
    const button = document.createElement('button');
    button.innerText = 'Show popup Fake'
    button.addEventListener('click', () => {
        console.log('Bitchy');
    });

    const contentBody = document.body
    contentBody.appendChild(button);
} */

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
//chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
'use strict';

const script = document.createElement('script');
script.setAttribute("type", "module");
script.setAttribute("src", chrome.runtime.getURL('./assets/nested.cad3514e.js'));
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head.insertBefore(script, head.lastChild);
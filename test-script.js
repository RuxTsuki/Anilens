
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

const rootHinkku = document.createElement('div');
rootHinkku.id = "root_hinkku";
document.body.appendChild(rootHinkku);

const linkStyles = document.createElement('link');
linkStyles.rel = "stylesheet";
linkStyles.type = "text/css";
linkStyles.href = chrome.runtime.getURL("./assets/index.0182352c.css")

const script = document.createElement('script');
script.setAttribute("type", "module");
script.setAttribute("src", chrome.runtime.getURL('./assets/index.8623281f.js'));
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head.insertBefore(linkStyles, head.lastChild);
head.insertBefore(script, head.lastChild);
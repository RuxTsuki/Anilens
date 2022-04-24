import App from "../components/popup/Popup";
import ReactDOM from "react-dom/client";

(() => {
  console.log(
    "%cHello From Web Context, [Creation] of ShadowDOM",
    "color:#BEAEE2;font-size: 1.2rem;"
  );

  const shadowHost = document.createElement("div");
  const shadowRoot = document.createElement("div");
  const shadowDOM = shadowHost.attachShadow({ mode: "closed" });
  const linkStyle = document.createElement("link");

  linkStyle.rel = "stylesheet";
  linkStyle.type = "text/css";
  linkStyle.href = chrome.runtime.getURL("./contentScripts/style.css");

  

  shadowRoot.id = "rootHinkku";

  shadowDOM.appendChild(linkStyle);
  shadowDOM.appendChild(shadowRoot);

  document.body.appendChild(shadowHost);

  ReactDOM.createRoot(shadowRoot).render(<App />);
})();

export {};

import logo from "./logo.svg";
import "./App.css";
import { useModal } from "./hooks/useModal";
import { MouseEvent, useEffect, useState } from "react";
import { Modal } from "./UI/molecules/modal/Modal";
import AiPlay from "./UI/atoms/icons/AiPlay";

export async function testCommunicationChrome() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  console.log(tab);

  if (!tab.id) return;

  chrome.tabs.sendMessage(
    tab.id,
    {
      extensionOpen: true,
      data: {},
    },
    function (response) {
      console.log(response);
    }
  );

  /*   chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: funcToBeExecutedOnWebTarget,
      args: ["Msg arguments from Extension"],
    },
    (injectionResults: any) => {
      console.log(injectionResults);
      for (const frameResult of injectionResults)
        console.log("Frame Title: " + frameResult.result);
    }
  ); */
}

export function funcToBeExecutedOnWebTarget(testHtmlButton: string) {
  const contextExtensionBody = document.body;

  console.log(
    "%cHello from [Context] Tab: ",
    "color: #F7DBF0; font-size:1.2rem;",
    contextExtensionBody,
    testHtmlButton
  );

  return {
    boyd: "haha",
  };
}

function App() {
  const [modalStatus1, positionAnimation1, , openModal1, closeModal1] =
    useModal(false);

  const [initPopup, setInitPopup] = useState(false);

  const [portConnection, setPortConnection] =
    useState<chrome.runtime.Port | null>(null);

  const handleOpenModal = (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    openModal1({ event });
  };

  const handleExtensionListener = (port: chrome.runtime.Port) => {
    console.log(port, "extension");
    console.assert(port.name === "hinkkuCon");
    setPortConnection(port);
  };

  const handlePortMessageListener = (msg: any) => {
    if (!portConnection) return;

    console.log(msg);
    if (msg.joke === "Knock knock")
      portConnection.postMessage({ question: "Who's there?" });
  };
  // pendiente tambien el typado para los mensajes
  //  pendiente
  const initChrome = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab.id) return;

    var port = chrome.tabs.connect(tab.id, { name: "hinkkuCon" });
    port.postMessage({ joke: "Knock knock" });
    port.onMessage.addListener(function (msg) {
      console.log(msg, " from extension");
      /* if (msg.question === "Who's there?")
        port.postMessage({ answer: "Madame" });
      else if (msg.question === "Madame who?")
        port.postMessage({ answer: "Madame... Bovary" }); */
    });
  };

  // init request & listener for content scripts
  useEffect(() => {
    //initChrome();
    testCommunicationChrome();
    chrome?.runtime?.onConnect?.addListener(handleExtensionListener);
    return () => {
      chrome?.runtime?.onConnect?.removeListener(handleExtensionListener);
    };
  }, []);

  // portConnection.onMessage Listener
  useEffect(() => {
    portConnection?.onMessage?.addListener(handlePortMessageListener);
    return () => {
      portConnection?.onMessage?.removeListener(handlePortMessageListener);
    };
  }, [portConnection]);

  const handlePopupInExtension = () => {
    setInitPopup((initPopup) => {
      testCommunicationChrome();
      return !initPopup;
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container__play">
          <AiPlay fontSize={"3.8rem"} color={"#fff"} />
        </div>

        <button type="button" onClick={handlePopupInExtension}>
          {initPopup ? "Popup active" : "Popup hidden"}
        </button>

        <button type="button" onClick={handleOpenModal}>
          {modalStatus1 ? "opened" : "closed"}
        </button>
      </header>

      <Modal
        isOpen={modalStatus1}
        posAnimationWrapper={positionAnimation1}
        onClose={closeModal1}
        closeByIcon={true}
        closeByClickOutside={true}
      >
        <div className="hola">
          <h1 className="text-3xl text-main">Probando</h1>
          <button onClick={closeModal1}>Cerrar</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;

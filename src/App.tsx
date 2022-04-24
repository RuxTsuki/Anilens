import logo from "./logo.svg";
import "./App.css";
import { useModal } from "./hooks/useModal";
import { MouseEvent, useState } from "react";
import { Modal } from "./components/modal/Modal";

export async function testCommunicationChrome(initPopup: boolean) {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  console.log(tab);

  if (!tab.id) return;

  chrome.tabs.sendMessage(
    tab.id,
    {
      greeting: "A Message from [Context] Extension to Open Popup",
      initPopup,
    },
    function ({ response }) {
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

  const handleOpenModal = (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    openModal1({ event });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button
          type="button"
          onClick={(ev: any) => {
            setInitPopup(!initPopup);
            testCommunicationChrome(!initPopup);
          }}
        >
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

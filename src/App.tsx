import logo from "./logo.svg";
import "./App.css";
import { useModal } from "./hooks/useModal";
import { MouseEvent, useState } from "react";
import { Modal } from "./components/modal/Modal";
import { renderToStaticMarkup, renderToString } from "react-dom/server";

export async function opene(func: Function) {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab.id) return;

  //chrome.tabs.sendMessage(tab.id, {greeting: true}, (e) => {console.log(e)})

/*   chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: funcToBeExecutedOnWebTarget,
      args: [{ htmlButton: <Button /> }],
    },
    (injectionResults: any) => {
      console.log(injectionResults);
      for (const frameResult of injectionResults)
        console.log(
          "Frame Title: " + frameResult.result,
          JSON.stringify(frameResult.result)
        );
    }
  ); */
}

export function funcToBeExecutedOnWebTarget(testHtmlButton?: any) {
  const contextExtensionBody = document.body;

  console.log("context tab", contextExtensionBody);
  console.log("context tab", testHtmlButton);

  const divFather = document.createElement("div");
  divFather.innerHTML = testHtmlButton.htmlButton;
  contextExtensionBody.appendChild(divFather);

  return {
    boyd: "haha",
  };
}

function Button() {
  const handleHelloWorld = () => {
    console.log("Hola mundo");
  };

  return (
    <>
      <button onClick={handleHelloWorld}>HOLA MUNDO</button>
    </>
  );
}

function App() {
  const [enable, setEnable] = useState(false);

  const [modalStatus1, positionAnimation1, , openModal1, closeModal1] =
    useModal(false);

  const handleOpenModal = (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    openModal1({ event });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button type="button" onClick={(ev: any) => opene(openModal1)}>
          test
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

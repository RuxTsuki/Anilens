import { MouseEvent, useEffect, useRef, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../UI/molecules/modal/Modal";
import "./popup.css";
function App() {
  const refRoot = useRef<HTMLDivElement>(null);

  const [modalStatus1, positionAnimation1, , openModal1, closeModal1] =
    useModal(false);
  const [portConnection, setPortConnection] =
    useState<chrome.runtime.Port | null>(null);

  const [episode, setEpisode] = useState<episodeServer | null>(null);

  const messagesFromReactAppListener = (
    msg: any,
    sender: any,
    sendResponse: any
  ) => {
    console.log(msg);
    if (msg.extensionOpen) {
      const port = chrome.runtime.connect({ name: "hinkkuCon" });
      setPortConnection(port);
      // portConnection?.postMessage({ joke: "Knock knock" });
    }
    //sendResponse({ response: document.URL });
  };

  const handleOpenModal = (
    event?: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    openModal1({ event });
  };

  const handlePortMessageListener = (msg: any) => {
    if (!portConnection) return;

    if (msg.episodeServer) {
      setEpisode(msg.episodeServer);
      handleOpenModal();
    }

    console.log(msg);
  };

  useEffect(() => {
    console.log(
      "%cHello From [Context] Web React ShadowTree",
      "color:#CDF0EA; font-size:1.2rem;"
    );
    chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
    /* =================================== */
    /*   port.postMessage({ joke: "Knock knock" });
    port.onMessage.addListener((msg) => {
      console.log(msg);
      port.postMessage({ answer: "Madame" });
    }); */

    return () => {
      chrome.runtime.onMessage.removeListener(messagesFromReactAppListener);
    };
  }, []);

  // portConnection.onMessage Listener
  useEffect(() => {
    portConnection?.onMessage?.addListener(handlePortMessageListener);
    return () => {
      portConnection?.onMessage?.removeListener(handlePortMessageListener);
    };
  }, [portConnection]);

  return (
    <div className="aaaaa" ref={refRoot}>
      {/* <button onClick={handleOpenModal}>Open Modal</button> */}

      <Modal
        isOpen={modalStatus1}
        containerWhereRender={refRoot.current?.parentElement!}
        posAnimationWrapper={positionAnimation1}
        typeSize={"custom"}
        onClose={closeModal1}
        closeByIcon={true}
      >
        <div className="modal__container-iframe">
          <div className="modal__iframe">
            {episode && <iframe src={episode.iframe} frameBorder="0"></iframe>}
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default App;

export type episodeServer = {
  iframe: string;
  name: string;
};

import { MouseEvent, useEffect, useRef } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../UI/molecules/modal/Modal";
import "./popup.css";

function App() {
  const refRoot = useRef<HTMLDivElement>(null);

  const [modalStatus1, positionAnimation1, , openModal1, closeModal1] =
    useModal(false);

  const messagesFromReactAppListener = (
    msg: any,
    sender: any,
    sendResponse: any
  ) => {
    console.log(
      "%cHello From [Context] Web React ShadowTree",
      "color:#CDF0EA; font-size:1.2rem;",
      msg
    );

    msg.initPopup ? openModal1() : closeModal1();

    sendResponse({ response: "rayos" });
  };

  const handleOpenModal = (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    openModal1({ event });
  };

  useEffect(() => {
    console.log(
      "%cHello From [Context] Web React ShadowTree",
      "color:#CDF0EA; font-size:1.2rem;"
    );
    chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messagesFromReactAppListener);
    };
  }, []);

  return (
    <div className="aaaaa" ref={refRoot}>
      <button onClick={handleOpenModal}>Open Modal</button>

      <Modal
        isOpen={modalStatus1}
        containerWhereRender={refRoot.current?.parentElement!}
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

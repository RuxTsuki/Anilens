import logo from "./logo.svg";
import "./App.css";
import { useModal } from "./hooks/useModal";
import { MouseEvent, useEffect, useState } from "react";
import { Modal } from "./UI/molecules/modal/Modal";
import AiPlay from "./UI/atoms/icons/AiPlay";
import MainLayout from "./layouts/MainLayout";
import ReactLoading from "react-loading";

/* 

cosas que necesito separar

funcion de enviar mensaje al content script

*/
export const urlbase1 = "http://127.0.0.1:5000/animeflv/server?url=";

export const urlbase = "http://127.0.0.1:5000/animeflv/episode?total=20&url=";

export async function testCommunicationChrome() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  //console.log(tab);

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

  return tab;
}

function App() {
  const [modalStatus1, positionAnimation1, , openModal1, closeModal1] =
    useModal(false);

  const [initPopup, setInitPopup] = useState(false);

  const [episodes, setEpisodes] = useState<episode[]>([]);
  const [loadingGetEpisodes, setloadingGetEpisodes] = useState(false);

  const [episode, setEpisode] = useState<episode | null>(null);

  const [servers, setServers] = useState<episodeServer[]>([]);
  const [loadingGetServers, setloadingGetServers] = useState(false);

  const [episodeServer, setEpisodeServer] = useState<episodeServer | null>(
    null
  );

  const [portConnection, setPortConnection] =
    useState<chrome.runtime.Port | null>(null);

  const handleOpenModal = (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    openModal1({ event });
  };

  const handleExtensionListener = (port: chrome.runtime.Port) => {
    setPortConnection(port);
  };

  const handlePortMessageListener = (msg: any) => {
    if (!portConnection) return;

    console.log(msg);
    if (msg.joke === "Knock knock")
      portConnection.postMessage({ question: "Who's there?" });
  };

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
    async function getTab() {
      const tab = await testCommunicationChrome();
      console.log(tab);
      setloadingGetEpisodes(true);
      if (tab && tab.url) {
        fetch(`${urlbase}${tab.url}`)
          .then((resp) => resp.json())
          .then((resp: listEpisodes) => setEpisodes(resp.episodes))
          .finally(() => setloadingGetEpisodes(false));
      }
    }

    getTab();

    //initChrome();
    // connection long
    chrome?.runtime?.onConnect?.addListener(handleExtensionListener);

    return () => {
      //portConnection?.postMessage({ question: "byebye" });
      chrome?.runtime?.onConnect?.removeListener(handleExtensionListener);
    };
  }, []);

  // useEffect

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

  const handleEpisode = (episode: episode) => {
    if (portConnection) {
      setEpisode(episode);
      // portConnection.postMessage({ episode });
    }
  };
  // get servers

  const handleServer = (server: episodeServer) => {
    setEpisodeServer(server);
  };

  useEffect(() => {
    const getEpisode = async () => {
      setloadingGetServers(true);
      const resp = await fetch(`${urlbase1}${episode?.url}`)
        .then((resp) => resp.json())
        .then((resp: getEpisode) => setServers(resp.server))
        .finally(() => setloadingGetServers(false));
    };

    episode && getEpisode();
  }, [episode]);

  useEffect(() => {
    if (episodeServer) {
      portConnection?.postMessage({ episodeServer });
    }
  }, [episodeServer]);

  return (
    <div className="App">
      <MainLayout />

      <ul className="ul">
        {loadingGetEpisodes ? (
          <div className="center">
            <ReactLoading type={"spinningBubbles"} color={"#fff"} />
          </div>
        ) : (
          episodes.map((episode) => (
            <li className="li" key={episode.url}>
              <div className="contianer-img">
                <img src={episode.img} alt="" />
                <div
                  onClick={() => handleEpisode(episode)}
                  className="container__play"
                >
                  <AiPlay fontSize={"3.8rem"} color={"#000"} />
                </div>
              </div>
              <h3>{episode.episode || episode.premiere_date}</h3>
            </li>
          ))
        )}
      </ul>

      <ul className="ul">
        {loadingGetServers ? (
          <div className="center">
            <ReactLoading type={"spinningBubbles"} color={"#fff"} />
          </div>
        ) : (
          servers.map((server) => (
            <li className="li" key={server.name}>
              <h3 onClick={() => handleServer(server)}>{server.name}</h3>
            </li>
          ))
        )}
      </ul>

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

export type listEpisodes = {
  episodes: episode[];
  total: number;
};

export type episode = {
  img: string;
  premiere_date?: string;
  title: string;
  url: string;
  episode?: string;
};

export type getEpisode = {
  server: episodeServer[];
  url: string;
};

export type episodeServer = {
  iframe: string;
  name: string;
};

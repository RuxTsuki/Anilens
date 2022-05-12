import { episode } from "App";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import AiPlay from "../UI/atoms/icons/AiPlay";
import { MockListEpisodes } from "../mocks/list-episodes";
import "./mainlayout.css";

type Props = {};

const MainLayout = (props: Props) => {
  const [episode, setEpisode] = useState<any>(null);
  const [listEpisodes, setlistEpisodes] = useState(MockListEpisodes);
  const [loadingGetEpisodes, setloadingGetEpisodes] = useState(false);

  const handleEpisodeSelected = (episode: episode) => {
    setEpisode(episode);
  };

  useEffect(() => {
    setloadingGetEpisodes(true);
    async function esperar() {
      setTimeout(() => {
        setloadingGetEpisodes(false);
      }, 1500);
    }
    esperar();
  }, []);

  return (
    <div className="main-layout">
      <header>
        <nav>
          <h2>Anime Title</h2>
        </nav>
      </header>

      <main className="main">
        <div className="media__section">
          <div className="episode__selected">
            {episode ? (
              <img src={episode.image} className="" />
            ) : (
              <p>Selecciona un episodio</p>
            )}
          </div>

          <div className="list__episodes">
            <ul className="ul">
              {loadingGetEpisodes ? (
                <div className="center">
                  <ReactLoading type={"spinningBubbles"} color={"#fff"} />
                </div>
              ) : (
                listEpisodes.map((episode) => (
                  <li className="li" key={episode.url}>
                    <div className="contianer-img">
                      <img
                        referrerPolicy="no-referrer"
                        src={episode.img}
                        alt=""
                      />
                      <div
                        onClick={() => handleEpisodeSelected(episode)}
                        className="container__play"
                      >
                        <AiPlay fontSize={"2rem"} color={"#000"} />
                      </div>
                    </div>
                    <h3>{episode.episode || episode.premiere_date}</h3>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </main>

      <footer>
        <h2>barra del video </h2>
      </footer>
    </div>
  );
};

export default MainLayout;

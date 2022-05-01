import React, { useState } from "react";

type Props = {};

const MainLayout = (props: Props) => {
  const [episodes, setEpisodes] = useState<any[]>([]);

  return (
    <div>
      <header>
        <h2>Anime Title</h2>
      </header>

      <main>
        <div className="episodes-section"></div>

        <div className="servers-section"></div>
      </main>
      <footer>
        <h2>barra del video </h2>
      </footer>
    </div>
  );
};

export default MainLayout;

import { useState } from "react";
import { createPortal } from "react-dom";
import "./popup.css";

type Props = {};



const Popup = (props?: Props) => {
  const [taran, settaran] = useState(false);

  if (taran) console.log("sisas");

  return createPortal(
    <div className="aaaaa">
      <button onClick={() => settaran(!taran)}>
        {taran ? "Enable" : "Disable"}
      </button>
    </div>,
    document.body
  );
};

Popup();

export default Popup;

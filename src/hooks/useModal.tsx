import { MouseEvent, useState } from "react";

interface ModalOpen {
  topModal?: number;
  leftModal?: number;
  event?: MouseEvent<HTMLButtonElement | HTMLAnchorElement>;
}

export const useModal = (
  initialState = false
) => {
  const [modal, setModal] = useState(initialState);

  const [positionModal, setPositionModal] = useState({
    topModal: 0,
    leftModal: 0,
  });

  const [positionAnimation, setPositionsAnimation] = useState({
    top: 0,
    left: 0,
  });

  const openModal = ({ topModal = 0, leftModal = 0, event }: ModalOpen = {}) => {
    setModal(true);
    setPositionModal({ topModal, leftModal });

    if (event) {
      const { clientX, clientY } = event;
      const animations = {
        top: clientY,
        left: clientX,
      };
      setPositionsAnimation(animations);
    }
  };
  const closeModal = () => setModal(false);

  return [modal, positionAnimation, positionModal, openModal, closeModal] as const;
};

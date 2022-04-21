import "./modal.css";
import { memo, MouseEvent } from "react";
import { createPortal } from "react-dom";
import { CloseIconSvg } from "./modal-svg-icons/CloseIconSvg";
import { WrapperAnimation } from "./WrapperAnimation";
import { useDrag } from "./hooks/useDrag";

export interface PropsModal {
  isOpen: boolean;
  onClose?: () => void;
  closeByIcon?: boolean;
  closeByClickOutside?: boolean;
  children?: any;
  draggable?: boolean;
  titleColorClass?: string;
  bgColorClass?: string;
  modalAnimationClass?: string;
  position?: "centered" | "custom";
  typeSize?: "default" | "custom";
  animationWrapper?: boolean;
  animationBgColor?: string;
  topModal?: number;
  leftModal?: number;
  posAnimationWrapper?: { top: number; left: number };
  header?: boolean;
  title?: string;
  titleIconElement?: any;
  id?: string;
  modalCustomClass?: string;
}

export const Modal = memo(
  ({
    isOpen,
    children,
    onClose,
    draggable = true,
    closeByIcon = false,
    closeByClickOutside = false,
    animationBgColor = "rgba(18, 21, 25, 0.5)",
    titleColorClass = "",
    bgColorClass = "modal__bg-color",
    animationWrapper = true,
    modalAnimationClass = "",
    position = "centered",
    typeSize = "default",
    topModal = 0,
    leftModal = 0,
    posAnimationWrapper = { top: 0, left: 0 },
    header = true,
    title = "",
    titleIconElement,
    id = "",
    modalCustomClass = "",
  }: PropsModal) => {
    const { measuredRef, measuredRefTrigger } = useDrag();

    const wrapperAnimationProps = {
      animationWrapper,
      ...posAnimationWrapper,
      animationBgColor,
    };

    const positionModal = {
      top: `${topModal}px`,
      left: `${leftModal}px`,
    };

    const handleCloseModal = () => {
      onClose && closeByIcon && onClose();
    };

    const handleCloseModalClickOutsider = () => {
      onClose && closeByClickOutside && onClose();
    };

    const gridLayoutHeader =
      header && (title || titleIconElement)
        ? `modal__container-grid-layout`
        : "";

    const handleClosePropagation = (ev: MouseEvent<HTMLDivElement>) => {
      ev.stopPropagation();
    };

    return createPortal(
      <>
        {isOpen && (
          <div className="modal__container">
            <WrapperAnimation {...wrapperAnimationProps} />

            <div
              id={id}
              className={`modal__container-content ${modalCustomClass}`}
              onClick={handleCloseModalClickOutsider}
            >
              <div
                className={`
              ${bgColorClass}
              ${gridLayoutHeader}
              ${modalAnimationClass}
              ${position === "centered" && "modal__place-self-center"}
              ${
                typeSize === "default" && "modal__layout-default-sizes"
              }              
            `}
                ref={measuredRef}
                style={position === "custom" ? positionModal : {}}
                onClick={handleClosePropagation}
              >
                {closeByIcon && (
                  <button
                    className="modal__close-btn"
                    onClick={handleCloseModal}
                  >
                    <CloseIconSvg />
                  </button>
                )}

                {draggable && (
                  <div
                    ref={measuredRefTrigger}
                    className="modal__header-dragger"
                  ></div>
                )}

                {header && (
                  <div className="modal__header">
                    <h3 className={`modal__header-title ${titleColorClass}`}>
                      {title}
                    </h3>

                    <div className="modal__header-icon">{titleIconElement}</div>
                  </div>
                )}

                {children}
              </div>
            </div>
          </div>
        )}
      </>,
      document.querySelector("body") as HTMLBodyElement
    );
  }
);

import "./modal.css";
import { memo, MouseEvent } from "react";
import { createPortal } from "react-dom";
import { CloseIconSvg } from "./modal-svg-icons/CloseIconSvg";
import { WrapperAnimation } from "./WrapperAnimation";
import { useDrag } from "./hooks/useDrag";

export interface PropsModal {
  animationBgColor?: string;
  animationWrapper?: boolean;
  bgColorClass?: string;
  children?: any;
  closeByClickOutside?: boolean;
  closeByIcon?: boolean;
  containerWhereRender?: HTMLElement;
  draggable?: boolean;
  id?: string;
  isOpen: boolean;
  leftModal?: number;
  modalAnimationClass?: string;
  modalCustomClass?: string;
  /**
   * Required if prop `closeByIcon` or `closeByClickOutside` is true
   */
  onClose?: () => void;
  posAnimationWrapper?: { top: number; left: number };
  position?: "centered" | "custom";
  topModal?: number;
  typeSize?: "default" | "custom";
}

export const Modal = memo(
  ({
    animationBgColor = "rgba(18, 21, 25, 0.5)",
    animationWrapper = true,
    bgColorClass = "modal__bg-color",
    children,
    closeByClickOutside = false,
    closeByIcon = false,
    containerWhereRender = document.body,
    draggable = true,
    id = "",
    isOpen,
    leftModal = 0,
    modalAnimationClass = "",
    modalCustomClass = "",
    onClose,
    posAnimationWrapper = { top: 0, left: 0 },
    position = "centered",
    topModal = 0,
    typeSize = "default",
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
                    <CloseIconSvg height="1.125rem" />
                  </button>
                )}

                {draggable && (
                  <div
                    ref={measuredRefTrigger}
                    className="modal__header-dragger"
                  ></div>
                )}

                {children}
              </div>
            </div>
          </div>
        )}
      </>,
      containerWhereRender
    );
  }
);

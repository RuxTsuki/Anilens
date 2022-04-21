import { useCallback, useEffect, useState } from "react";

export enum DraggingState {
  undefined = -1,
  starts = 0,
  moves = 1,
  finished = 2,
}

/**
 * A basic Hook for drag elements,
 *
 * how to use:
 *
 * Assign the attribute `ref={measuredRef}` to the element you want to drag. (required)
 *
 * Assign the attribute `ref={measuredRefTrigger}` to the element you want that trigger the drag event. (optional)
 *
 * if `measuredRefTrigger` is not present, the element that trigger the event will be `measuredRef`.
 *
 * points: are the coordinates of the measuredRef.
 *
 * state: is the state of the dragged element, if the status is start, move or finish
 *
 * @returns ref, refTrigger, measuredRef, measuredRefTrigger, state, points
 */
export const useDrag = () => {
  const [state, setState] = useState(DraggingState.undefined); // dragging state to know if the status is start, move or finish
  const [ref, setRef] = useState<HTMLDivElement | null>(null); // element that wil be dragged
  const [refTrigger, setRefTrigger] = useState<HTMLDivElement | null>(null); // element that trigger the drag event
  // coordinates of the draggable element
  const [points, setPoints] = useState({
    top: ref?.style.top,
    left: ref?.style.left,
  });
  // positions to handle the draggable element
  const [positions, setPositions] = useState({
    pos1: 0,
    pos2: 0,
    pos3: 0,
    pos4: 0,
  });

  /**
   * Assign the `DraggingState`
   */
  const isDragging = useCallback(
    () => state === DraggingState.starts || state === DraggingState.moves,
    [state]
  );

  /**
   * Assign the initial position of the dragged element at the start position.
   */
  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      if (e.button !== 0 || !ref) return;

      setPositions((pos) => ({ ...pos, pos3: e.clientX, pos4: e.clientY }));
      setState(DraggingState.starts);
    },
    [ref]
  );

  /**
   * Set the dragging state, points and assign the coordinates to the draggable element.
   */
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging() || !ref) return;

      setPositions({
        pos1: positions.pos3 - e.clientX,
        pos2: positions.pos4 - e.clientY,
        pos3: e.clientX,
        pos4: e.clientY,
      });

      setState(DraggingState.moves);
      setPoints({
        top: `${ref.offsetTop - positions.pos2}px`,
        left: `${ref.offsetLeft - positions.pos1}px`,
      });

      ref.style.top = `${ref.offsetTop - positions.pos2}px`;
      ref.style.left = `${ref.offsetLeft - positions.pos1}px`;
    },
    [
      isDragging,
      ref,
      positions.pos1,
      positions.pos2,
      positions.pos3,
      positions.pos4,
    ]
  );

  /**
   * Ends up the flow by setting the state finished
   * @param _ MouseEvent
   * @returns void
   */
  const onMouseUp = (_: MouseEvent) => setState(DraggingState.finished);

  /**
   * That's a fix for touch pads that transfer touches to click.
   * Ex: "Tap to click" on macos. When enabled, on tap mouseDown is fired,
   * but mouseUp isn't. In this case we invoke mouseUp manually, to trigger
   * finishing state
   * @param _ MouseEvent
   * @returns void
   */
  const onClick = (_: MouseEvent) => setState(DraggingState.finished);

  /**
   * Set the ref of the element that will be dragged
   */
  const measuredRef = useCallback((node: HTMLDivElement) => setRef(node), []);

  /**
   * Set the ref of the element that will trigger the drag event
   */
  const measuredRefTrigger = useCallback(
    (node: HTMLDivElement) => setRefTrigger(node),
    []
  );

  useEffect(() => {
    const element = refTrigger || ref;
    element?.addEventListener("mousedown", onMouseDown);

    return () => element?.removeEventListener("mousedown", onMouseDown);
  }, [ref, refTrigger, onMouseDown]);

  // Every time the state changes, assign or remove
  // the corresponding mousemove, mouseup and click handlers
  useEffect(() => {
    if (isDragging()) {
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("mousemove", onMouseMove);
      document?.addEventListener("mouseleave", onMouseUp);
      document.addEventListener("click", onClick);
    } else {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
      document?.removeEventListener("mouseleave", onMouseUp);
      document.removeEventListener("click", onClick);
    }
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
      document?.removeEventListener("mouseleave", onMouseUp);
      document.removeEventListener("click", onClick);
    };
  }, [state, isDragging, onMouseMove, refTrigger]);

  return {
    ref,
    refTrigger,
    measuredRef,
    measuredRefTrigger,
    state,
    points,
  };
};

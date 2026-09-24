import { useCallback, useRef, useState } from 'react';
import type { MouseEvent, PointerEvent } from 'react';

interface DragState {
  startX: number;
  startScroll: number;
  moved: boolean;
}

/** Adds mouse drag without taking ownership of the native touch scroll. */
export const useHorizontalDrag = () => {
  const dragRef = useRef<DragState | null>(null);
  const suppressClickRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const onPointerDown = useCallback((event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;

    dragRef.current = {
      startX: event.clientX,
      startScroll: event.currentTarget.scrollLeft,
      moved: false,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setIsDragging(true);
  }, []);

  const onPointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || event.pointerType !== 'mouse') return;

    const deltaX = event.clientX - drag.startX;
    if (Math.abs(deltaX) > 4) drag.moved = true;
    if (!drag.moved) return;

    event.preventDefault();
    event.currentTarget.scrollLeft = drag.startScroll - deltaX;
  }, []);

  const endPointerDrag = useCallback((event: PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag) return;

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (drag.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }

    dragRef.current = null;
    setIsDragging(false);
  }, []);

  const onClickCapture = useCallback((event: MouseEvent<HTMLElement>) => {
    if (!suppressClickRef.current) return;

    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  }, []);

  return {
    isDragging,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endPointerDrag,
      onPointerCancel: endPointerDrag,
      onClickCapture,
    },
  };
};

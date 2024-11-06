"use client";
import {
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableStateSnapshot,
} from "@hello-pangea/dnd";
import { useEffect, useState, PropsWithChildren, memo } from "react";
// import {
//   Droppable,
//   DroppableProps,
//   DroppableProvided,
//   DroppableStateSnapshot,
// } from "react-beautiful-dnd";

type StrictModeDroppableProps = Omit<DroppableProps, "children"> & {
  children: (
    provided: DroppableProvided,
    snapshot: DroppableStateSnapshot
  ) => React.ReactElement;
};

const StrictModeDroppableComponent = ({
  children,
  ...props
}: StrictModeDroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Using Promise to defer the enabling of the droppable
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

// Use memo to prevent unnecessary re-renders
export const StrictModeDroppable = memo(StrictModeDroppableComponent);

// Opcional: Si necesitas el tipo para usar en otros componentes
export type { StrictModeDroppableProps };

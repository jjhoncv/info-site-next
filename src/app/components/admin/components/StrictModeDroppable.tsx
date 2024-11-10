"use client";
import {
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableStateSnapshot,
} from "@hello-pangea/dnd";
import { useEffect, useState, PropsWithChildren, memo } from "react";

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

export const StrictModeDroppable = memo(StrictModeDroppableComponent);

export type { StrictModeDroppableProps };

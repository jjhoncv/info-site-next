import { Edit2, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const PopupTableMenuAction = () => {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState<{
    item?: any;
    show: boolean;
    target?: HTMLElement;
    render?: (id: string) => React.ReactNode;
  }>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updateMenuPosition = () => {
    if (!open?.target || !dropdownRef.current) return;

    const targetRect = open.target.getBoundingClientRect();
    const menuRect = dropdownRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Posicionar inicialmente a la derecha del target
    let left = targetRect.right;
    let top = targetRect.top;

    // Si no hay espacio a la derecha, posicionar a la izquierda
    if (left + menuRect.width > windowWidth) {
      left = targetRect.left - menuRect.width;
    }

    // Si no hay espacio abajo, ajustar hacia arriba
    if (top + menuRect.height > windowHeight) {
      top = windowHeight - menuRect.height;
    }

    // Evitar que el menú salga de la pantalla
    left = Math.max(0, Math.min(left, windowWidth - menuRect.width));
    top = Math.max(0, Math.min(top, windowHeight - menuRect.height));

    dropdownRef.current.style.left = `${left + 30}px`;
    dropdownRef.current.style.top = `${top + 30}px`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        event.target !== open?.target
      ) {
        setOpen({ show: false });
      }
    };

    const handleResize = () => {
      updateMenuPosition();
    };

    const handleScroll = () => {
      updateMenuPosition();
    };

    const handlePopupEvent = (e: CustomEvent) => {
      e.stopImmediatePropagation();
      const targetElement = e.detail.target as HTMLElement;
      const render = e.detail.render as (id: string) => React.ReactNode;
      const item = e.detail.item as any;

      setOpen((prev) => ({
        item,
        show: !prev?.show,
        target: targetElement,
        render,
      }));
    };

    if (open?.show) {
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll, true);
      document.addEventListener("mousedown", handleClickOutside);
      requestAnimationFrame(updateMenuPosition);
    }

    document.addEventListener(
      "sendPopupEvent",
      handlePopupEvent as EventListener
    );

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener(
        "sendPopupEvent",
        handlePopupEvent as EventListener
      );
    };
  }, [open?.show, open?.target, open?.render, open?.item]);

  if (!open?.show) return null;

  console.log("open", open);

  return (
    <div className="fixed" style={{ zIndex: 20 }} ref={dropdownRef}>
      <div className="rounded min-w-max bg-white border shadow-lg px-1 py-1">
        <div className="flex flex-col gap-1">
          {open?.render?.(open.item.id)}
        </div>
      </div>
    </div>
  );
};

export default PopupTableMenuAction;

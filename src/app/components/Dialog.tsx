import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnClickOutside?: boolean;
  showCloseButton?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  closeOnClickOutside = true,
  showCloseButton = true,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Manejar ESC para cerrar
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Manejar focus trap
  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      dialogRef.current?.focus();

      // Prevenir scroll del body
      document.body.style.overflow = "hidden";
    } else {
      // Restaurar scroll
      document.body.style.overflow = "";
      previousActiveElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Tamaños predefinidos
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-[90vw] max-h-[90vh]",
  };

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby={title ? "dialog-title" : undefined}
      aria-describedby={description ? "dialog-description" : undefined}
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
        aria-hidden="true"
        onClick={closeOnClickOutside ? onClose : undefined}
      />

      {/* Dialog posicionamiento */}
      <div className="min-h-screen px-4 text-center">
        {/* Hack para centrado vertical */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        {/* Dialog */}
        <div
          ref={dialogRef}
          className={`inline-block w-full ${sizeClasses[size]} my-8 p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg`}
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex justify-between items-center mb-4">
              {title && (
                <h3
                  id="dialog-title"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="rounded-full p-1 hover:bg-gray-100 transition-colors"
                  aria-label="Cerrar"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          )}

          {/* Description */}
          {description && (
            <div id="dialog-description" className="text-sm text-gray-500 mb-4">
              {description}
            </div>
          )}

          {/* Content */}
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

// Componente para confirmar acciones
interface ConfirmDialogProps extends Omit<DialogProps, "children"> {
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
  content?: React.ReactNode;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmButtonClassName = "bg-red-500 hover:bg-red-600 text-white",
  cancelButtonClassName = "bg-white hover:bg-gray-50 border border-gray-300",
  content,
  ...dialogProps
}) => {
  return (
    <Dialog {...dialogProps}>
      <div className="space-y-4">
        {content && <div className="py-2">{content}</div>}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className={`px-4 py-2 rounded-md text-sm font-medium ${cancelButtonClassName}`}
            onClick={dialogProps.onClose}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-md text-sm font-medium ${confirmButtonClassName}`}
            onClick={() => {
              onConfirm();
              dialogProps.onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

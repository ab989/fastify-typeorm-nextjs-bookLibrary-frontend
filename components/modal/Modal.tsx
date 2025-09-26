import React, { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  ariaLabel?: string; // fallback if no title
  initialFocusRef?: React.RefObject<HTMLElement | null>;
}

const SIZE_CLASS: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "w-full h-full m-0 max-w-none",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnBackdrop = true,
  showCloseButton = true,
  ariaLabel,
  initialFocusRef,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      lastActiveElement.current = document.activeElement as HTMLElement | null;

      // After opening, move focus into dialog (prefer initialFocusRef)
      requestAnimationFrame(() => {
        const target = initialFocusRef?.current ?? dialogRef.current;
        if (target && (target as HTMLElement).focus) (target as HTMLElement).focus();
      });

      // Prevent body scroll while modal is open
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    } else {
      // restore focus to previously active element
      if (lastActiveElement.current && lastActiveElement.current.focus) {
        lastActiveElement.current.focus();
      }
    }
  }, [isOpen, initialFocusRef]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab" && isOpen) {
        // simple focus trap
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (!closeOnBackdrop) return;
    if (e.target === overlayRef.current) onClose();
  };

  // Render nothing on server-side / when no document
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden={!isOpen}
        >
          {/* Backdrop */}
          <div
            ref={overlayRef}
            onMouseDown={handleBackdropClick}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Dialog container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title ? undefined : ariaLabel}
            aria-labelledby={title ? "modal-title" : undefined}
            tabIndex={-1}
            ref={dialogRef}
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`relative z-10 w-full ${SIZE_CLASS[size]} max-h-[90vh] overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-xl ring-1 ring-black/10`}
            style={{ outline: "none" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-b-slate-100 p-4 dark:border-b-slate-700">
              <div className="flex items-start gap-3">
                {title ? (
                  <h2 id="modal-title" className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {title}
                  </h2>
                ) : null}
              </div>

              <div className="flex items-center gap-2">
                {showCloseButton && (
                  <button
                    aria-label="Close dialog"
                    onClick={onClose}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent transition hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="p-4 overflow-auto text-slate-700 dark:text-slate-300">
              {children}
            </div>

            {/* Footer */}
            {footer ? (
              <div className="flex flex-col-reverse gap-2 border-t border-t-slate-100 p-4 dark:border-t-slate-700 sm:flex-row sm:justify-end">
                {footer}
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

'use client';

import Modal from "./Modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  confirmMsg?: string;
  confirmRef?: React.RefObject<HTMLElement | null>;
}


export default function ConfirmDialog({
    isOpen,
    handleClose,
    confirmMsg,
    confirmRef,
    handleConfirm,
  }: ConfirmDialogProps) {
  return (
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Confirm action"
        size="md"
        initialFocusRef={confirmRef}
        footer={(
          <>
            <button
              onClick={handleClose}
              className="rounded-md border border-slate-200 px-4 py-2 text-sm bg-white hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="rounded-md bg-rose-600 px-4 py-2 text-sm text-white hover:bg-rose-700"
            >
              Confirm
            </button>
          </>
        )}
      >
        <p>{confirmMsg ?? 'Are you sure to perform this action'}</p>
      </Modal>
  );
}

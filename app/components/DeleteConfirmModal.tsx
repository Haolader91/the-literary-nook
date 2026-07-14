"use client";

import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isLoading?: boolean;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm transition-all">
      <div
        className="bg-white border border-stone-200/60 rounded-3xl max-w-md w-full p-6 md:p-8 text-center shadow-xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-rose-500 rounded-t-3xl"></div>

        <div className="flex justify-center mb-5">
          <div className="p-4 bg-rose-50 text-rose-500 rounded-full border border-rose-100">
            <FiAlertTriangle size={32} className="animate-bounce" />
          </div>
        </div>

        <h3 className="text-lg font-black text-stone-900 uppercase tracking-wide">
          {title}
        </h3>
        <p className="text-xs font-black text-rose-500 uppercase tracking-widest mt-1">
          Are you absolutely sure?
        </p>

        <p className="text-sm text-stone-500 leading-relaxed mt-4 mb-8">
          {message}
        </p>

        <div className="flex gap-3 justify-center">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-black uppercase tracking-wider rounded-xl transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors shadow-sm disabled:opacity-50 min-h-[44px]"
          >
            {isLoading ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              "Yes, Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;

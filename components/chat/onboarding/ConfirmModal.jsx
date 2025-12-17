export default function ConfirmModal({ confirmState, onClose }) {
  if (!confirmState.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl border border-gray-200 shadow-xl p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              {confirmState.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{confirmState.body}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-800 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const action = confirmState.action;
              onClose();
              action?.();
            }}
            className="h-9 px-4 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800"
          >
            {confirmState.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

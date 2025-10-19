interface ConfirmModalProps {
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmModal = ({
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onCancel}
      aria-modal="true"
      role="dialog"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-message"
    >
      <div className="bg-gray-50 p-6 rounded-md shadow-lg w-90 space-y-4 m-4">
        <h1
          id="confirm-modal-title"
          className="text-gray-800 text-xl font-semibold"
        >
          {title}
        </h1>
        <p id="confirm-modal-desc" className="text-gray-500">
          {message}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={onCancel}
            autoFocus={true}
            className="px-4 py-2 rounded bg-gray-500 text-white hover:opacity-50 cursor-pointer uppercase"
            data-testid="cancel-delete"
          >
            No, Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-pink-400 text-white hover:opacity-50 cursor-pointer uppercase"
            data-testid="confirm-delete"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal

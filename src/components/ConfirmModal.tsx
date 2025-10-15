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
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-80 space-y-4">
        <h1 className="text-gray-800 text-xl font-bold">{title}</h1>
        <p className="text-gray-800">{message}</p>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-300 cursor-pointer"
          >
            No, Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal

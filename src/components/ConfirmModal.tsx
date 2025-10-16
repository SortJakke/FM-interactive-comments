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
      <div className="bg-gray-50 p-6 rounded-md shadow-lg w-90 space-y-4 m-4">
        <h1 className="text-gray-800 text-xl font-semibold">{title}</h1>
        <p className="text-gray-500">{message}</p>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-500 text-white hover:opacity-50 cursor-pointer uppercase"
          >
            No, Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-pink-400 text-white hover:opacity-50 cursor-pointer uppercase"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal

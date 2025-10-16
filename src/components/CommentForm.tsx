import { useState } from "react"
import type { User } from "../types/types"

interface Props {
  currentUser: User
  onSubmit: (content: string) => void
  replyingTo?: string
  initialContent?: string
  actionLabel?: string
}

const CommentForm = ({
  currentUser,
  onSubmit,
  replyingTo,
  initialContent,
  actionLabel,
}: Props) => {
  const [content, setContent] = useState(initialContent ? initialContent : "")

  const isEdit = actionLabel === "Edit"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    onSubmit(content)
    setContent("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row gap-4 ${
        isEdit ? "mt-4" : "bg-white p-4 rounded shadow"
      }`}
    >
      {isEdit ? (
        ""
      ) : (
        <div className="w-10 hidden sm:block">
          <img
            src={currentUser.image.png}
            alt={currentUser.username}
            className="w-10 h-10 rounded-full"
          />
        </div>
      )}

      <textarea
        className="w-full p-4 border border-gray-100 rounded resize-none focus:outline-none focus:ring-2 focus:ring-purple-600 sm:flex-1"
        rows={3}
        placeholder={
          replyingTo ? `Responding to ${replyingTo}` : "Add a comment..."
        }
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {isEdit ? (
        <button
          type="submit"
          className="sm:hidden w-fit ml-auto bg-purple-600 text-white px-6 py-2 rounded hover:opacity-50 transition cursor-pointer uppercase"
        >
          {actionLabel}
        </button>
      ) : (
        <div className="flex items-center justify-between sm:hidden">
          <img
            src={currentUser.image.png}
            alt={currentUser.username}
            className="w-10 h-10 rounded-full"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded hover:opacity-50 transition cursor-pointer uppercase"
          >
            {actionLabel}
          </button>
        </div>
      )}

      <div>
        <button
          type="submit"
          className="hidden sm:block bg-purple-600 text-white px-6 py-2 rounded hover:opacity-50 transition cursor-pointer uppercase"
        >
          {actionLabel}
        </button>
      </div>
    </form>
  )
}

export default CommentForm

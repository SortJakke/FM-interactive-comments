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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    onSubmit(content)
    setContent("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-sm flex flex-col gap-4"
    >
      <textarea
        className="w-full p-4 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
        placeholder={
          replyingTo ? `Responding to ${replyingTo}` : "Add a comment..."
        }
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex items-center justify-between">
        <img
          src={currentUser.image.png}
          alt={currentUser.username}
          className="w-10 h-10 rounded-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
        >
          {actionLabel}
        </button>
      </div>
    </form>
  )
}

export default CommentForm

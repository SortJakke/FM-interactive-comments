import { useState } from "react"
import type { User } from "../types/types"

interface Props {
  currentUser: User
  onSubmit: (content: string) => void
  replyingTo?: string
  initialContent?: string
  actionLabel?: string
  autoFocus?: boolean
}

const CommentForm = ({
  currentUser,
  onSubmit,
  replyingTo,
  initialContent,
  actionLabel,
  autoFocus,
}: Props) => {
  const [content, setContent] = useState(initialContent ? initialContent : "")

  const isEdit = actionLabel === "Edit"

  const submitContent = () => {
    if (!content.trim()) return
    onSubmit(content)
    setContent("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitContent()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      submitContent()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row gap-4 ${
        isEdit ? "mt-4" : "bg-white p-4 rounded shadow"
      }`}
    >
      <label htmlFor="comment-content" className="sr-only">
        {replyingTo ? `Responding to ${replyingTo}` : "Add a comment"}
      </label>

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
        id="comment-content"
        aria-describedby="comment-help"
        aria-required="true"
        aria-label={
          replyingTo ? `Responding to ${replyingTo}` : "Add a comment"
        }
        onKeyDown={handleKeyDown}
        autoFocus={autoFocus}
        className="w-full p-4 border text-gray-800 border-gray-100 rounded resize-none sm:flex-1"
        rows={3}
        placeholder={
          replyingTo ? `Responding to ${replyingTo}` : "Add a comment..."
        }
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div id="comment-help" className="sr-only" aria-live="polite">
        Enter your comment. Press Enter to submit.
      </div>

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

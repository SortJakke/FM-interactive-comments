import type { Comment, User } from "../types/types"
import { useState, useEffect, useRef } from "react"
import ReplyCard from "./ReplyCard"
import CommentForm from "./CommentForm"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faReply, faPen, faTrash } from "@fortawesome/free-solid-svg-icons"

interface Props {
  comment: Comment
  currentUser: User
  onReply: (commentId: number, content: string, replyingTo: string) => void
  onEdit: (commentId: number, newContent: string) => void
  onEditReply: (commentId: number, replyId: number, newContent: string) => void
  onDelete: (commentId: number) => void
  onDeleteReply: (commentId: number, replyId: number) => void
  onVote: (commentId: number, direction: "up" | "down") => void
  onVoteReply: (replyId: number, direction: "up" | "down") => void
}

const CommentCard = ({
  comment,
  currentUser,
  onReply,
  onEdit,
  onEditReply,
  onDelete,
  onDeleteReply,
  onVote,
  onVoteReply,
}: Props) => {
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showReplies, setShowReplies] = useState(false)

  const isOwner = comment.user.username === currentUser.username

  const elRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return
    el.setAttribute("aria-controls", `replies-${comment.id}`)
  }, [comment.id])

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow-sm text-gray-500 flex gap-4">
        <div className="w-[30px] hidden sm:block">
          <div className="h-fit flex flex-col items-center rounded-md font-medium text-gray-400 bg-gray-100">
            <button
              type="button"
              aria-label={`Upvote comment by ${comment.user.username}`}
              onClick={() => onVote(comment.id, "up")}
              className="px-2 py-1 hover:text-purple-600 cursor-pointer"
            >
              +
            </button>
            <span className="text-purple-600" aria-live="polite">
              {comment.score}
            </span>
            <button
              type="button"
              aria-label={`Downvote comment by ${comment.user.username}`}
              onClick={() => onVote(comment.id, "down")}
              className="px-2 py-1 hover:text-purple-600 cursor-pointer"
            >
              –
            </button>
          </div>
        </div>
        <div className="w-full sm:flex-1">
          <div className="flex items-center gap-4">
            <img
              src={comment.user.image.png}
              alt={comment.user.username}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex items-center gap-2 font-semibold text-gray-800">
              {comment.user.username}
              {isOwner ? (
                <div className="bg-purple-600 text-gray-50 px-2 rounded">
                  you
                </div>
              ) : (
                ""
              )}
            </div>
            <div>{comment.createdAt}</div>
            <div className="hidden sm:block ml-auto">
              {isOwner ? (
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => onDelete(comment.id)}
                    className="text-pink-400 text-sm font-medium hover:opacity-60 cursor-pointer "
                  >
                    <FontAwesomeIcon aria-hidden="true" icon={faTrash} />
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-purple-600 text-sm font-medium hover:opacity-60 cursor-pointer "
                  >
                    <FontAwesomeIcon aria-hidden="true" icon={faPen} />
                    Edit
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsReplying(!isReplying)}
                  className="text-purple-600 text-sm font-medium ml-auto hover:opacity-60 cursor-pointer "
                >
                  <FontAwesomeIcon aria-hidden="true" icon={faReply} />
                  Reply
                </button>
              )}
            </div>
          </div>
          {isEditing ? (
            <CommentForm
              currentUser={currentUser}
              actionLabel="Edit"
              initialContent={comment.content}
              autoFocus
              onSubmit={(content) => {
                onEdit(comment.id, content)
                setIsEditing(false)
              }}
            />
          ) : (
            <p className="mt-4 text-gray-500">{comment.content}</p>
          )}
          <div className="flex items-center justify-between mt-4 sm:hidden">
            <div className="w-fit flex items-center gap-2 rounded-md font-medium text-gray-400 bg-gray-100">
              <button
                type="button"
                aria-label={`Upvote comment by ${comment.user.username}`}
                onClick={() => onVote(comment.id, "up")}
                className="px-2 py-1 hover:text-purple-600 cursor-pointer"
              >
                +
              </button>
              <span className="text-purple-600" aria-live="polite">
                {comment.score}
              </span>
              <button
                type="button"
                aria-label={`Downvote comment by ${comment.user.username}`}
                onClick={() => onVote(comment.id, "down")}
                className="px-2 py-1 hover:text-purple-600 cursor-pointer"
              >
                –
              </button>
            </div>
            {isOwner ? (
              <div className="flex gap-4 ml-auto">
                <button
                  type="button"
                  onClick={() => onDelete(comment.id)}
                  className="text-pink-400 text-sm font-medium hover:opacity-60 cursor-pointer "
                >
                  <FontAwesomeIcon aria-hidden="true" icon={faTrash} />
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-purple-600 text-sm font-medium hover:opacity-60 cursor-pointer "
                >
                  <FontAwesomeIcon aria-hidden="true" icon={faPen} />
                  Edit
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsReplying(!isReplying)}
                className="text-purple-600 text-sm font-medium ml-auto hover:opacity-60 cursor-pointer "
              >
                <FontAwesomeIcon aria-hidden="true" icon={faReply} />
                Reply
              </button>
            )}
          </div>
          {comment.replies.length > 0 && (
            <button
              type="button"
              ref={elRef}
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-2 text-sm font-medium text-purple-600 rounded-md px-2 py-1 mt-4 hover:bg-gray-100 cursor-pointer"
            >
              {showReplies ? (
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="5 16 12 8 19 16" />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="5 8 12 16 19 8" />
                </svg>
              )}
              {comment.replies.length} replies
            </button>
          )}
        </div>
      </div>

      {isReplying && (
        <CommentForm
          currentUser={currentUser}
          replyingTo={comment.user.username}
          autoFocus
          actionLabel="Reply"
          onSubmit={(content) => {
            onReply(comment.id, content, comment.user.username)
            setIsReplying(false)
          }}
        />
      )}

      {showReplies && comment.replies.length > 0 && (
        <div
          id={`replies-${comment.id}`}
          className="space-y-4 pl-8 shadow"
          role="region"
          aria-label={`Replies for comment by ${comment.user.username}`}
        >
          {comment.replies
            .slice()
            .sort((a, b) => b.score - a.score)
            .map((reply) => (
              <ReplyCard
                key={reply.id}
                reply={reply}
                currentUser={currentUser}
                onReply={(replyingTo, content) =>
                  onReply(comment.id, content, replyingTo)
                }
                onEdit={(replyId, newContent) =>
                  onEditReply(comment.id, replyId, newContent)
                }
                onDelete={(replyId) => onDeleteReply(comment.id, replyId)}
                onVote={onVoteReply}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default CommentCard

import { useState } from "react"
import type { Comment, User } from "../types/types"
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
}

const CommentCard = ({
  comment,
  currentUser,
  onReply,
  onEdit,
  onEditReply,
  onDelete,
  onDeleteReply,
}: Props) => {
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const isOwner = comment.user.username === currentUser.username

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={comment.user.image.png}
            alt={comment.user.username}
            className="w-10 h-10 rounded-full"
          />
          <div className="font-semibold">{comment.user.username}</div>
          <div className="text-gray-500">{comment.createdAt}</div>
          {isOwner ? (
            <div className="flex gap-4 ml-auto">
              <button
                onClick={() => onDelete(comment.id)}
                className="text-red-500 text-sm font-medium hover:opacity-60 cursor-pointer flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faTrash} />
                Delete
              </button>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-blue-500 text-sm font-medium hover:opacity-60 cursor-pointer flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faPen} />
                Edit
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="text-blue-500 text-sm font-medium ml-auto hover:opacity-60 cursor-pointer flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faReply} />
              Reply
            </button>
          )}
        </div>
        {isEditing ? (
          <CommentForm
            currentUser={currentUser}
            actionLabel="Edit"
            initialContent={comment.content}
            onSubmit={(content) => {
              onEdit(comment.id, content)
              setIsEditing(false)
            }}
          />
        ) : (
          <p className="mt-4 text-gray-700">{comment.content}</p>
        )}
        <div className="mt-4 text-blue-700">{comment.score}</div>
      </div>

      {isReplying && (
        <CommentForm
          currentUser={currentUser}
          replyingTo={comment.user.username}
          actionLabel="Reply"
          onSubmit={(content) => {
            onReply(comment.id, content, comment.user.username)
            setIsReplying(false)
          }}
        />
      )}

      {comment.replies.length > 0 && (
        <div className="space-y-4">
          {comment.replies.map((reply) => (
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
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentCard

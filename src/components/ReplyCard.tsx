import type { Reply, User } from "../types/types"
import { useState } from "react"
import CommentForm from "./CommentForm"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faReply, faPen, faTrash } from "@fortawesome/free-solid-svg-icons"

interface Props {
  reply: Reply
  currentUser: User
  onReply: (replyingTo: string, content: string) => void
  onEdit: (replyId: number, newContent: string) => void
  onDelete: (replyId: number) => void
}

const ReplyCard = ({
  reply,
  currentUser,
  onReply,
  onEdit,
  onDelete,
}: Props) => {
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const isOwner = reply.user.username === currentUser.username

  return (
    <div className="bg-white p-4 rounded shadow-sm ml-4 border-l-2 border-gray-200">
      <div className="flex items-center gap-4">
        <img
          src={reply.user.image.png}
          alt={reply.user.username}
          className="w-8 h-8 rounded-full"
        />
        <div className="font-semibold">{reply.user.username}</div>
        <div className="text-gray-500">{reply.createdAt}</div>
        {isOwner ? (
          <div className="flex gap-4 ml-auto">
            <button
              onClick={() => onDelete(reply.id)}
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
          initialContent={reply.content}
          onSubmit={(content) => {
            onEdit(reply.id, content)
            setIsEditing(false)
          }}
        />
      ) : (
        <p className="mt-4 text-gray-700">
          <span className="text-blue-700 font-medium">@{reply.replyingTo}</span>{" "}
          {reply.content}
        </p>
      )}
      <div className="mt-2 text-blue-700">{reply.score}</div>

      {isReplying && (
        <CommentForm
          currentUser={currentUser}
          replyingTo={reply.user.username}
          actionLabel="Reply"
          onSubmit={(content) => {
            onReply(reply.user.username, content)
            setIsReplying(false)
          }}
        />
      )}
    </div>
  )
}

export default ReplyCard

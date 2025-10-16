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
  onVote: (replyId: number, direction: "up" | "down") => void
}

const ReplyCard = ({
  reply,
  currentUser,
  onReply,
  onEdit,
  onDelete,
  onVote,
}: Props) => {
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const isOwner = reply.user.username === currentUser.username

  return (
    <div className="space-y-2">
      <div className="bg-white p-4 rounded shadow-sm border-l-2 border-gray-200 flex gap-4">
        <div className="w-[30px] hidden sm:block">
          <div className="h-fit flex flex-col items-center rounded-md font-medium text-gray-500 bg-gray-100">
            <button
              onClick={() => onVote(reply.id, "up")}
              className="px-2 py-1 hover:text-purple-600 cursor-pointer"
            >
              +
            </button>
            <span className="text-purple-600">{reply.score}</span>
            <button
              onClick={() => onVote(reply.id, "down")}
              className="px-2 py-1 hover:text-purple-600 cursor-pointer"
            >
              –
            </button>
          </div>
        </div>
        <div className="w-full sm:flex-1">
          <div className="flex items-center gap-4">
            <img
              src={reply.user.image.png}
              alt={reply.user.username}
              className="w-8 h-8 rounded-full"
            />
            <div className="font-semibold">{reply.user.username}</div>
            <div className="text-gray-500">{reply.createdAt}</div>
            <div className="hidden sm:block ml-auto">
              {isOwner ? (
                <div className="flex gap-4">
                  <button
                    onClick={() => onDelete(reply.id)}
                    className="text-pink-400 text-sm font-medium hover:opacity-60 cursor-pointer flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                  </button>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-purple-600 text-sm font-medium hover:opacity-60 cursor-pointer flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faPen} />
                    Edit
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsReplying(!isReplying)}
                  className="text-purple-600 text-sm font-medium ml-auto hover:opacity-60 cursor-pointer flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faReply} />
                  Reply
                </button>
              )}
            </div>
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
              <span className="text-purple-600 font-medium">
                @{reply.replyingTo}
              </span>{" "}
              {reply.content}
            </p>
          )}
          <div className="flex items-center justify-between mt-4 sm:hidden">
            <div className="w-fit flex items-center gap-2 rounded-md font-medium text-gray-500 bg-gray-100">
              <button
                onClick={() => onVote(reply.id, "up")}
                className="px-2 py-1 hover:text-purple-600 cursor-pointer"
              >
                +
              </button>
              <span className="text-purple-600">{reply.score}</span>
              <button
                onClick={() => onVote(reply.id, "down")}
                className="px-2 py-1 hover:text-purple-600 cursor-pointer"
              >
                –
              </button>
            </div>
            <div>
              {isOwner ? (
                <div className="flex gap-4 ml-auto">
                  <button
                    onClick={() => onDelete(reply.id)}
                    className="text-pink-400 text-sm font-medium hover:opacity-60 cursor-pointer flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                  </button>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-purple-600 text-sm font-medium hover:opacity-60 cursor-pointer flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faPen} />
                    Edit
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsReplying(!isReplying)}
                  className="text-purple-600 text-sm font-medium ml-auto hover:opacity-60 cursor-pointer flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faReply} />
                  Reply
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
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

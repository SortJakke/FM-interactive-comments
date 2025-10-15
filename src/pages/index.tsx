import { useState } from "react"
import data from "../data/data.json"
import type { CommentsData, Comment, Reply } from "../types/types"
import CommentCard from "../components/CommentCard"
import CommentForm from "../components/CommentForm"
import ConfirmModal from "../components/ConfirmModal"

const CommentSection = () => {
  const [commentsData, setCommentsData] = useState<CommentsData>(data)

  const [showModal, setShowModal] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null)

  const [showReplyModal, setShowReplyModal] = useState(false)
  const [replyToDeleteId, setReplyToDeleteId] = useState<number | null>(null)
  const [replyParentId, setReplyParentId] = useState<number | null>(null)

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now(),
      content,
      createdAt: "right now",
      score: 0,
      user: commentsData.currentUser,
      replies: [],
    }

    setCommentsData((prev) => ({
      ...prev,
      comments: [...prev.comments, newComment],
    }))
  }
  const handleReply = (
    commentId: number,
    content: string,
    replyingTo: string
  ) => {
    const newReply: Reply = {
      id: Date.now(),
      content,
      createdAt: "right now",
      score: 0,
      replyingTo,
      user: commentsData.currentUser,
    }

    setCommentsData((prev) => ({
      ...prev,
      comments: prev.comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      ),
    }))
  }
  const handleEdit = (commentId: number, newContent: string) => {
    setCommentsData((prev) => ({
      ...prev,
      comments: prev.comments.map((comment) =>
        comment.id === commentId ? { ...comment, content: newContent } : comment
      ),
    }))
  }
  const handleEditReply = (
    commentId: number,
    replyId: number,
    newContent: string
  ) => {
    setCommentsData((prev) => ({
      ...prev,
      comments: prev.comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId ? { ...reply, content: newContent } : reply
              ),
            }
          : comment
      ),
    }))
  }

  const confirmDeleteComment = (commentId: number) => {
    setCommentToDelete(commentId)
    setShowModal(true)
  }
  const handleDelete = () => {
    if (commentToDelete !== null) {
      setCommentsData((prev) => ({
        ...prev,
        comments: prev.comments.filter(
          (comment) => comment.id !== commentToDelete
        ),
      }))
      setCommentToDelete(null)
      setShowModal(false)
    }
  }

  const confirmDeleteReply = (commentId: number, replyId: number) => {
    setReplyParentId(commentId)
    setReplyToDeleteId(replyId)
    setShowReplyModal(true)
  }
  const handleDeleteReply = () => {
    if (replyParentId !== null && replyToDeleteId !== null) {
      setCommentsData((prev) => ({
        ...prev,
        comments: prev.comments.map((comment) =>
          comment.id === replyParentId
            ? {
                ...comment,
                replies: comment.replies.filter(
                  (reply) => reply.id !== replyToDeleteId
                ),
              }
            : comment
        ),
      }))
      setReplyParentId(null)
      setReplyToDeleteId(null)
      setShowReplyModal(false)
    }
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-8 grid gap-4">
      {commentsData.comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          currentUser={commentsData.currentUser}
          onReply={handleReply}
          onEdit={handleEdit}
          onEditReply={handleEditReply}
          onDelete={confirmDeleteComment}
          onDeleteReply={confirmDeleteReply}
        />
      ))}
      <CommentForm
        currentUser={commentsData.currentUser}
        actionLabel="Send"
        onSubmit={handleAddComment}
      />

      {showModal && (
        <ConfirmModal
          title="Delete comment"
          message="Are you sure you want to delete this comment? This will remove the comment and can't be undone."
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}

      {showReplyModal && (
        <ConfirmModal
          title="Delete reply"
          message="Are you sure you want to delete this reply? This will remove the reply and cannot be undone."
          onConfirm={handleDeleteReply}
          onCancel={() => setShowReplyModal(false)}
        />
      )}
    </section>
  )
}

export default CommentSection

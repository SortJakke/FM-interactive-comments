import type { CommentsData } from "../types/types"
import { useState } from "react"
import { useComments } from "../hooks/useComments"
import data from "../data/data.json"

import CommentCard from "../components/CommentCard"
import CommentForm from "../components/CommentForm"
import ConfirmModal from "../components/ConfirmModal"

const CommentSection = () => {
  const [commentsData, setCommentsData] = useState<CommentsData>(data)

  const {
    handleAddComment,
    handleAddReply,
    handleEditComment,
    handleEditReply,
    handleVoteComment,
    handleVoteReply,
    handleDeleteComment,
    handleDeleteReply,
  } = useComments(commentsData, setCommentsData)

  const [showModal, setShowModal] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null)

  const [showReplyModal, setShowReplyModal] = useState(false)
  const [replyToDeleteId, setReplyToDeleteId] = useState<number | null>(null)
  const [replyParentId, setReplyParentId] = useState<number | null>(null)

  const confirmDeleteComment = (commentId: number) => {
    setCommentToDelete(commentId)
    setShowModal(true)
  }
  const deleteComment = () => {
    if (commentToDelete !== null) {
      handleDeleteComment(commentToDelete)
      setCommentToDelete(null)
      setShowModal(false)
    }
  }
  const confirmDeleteReply = (commentId: number, replyId: number) => {
    setReplyParentId(commentId)
    setReplyToDeleteId(replyId)
    setShowReplyModal(true)
  }
  const deleteReply = () => {
    if (replyParentId !== null && replyToDeleteId !== null) {
      handleDeleteReply(replyParentId, replyToDeleteId)
      setReplyParentId(null)
      setReplyToDeleteId(null)
      setShowReplyModal(false)
    }
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-8 grid gap-4">
      {commentsData.comments
        .slice()
        .sort((a, b) => b.score - a.score)
        .map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            currentUser={commentsData.currentUser}
            onReply={handleAddReply}
            onEdit={handleEditComment}
            onEditReply={handleEditReply}
            onDelete={confirmDeleteComment}
            onDeleteReply={confirmDeleteReply}
            onVote={handleVoteComment}
            onVoteReply={handleVoteReply}
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
          onConfirm={deleteComment}
          onCancel={() => setShowModal(false)}
        />
      )}

      {showReplyModal && (
        <ConfirmModal
          title="Delete reply"
          message="Are you sure you want to delete this reply? This will remove the reply and cannot be undone."
          onConfirm={deleteReply}
          onCancel={() => setShowReplyModal(false)}
        />
      )}
    </section>
  )
}

export default CommentSection

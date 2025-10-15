import type { CommentsData } from "../types/types"
import { useState } from "react"
import { useComments } from "../hooks/useComments"
import { useConfirmModal } from "../hooks/useConfirmModal"
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

  const commentModal = useConfirmModal()
  const replyModal = useConfirmModal()

  const deleteComment = () => {
    if (commentModal.targetId !== null) {
      handleDeleteComment(commentModal.targetId)
      commentModal.close()
    }
  }
  const deleteReply = () => {
    if (replyModal.targetId !== null && replyModal.parentId !== null) {
      handleDeleteReply(replyModal.parentId, replyModal.targetId)
      replyModal.close()
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
            onDelete={(id) => commentModal.open(id)}
            onDeleteReply={(commentId, replyId) =>
              replyModal.open(replyId, commentId)
            }
            onVote={handleVoteComment}
            onVoteReply={handleVoteReply}
          />
        ))}
      <CommentForm
        currentUser={commentsData.currentUser}
        actionLabel="Send"
        onSubmit={handleAddComment}
      />

      {commentModal.isOpen && (
        <ConfirmModal
          title="Delete comment"
          message="Are you sure you want to delete this comment? This will remove the comment and can't be undone."
          onConfirm={deleteComment}
          onCancel={commentModal.close}
        />
      )}

      {replyModal.isOpen && (
        <ConfirmModal
          title="Delete reply"
          message="Are you sure you want to delete this reply? This will remove the reply and cannot be undone."
          onConfirm={deleteReply}
          onCancel={replyModal.close}
        />
      )}
    </section>
  )
}

export default CommentSection
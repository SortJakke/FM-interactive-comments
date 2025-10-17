import type { CommentsData } from "../types/types"
import { useEffect, useState, useRef } from "react"
import { useComments } from "../hooks/useComments"
import { useConfirmModal } from "../hooks/useConfirmModal"
import data from "../data/data.json"

import CommentCard from "../components/CommentCard"
import CommentForm from "../components/CommentForm"
import ConfirmModal from "../components/ConfirmModal"

const CommentSection = () => {
  const [commentsData, setCommentsData] = useState<CommentsData>(data)
  const [liveMessage, setLiveMessage] = useState("")
  const prevCountRef = useRef(commentsData.comments.length)

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

  useEffect(() => {
    const prev = prevCountRef.current
    const curr = commentsData.comments.length
    if (curr !== prev) {
      const diff = curr - prev
      setLiveMessage(
        diff > 0
          ? `${diff} comment${diff > 1 ? "s" : ""} added`
          : `${Math.abs(diff)} comment${diff < -1 ? "s" : ""} deleted`
      )
      prevCountRef.current = curr

      const timeout = setTimeout(() => {
        setLiveMessage("")
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [commentsData.comments.length])

  const isOpen = commentModal.isOpen || replyModal.isOpen
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (isOpen) {
      el.setAttribute("aria-hidden", "true")
    } else {
      el.removeAttribute("aria-hidden")
    }
  }, [isOpen])

  return (
    <section
      ref={sectionRef}
      className="max-w-2xl mx-auto px-4 py-8 grid gap-4"
    >
      <div role="status" aria-live="polite" className="sr-only">
        {liveMessage}
      </div>

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
    </section>
  )
}

export default CommentSection

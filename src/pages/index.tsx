import { useState } from "react"
import data from "../data/data.json"
import type { CommentsData, Comment, Reply } from "../types/types"
import CommentCard from "../components/CommentCard"
import CommentForm from "../components/CommentForm"

const CommentSection = () => {
  const [commentsData, setCommentsData] = useState<CommentsData>(data)

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

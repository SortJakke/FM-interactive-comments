import { useState } from "react"
import data from "../data/data.json"
import type { CommentsData, Comment } from "../types/types"
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

  return (
    <section className="max-w-2xl mx-auto px-4 py-8 grid gap-4">
      {commentsData.comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
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

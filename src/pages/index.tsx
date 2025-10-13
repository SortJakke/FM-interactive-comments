import { useState } from "react"
import data from "../data/data.json"
import type { CommentsData } from "../types/types"
import CommentCard from "../components/CommentCard"

const CommentSection = () => {
  const [commentsData] = useState<CommentsData>(data)

  return (
    <section className="max-w-2xl mx-auto px-4 py-8 grid gap-4">
      {commentsData.comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment}/>
      ))}
    </section>
  )
}

export default CommentSection
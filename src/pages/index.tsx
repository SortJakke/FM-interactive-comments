import { useState } from "react"
import data from "../data/data.json"
import type { CommentsData } from "../types/types"

const CommentSection = () => {
  const [commentsData] = useState<CommentsData>(data)

  return (
    <section className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      <ul className="space-y-4">
        {commentsData.comments.map((comment) => (
          <li key={comment.id} className="border p-4 rounded shadow-sm">
            <div className="font-semibold">{comment.user.username}</div>
            <div className="text-sm text-gray-600">{comment.createdAt}</div>
            <p className="mt-2">{comment.content}</p>
            <div className="text-xs text-gray-500">Score: {comment.score}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CommentSection
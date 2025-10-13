import type { Comment } from "../types/types"

interface Props {
  comment: Comment
}

const CommentCard = ({ comment }: Props) => {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={comment.user.image.png}
          alt={comment.user.username}
          className="w-10 h-10 rounded-full"
        />
        <div className="font-semibold">{comment.user.username}</div>
        <div className="text-gray-500">{comment.createdAt}</div>
      </div>
      <p className="mt-4 text-gray-700">{comment.content}</p>
      <div className="mt-4 text-blue-700">{comment.score}</div>
    </div>
  )
}

export default CommentCard

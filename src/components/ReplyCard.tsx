import type { Reply } from "../types/types"

interface Props {
  reply: Reply
}

const ReplyCard = ({ reply }: Props) => {
  return (
    <div className="bg-white p-4 rounded shadow-sm ml-4 border-l-2 border-gray-200">
      <div className="flex items-center gap-4">
        <img
          src={reply.user.image.png}
          alt={reply.user.username}
          className="w-8 h-8 rounded-full"
        />
        <div className="font-semibold">{reply.user.username}</div>
        <div className="text-gray-500">{reply.createdAt}</div>
      </div>
      <p className="mt-2 text-gray-700">
        <span className="text-blue-700 font-medium">@{reply.replyingTo}</span>{" "}
        {reply.content}
      </p>
      <div className="mt-2 text-blue-700">{reply.score}</div>
    </div>
  )
}

export default ReplyCard

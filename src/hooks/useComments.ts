import type { CommentsData, Comment, Reply } from "../types/types"

export const useComments = (
  commentsData: CommentsData,
  setCommentsData: React.Dispatch<React.SetStateAction<CommentsData>>
) => {
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
  const handleAddReply = (
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
  const handleEditComment = (commentId: number, newContent: string) => {
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

  const handleVoteComment = (commentId: number, direction: "up" | "down") => {
    setCommentsData((prev) => ({
      ...prev,
      comments: prev.comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              score: direction === "up" ? comment.score + 1 : comment.score - 1,
            }
          : comment
      ),
    }))
  }
  const handleVoteReply = (replyId: number, direction: "up" | "down") => {
    setCommentsData((prev) => ({
      ...prev,
      comments: prev.comments.map((comment) => ({
        ...comment,
        replies: comment.replies.map((reply) =>
          reply.id === replyId
            ? {
                ...reply,
                score: direction === "up" ? reply.score + 1 : reply.score - 1,
              }
            : reply
        ),
      })),
    }))
  }

  const handleDeleteComment = (commentId: number) => {
    setCommentsData((prev) => ({
      ...prev,
      comments: prev.comments.filter((c) => c.id !== commentId),
    }))
  }
  const handleDeleteReply = (commentId: number, replyId: number) => {
    setCommentsData((prev) => ({
      ...prev,
      comments: prev.comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.filter((r) => r.id !== replyId),
            }
          : comment
      ),
    }))
  }

  return {
    handleAddComment,
    handleAddReply,
    handleEditComment,
    handleEditReply,
    handleVoteComment,
    handleVoteReply,
    handleDeleteComment,
    handleDeleteReply
  }
}

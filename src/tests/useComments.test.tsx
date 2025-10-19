import type { CommentsData, Comment, Reply, User } from "../types/types"
import { describe, it, expect, beforeEach, vi } from "vitest"
import { renderHook } from "@testing-library/react"
import { useComments } from "../hooks/useComments"

describe("useComments hook", () => {
  let commentUser: User
  let replyUser: User
  let initialData: CommentsData
  let setCommentsData: ReturnType<typeof vi.fn>

  beforeEach(() => {
    commentUser = { username: "commentUser", image: { png: "", webp: "" } }
    replyUser = { username: "replyUser", image: { png: "", webp: "" } }
    initialData = {
      currentUser: commentUser,
      comments: [],
    }
    setCommentsData = vi.fn()
  })

  it("provides API methods (addComment, editComment, deleteComment, addReply, voteComment)", () => {
    const { result } = renderHook(() =>
      useComments(initialData, setCommentsData)
    )
    expect(typeof result.current.handleAddComment).toBe("function")
    expect(typeof result.current.handleAddReply).toBe("function")
    expect(typeof result.current.handleEditComment).toBe("function")
    expect(typeof result.current.handleEditReply).toBe("function")
    expect(typeof result.current.handleDeleteComment).toBe("function")
    expect(typeof result.current.handleDeleteReply).toBe("function")
    expect(typeof result.current.handleVoteComment).toBe("function")
    expect(typeof result.current.handleVoteReply).toBe("function")
  })

  it("addComment adds a new top-level comment", () => {
    const { handleAddComment } = useComments(initialData, setCommentsData)

    handleAddComment("Hello World!")

    expect(setCommentsData).toHaveBeenCalledWith(expect.any(Function))

    const updateFn = setCommentsData.mock.calls[0][0]
    const result = updateFn(initialData)

    expect(result.comments).toHaveLength(1)
    expect(result.comments[0].content).toBe("Hello World!")
    expect(result.comments[0].user).toEqual(commentUser)
    expect(result.comments[0].score).toBe(0)
    expect(result.comments[0].replies).toEqual([])
  })

  it("editComment updates the content of an existing comment", () => {
    initialData.comments = [
      {
        id: 1,
        content: "Original content",
        createdAt: "yesterday",
        score: 2,
        user: commentUser,
        replies: [],
      },
    ]

    const { handleEditComment } = useComments(initialData, setCommentsData)

    const targetId = initialData.comments[0].id
    handleEditComment(targetId, "Updated content")

    const updateFn = setCommentsData.mock.calls[0][0]
    const result = updateFn(initialData)

    const updated = result.comments.find((c: Comment) => c.id === targetId)
    expect(updated).toBeDefined()
    expect(updated.content).toBe("Updated content")
  })

  it("voteComment updates the score of a comment", () => {
    initialData.comments = [
      {
        id: 1,
        content: "Original content",
        createdAt: "yesterday",
        score: 2,
        user: commentUser,
        replies: [],
      },
    ]
    const { handleVoteComment } = useComments(initialData, setCommentsData)
    const targetId = initialData.comments[0].id
    handleVoteComment(targetId, "up")

    const updateFn = setCommentsData.mock.calls[0][0]
    const result = updateFn(initialData)

    const updated = result.comments.find((c: Comment) => c.id === targetId)
    expect(updated.score).toBe(3)
  })

  it("deleteComment removes a comment by id", () => {
    initialData.comments = [
      {
        id: 1,
        content: "Original content",
        createdAt: "yesterday",
        score: 2,
        user: commentUser,
        replies: [],
      },
    ]
    const { handleDeleteComment } = useComments(initialData, setCommentsData)
    const targetId = initialData.comments[0].id

    handleDeleteComment(targetId)

    const updateFn = setCommentsData.mock.calls[0][0]
    const result = updateFn(initialData)

    const deleted = result.comments.find((c: Comment) => c.id === targetId)
    expect(result.comments).toHaveLength(0)
    expect(deleted).toBeUndefined()
  })

  it("addReply attaches a reply to the parent comment", () => {
    const { handleAddReply } = useComments(initialData, setCommentsData)

    initialData.comments = [
      {
        id: 1,
        content: "Parent comment",
        createdAt: "yesterday",
        score: 2,
        user: commentUser,
        replies: [],
      },
    ]

    const parentId = initialData.comments[0].id
    const replyingTo = initialData.comments[0].user.username
    handleAddReply(parentId, "This is a reply", replyingTo)

    const updateFn = setCommentsData.mock.calls[0][0]
    const result = updateFn(initialData)

    const parent = result.comments.find((c: Comment) => c.id === parentId)
    expect(parent).toBeDefined()
    expect(Array.isArray(parent.replies)).toBe(true)
    expect(parent.replies.length).toBe(1)
    expect(parent.replies[0].content).toBe("This is a reply")
    expect(parent.replies[0].replyingTo).toBe(replyingTo)
    expect(parent.replies[0].user).toEqual(initialData.currentUser)
  })

  it("editReply updates the content of an existing reply", () => {
    initialData.comments = [
      {
        id: 1,
        content: "Original content",
        createdAt: "yesterday",
        score: 2,
        user: commentUser,
        replies: [
          {
            id: 11,
            content: "Original reply",
            createdAt: "today",
            score: 1,
            replyingTo: commentUser.username,
            user: replyUser,
          },
        ],
      },
    ]

    const { handleEditReply } = useComments(initialData, setCommentsData)

    const targetId = initialData.comments[0].id
    const replyId = initialData.comments[0].replies[0].id
    handleEditReply(targetId, replyId, "Updated content")

    const updateFn = setCommentsData.mock.calls[0][0]
    const result = updateFn(initialData)

    const updated = result.comments
      .find((c: Comment) => c.id === targetId)
      .replies.find((r: Reply) => r.id === replyId)
    expect(updated).toBeDefined()
    expect(updated.content).toBe("Updated content")
    expect(updated.replyingTo).toBe(commentUser.username)
    expect(updated.user).toEqual(replyUser)
  })

  it("voteReply updates the score of a reply", () => {
    initialData.comments = [
      {
        id: 1,
        content: "Original content",
        createdAt: "yesterday",
        score: 2,
        user: commentUser,
        replies: [
          {
            id: 11,
            content: "Original reply",
            createdAt: "today",
            score: 1,
            replyingTo: commentUser.username,
            user: replyUser,
          },
        ],
      },
    ]
    const { handleVoteReply } = useComments(initialData, setCommentsData)
    const targetId = initialData.comments[0].id
    const replyId = initialData.comments[0].replies[0].id
    handleVoteReply(replyId, "up")

    const updateFn = setCommentsData.mock.calls[0][0]
    const result = updateFn(initialData)

    const updated = result.comments
      .find((c: Comment) => c.id === targetId)
      .replies.find((r: Reply) => r.id === replyId)
    expect(updated.score).toBe(2)
  })

  it("deleteReply removes a reply by id", () => {
    initialData.comments = [
      {
        id: 1,
        content: "Original content",
        createdAt: "yesterday",
        score: 2,
        user: commentUser,
        replies: [
          {
            id: 11,
            content: "Original reply",
            createdAt: "today",
            score: 1,
            replyingTo: commentUser.username,
            user: replyUser,
          },
        ],
      },
    ]
    const { handleDeleteReply } = useComments(initialData, setCommentsData)
    const targetId = initialData.comments[0].id
    const replyId = initialData.comments[0].replies[0].id

    handleDeleteReply(targetId, replyId)

    const updateFn = setCommentsData.mock.calls[0][0]
    const result = updateFn(initialData)

    const parent = result.comments.find((c: Comment) => c.id === targetId)
    const deleted = parent.replies.find((r: Reply) => r.id === replyId)

    expect(deleted).toBeUndefined()
    expect(parent.replies).toHaveLength(0)
  })
})

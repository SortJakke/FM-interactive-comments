import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { describe, it, expect } from "vitest"
import userEvent from "@testing-library/user-event"
import CommentSection from "../pages/index"

describe("CommentSection integration", () => {
  it("should add a comment and render it", async () => {
    render(<CommentSection />)

    const textarea = screen.getByPlaceholderText(/add a comment.../i)
    const sendButton = screen.getByTestId("send-submit")

    await userEvent.type(textarea, "This is a test comment")
    await userEvent.click(sendButton)

    expect(
      await screen.findByText("This is a test comment")
    ).toBeInTheDocument()
  })

  it("should allow editing a comment and update the content", async () => {
    render(<CommentSection />)

    // First, add a comment to edit
    const commentArea = screen.getByTestId("send-textarea")
    const sendButton = screen.getByTestId("send-submit")
    await userEvent.type(commentArea, "Original comment")
    await userEvent.click(sendButton)
    const original = await screen.findByText(/original comment/i)
    expect(original).toBeInTheDocument()

    // Click in the "Edit" button
    const editButton = screen.getByTestId("edit-button")
    await userEvent.click(editButton)

    // Change the content in the textarea
    const textarea = screen.getByTestId("edit-textarea")
    await userEvent.clear(textarea)
    await userEvent.type(textarea, "Updated comment content")

    // Click the "Edit" button
    const updateButton = screen.getByTestId("edit-submit")
    await userEvent.click(updateButton)

    // Verify if the updated content is rendered
    expect(
      await screen.findByText("Updated comment content")
    ).toBeInTheDocument()

    // Ensure the original content is no longer present
    expect(screen.queryByText(/original comment/i)).not.toBeInTheDocument()

    // Ensure the edit textarea is no longer present
    expect(screen.queryByTestId("edit-textarea")).not.toBeInTheDocument()
  })

  it("should allow deleting a comment and remove it from the screen", async () => {
    render(<CommentSection />)

    // First, add a comment to delete
    const commentArea = screen.getByTestId("send-textarea")
    const sendButton = screen.getByTestId("send-submit")
    await userEvent.type(commentArea, "Comment to be deleted")
    await userEvent.click(sendButton)

    // Verify the comment is rendered
    const comment = await screen.findByText("Comment to be deleted")
    expect(comment).toBeInTheDocument()

    // Click the "Delete" button
    const deleteButton = screen.getByTestId("delete-button")
    await userEvent.click(deleteButton)

    // Confirm the deletion in the modal
    const confirmButton = screen.getByTestId("confirm-delete")
    if (confirmButton) {
      await userEvent.click(confirmButton)
    }

    // Verify the comment is removed from the screen
    expect(screen.queryByText("Comment to be deleted")).not.toBeInTheDocument()
  })

  it("should allow replying to a comment and render the reply", async () => {
    render(<CommentSection />)

    // Click the "Reply" button
    const replyButton = screen.getAllByTestId("reply-button")
    await userEvent.click(replyButton[0])

    // Type a reply and submit
    const replyArea = screen.getByTestId("reply-textarea")
    const replySendButton = screen.getByTestId("reply-submit")
    await userEvent.type(replyArea, "This is a reply")
    await userEvent.click(replySendButton)

    // Verify the reply is rendered
    const replyToggle = screen.getAllByTestId("replies-toggle")
    await userEvent.click(replyToggle[0])
    expect(await screen.findByText("This is a reply")).toBeInTheDocument()
  })

  it("should allow voting on a comment and update the score", async () => {
    render(<CommentSection />)

    // Verify initial score
    const score = screen.getAllByTestId("comment-score")
    expect(score[0]).toHaveTextContent("12")

    // Click the upvote button
    const upvoteButton = screen.getAllByTestId("upvote-button")
    await userEvent.click(upvoteButton[0])
    expect(score[0]).toHaveTextContent("13")

    // Click the downvote button
    const downvoteButton = screen.getAllByTestId("downvote-button")
    await userEvent.click(downvoteButton[0])
    expect(score[0]).toHaveTextContent("12")
  })

})

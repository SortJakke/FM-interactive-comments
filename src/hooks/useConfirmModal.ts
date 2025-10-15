import { useState } from "react"

export const useConfirmModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [targetId, setTargetId] = useState<number | null>(null)
  const [parentId, setParentId] = useState<number | null>(null)

  const open = (id: number, parent?: number) => {
    setTargetId(id)
    setParentId(parent ?? null)
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
    setTargetId(null)
    setParentId(null)
  }

  return {
    isOpen,
    targetId,
    parentId,
    open,
    close,
  }
}

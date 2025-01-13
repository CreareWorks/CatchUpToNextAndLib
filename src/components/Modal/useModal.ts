import { useState } from 'react'

export function useModal<T extends string>() {
  const [modalType, setModalType] = useState<T | null>(null)

  function openModal(type: T) {
    setModalType(type)
  }

  function closeModal() {
    setModalType(null)
  }

  return {
    modalType,
    openModal,
    closeModal,
  }
}

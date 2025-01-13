'use client';

import { useModal } from "../../../../../components/Modal/useModal";
import AddModal from "./AddModal";
import styles from '../../page.module.scss';
import { Button } from "@/components/Button/Button";

export default function ClientModalAction(): JSX.Element
{
  const { modalType, openModal, closeModal } = useModal<'add'>();

  return (
    <div className={styles.actions}>
      <Button
        type='button'
        onClick={() => openModal('add')}
        variant='primary'
        className={styles.button}
      >
        Add User
      </Button>

      {modalType === 'add' && (
        <AddModal
          close={closeModal}
        />
      )}
    </div>
  );
}
'use client';

import 'react-toastify/dist/ReactToastify.css';
import styles from './AddModal.module.scss';
import { createUser } from '../../actions';
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MESSAGES } from '@/const/Message';
import { getFormProps, getInputProps, SubmissionResult, useForm } from "@conform-to/react";
import { CreateUserFormZodSchema } from '../../schema';
import { parseWithZod } from '@conform-to/zod';
import { FormInput } from '@/components/FormInput/FormInput';
import { Button } from '@/components/Button/Button';
import { Text } from '@/components/Text/Text';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// 使いまわさない型定義なのでここで記述
type Props = {
  close: () => void;
};

const AddModal: ({ close }: Props) => JSX.Element = ({ close }: Props) => {
  const router: AppRouterInstance = useRouter();

  // 実行したServerActionの結果を取得する。 stateにはServerActionの返り値が入る
  const [lastResult, formAction, isPending] = useActionState<SubmissionResult<string[]> | object | undefined, FormData>(
    createUser,
    undefined
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { 
        schema: CreateUserFormZodSchema
      });
    },
    shouldValidate: "onInput",
  });

  useEffect(() => {
    // stateに値が渡された時(つまり初期値undefinedの時は実行しない)
    // serverAction実行され、成功した場合
    if (lastResult && 'data' in lastResult && lastResult.data) {
      // 成功時の処理
      toast.success(MESSAGES.USERS.CREATE_USER);
      // ユーザーを追加した後、一覧を再レンダリング
      router.refresh();
      // モーダルを閉じる
      close();
    }
  }, [lastResult, close, router]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <Text as="span" size="16px" weight="bold" color="#333">
            ユーザーを追加
          </Text>
        </div>
        <form
          {...getFormProps(form)} 
          action={formAction}
        >
          <FormInput
            inputProps={getInputProps(fields.email, { type: "email" })}
            field={fields.email}
            className={styles.input}
            label='メールアドレス'
            placeholder="メールアドレスを入力してください"
            required={true}
          />
          <FormInput
            inputProps={getInputProps(fields.name, { type: "text" })}
            field={fields.name}
            className={styles.input}
            label='名前'
            placeholder="名前を入力してください"
            required={true}
          />
          <div className={styles.buttonWrap}>
          <Button
            type="button"
            variant="cancel"
            onClick={close}
          >
            キャンセル
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!form.valid || isPending}
          >
            OK
          </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
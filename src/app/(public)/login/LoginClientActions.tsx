'use client';

import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Session } from "next-auth";
import styles from "./LoginClientActions.module.scss";
import { startTransition, useActionState, useEffect } from "react";
import { handleGoogleSignIn } from "./actions";

type LoginClientActionsProps = {
  session: Session | null;
};

export default function LoginClientActions({ session }: LoginClientActionsProps): JSX.Element 
{
  const [, triggerAction] = useActionState(handleGoogleSignIn, false);

  useEffect(() => {
    if (!session) {
      startTransition(() => {
        triggerAction();
      })
    }
  }, [session, triggerAction]);

  // 未ログイン時
  if (!session) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <Text as="h1" color="white">ログインしていません</Text>
          <Button onClick={() => signIn('google')}>
            Googleでログイン
          </Button>
        </div>
      </div>
    );
  }

  // ログイン中
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Image
          src={session.user?.image ?? '/default-image.png'}
          alt="Googleアカウントのプロフィール画像"
          width={100}
          height={100}
          className={styles.image}
        />
        <Text as="h1" size={24} marginBottom={32} weight="bold" color="white">ログイン中</Text>
        <Text as="p" size={16} marginBottom={16} color="white">ユーザー名: {session.user?.name}</Text>
        <Text as="p" size={16} marginBottom={32} color="white">Email: {session.user?.email}</Text>
        <Button onClick={() => signOut()}>
          ログアウト
        </Button>
      </div>
    </div>
  );
}
"use server";

import { auth } from "lib/auth";
import { storeGoogleUser, fetchGoogleUser, updateGoogleUser, storeAppUser } from "./repository";
import { Session } from "next-auth";
import { PROVIDER_TYPE } from "@/const/ProviderType";
import { MESSAGES } from "@/const/Message";
import { UserAccount } from "./schema";

export const handleGoogleSignIn = async (): Promise<boolean> => {
  const session: Session | null = await auth();

  if (!session || !session.user) return false

  const { providerId, name, image } = session.user;

  if (!providerId || !name || !image) return false

  // 既存ユーザーをチェック
  const existingUser = await fetchGoogleUser(providerId);

  if (existingUser) {
    // 更新処理
    await updateGoogleUser({
      providerId: providerId,
      name: name,
      image: image
    });
  } else {
    try {
      // アプリケーションで特定するためのテーブルへ登録
      const userAccount:UserAccount[]  = await storeAppUser()

      // 新規登録
      await storeGoogleUser({
        user_account_id: userAccount[0].id,
        provider_id: providerId,
        provider_type: PROVIDER_TYPE.GOOGLE,
        name: name,
        image: image
      });
    } catch (e) {
      console.error(e)
      throw new Error(MESSAGES.USERS.ERROR_FAILED_TO_CREATE_USER)
    }
  }

  return true
};

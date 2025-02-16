import { db } from "lib/db";
import { o_auth_users, userAccounts } from "db";
import { AuthUserSchema, CreateAuthUserFormSchema, UpdateAuthUserFormSchema, UserAccount } from "./schema";
import { eq } from "drizzle-orm";
import postgres from "postgres";

// 新規登録
export async function storeGoogleUser(userData: CreateAuthUserFormSchema): Promise<AuthUserSchema[]>
{
  const today = new Date()
  try {
    const res:AuthUserSchema[] = await db.insert(o_auth_users).values({
      ...userData,
      created_at: today,
      updated_at: today
    })

    return res
  } catch (e) {
    console.error(e)
    throw new Error("Failed to create auth user")
  }
}

// 詳細取得
export async function fetchGoogleUser(providerId: string): Promise<boolean>
{
  try {
    const notFound: number = 0
    const res: boolean = await db.select()
      .from(o_auth_users)
      .where(eq(o_auth_users.provider_id, providerId))
      .then((res) => res.length > notFound);

    return res
  } catch (e) {
    console.error(e)
    throw new Error("Failed to fetch auth user")
  }
}

// 更新
export async function updateGoogleUser(userData: UpdateAuthUserFormSchema): Promise<postgres.RowList<never[]>>
{
  try {
    const res = await db
      .update(o_auth_users)
      .set({
        name: userData.name,
        image: userData.image
      })
      .where(eq(o_auth_users.provider_id, userData.providerId));

      return res
  } catch (e) {
    console.error(e)
    throw new Error("Failed to ")
  }
}

// アプリケーションレベルのアカウント管理テーブルへのINSERT
export async function storeAppUser(): Promise<UserAccount[]>
{
  const today = new Date()
  try {
    const res:UserAccount[] = await db.insert(userAccounts).values({
      created_at: today,
      updated_at: today
    }).returning()

    return res
  } catch (e) {
    console.error(e)
    throw new Error("Failed to create auth user")
  }
}
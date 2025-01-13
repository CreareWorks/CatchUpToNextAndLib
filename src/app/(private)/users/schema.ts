import { z } from 'zod';

// ユーザー1件分のschema
export const UserZodSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string().nullable(),
})
// ユーザー1件分の型定義
export type UserSchema = z.infer<typeof UserZodSchema>

// clientに返却するユーザー1件分のschemaをpick
export const UserPublicZodSchema = UserZodSchema.pick({
  id: true, 
  name: true 
})
// clientに返却するユーザー1件分の型定義
export type UserPublicSchema = z.infer<typeof UserPublicZodSchema>
// clientに返却するユーザー複数分のschema
export const UsersPublicSchema = z.array(UserPublicZodSchema)
// clientに返却するユーザー複数分の型定義
export type UsersPublicSchema = z.infer<typeof UsersPublicSchema>

// ユーザー複数件分のschema
export const UserArrayZodSchema = z.array(UserZodSchema)
// ユーザー複数件分の型定義
export type UserArraySchema = z.infer<typeof UserArrayZodSchema>

// ユーザー作成フォームのschema
export const CreateUserFormZodSchema = z.object({
  // preprocessしないとconform-toのバリデーションが通らない
  email: z.preprocess(
      (value) => (value === '' ? undefined : value),
      z.
      string({ required_error: 'メールアドレスを入力してください。' }).
      email('メールアドレスの形式が正しくありません。'),
    ),
  name: z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.
    string({ required_error: '名前を入力してください' })
  )
})
export type CreateUserFormSchema = z.infer<typeof CreateUserFormZodSchema>

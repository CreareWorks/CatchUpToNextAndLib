import { z } from 'zod';

// 共通のベーススキーマ
const BaseAuthUserSchema = z.object({
  id: z.number(),
  provider_id: z.string().min(1),
  provider_type: z.number().min(1),
  name: z.string().nullable(),
  image: z.string().nullable(),
});

const BaseAuthUserFormSchema = z.object({
  provider_id: z.string().min(1),
  provider_type: z.number().min(1),
  name: z.string().nullable(),
  image: z.string().nullable(),
});

// ユーザー1件分のスキーマ
export const AuthUserZodSchema = BaseAuthUserSchema;
export type AuthUserSchema = z.infer<typeof AuthUserZodSchema>;

// ユーザー作成用スキーマ
export const CreateAuthUserFormZodSchema = BaseAuthUserFormSchema.extend({
  user_account_id: z.string().min(1),
});
export type CreateAuthUserFormSchema = z.infer<typeof CreateAuthUserFormZodSchema>;

// ユーザー更新用スキーマ
export const UpdateAuthUserFormZodSchema = BaseAuthUserFormSchema.omit({ provider_id: true, provider_type: true }).extend({
  providerId: z.string().min(1),
});
export type UpdateAuthUserFormSchema = z.infer<typeof UpdateAuthUserFormZodSchema>;

// アカウント管理テーブル用スキーマ
export const UserAccountSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});
export type UserAccount = z.infer<typeof UserAccountSchema>;
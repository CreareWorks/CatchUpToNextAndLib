"use server";

import { CreateUserFormSchema, CreateUserFormZodSchema } from "./schema";
import { createUserRepository } from "./repository"
import { parseWithZod } from '@conform-to/zod';
import { Submission, SubmissionResult } from "@conform-to/dom";

// ServerActionで呼び出す 返り値：jsonの中身のオブジェクト true
// formのaction属性 にserverActionの関数を書く
export async function createUser(
  _state: unknown,
  formData: FormData
): Promise<SubmissionResult<string[]> | object | undefined> {
  try {
    // バリデーション コメントアウト外す
    const parsedData: Submission<CreateUserFormSchema> = parseWithZod(formData, {
      schema: CreateUserFormZodSchema,
    });

    // バリデーションエラー
    if (parsedData.status === 'error') {
      return parsedData.reply();
    }

    // userを作成
    createUserRepository({
      email: parsedData.payload.email.toString(),
      name: parsedData.payload.name.toString(),
    });

    return {
      data: true
    };

    /*
     * [sample]権限エラーとか条件によってカスタムで返す時は下記のようにする
     * return submission.reply({
     *  formErrors: ["エラーメッセージ1", "エラーメッセージ2"],
     * });
    */
  } catch (error) {
    console.error(error);
    throw error;
  }
}

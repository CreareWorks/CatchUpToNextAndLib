import { db } from "lib/db";
import { UsersPublicSchema, UserPublicZodSchema, type CreateUserFormSchema, type UserSchema } from "./schema";
import { users } from "db/schema";

// GETの内容を書く ServerComponentを返す例
// 下記をServerComponentを作成する関数で呼び出し、JSX.Elementをpage.tsxで渡す。
export async function fetchUsersRepository(): Promise<UsersPublicSchema>
{
    try {
        const res:UserSchema[] = await db.select().from(users)

        // @tips 'use server'で呼び出す時、公開されてしまうのでここで必要な値に絞って返す
        // DTO的な形式を再現してみたかっただけなので、SELECTする時にカラムを指定してしまえばいい
        const formattedUsers: UsersPublicSchema = res.map((user) => UserPublicZodSchema.parse(user));

        return formattedUsers;
    } catch (e) {
        console.error(e)
        throw new Error("Failed to fetch users");
    }
}

// ServerActionで呼び出す 返り値：jsonの中身のオブジェクト true
// formのaction属性 にserverActionの関数を書く
export async function createUserRepository(data: CreateUserFormSchema): Promise<UserSchema[]>
{
    try {
        const res:UserSchema[] = await db.insert(users).values(data);

        return res
    } catch (e) {
        console.error(e);
        throw new Error("Failed to create user");
    }
}
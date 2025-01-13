import React from 'react';
import { fetchUsersRepository } from "../../repository";
import type { UsersPublicSchema, UserPublicSchema } from "../../schema";
import { Text } from '@/components/Text/Text';

// GETの内容を書く ServerComponentを返す例
// page.tsxで 下記のコンポーネントを呼び出す
export default async function UsersList(): Promise<JSX.Element> 
{
  try {
    const users: UsersPublicSchema = await fetchUsersRepository();
  
    return (
      <>
        {users.map((user: UserPublicSchema) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
          </tr>
        ))}
      </>
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return <Text as="p" marginBottom='0'>Failed to load users.</Text>;
  }
}

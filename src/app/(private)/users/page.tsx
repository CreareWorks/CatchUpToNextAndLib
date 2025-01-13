import { Text } from "@/components/Text/Text";
import ClientModalAction from "./_components/Modal/ClientModalAction";
import UsersList from "./_components/UserList/UserList";
import styles from './page.module.scss';

export default function UsersPage(): JSX.Element
{
  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <Text as="h1" size="28px" weight="bold" color="#ffffff">
          User List
        </Text>
      </div>
      {/* クライアント側の処理 */}
      <ClientModalAction />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <UsersList/>
        </tbody>
      </table>
    </main>
  );
}
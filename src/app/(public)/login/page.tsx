import { auth } from "lib/auth";
import LoginClientActions from "./LoginClientActions";
import { Session } from "next-auth";

export default async function AuthTestPage(): Promise<JSX.Element>
{
  const session: Session | null  = await auth()

  return <LoginClientActions session={session} />
}

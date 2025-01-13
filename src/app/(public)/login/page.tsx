import { auth } from "lib/auth";
import LoginClientActions from "./LoginClientActions";

export default async function AuthTestPage(): Promise<JSX.Element>
{
  // serverComponentでsessionを取得し、clientに渡す。client側でsessionの有無によって表示を変える
  const session = await auth();

  return <LoginClientActions session={session} />;
}

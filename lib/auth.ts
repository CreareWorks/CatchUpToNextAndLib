import NextAuth from "next-auth";
import Google from 'next-auth/providers/google';

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [ 
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        authorization: {
          params: {
            prompt: "select_account", // 常にアカウント選択画面を表示
          },
        },
      }),
    ],
  });
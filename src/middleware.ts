import { auth } from "../lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { ROUTER_PATH } from "./const/PublicRoute";
import { Session } from "next-auth";

export default auth(async (req: NextRequest) => {
  const publicPaths = [
    ROUTER_PATH.TOP,
    ROUTER_PATH.LOGIN,
  ];

  // セッション情報を取得
  const session: Session | null = await auth();

  // 未認証のユーザーはログインページにリダイレクト
  const { pathname } = req.nextUrl;

  // 未認証を許可するパス
  if (publicPaths.some((path) => pathname === path)) {
    return NextResponse.next();
  }
  if (!session) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}${ROUTER_PATH.LOGIN}`)
  }

  // 認証済みの場合はそのまま次の処理へ進む
  return NextResponse.next();
});

// 保護したいパスを指定
export const config = {
  matcher: [
    {
      source: '/((?!.*\\.|api\\/).*)',
      // prefetchでmiddlewareを走らせない
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
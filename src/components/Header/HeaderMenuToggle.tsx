"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";

type MenuToggleProps = {
  children: React.ReactNode;
  isAuthenticated: boolean;
};

export function HeaderMenuToggle({ children, isAuthenticated }: MenuToggleProps): JSX.Element
{
  const [isOpen, setIsOpen] = useState(false)

  // メニュー要素の参照を取得
  const menuRef = useRef<HTMLDivElement>(null)

  // アイコンをクリックしてメニューの開閉をトグル
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  // 画面全体のクリック(mousedown)を監視し、メニュー外をクリックしたら閉じる
  useEffect(() => {
    const handleClickOutside: (e: MouseEvent) => void = (e: MouseEvent) => {
      // メニューが開いており、かつメニュー要素を指していない場合に閉じる
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    // クリーンアップ: コンポーネントがアンマウントする際にリスナーを解除
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    };
  }, [isOpen])

  return (
    // refを付与することで「この要素内でクリックされたか」を判定可能にする
    <div className={styles.menuToggleContainer} ref={menuRef}>
      {/* クリックするとメニューの表示/非表示を切り替え ここにはアイコンが渡ってくる */}
      <div onClick={handleClick}>{children}</div>

      {/* メニュー本体: isOpenで切り替え。クラスで表示/非表示を制御 */}
      <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">
              {isAuthenticated ? 'プロフィール' : 'ログイン'}
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link href="/users">ユーザー一覧</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
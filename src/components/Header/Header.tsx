import React from "react";
import Image from "next/image";
import { HeaderMenuToggle } from "./HeaderMenuToggle"; // Client Component
import styles from "./Header.module.scss";
import { auth } from "lib/auth";
import { Session } from "next-auth";

export const Header = async () => {
  const session: Session | null = await auth();

  return (
    <div className={styles.headerContainer}>
      <HeaderMenuToggle isAuthenticated={!!session}>
        <Image
          src='/img/header/menu.png'
          alt='menu'
          width={52}
          height={52}
        />
      </HeaderMenuToggle>
    </div>
  );
};
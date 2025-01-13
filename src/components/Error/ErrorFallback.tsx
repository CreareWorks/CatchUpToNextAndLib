'use client';

import React from "react";
import styles from "./CustomErrorFallback.module.css";
import Link from "next/link";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
const CustomErrorFallback: React.FC = () => {
  const handleReset = () => {
    window.location.reload(); // ページをリロード
  };

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <Text as="h1" size="24px" weight="bold" color="red" marginBottom="24px">
          エラーページ
        </Text>
        <Text as="p">
          予期せぬエラーが発生しました。再度時間を空けてからページを更新してください。
        </Text>
        <div className={styles.actions}>
          <Button
              onClick={handleReset}
              type="button"
              variant="primary"
            >
            更新
          </Button>
          <Link href="/">
            <Button
              type="button"
              variant="secondary"
            >
              トップページへ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomErrorFallback;
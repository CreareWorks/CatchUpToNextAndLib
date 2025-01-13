// components/Button.tsx
import React, { ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'cancel'; // ボタンのスタイルを分ける
  disabled?: boolean;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  variant = 'primary',
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

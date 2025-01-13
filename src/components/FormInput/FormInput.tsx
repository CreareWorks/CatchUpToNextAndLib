// components/FormInput/FormInput.tsx
import React from 'react';
import styles from './FormInput.module.scss';

type FieldProps = {
  id: string;
  errors?: string[];
};

type TextInputProps = {
  field: FieldProps; // fields.emailやfields.nameをそのまま渡す
  inputProps: React.InputHTMLAttributes<HTMLInputElement>; // {...getInputProps(fields.email)} をそのまま渡す
  label?: string; // ラベルのテキスト
  className?: string;
  placeholder?: string;
  required?: boolean;
};

export const FormInput: React.FC<TextInputProps> = ({
  field,
  inputProps,
  label,
  className = '',
  placeholder = '',
  required = false,
}) => {
  return (
    <div>
      {label && <label htmlFor={field.id} className={styles.label}>{label}</label>}
      <input
        {...inputProps} // getInputPropsのプロパティをそのまま適用(conform)
        id={field.id}
        className={`${styles.input} ${className || ''}`} // スタイルの適用
        placeholder={placeholder}
        required={required}
      />
      {field.errors?.map((error, idx) => (
        <div key={idx} className={styles.error}>{error}</div>
      ))}
    </div>
  );
};

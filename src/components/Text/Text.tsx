import React, { CSSProperties, ReactNode } from 'react';

type TextOwnProps = {
  color?: CSSProperties['color'];
  size?: CSSProperties['fontSize'];
  weight?: CSSProperties['fontWeight'];
  marginBottom?: CSSProperties['marginBottom'];
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};
type TextProps<E extends React.ElementType> = TextOwnProps & {
  as?: E;
} & Omit<React.ComponentPropsWithRef<E>, keyof TextOwnProps | 'as'>;

export const Text = <E extends React.ElementType = 'p'>(
  props: TextProps<E>
) => {
  const {
    as,
    color,
    size,
    weight,
    marginBottom = '16px', // デフォルト値を設定
    style,
    className,
    children,
    ...rest
  } = props;

  //実際に描画する要素: 指定がなければ 'p'
  const Component = as || 'p';

  // cssのプロパティをまとめて適用させる
  const mergedStyle: CSSProperties = {
    color,
    fontSize: size,
    fontWeight: weight,
    marginBottom,
    ...style,
  };

  /**
   * {...rest} には、`E` が受け取れるあらゆるプロパティ
   *  (例: onClick, disabled, htmlFor, など HTML or 他コンポーネント由来のもの) が入る
   */
  return (
    <Component className={className} style={mergedStyle} {...rest}>
      {children}
    </Component>
  );
};
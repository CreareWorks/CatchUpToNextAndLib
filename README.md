# CatchUpToNextAndLib

## 当リポジトリについて
- 普段はBEをメインに開発をさせていただいております。
  その為、実務以外でFEを触る機会を増やすために、Nextとその周辺ライブラリのキャッチアップ、
  React19,Next15(14でstableになったserverAction, Component)について知識を固めるためにディレクトリ構成を考えて手を動かすためのリポジトリになっております。
- その他、気になったライブラリや書き方、練習などとにかく好きなように書き溜めていくリポジトリにしたいと思います。
- 認証機能を実装している為、不必要に個人情報を収集しないようにdeployはしません、ご了承ください。

## ライブラリ
- "next-auth": "^5.0.0-beta.25"
  - 認証ライブラリ
- "zod": "^3.24.1"
  - バリデーション
  - 型定義
- "@conform-to/react": "^1.2.2"
  - formライブラリとして導入
- "@conform-to/zod": "^1.2.2"
  - server, clientのバリデーションをzodスキーマを通すことによって共通化
- "drizzle-kit": "^0.30.1"
- "drizzle-orm": "^0.38.3"
  - postgresへのDB処理に採用
- Babylon.js
  - 3Dモデルの生成

## Server Actions
  - DBへの通信(CREATE, UPDATE, DELETE系)が発生するような処理をまとめた関数を呼びだすような処理を記述
---
##  Server Component
  -  data fetch(SELECT)が発生し、取得結果をレンダリングする必要があるもの
  - また、client側でないと実行できないもの以外の処理を記述(ハイドレーション対策)
---
## xxxClientActions
- ClientActionsという命名は独自で決定
- こちらにはreactが用意しているhooks(ブラウザで動く関数)を記述
---
##  session取得
  - 基本的にclient側で無駄なsession取得を行わない
  - 取得する場合は、serverCompornet側でauth()をcallし、client側コンポーネントにporpsで渡し、レンダリング条件に使用する。
    - 認証しているかどうか　がわかればいい場合はclient側にbooleanを渡すこと。
      - 無駄にsession情報を渡さず必要最低限の値に絞って渡す。
---
##  repository
   - DBに対してQueryを発行する処理を記述(drizzle) 
---
## 型定義
- props
- response
- 定義した関数の返り値
- 変数や定数へ値を格納する時
- ライブラリも全てtsに対応している為、ライブラリが用意した型定義も使用できるところには都度使用していく。
---
## 部品コンポーネント
  - 下記のコンポーネントを使用すること。
    - form input
    - Button
    - Text系
---
##  css
  - scss記法でcss in moduleでスタイルを当てる。 
  - まだできていないが、global cssで変数定義し、PJ全体で使用するcolorは統一させる
---
## カスタムフック
- こちらはClientActionsでほぼ同じような役割で処理を書いている為、そもそも用意するか検討
---
# 画面画像
![image](https://github.com/user-attachments/assets/9620c192-070e-4b67-8ea4-62d988bba430)
![image](https://github.com/user-attachments/assets/6260e0fa-6a5d-4c9f-9fd2-d5f6f2cbb711)
![image](https://github.com/user-attachments/assets/a4547742-aeac-4d24-8e0d-ecff36157580)
![image](https://github.com/user-attachments/assets/98079a16-3731-4502-a6ea-c2c759b34183)
![image](https://github.com/user-attachments/assets/c24e2f5c-8dac-4db4-81e8-9285ad39254d)



import { defineConfig } from "drizzle-kit"

export default defineConfig({
  // スキーマファイルのディレクトリ
  schema: "./db/index.ts",

  // マイグレーションファイルの出力先
  out: "./db/migrations",

  dialect: process.env.DATABASE_TYPE as "postgresql",

  // 接続するDBの情報
  dbCredentials: {
    // ssl接続をオフ
    ssl: false,
    host: process.env.DATABASE_HOST || "localhost",
    user: process.env.DATABASE_USER || "postgres",
    password: process.env.DATABASE_PASSWORD || "",
    port: parseInt(process.env.DATABASE_PORT || "5432", 10),
    database: process.env.DATABASE_NAME || "",
  },
});
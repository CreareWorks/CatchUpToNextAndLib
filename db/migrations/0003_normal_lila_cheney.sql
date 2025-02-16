CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "user_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "o_auth_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_account_id" uuid NOT NULL,
	"provider_id" text NOT NULL,
	"provider_type" integer NOT NULL,
	"name" text,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "o_auth_users_provider_id_unique" UNIQUE("provider_id")
);
--> statement-breakpoint
ALTER TABLE "o_auth_users" ADD CONSTRAINT "o_auth_users_user_account_id_user_accounts_id_fk" FOREIGN KEY ("user_account_id") REFERENCES "public"."user_accounts"("id") ON DELETE cascade ON UPDATE no action;
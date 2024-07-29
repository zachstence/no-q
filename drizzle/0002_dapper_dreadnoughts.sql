ALTER TABLE "games" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "rolls" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "rolls" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "solutions" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "solutions" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL;
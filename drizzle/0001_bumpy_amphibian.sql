CREATE TABLE IF NOT EXISTS "games" (
	"id" text PRIMARY KEY NOT NULL,
	"creator" text NOT NULL,
	"roll" text NOT NULL,
	"solution" text,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rolls" (
	"id" text PRIMARY KEY NOT NULL,
	"letters" char(1)[12] NOT NULL,
	"discovered_by" text NOT NULL,
	"created_at" timestamp,
	CONSTRAINT "rolls_letters_unique" UNIQUE("letters")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "solutions" (
	"id" text PRIMARY KEY NOT NULL,
	"roll" text NOT NULL,
	"solution" jsonb NOT NULL,
	"discovered_by" text NOT NULL,
	"created_at" timestamp,
	CONSTRAINT "solutions_solution_unique" UNIQUE("solution")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_creator_users_id_fk" FOREIGN KEY ("creator") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_roll_rolls_id_fk" FOREIGN KEY ("roll") REFERENCES "public"."rolls"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_solution_solutions_id_fk" FOREIGN KEY ("solution") REFERENCES "public"."solutions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rolls" ADD CONSTRAINT "rolls_discovered_by_users_id_fk" FOREIGN KEY ("discovered_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "solutions" ADD CONSTRAINT "solutions_roll_rolls_id_fk" FOREIGN KEY ("roll") REFERENCES "public"."rolls"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "solutions" ADD CONSTRAINT "solutions_discovered_by_users_id_fk" FOREIGN KEY ("discovered_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

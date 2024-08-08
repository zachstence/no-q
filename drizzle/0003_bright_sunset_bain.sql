ALTER TABLE "solutions" DROP CONSTRAINT "solutions_roll_rolls_id_fk";
--> statement-breakpoint
ALTER TABLE "solutions" DROP COLUMN IF EXISTS "roll";
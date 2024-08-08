ALTER TABLE "solutions" RENAME COLUMN "solution" TO "board";--> statement-breakpoint
ALTER TABLE "solutions" DROP CONSTRAINT "solutions_solution_unique";--> statement-breakpoint
ALTER TABLE "solutions" ADD CONSTRAINT "solutions_board_unique" UNIQUE("board");
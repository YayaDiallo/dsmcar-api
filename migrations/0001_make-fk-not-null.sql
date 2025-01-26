ALTER TABLE "activities" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cars" ALTER COLUMN "activityId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "expenses" ALTER COLUMN "activityId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "expenses" ALTER COLUMN "categoryId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "revenues" ALTER COLUMN "activityId" SET NOT NULL;
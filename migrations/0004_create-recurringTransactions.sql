CREATE TYPE "public"."frequency" AS ENUM('daily', 'weekly', 'monthly', 'yearly');--> statement-breakpoint
CREATE TABLE "recurringTransactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"activityId" uuid NOT NULL,
	"categoryId" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"kind" "kind" DEFAULT 'expense' NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"startDate" date NOT NULL,
	"endDate" date NOT NULL,
	"frequency" "frequency" NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"lastRunAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "recurringTransactionId" uuid;--> statement-breakpoint
ALTER TABLE "recurringTransactions" ADD CONSTRAINT "recurringTransactions_activityId_activities_id_fk" FOREIGN KEY ("activityId") REFERENCES "public"."activities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recurringTransactions" ADD CONSTRAINT "recurringTransactions_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_recurringTransactionId_recurringTransactions_id_fk" FOREIGN KEY ("recurringTransactionId") REFERENCES "public"."recurringTransactions"("id") ON DELETE no action ON UPDATE no action;
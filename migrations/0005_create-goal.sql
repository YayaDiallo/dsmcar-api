CREATE TABLE "goals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"activityId" uuid NOT NULL,
	"parentGoalId" uuid,
	"name" varchar(255),
	"frequency" "frequency" DEFAULT 'monthly' NOT NULL,
	"targetAmount" numeric(12, 2) NOT NULL,
	"startDate" date NOT NULL,
	"endDate" date NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "goals" ADD CONSTRAINT "goals_activityId_activities_id_fk" FOREIGN KEY ("activityId") REFERENCES "public"."activities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "goals" ADD CONSTRAINT "goals_parentGoalId_goals_id_fk" FOREIGN KEY ("parentGoalId") REFERENCES "public"."goals"("id") ON DELETE no action ON UPDATE no action;
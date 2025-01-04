CREATE TYPE "public"."role" AS ENUM('admin', 'owner');--> statement-breakpoint
CREATE TABLE "activities" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "activities_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer,
	"companyName" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cars" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cars_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"activityId" integer,
	"brand" varchar(255) NOT NULL,
	"model" varchar(255) NOT NULL,
	"plate" varchar(255) NOT NULL,
	"year" date NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expenses" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "expenses_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"activityId" integer,
	"categoryId" integer,
	"type" varchar(255) NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"date" date NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "revenues" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "revenues_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"activityId" integer,
	"type" varchar(255) NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'owner' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cars" ADD CONSTRAINT "cars_activityId_activities_id_fk" FOREIGN KEY ("activityId") REFERENCES "public"."activities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_activityId_activities_id_fk" FOREIGN KEY ("activityId") REFERENCES "public"."activities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "revenues" ADD CONSTRAINT "revenues_activityId_activities_id_fk" FOREIGN KEY ("activityId") REFERENCES "public"."activities"("id") ON DELETE no action ON UPDATE no action;

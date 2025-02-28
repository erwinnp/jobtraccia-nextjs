CREATE TABLE "jobApplications" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"position" text NOT NULL,
	"applicationStatus" text NOT NULL,
	"companyName" text NOT NULL,
	"companyLocation" text NOT NULL,
	"applicationDate" timestamp with time zone NOT NULL,
	"applicationSource" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "jobApplications_id_unique" UNIQUE("id")
);

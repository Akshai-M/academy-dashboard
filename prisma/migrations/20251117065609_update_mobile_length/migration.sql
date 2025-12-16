/*
  Warnings:

  - Made the column `mobile_number` on table `candidate_interviews` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."candidate_interviews" ALTER COLUMN "mobile_number" SET NOT NULL,
ALTER COLUMN "mobile_number" SET DATA TYPE VARCHAR(191);

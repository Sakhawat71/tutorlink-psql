/*
  Warnings:

  - Added the required column `profileImage` to the `tutors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tutors" ADD COLUMN     "profileImage" TEXT NOT NULL;

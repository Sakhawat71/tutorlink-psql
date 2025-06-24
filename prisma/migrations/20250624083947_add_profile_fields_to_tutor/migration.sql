/*
  Warnings:

  - You are about to drop the column `subjects` on the `tutors` table. All the data in the column will be lost.
  - Added the required column `email` to the `tutors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `tutors` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `experience` on the `tutors` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "tutors" DROP COLUMN "subjects",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "experience",
ADD COLUMN     "experience" INTEGER NOT NULL;

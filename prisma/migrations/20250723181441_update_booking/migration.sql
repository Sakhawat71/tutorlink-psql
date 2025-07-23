/*
  Warnings:

  - Added the required column `selectedSlotId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "selectedSlotId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_selectedSlotId_fkey" FOREIGN KEY ("selectedSlotId") REFERENCES "Availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

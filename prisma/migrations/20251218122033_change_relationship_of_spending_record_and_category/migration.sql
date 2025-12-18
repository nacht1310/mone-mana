/*
  Warnings:

  - You are about to drop the column `spendingRecordId` on the `categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "spendingRecordId";

-- AddForeignKey
ALTER TABLE "spending-records" ADD CONSTRAINT "spending-records_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

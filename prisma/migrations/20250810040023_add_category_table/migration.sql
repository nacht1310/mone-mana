/*
  Warnings:

  - You are about to drop the column `category` on the `spending-records` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `spending-records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "spending-records" DROP COLUMN "category",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "keywords" TEXT[],
    "isDefault" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "spendingRecordId" INTEGER,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

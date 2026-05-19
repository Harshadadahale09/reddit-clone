/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `Vote` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "type",
ADD COLUMN     "type" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_postId_key" ON "Vote"("userId", "postId");

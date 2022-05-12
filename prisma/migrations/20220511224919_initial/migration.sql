/*
  Warnings:

  - Added the required column `hash` to the `Source` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PublicLink" DROP CONSTRAINT "PublicLink_groupId_fkey";

-- DropForeignKey
ALTER TABLE "PublicLink" DROP CONSTRAINT "PublicLink_profileId_fkey";

-- AlterTable
ALTER TABLE "PublicLink" ALTER COLUMN "profileId" DROP NOT NULL,
ALTER COLUMN "groupId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Source" ADD COLUMN     "hash" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PublicLink" ADD CONSTRAINT "PublicLink_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicLink" ADD CONSTRAINT "PublicLink_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `FavoritesOnPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FavoritesOnPosts" DROP CONSTRAINT "FavoritesOnPosts_favoritesId_fkey";

-- DropForeignKey
ALTER TABLE "FavoritesOnPosts" DROP CONSTRAINT "FavoritesOnPosts_postId_fkey";

-- DropTable
DROP TABLE "FavoritesOnPosts";

-- CreateTable
CREATE TABLE "_FavoritesTagToPost" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesTagToPost_AB_unique" ON "_FavoritesTagToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesTagToPost_B_index" ON "_FavoritesTagToPost"("B");

-- AddForeignKey
ALTER TABLE "_FavoritesTagToPost" ADD CONSTRAINT "_FavoritesTagToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "FavoritesTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesTagToPost" ADD CONSTRAINT "_FavoritesTagToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

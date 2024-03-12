/*
  Warnings:

  - You are about to drop the `_FavoritesTagToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FavoritesTagToPost" DROP CONSTRAINT "_FavoritesTagToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesTagToPost" DROP CONSTRAINT "_FavoritesTagToPost_B_fkey";

-- DropTable
DROP TABLE "_FavoritesTagToPost";

-- CreateTable
CREATE TABLE "FavoritesOnPosts" (
    "postId" STRING NOT NULL,
    "favoritesId" STRING NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" STRING NOT NULL,

    CONSTRAINT "FavoritesOnPosts_pkey" PRIMARY KEY ("postId","favoritesId")
);

-- AddForeignKey
ALTER TABLE "FavoritesOnPosts" ADD CONSTRAINT "FavoritesOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoritesOnPosts" ADD CONSTRAINT "FavoritesOnPosts_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "FavoritesTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

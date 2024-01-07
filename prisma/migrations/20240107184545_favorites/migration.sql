-- CreateTable
CREATE TABLE "FavoritesTag" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "FavoritesTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavoritesTagToPost" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoritesTag_name_key" ON "FavoritesTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesTagToPost_AB_unique" ON "_FavoritesTagToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesTagToPost_B_index" ON "_FavoritesTagToPost"("B");

-- AddForeignKey
ALTER TABLE "_FavoritesTagToPost" ADD CONSTRAINT "_FavoritesTagToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "FavoritesTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesTagToPost" ADD CONSTRAINT "_FavoritesTagToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

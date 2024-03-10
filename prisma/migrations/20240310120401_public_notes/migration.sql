-- CreateTable
CREATE TABLE "PublicTag" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "PublicTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostToPublicTag" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PostToPublicTag_AB_unique" ON "_PostToPublicTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToPublicTag_B_index" ON "_PostToPublicTag"("B");

-- AddForeignKey
ALTER TABLE "_PostToPublicTag" ADD CONSTRAINT "_PostToPublicTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToPublicTag" ADD CONSTRAINT "_PostToPublicTag_B_fkey" FOREIGN KEY ("B") REFERENCES "PublicTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('Image', 'Video', 'Audio', 'File');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDay" INTEGER NOT NULL,
    "birthMonth" INTEGER NOT NULL,
    "birthYear" INTEGER NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfilePost" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "ProfilePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupPost" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "GroupPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Audio" (
    "id" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "durationMs" INTEGER NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "Audio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "type" "FileType" NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProfileFollower" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProfilePostToVideo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupPostToPhoto" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupPostToVideo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PhotoToProfilePost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AudioToProfilePost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AudioToGroupPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArtistToAudio" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_profileId_key" ON "User"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Photo_sourceId_key" ON "Photo"("sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "Video_sourceId_key" ON "Video"("sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "Audio_imageId_key" ON "Audio"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "Audio_sourceId_key" ON "Audio"("sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "File_sourceId_key" ON "File"("sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileFollower_AB_unique" ON "_ProfileFollower"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileFollower_B_index" ON "_ProfileFollower"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupMember_AB_unique" ON "_GroupMember"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupMember_B_index" ON "_GroupMember"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfilePostToVideo_AB_unique" ON "_ProfilePostToVideo"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfilePostToVideo_B_index" ON "_ProfilePostToVideo"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupPostToPhoto_AB_unique" ON "_GroupPostToPhoto"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupPostToPhoto_B_index" ON "_GroupPostToPhoto"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupPostToVideo_AB_unique" ON "_GroupPostToVideo"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupPostToVideo_B_index" ON "_GroupPostToVideo"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PhotoToProfilePost_AB_unique" ON "_PhotoToProfilePost"("A", "B");

-- CreateIndex
CREATE INDEX "_PhotoToProfilePost_B_index" ON "_PhotoToProfilePost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AudioToProfilePost_AB_unique" ON "_AudioToProfilePost"("A", "B");

-- CreateIndex
CREATE INDEX "_AudioToProfilePost_B_index" ON "_AudioToProfilePost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AudioToGroupPost_AB_unique" ON "_AudioToGroupPost"("A", "B");

-- CreateIndex
CREATE INDEX "_AudioToGroupPost_B_index" ON "_AudioToGroupPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistToAudio_AB_unique" ON "_ArtistToAudio"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistToAudio_B_index" ON "_ArtistToAudio"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfilePost" ADD CONSTRAINT "ProfilePost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupPost" ADD CONSTRAINT "GroupPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupPost" ADD CONSTRAINT "GroupPost_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileFollower" ADD CONSTRAINT "_ProfileFollower_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileFollower" ADD CONSTRAINT "_ProfileFollower_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupMember" ADD CONSTRAINT "_GroupMember_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupMember" ADD CONSTRAINT "_GroupMember_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfilePostToVideo" ADD CONSTRAINT "_ProfilePostToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "ProfilePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfilePostToVideo" ADD CONSTRAINT "_ProfilePostToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupPostToPhoto" ADD CONSTRAINT "_GroupPostToPhoto_A_fkey" FOREIGN KEY ("A") REFERENCES "GroupPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupPostToPhoto" ADD CONSTRAINT "_GroupPostToPhoto_B_fkey" FOREIGN KEY ("B") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupPostToVideo" ADD CONSTRAINT "_GroupPostToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "GroupPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupPostToVideo" ADD CONSTRAINT "_GroupPostToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PhotoToProfilePost" ADD CONSTRAINT "_PhotoToProfilePost_A_fkey" FOREIGN KEY ("A") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PhotoToProfilePost" ADD CONSTRAINT "_PhotoToProfilePost_B_fkey" FOREIGN KEY ("B") REFERENCES "ProfilePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AudioToProfilePost" ADD CONSTRAINT "_AudioToProfilePost_A_fkey" FOREIGN KEY ("A") REFERENCES "Audio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AudioToProfilePost" ADD CONSTRAINT "_AudioToProfilePost_B_fkey" FOREIGN KEY ("B") REFERENCES "ProfilePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AudioToGroupPost" ADD CONSTRAINT "_AudioToGroupPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Audio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AudioToGroupPost" ADD CONSTRAINT "_AudioToGroupPost_B_fkey" FOREIGN KEY ("B") REFERENCES "GroupPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToAudio" ADD CONSTRAINT "_ArtistToAudio_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToAudio" ADD CONSTRAINT "_ArtistToAudio_B_fkey" FOREIGN KEY ("B") REFERENCES "Audio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

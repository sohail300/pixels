-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Wallpaper" (
    "wallpaper_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "downloaded" INTEGER NOT NULL DEFAULT 0,
    "liked" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Wallpaper_pkey" PRIMARY KEY ("wallpaper_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Liked" (
    "liked_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "wallpaper_id" TEXT NOT NULL,

    CONSTRAINT "Liked_pkey" PRIMARY KEY ("liked_id")
);

-- CreateTable
CREATE TABLE "Downloaded" (
    "downloaded_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "wallpaper_id" TEXT NOT NULL,

    CONSTRAINT "Downloaded_pkey" PRIMARY KEY ("downloaded_id")
);

-- CreateTable
CREATE TABLE "_CategoryToWallpaper" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToWallpaper_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "_CategoryToWallpaper_B_index" ON "_CategoryToWallpaper"("B");

-- AddForeignKey
ALTER TABLE "Liked" ADD CONSTRAINT "Liked_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liked" ADD CONSTRAINT "Liked_wallpaper_id_fkey" FOREIGN KEY ("wallpaper_id") REFERENCES "Wallpaper"("wallpaper_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Downloaded" ADD CONSTRAINT "Downloaded_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Downloaded" ADD CONSTRAINT "Downloaded_wallpaper_id_fkey" FOREIGN KEY ("wallpaper_id") REFERENCES "Wallpaper"("wallpaper_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToWallpaper" ADD CONSTRAINT "_CategoryToWallpaper_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToWallpaper" ADD CONSTRAINT "_CategoryToWallpaper_B_fkey" FOREIGN KEY ("B") REFERENCES "Wallpaper"("wallpaper_id") ON DELETE CASCADE ON UPDATE CASCADE;

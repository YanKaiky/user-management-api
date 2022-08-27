/*
  Warnings:

  - Added the required column `city_guid` to the `peoples` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "peoples" ADD COLUMN     "city_guid" UUID NOT NULL;

-- CreateTable
CREATE TABLE "cities" (
    "guid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("guid")
);

-- CreateIndex
CREATE UNIQUE INDEX "cities_guid_key" ON "cities"("guid");

-- AddForeignKey
ALTER TABLE "peoples" ADD CONSTRAINT "peoples_city_guid_fkey" FOREIGN KEY ("city_guid") REFERENCES "cities"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "cities" (
    "guid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "state_guid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("guid")
);

-- CreateIndex
CREATE UNIQUE INDEX "cities_guid_key" ON "cities"("guid");

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_state_guid_fkey" FOREIGN KEY ("state_guid") REFERENCES "states"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

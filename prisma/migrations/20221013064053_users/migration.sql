-- CreateTable
CREATE TABLE "users" (
    "guid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT,
    "password" TEXT,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "city_guid" UUID NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("guid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_guid_key" ON "users"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_city_guid_fkey" FOREIGN KEY ("city_guid") REFERENCES "cities"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

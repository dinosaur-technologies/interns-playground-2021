-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('EMAIL', 'FACEBOOK', 'GOOGLE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'BUSINESS', 'STAFF', 'KITCHEN', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "Subscription" AS ENUM ('FREE', 'BASIC', 'BUSINESS');

-- CreateTable
CREATE TABLE "Account" (
    "ID" TEXT NOT NULL,
    "displayName" TEXT,
    "imageURL" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "provider" "Provider" NOT NULL DEFAULT E'EMAIL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_ID_key" ON "Account"("ID");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE INDEX "Account_ID_email_createdAt_updatedAt_idx" ON "Account"("ID", "email", "createdAt", "updatedAt");

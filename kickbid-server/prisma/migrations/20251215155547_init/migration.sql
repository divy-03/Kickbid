-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PLAYER', 'ADMIN', 'CAPTAIN', 'OWNER');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('LW', 'RW', 'ST', 'CAM', 'CM', 'CF', 'CDM', 'LM', 'RM', 'LB', 'RB', 'CB', 'LWB', 'RWB', 'GK');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT 'PLAYER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

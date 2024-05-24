-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "comment" TEXT,
    "purchasedOn" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,
    "nature" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

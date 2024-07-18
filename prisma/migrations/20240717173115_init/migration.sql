-- CreateTable
CREATE TABLE "bids" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "price" MONEY,
    "comment" TEXT,
    "status" VARCHAR(10),
    "listing_id" INTEGER,

    CONSTRAINT "bids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listing" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" MONEY,
    "status" VARCHAR(10),
    "seller_id" INTEGER,
    "purchase_user_id" INTEGER,
    "purchase_type" VARCHAR(10),
    "bid_id" INTEGER,
    "date_create" DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT "listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sellers" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "sellers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_history" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "listing_id" INTEGER,

    CONSTRAINT "transaction_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

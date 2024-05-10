/*
  Warnings:

  - A unique constraint covering the columns `[user1_id,user2_id]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Message" (
    "message_id" SERIAL NOT NULL,
    "chat_id" INTEGER NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("message_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chat_user1_id_user2_id_key" ON "Chat"("user1_id", "user2_id");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

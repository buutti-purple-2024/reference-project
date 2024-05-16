-- DropIndex
DROP INDEX "Chat_user1_id_user2_id_key";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileBanner" TEXT;

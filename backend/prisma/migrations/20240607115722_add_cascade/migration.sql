-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_topic_id_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("topic_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

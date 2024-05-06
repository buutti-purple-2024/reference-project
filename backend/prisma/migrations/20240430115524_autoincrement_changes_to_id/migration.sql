-- AlterTable
CREATE SEQUENCE chat_chat_id_seq;
ALTER TABLE "Chat" ALTER COLUMN "chat_id" SET DEFAULT nextval('chat_chat_id_seq');
ALTER SEQUENCE chat_chat_id_seq OWNED BY "Chat"."chat_id";

-- AlterTable
CREATE SEQUENCE comment_comment_id_seq;
ALTER TABLE "Comment" ALTER COLUMN "comment_id" SET DEFAULT nextval('comment_comment_id_seq');
ALTER SEQUENCE comment_comment_id_seq OWNED BY "Comment"."comment_id";

-- AlterTable
CREATE SEQUENCE follow_follow_id_seq;
ALTER TABLE "Follow" ALTER COLUMN "follow_id" SET DEFAULT nextval('follow_follow_id_seq');
ALTER SEQUENCE follow_follow_id_seq OWNED BY "Follow"."follow_id";

-- AlterTable
CREATE SEQUENCE post_post_id_seq;
ALTER TABLE "Post" ALTER COLUMN "post_id" SET DEFAULT nextval('post_post_id_seq');
ALTER SEQUENCE post_post_id_seq OWNED BY "Post"."post_id";

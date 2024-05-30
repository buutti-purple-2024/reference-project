-- Create the Topic table
CREATE TABLE "Topic" (
    "topic_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Topic_pkey" PRIMARY KEY ("topic_id")
);

-- Create a unique index on the name column
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");

-- Insert a default topic
INSERT INTO "Topic" ("name") VALUES ('General');

-- Add the topic_id column to the Post table (initially allowing NULL)
ALTER TABLE "Post" ADD COLUMN "topic_id" INTEGER;

-- Get the ID of the 'General' topic
DO $$
DECLARE
    general_topic_id INT;
BEGIN
    SELECT "topic_id" INTO general_topic_id FROM "Topic" WHERE "name" = 'General';

    -- Update existing Post rows to reference the 'General' topic
    UPDATE "Post" SET "topic_id" = general_topic_id;
END $$;

-- Set the topic_id column to NOT NULL
ALTER TABLE "Post" ALTER COLUMN "topic_id" SET NOT NULL;

-- Add foreign key constraint to the topic_id column
ALTER TABLE "Post" ADD CONSTRAINT "Post_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("topic_id") ON DELETE RESTRICT ON UPDATE CASCADE;

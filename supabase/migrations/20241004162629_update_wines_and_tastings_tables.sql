ALTER TABLE "public"."tastings"
ADD COLUMN "stock" INT DEFAULT 0,
ADD COLUMN "image" TEXT,
ADD COLUMN "slug" TEXT NOT NULL,
ADD COLUMN "long_description" TEXT;

ALTER TABLE "public"."tastings"
RENAME COLUMN "description" TO "short_description";

ALTER TABLE "public"."wines"
ADD COLUMN "stock" INT,
ADD COLUMN "image" TEXT;

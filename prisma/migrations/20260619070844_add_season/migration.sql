-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_trips" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "organizer_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "duration_days" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "old_price" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'RUB',
    "group_size" INTEGER NOT NULL DEFAULT 10,
    "difficulty" TEXT NOT NULL DEFAULT 'easy',
    "season" TEXT NOT NULL DEFAULT 'summer',
    "includes" TEXT NOT NULL,
    "excludes" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "rating" REAL NOT NULL DEFAULT 5.0,
    "reviews_count" INTEGER NOT NULL DEFAULT 0,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "bookings_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "trips_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "trips_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_trips" ("bookings_count", "category_id", "city", "country", "created_at", "currency", "description", "difficulty", "duration_days", "end_date", "excludes", "group_size", "id", "includes", "is_featured", "old_price", "organizer_id", "price", "rating", "reviews_count", "short_description", "slug", "start_date", "status", "title", "updated_at", "views_count") SELECT "bookings_count", "category_id", "city", "country", "created_at", "currency", "description", "difficulty", "duration_days", "end_date", "excludes", "group_size", "id", "includes", "is_featured", "old_price", "organizer_id", "price", "rating", "reviews_count", "short_description", "slug", "start_date", "status", "title", "updated_at", "views_count" FROM "trips";
DROP TABLE "trips";
ALTER TABLE "new_trips" RENAME TO "trips";
CREATE UNIQUE INDEX "trips_slug_key" ON "trips"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

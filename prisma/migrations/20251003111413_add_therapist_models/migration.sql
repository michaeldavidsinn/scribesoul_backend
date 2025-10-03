-- CreateTable
CREATE TABLE "Therapist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "pricePerSession" DOUBLE PRECISION NOT NULL,
    "profilePicture" TEXT,
    "rating" DOUBLE PRECISION,
    "yearsExperience" INTEGER NOT NULL,
    "totalSessions" INTEGER NOT NULL,
    "totalClients" INTEGER NOT NULL,

    CONSTRAINT "Therapist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TherapistProfile" (
    "id" SERIAL NOT NULL,
    "bio" TEXT NOT NULL,
    "specializations" TEXT[],
    "experiences" TEXT[],
    "languages" TEXT[],
    "workPlaces" TEXT[],
    "strNumber" TEXT NOT NULL,
    "educations" TEXT[],
    "therapyApproaches" TEXT[],
    "therapistId" INTEGER NOT NULL,

    CONSTRAINT "TherapistProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TherapistProfile_therapistId_key" ON "TherapistProfile"("therapistId");

-- AddForeignKey
ALTER TABLE "TherapistProfile" ADD CONSTRAINT "TherapistProfile_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "Therapist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

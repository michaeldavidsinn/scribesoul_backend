-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "ageRange" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "recentProblems" TEXT[],
    "mainGoal" TEXT NOT NULL,
    "feelingRecently" TEXT NOT NULL,
    "stressStartDate" TEXT NOT NULL,
    "emotionDuration" TEXT NOT NULL,
    "moodSwingFrequency" TEXT NOT NULL,
    "supportNeedFrequency" TEXT NOT NULL,
    "supportTypeInterest" TEXT[],
    "mentalHealthChallenges" TEXT[],
    "motivation" TEXT NOT NULL,
    "soughtHelpBefore" BOOLEAN NOT NULL,
    "professionalHelpDuration" TEXT,
    "supportKindLookingFor" TEXT NOT NULL,
    "socialConnectionImportance" TEXT NOT NULL,
    "learnAboutMentalHealth" BOOLEAN NOT NULL,
    "mentalHealthTopics" TEXT[],
    "receiveReminders" BOOLEAN NOT NULL,
    "reminderFrequency" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

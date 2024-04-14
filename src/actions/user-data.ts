"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";

import db from "@/db/drizzle";
import { POINTS_TO_REFILL } from "@/constants";
import { getCourseById, getUserData, getUserSubscription } from "@/db/queries";
import { challengeProgress, challenges, userData } from "@/db/schema";

export const upsertUserData = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const course = await getCourseById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  if (!course.units.length || !course.units[0].lessons.length) {
    throw new Error("Course is empty");
  }

  const existingUserData = await getUserData();

  if (existingUserData) {
    await db.update(userData).set({
      activeCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.png",
    }).where(eq(userData.userId, userId));

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
  }

  await db.insert(userData).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.png",
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};

export const upsertUserGrade = async (grade: string) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const existingUserData = await getUserData();

  if (existingUserData) {
    await db.update(userData).set({
      grade: grade,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.png",
    }).where(eq(userData.userId, userId));

    revalidatePath("/learn");
    revalidatePath("/onboarding");
    redirect("/onboarding/study");
  }

  await db.insert(userData).values({
    userId,
    grade: grade,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.png",
  });

  revalidatePath("/learn");
    revalidatePath("/onboarding");
    redirect("/onboarding/study");
};
export const upsertUserStudy = async (study: string) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const existingUserData = await getUserData();

  if (existingUserData) {
    await db.update(userData).set({
      study: study,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.png",
    }).where(eq(userData.userId, userId));

    revalidatePath("/learn");
    revalidatePath("/onboarding");
    redirect("/onboarding/topics");
  }

  await db.insert(userData).values({
    userId,
    study: study,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.png",
  });

  revalidatePath("/learn");
    revalidatePath("/onboarding");
    redirect("/onboarding/topics");
};
export const upsertUserTopics = async (topics: string) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const existingUserData = await getUserData();

  if (existingUserData) {
    await db.update(userData).set({
      topics: topics,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.png",
    }).where(eq(userData.userId, userId));

    revalidatePath("/learn");
    revalidatePath("/onboarding");
    redirect("/onboarding/reason");
  }

  await db.insert(userData).values({
    userId,
    topics: topics,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.png",
  });

  revalidatePath("/learn");
    revalidatePath("/onboarding");
    redirect("/onboarding/reason");
};
export const upsertUserReason = async (reason: string) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const existingUserData = await getUserData();

  if (existingUserData) {
    await db.update(userData).set({
      reason: reason,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.png",
    }).where(eq(userData.userId, userId));

    revalidatePath("/learn");
    revalidatePath("/onboarding");
    redirect("/onboarding/success");
  }

  await db.insert(userData).values({
    userId,
    reason: reason,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.png",
  });

  revalidatePath("/learn");
  revalidatePath("/onboarding");
  redirect("/onboarding/success");
};
export const reduceHearts = async (challengeId: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const currentUserData = await getUserData();
  const userSubscription = await getUserSubscription();

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) {
    throw new Error("Challenge not found");
  }

  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId),
    ),
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) {
    return { error: "practice" }; 
  }

  if (!currentUserData) {
    throw new Error("User progress not found");
  }

  if (userSubscription?.isActive) {
    return { error: "subscription" };
  }

  if (currentUserData.hearts === 0) {
    return { error: "hearts" };
  }

  await db.update(userData).set({
    hearts: Math.max(currentUserData.hearts - 1, 0),
  }).where(eq(userData.userId, userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};

export const refillHearts = async () => {
  const currentUserData = await getUserData();

  if (!currentUserData) {
    throw new Error("User progress not found");
  }

  if (currentUserData.hearts === 5) {
    throw new Error("Hearts are already full");
  }

  if (currentUserData.points < POINTS_TO_REFILL) {
    throw new Error("Not enough points");
  }

  await db.update(userData).set({
    hearts: 5,
    points: currentUserData.points - POINTS_TO_REFILL,
  }).where(eq(userData.userId, currentUserData.userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};
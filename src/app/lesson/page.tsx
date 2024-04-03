import { redirect } from "next/navigation";

import { getLesson, getUserData, getUserSubscription } from "@/db/queries";

import { Quiz } from "./quiz";

const LessonPage = async () => {
  const lessonData = getLesson();
  const userProgressData = getUserData();
  const userSubscriptionData = getUserSubscription();

  const [
    lesson,
    userData,
    userSubscription,
  ] = await Promise.all([
    lessonData,
    userProgressData,
    userSubscriptionData,
  ]);

  if (!lesson || !userData) {
    redirect("/learn");
  }

  const initialPercentage = lesson.challenges
    .filter((challenge) => challenge.completed)
    .length / lesson.challenges.length * 100;

  return ( 
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userData.hearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription}
    />
  );
};
 
export default LessonPage;
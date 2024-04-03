import { getCourses, getUserData } from "@/db/queries";

import { List } from "./list";

const CoursesPage = async () => {
  const coursesData = getCourses();
  const userProgressData = getUserData();

  const [
    courses,
    userData,
  ] = await Promise.all([
    coursesData,
    userProgressData,
  ]);

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">
        Math Courses
      </h1>
      <List
        courses={courses}
        activeCourseId={userData?.activeCourseId}
      />
    </div>
  );
};

export default CoursesPage;
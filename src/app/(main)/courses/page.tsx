import { getCourses, getUserData } from "@/db/queries";

import { List } from "./list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        Dr Ham  Recommneded Courses
      </h1>
      <div className="flex flex-col gap-6 items-center justify-center">
      <span>To have Dr Ham Recommneded courses you need to take a knowledge test.</span>
      <Button>
        <Link href="/kc">
        Take a knowledge test
        </Link>
        </Button>
      </div>
      
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
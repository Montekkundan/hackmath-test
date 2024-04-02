import { auth } from "@clerk/nextjs"

const adminIds = [
  "user_2eWjwZiynvblLYC2yyZ3ZTuO0Wy",
  "user_2eWyrM0VuKW7X7NOE2E2fvzAXGw",
];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
import { auth } from "@clerk/nextjs"

const adminIds = [
  "user_2eWjwZiynvblLYC2yyZ3ZTuO0Wy",
];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!); 
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Algebra",
        imageSrc: "/maths.png",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, // Algebra
        title: "Unit 1",
        description: "Introduction to Algebra",
        order: 1,
      }
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unit 1 (Introduction to Algebra)
        order: 1,
        title: "Variables and Expressions",
      },
      {
        id: 2,
        unitId: 1, // Unit 1 (Introduction to Algebra)
        order: 2,
        title: "Solving Equations",
      },
      // Add more lessons as needed
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Variables and Expressions
        type: "SELECT",
        order: 1,
        question: 'Identify the variable in the expression "2x + 3"',
      },
      {
        id: 2,
        lessonId: 1, // Variables and Expressions
        type: "ASSIST",
        order: 2,
        question: 'Simplify the expression "3(2x + 1)"',
      },
      // Add more challenges as needed
    ]);

    await db.insert(schema.challengeOptions).values([
      // Options for challenge 1
      {
        challengeId: 1,
        correct: true,
        text: "x",
      },
      // Add more options as needed
    ]);

    // Add more challenge options and challenges as needed

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();

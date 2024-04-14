import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

import * as schema from '../db/schema';

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log('Seeding database');

    try {
      console.log('Deleting courses...');
      await db.delete(schema.courses);
    } catch (error) {
      console.error('Error deleting courses: ', error);
      throw error;
    }

    try {
      console.log('Deleting userData...');
      await db.delete(schema.userData);
    } catch (error) {
      console.error('Error deleting userData: ', error);
      throw error;
    }

    try {
      console.log('Deleting units...');
      await db.delete(schema.units);
    } catch (error) {
      console.error('Error deleting units: ', error);
      throw error;
    }

    try {
      console.log('Deleting lessons...');
      await db.delete(schema.lessons);
    } catch (error) {
      console.error('Error deleting lessons: ', error);
      throw error;
    }

    try {
      console.log('Deleting challenges...');
      await db.delete(schema.challenges);
    } catch (error) {
      console.error('Error deleting challenges: ', error);
      throw error;
    }

    try {
      console.log('Deleting challengeOptions...');
      await db.delete(schema.challengeOptions);
    } catch (error) {
      console.error('Error deleting challengeOptions: ', error);
      throw error;
    }

    try {
      console.log('Deleting challengeProgress...');
      await db.delete(schema.challengeProgress);
    } catch (error) {
      console.error('Error deleting challengeProgress: ', error);
      throw error;
    }

    try {
      console.log('Deleting userSubscription...');
      await db.delete(schema.userSubscription);
    } catch (error) {
      console.error('Error deleting userSubscription: ', error);
      throw error;
    }

    try {
      console.log('Inserting courses...');

      await db.insert(schema.courses).values([
        {
          id: 1,
          title: 'Functions',
          imageSrc: '/maths.png',
        },
      ]);
    } catch (error) {
      console.error('Error inserting courses: ', error);
      throw error;
    }
    try {
      console.log('Inserting userData...');
      await db.insert(schema.units).values([
        {
          id: 1,
          courseId: 1, // Functions
          title: 'Introduction to Functions',
          description: 'Understanding and representing functions',
          order: 1,
        },
        {
          id: 2,
          courseId: 1, // Functions
          title: 'Linear Functions',
          description: 'Analysis and representation of linear functions',
          order: 2,
        },
      ]);
    } catch (error) {
      console.error('Error inserting units: ', error);
      throw error;
    }

    try {
      console.log('Inserting lessons...');
      await db.insert(schema.lessons).values([
        // Lessons for "Introduction to Functions"
        {
          id: 1,
          unitId: 1, // "Introduction to Functions" has unitId 1
          order: 1,
          title: 'Understanding the concept of a function',
        },
        {
          id: 2,
          unitId: 1, // "Introduction to Functions"
          order: 2,
          title: 'Representing functions using tables',
        },
        {
          id: 3,
          unitId: 1, // "Introduction to Functions"
          order: 3,
          title: 'Representing functions using graphs',
        },
        {
          id: 4,
          unitId: 1, // "Introduction to Functions"
          order: 4,
          title: 'Representing functions using equations',
        },
        // Lessons for "Linear Functions"
        {
          id: 5,
          unitId: 2, // "Linear Functions" has unitId 2
          order: 1,
          title: 'Analyzing linear functions',
        },
        {
          id: 6,
          unitId: 2, // "Linear Functions"
          order: 2,
          title: 'Graphing linear functions',
        },
        {
          id: 7,
          unitId: 2, // "Linear Functions"
          order: 3,
          title: 'Exploring slope-intercept form',
        },
        {
          id: 8,
          unitId: 2, // "Linear Functions"
          order: 4,
          title: 'Exploring point-slope form',
        },
      ]);
    } catch (error) {
      console.error('Error inserting lessons: ', error);
      throw error;
    }
    try {
      console.log('Inserting challenges...');

      await db.insert(schema.challenges).values([
        {
          id: 1,
          lessonId: 1,
          type: 'WARMUP',
          order: 1,
          question: 'Define a function in your own words.',
        },
        {
          id: 2,
          lessonId: 1,
          type: 'CONCEPTUAL',
          order: 2,
          question: 'How do functions relate to real-world situations?',
        },
        {
          id: 3,
          lessonId: 1,
          type: 'PROCEDURAL',
          order: 3,
          question: 'What process would you follow to evaluate a function?',
        },
        {
          id: 4,
          lessonId: 1,
          type: 'APPLICATION',
          order: 4,
          question:
            'Give an example of a function you use in daily life and explain its components.',
        },

        // Challenges for Lesson 2: "Representing functions using tables"
        {
          id: 5,
          lessonId: 2,
          type: 'WARMUP',
          order: 1,
          question: 'Why are tables useful in representing functions?',
        },
        {
          id: 6,
          lessonId: 2,
          type: 'CONCEPTUAL',
          order: 2,
          question:
            'Describe the relationship between independent and dependent variables in a function.',
        },
        {
          id: 7,
          lessonId: 2,
          type: 'PROCEDURAL',
          order: 3,
          question:
            'How can you create a table of values for a linear function?',
        },
        {
          id: 8,
          lessonId: 2,
          type: 'APPLICATION',
          order: 4,
          question:
            'Explain how you could use a table to predict future events given a function that models past data.',
        },
        // Challenges for Lesson 3: "Representing functions using graphs"
        {
          id: 9,
          lessonId: 3,
          type: 'WARMUP',
          order: 1,
          question:
            'What information can you obtain from the graph of a function?',
        },
        {
          id: 10,
          lessonId: 3,
          type: 'CONCEPTUAL',
          order: 2,
          question:
            'How does the graph of a function help in understanding the behavior of the function?',
        },
        {
          id: 11,
          lessonId: 3,
          type: 'PROCEDURAL',
          order: 3,
          question: 'Outline the steps to graph a function given its equation.',
        },
        {
          id: 12,
          lessonId: 3,
          type: 'APPLICATION',
          order: 4,
          question:
            'Present a real-world problem that can be modeled by a function and show its graph.',
        },

        // Challenges for Lesson 4: "Representing functions using equations"
        {
          id: 13,
          lessonId: 4,
          type: 'WARMUP',
          order: 1,
          question: 'How do equations represent functions?',
        },
        {
          id: 14,
          lessonId: 4,
          type: 'CONCEPTUAL',
          order: 2,
          question:
            "Explain the significance of the slope and y-intercept in the function's equation.",
        },
        {
          id: 15,
          lessonId: 4,
          type: 'PROCEDURAL',
          order: 3,
          question:
            'Demonstrate how to convert the graph of a function into its equation.',
        },
        {
          id: 16,
          lessonId: 4,
          type: 'APPLICATION',
          order: 4,
          question:
            'How would you use the equation of a function to make predictions in a given context?',
        },

        // Challenges for Lesson 5: "Analyzing linear functions"
        {
          id: 17,
          lessonId: 5,
          type: 'WARMUP',
          order: 1,
          question: 'What characteristics define a linear function?',
        },
        {
          id: 18,
          lessonId: 5,
          type: 'CONCEPTUAL',
          order: 2,
          question:
            'Compare and contrast linear functions with non-linear functions.',
        },
        {
          id: 19,
          lessonId: 5,
          type: 'PROCEDURAL',
          order: 3,
          question:
            'Explain the process of finding the slope of a line given two points.',
        },
        {
          id: 20,
          lessonId: 5,
          type: 'APPLICATION',
          order: 4,
          question:
            'Apply the concept of slope to a scenario involving rate of change.',
        },
        // Inserting challenges for Lesson 6: "Graphing linear functions"
        {
          id: 21,
          lessonId: 6,
          type: 'WARMUP',
          order: 1,
          question: 'What is the first step in graphing a linear function?',
        },
        {
          id: 22,
          lessonId: 6,
          type: 'CONCEPTUAL',
          order: 2,
          question:
            'How does changing the slope affect the graph of a linear function?',
        },
        {
          id: 23,
          lessonId: 6,
          type: 'PROCEDURAL',
          order: 3,
          question:
            'Describe the method to find the x and y intercepts of a linear function.',
        },
        {
          id: 24,
          lessonId: 6,
          type: 'APPLICATION',
          order: 4,
          question:
            'Given a scenario, how would you graph the corresponding linear function?',
        },

        // Inserting challenges for Lesson 7: "Exploring slope-intercept form"
        {
          id: 25,
          lessonId: 7,
          type: 'WARMUP',
          order: 1,
          question:
            'What are the components of the slope-intercept form of a linear equation?',
        },
        {
          id: 26,
          lessonId: 7,
          type: 'CONCEPTUAL',
          order: 2,
          question:
            'Why is the slope-intercept form useful in understanding linear functions?',
        },
        {
          id: 27,
          lessonId: 7,
          type: 'PROCEDURAL',
          order: 3,
          question:
            'Demonstrate how to convert an equation to slope-intercept form.',
        },
        {
          id: 28,
          lessonId: 7,
          type: 'APPLICATION',
          order: 4,
          question:
            'How can you use the slope-intercept form to predict outcomes in a real-world problem?',
        },

        // Inserting challenges for Lesson 8: "Exploring point-slope form"
        {
          id: 29,
          lessonId: 8,
          type: 'WARMUP',
          order: 1,
          question:
            'What information do you need to write the equation of a line in point-slope form?',
        },
        {
          id: 30,
          lessonId: 8,
          type: 'CONCEPTUAL',
          order: 2,
          question:
            'Explain how point-slope form relates to the slope of a line.',
        },
        {
          id: 31,
          lessonId: 8,
          type: 'PROCEDURAL',
          order: 3,
          question:
            'What steps are involved in writing the equation of a line in point-slope form from a graph?',
        },
        {
          id: 32,
          lessonId: 8,
          type: 'APPLICATION',
          order: 4,
          question:
            'Provide an example of how point-slope form can be used to model a linear relationship in data.',
        },
        // Add more challenges as needed
      ]);
    } catch (error) {
      console.error('Error inserting challenges: ', error);
      throw error;
    }
    try {
      console.log('Inserting challengeOptions...');
      await db.insert(schema.challengeOptions).values([
        // Options for Challenge 1
        {
          challengeId: 1,
          correct: true,
          text: 'A function is a relation between sets that associates to every element of a first set exactly one element of the second set.',
        },
        {
          challengeId: 1,
          correct: false,
          text: 'A function is a relation where each output is paired with multiple inputs.',
        },
        // Options for Challenge 2
        {
          challengeId: 2,
          correct: true,
          text: 'Functions model relationships where each input has a specific output, such as converting temperatures between scales.',
        },
        {
          challengeId: 2,
          correct: false,
          text: 'Functions show random relationships without any specific input-output pairing.',
        },
        // Options for Challenge 3
        {
          challengeId: 3,
          correct: true,
          text: 'To evaluate a function, you substitute the given number for the variable in the expression and calculate the result.',
        },
        {
          challengeId: 3,
          correct: false,
          text: 'Evaluating a function means guessing the outcome without calculation.',
        },
        // Options for Challenge 4
        {
          challengeId: 4,
          correct: true,
          text: 'A daily life example of a function is the distance travelled being a function of the speed and time of travel.',
        },
        {
          challengeId: 4,
          correct: false,
          text: 'A function in daily life is having a fixed routine without any variable factors.',
        },
        // Options for Challenge 5
        {
          challengeId: 5,
          correct: true,
          text: 'Tables display pairs of values, showing the direct relationship between variables in a function.',
        },
        {
          challengeId: 5,
          correct: false,
          text: 'Tables are used to display values in a random order, without any functional relationship.',
        },
        // Options for Challenge 6
        {
          challengeId: 6,
          correct: true,
          text: 'In a function, independent variables can determine the values of dependent variables.',
        },
        {
          challengeId: 6,
          correct: false,
          text: 'Dependent variables dictate the values of independent variables in a function.',
        },
        // Options for Challenge 7
        {
          challengeId: 7,
          correct: true,
          text: 'To create a table for a linear function, calculate outputs using the function rule for a range of inputs.',
        },
        {
          challengeId: 7,
          correct: false,
          text: 'Creating a table involves picking random outputs for random inputs without a rule.',
        },
        // Options for Challenge 8
        {
          challengeId: 8,
          correct: true,
          text: 'Tables can help predict future events by extrapolating the data patterns observed from past events.',
        },
        {
          challengeId: 8,
          correct: false,
          text: 'Tables are only useful for representing past events and cannot be used for predictions.',
        },
        {
          challengeId: 9,
          correct: true,
          text: 'Graphs can display the continuous rate of change and the overall trend of the function.',
        },
        {
          challengeId: 9,
          correct: false,
          text: 'Graphs of functions are mostly for aesthetic appeal and offer no practical information.',
        },
        // Options for Challenge 10
        {
          challengeId: 10,
          correct: true,
          text: 'Graphs visually represent functions and allow us to see the domain, range, and any asymptotes.',
        },
        {
          challengeId: 10,
          correct: false,
          text: 'Function graphs are indecipherable and provide no insight into the function’s behavior.',
        },
        // Options for Challenge 11
        {
          challengeId: 11,
          correct: true,
          text: 'Graphing a function from an equation involves identifying key features like intercepts and slope.',
        },
        {
          challengeId: 11,
          correct: false,
          text: 'To graph a function, you only need to draw a random line on a grid.',
        },
        // Options for Challenge 12
        {
          challengeId: 12,
          correct: true,
          text: 'A real-world problem modeled by a function and its graph could be population growth over time.',
        },
        {
          challengeId: 12,
          correct: false,
          text: 'Graphs of functions are irrelevant to real-world problems and cannot be used for modeling.',
        },
        // Options for Challenge 13
        {
          challengeId: 13,
          correct: true,
          text: 'Equations represent functions by relating inputs and outputs with mathematical operations.',
        },
        {
          challengeId: 13,
          correct: false,
          text: 'Equations are just a set of random mathematical expressions without any input-output relationship.',
        },
        // Options for Challenge 14
        {
          challengeId: 14,
          correct: true,
          text: 'The slope represents rate of change, while the y-intercept is the starting value when the input is zero.',
        },
        {
          challengeId: 14,
          correct: false,
          text: 'The slope and y-intercept are arbitrary numbers that have no meaning in an equation.',
        },
        // Options for Challenge 15
        {
          challengeId: 15,
          correct: true,
          text: 'To convert a graph to an equation, identify the slope and y-intercept from the graph.',
        },
        {
          challengeId: 15,
          correct: false,
          text: 'Graphs cannot be converted into equations because they represent different information.',
        },
        // Options for Challenge 16
        {
          challengeId: 16,
          correct: true,
          text: 'Equations can be used to make predictions by plugging in values and solving for the output.',
        },
        {
          challengeId: 16,
          correct: false,
          text: 'Equations of functions are too complex to be used for practical predictions.',
        },

        // Options for Challenge 17
        {
          challengeId: 17,
          correct: true,
          text: 'Linear functions have a constant rate of change and can be graphed as straight lines.',
        },
        {
          challengeId: 17,
          correct: false,
          text: 'Linear functions are graphed as curves that change direction frequently.',
        },
        // Options for Challenge 18
        {
          challengeId: 18,
          correct: true,
          text: 'Linear functions have a straight-line graph while non-linear functions have graphs that curve.',
        },
        {
          challengeId: 18,
          correct: false,
          text: 'There is no visual difference between the graphs of linear and non-linear functions.',
        },
        // Options for Challenge 19
        {
          challengeId: 19,
          correct: true,
          text: 'The slope is found by dividing the change in y by the change in x between two points.',
        },
        {
          challengeId: 19,
          correct: false,
          text: 'To find the slope, add the coordinates of two points on the line.',
        },
        // Options for Challenge 20
        {
          challengeId: 20,
          correct: true,
          text: 'The concept of slope as rate of change applies to scenarios such as speed being the rate of change of distance over time.',
        },
        {
          challengeId: 20,
          correct: false,
          text: 'Slope is an abstract concept and does not apply to real-world rates of change.',
        },

        // Options for Challenge 21
        {
          challengeId: 21,
          correct: true,
          text: 'Identify the slope and y-intercept from the equation to begin graphing.',
        },
        {
          challengeId: 21,
          correct: false,
          text: 'Start by drawing a random point and line without considering the equation.',
        },
        // Options for Challenge 22
        {
          challengeId: 22,
          correct: true,
          text: 'Changing the slope alters the steepness of the line graphed for a linear function.',
        },
        {
          challengeId: 22,
          correct: false,
          text: 'The slope does not affect the graph’s shape but only its position.',
        },
        // Options for Challenge 23
        {
          challengeId: 23,
          correct: true,
          text: 'To find intercepts, set y to zero to find the x-intercept and x to zero to find the y-intercept.',
        },
        {
          challengeId: 23,
          correct: false,
          text: 'Intercepts are found by setting both x and y to one and solving the equation.',
        },
        // Options for Challenge 24
        {
          challengeId: 24,
          correct: true,
          text: 'Use the given scenario to determine key values and plot the corresponding line on a graph.',
        },
        {
          challengeId: 24,
          correct: false,
          text: 'Graphs are unrelated to scenario descriptions and cannot be used to represent them.',
        },

        // Options for Challenge 25
        {
          challengeId: 25,
          correct: true,
          text: 'Slope-intercept form is y = mx + b, where m is the slope and b is the y-intercept.',
        },
        {
          challengeId: 25,
          correct: false,
          text: 'In slope-intercept form, the slope is irrelevant, and only the y-intercept is used.',
        },
        // Options for Challenge 26
        {
          challengeId: 26,
          correct: true,
          text: 'The form is useful as it clearly shows the slope and starting point of the line on a graph.',
        },
        {
          challengeId: 26,
          correct: false,
          text: 'Slope-intercept form is less useful than other forms as it provides limited information.',
        },
        // Options for Challenge 27
        {
          challengeId: 27,
          correct: true,
          text: 'Convert to slope-intercept form by isolating y and simplifying to get the slope and y-intercept.',
        },
        {
          challengeId: 27,
          correct: false,
          text: 'Conversion involves complex calculations that do not relate to the slope or y-intercept.',
        },
        // Options for Challenge 28
        {
          challengeId: 28,
          correct: true,
          text: 'You can input known values into the slope-intercept equation to predict other values.',
        },
        {
          challengeId: 28,
          correct: false,
          text: 'Slope-intercept form cannot be used for prediction as it only describes current states.',
        },

        // Options for Challenge 29
        {
          challengeId: 29,
          correct: true,
          text: 'To write the point-slope form, you need a point on the line and the slope of the line.',
        },
        {
          challengeId: 29,
          correct: false,
          text: 'The point-slope form can be written with any random values, without specific points or slope.',
        },
        // Options for Challenge 30
        {
          challengeId: 30,
          correct: true,
          text: 'Point-slope form shows how the slope of a line relates to a specific point on that line.',
        },
        {
          challengeId: 30,
          correct: false,
          text: 'Point-slope form is unrelated to the actual slope and only depends on the line’s length.',
        },
        // Options for Challenge 31
        {
          challengeId: 31,
          correct: true,
          text: 'The steps involve identifying a known point on the line and the slope to use in the point-slope equation.',
        },
        {
          challengeId: 31,
          correct: false,
          text: 'When writing point-slope form from a graph, the appearance of the line is the only consideration.',
        },
        // Options for Challenge 32
        {
          challengeId: 32,
          correct: true,
          text: 'Point-slope form can model how a company’s profits depend on the number of items sold.',
        },
        {
          challengeId: 32,
          correct: false,
          text: 'Point-slope form is only used in theoretical mathematics and has no APPLICATION in data modeling.',
        },
        // Add more options as needed
      ]);
    } catch (error) {
      console.error('Error inserting challengeOptions: ', error);
      throw error;
    }

    console.log('Seeding finished');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to seed the database');
  }
};

main();

require("dotenv").config();

const mongoose = require("mongoose");

const Lesson = require("./models/Lesson");
const Quiz = require("./models/Quiz");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    await Lesson.deleteMany({});
    await Quiz.deleteMany({});

    console.log("Old lessons and quizzes removed");
    const lessons = await Lesson.insertMany([
  {
    title: "Python Lesson 01",
    description:
      "Variables, arithmetic operators, print(), case sensitivity, data types and comments",
    content: "Introduction to Python basics",
    pdfUrl:
      "/uploads/lessons/Python-Lesson01.pdf",
    difficulty: "Beginner",
    category: "Python Basics",
  },

  {
    title: "Python Lesson 02",
    description:
      "Selection statements, comparison operators, logical operators and loops",
    content: "Control flow",
    pdfUrl:
      "/uploads/lessons/Python-Lesson02.pdf",
    difficulty: "Beginner",
    category: "Control Flow",
  },

  {
    title: "Python Lesson 03",
    description:
      "Lists, tuples and dictionaries",
    content: "Data structures",
    pdfUrl:
      "/uploads/lessons/Python-Lesson03.pdf",
    difficulty: "Intermediate",
    category: "Data Structures",
  },

  {
    title: "Python Lesson 04",
    description:
      "Functions and parameters",
    content: "Functions",
    pdfUrl:
      "/uploads/lessons/Python-Lesson04.pdf",
    difficulty: "Intermediate",
    category: "Functions",
  },

  {
    title: "Python Lesson 05",
    description:
      "Object Oriented Programming and Classes",
    content: "OOP",
    pdfUrl:
      "/uploads/lessons/Python-Lesson05.pdf",
    difficulty: "Advanced",
    category: "OOP",
  },
]);

console.log("Lessons inserted");
await Quiz.insertMany([
    {
  lessonId: lessons[0]._id,
  question: "Which symbol is used for assignment in Python?",
  options: ["=", "==", ":=", "=>"],
  correctAnswer: "=",
},
{
  lessonId: lessons[0]._id,
  question: "What does print() do?",
  options: [
    "Displays output",
    "Creates variables",
    "Imports modules",
    "Reads files",
  ],
  correctAnswer: "Displays output",
},
{
  lessonId: lessons[0]._id,
  question: "Python variable names are:",
  options: [
    "Case Sensitive",
    "Case Insensitive",
    "Always Uppercase",
    "Always Lowercase",
  ],
  correctAnswer: "Case Sensitive",
},
{
  lessonId: lessons[0]._id,
  question: "Which is a valid integer?",
  options: ["42", "3.14", "\"42\"", "True"],
  correctAnswer: "42",
},
{
  lessonId: lessons[0]._id,
  question: "Which symbol starts a comment?",
  options: ["#", "//", "/*", "--"],
  correctAnswer: "#",
},
{
  lessonId: lessons[1]._id,
  question: "Which keyword is used for a condition?",
  options: ["if", "for", "while", "def"],
  correctAnswer: "if",
},
{
  lessonId: lessons[1]._id,
  question: "What does == check?",
  options: [
    "Equality",
    "Assignment",
    "Addition",
    "Subtraction",
  ],
  correctAnswer: "Equality",
},
{
  lessonId: lessons[1]._id,
  question: "Which operator means logical AND?",
  options: ["and", "&", "&&", "all"],
  correctAnswer: "and",
},
{
  lessonId: lessons[1]._id,
  question: "Which loop repeats while a condition is true?",
  options: ["while", "for", "if", "switch"],
  correctAnswer: "while",
},
{
  lessonId: lessons[1]._id,
  question: "Which loop is commonly used to iterate a list?",
  options: ["for", "while", "if", "try"],
  correctAnswer: "for",
},
{
  lessonId: lessons[2]._id,
  question: "Which data structure uses square brackets?",
  options: [
    "List",
    "Tuple",
    "Dictionary",
    "Set",
  ],
  correctAnswer: "List",
},
{
  lessonId: lessons[2]._id,
  question: "Tuples are:",
  options: [
    "Immutable",
    "Mutable",
    "Numeric",
    "Functions",
  ],
  correctAnswer: "Immutable",
},
{
  lessonId: lessons[2]._id,
  question: "Dictionaries store data as:",
  options: [
    "Key-Value pairs",
    "Indexes only",
    "Strings only",
    "Numbers only",
  ],
  correctAnswer: "Key-Value pairs",
},
{
  lessonId: lessons[2]._id,
  question: "Which brackets define a dictionary?",
  options: ["{}", "[]", "()", "<>"],
  correctAnswer: "{}",
},
{
  lessonId: lessons[2]._id,
  question: "Which index accesses the first list element?",
  options: ["0", "1", "-1", "first"],
  correctAnswer: "0",
},
{
  lessonId: lessons[3]._id,
  question: "Which keyword creates a function?",
  options: ["def", "func", "function", "create"],
  correctAnswer: "def",
},
{
  lessonId: lessons[3]._id,
  question: "Function inputs are called:",
  options: [
    "Parameters",
    "Indexes",
    "Methods",
    "Objects",
  ],
  correctAnswer: "Parameters",
},
{
  lessonId: lessons[3]._id,
  question: "Which keyword returns a value?",
  options: [
    "return",
    "yield",
    "print",
    "break",
  ],
  correctAnswer: "return",
},
{
  lessonId: lessons[3]._id,
  question: "Functions help by:",
  options: [
    "Reusing code",
    "Deleting code",
    "Slowing programs",
    "Creating errors",
  ],
  correctAnswer: "Reusing code",
},
{
  lessonId: lessons[3]._id,
  question: "Can a function have multiple parameters?",
  options: ["Yes", "No", "Only two", "Only one"],
  correctAnswer: "Yes",
},
{
  lessonId: lessons[4]._id,
  question: "A class is a:",
  options: [
    "Blueprint for objects",
    "Loop",
    "Variable",
    "Module",
  ],
  correctAnswer: "Blueprint for objects",
},
{
  lessonId: lessons[4]._id,
  question: "An instance of a class is called:",
  options: [
    "Object",
    "Function",
    "Parameter",
    "Dictionary",
  ],
  correctAnswer: "Object",
},
{
  lessonId: lessons[4]._id,
  question: "Which method is called during object creation?",
  options: [
    "__init__",
    "__start__",
    "__create__",
    "__newobject__",
  ],
  correctAnswer: "__init__",
},
{
  lessonId: lessons[4]._id,
  question: "OOP stands for:",
  options: [
    "Object Oriented Programming",
    "Open Output Processing",
    "Ordered Object Parsing",
    "Operational Object Program",
  ],
  correctAnswer: "Object Oriented Programming",
},
{
  lessonId: lessons[4]._id,
  question: "Objects contain:",
  options: [
    "Attributes and Methods",
    "Only Variables",
    "Only Loops",
    "Only Imports",
  ],
  correctAnswer: "Attributes and Methods",
},
]);

console.log("Quizzes inserted");

process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
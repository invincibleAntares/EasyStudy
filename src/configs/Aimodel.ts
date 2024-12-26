const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
   const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
   export const courseOutlineAiModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a study material for Python for Exam and level of difficulty will be EASY with summary of course, List of Chapters along with summary for each chapter, Topic list in each chapter, All result in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"courseSummary\": \"This easy-level Python course provides a foundational understanding of the Python programming language.  It covers basic syntax, data types, control flow, and fundamental programming concepts.  This material is designed to prepare students for a basic Python exam.\",\n  \"chapters\": [\n    {\n      \"chapterTitle\": \"Introduction to Python\",\n      \"chapterSummary\": \"This chapter introduces the basics of Python, including its installation, setting up your environment, and writing your first Python program. It covers fundamental concepts like variables, data types, and basic output.\",\n      \"topics\": [\n        \"What is Python?\",\n        \"Installing Python\",\n        \"Setting up a development environment (IDE or text editor)\",\n        \"Running your first Python program (using the print() function)\",\n        \"Understanding variables and data types (integers, floats, strings, booleans)\",\n        \"Basic input using the input() function\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Operators and Expressions\",\n      \"chapterSummary\": \"This chapter covers arithmetic, comparison, logical, and assignment operators, and how they are used to create expressions in Python. It also touches upon operator precedence.\",\n      \"topics\": [\n        \"Arithmetic operators (+, -, *, /, //, %, **)\",\n        \"Comparison operators (==, !=, >, <, >=, <=)\",\n        \"Logical operators (and, or, not)\",\n        \"Assignment operators (=, +=, -=, *=, /=)\",\n        \"Operator precedence and associativity\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Control Flow\",\n      \"chapterSummary\": \"This chapter explains how to control the flow of execution in a Python program using conditional statements (if, elif, else) and loops (for and while loops).\",\n      \"topics\": [\n        \"Conditional statements (if, elif, else)\",\n        \"Nested conditional statements\",\n        \"For loops (iterating through sequences)\",\n        \"While loops (repeating code based on a condition)\",\n        \"Break and continue statements\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Data Structures: Lists and Tuples\",\n      \"chapterSummary\": \"This chapter introduces two fundamental data structures in Python: lists (mutable ordered sequences) and tuples (immutable ordered sequences).\",\n      \"topics\": [\n        \"Lists: creation, access, modification, methods (append, insert, remove, etc.)\",\n        \"Tuples: creation, access, immutability\",\n        \"List slicing and indexing\",\n        \"Tuple packing and unpacking\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Functions\",\n      \"chapterSummary\": \"This chapter introduces functions – reusable blocks of code that perform specific tasks. It covers defining and calling functions, parameters, return values, and scope.\",\n      \"topics\": [\n        \"Defining functions using the def keyword\",\n        \"Function parameters and arguments\",\n        \"Return values from functions\",\n        \"Function scope and local/global variables\"\n      ]\n    },\n    {\n      \"chapterTitle\": \"Basic Input/Output\",\n      \"chapterSummary\": \"This chapter covers input and output operations, including reading from the console and writing to the console or files.\",\n      \"topics\": [\n        \"Reading input using the input() function\",\n        \"Writing output using the print() function\",\n        \"Basic file I/O (opening, reading, writing, and closing files)\"\n      ]\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());

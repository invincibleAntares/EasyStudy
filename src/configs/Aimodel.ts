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


   export  const generateNotesAiModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate exam material detail content for each chapter. Make sure to include all topic points in the content, make sure to give content in HTML format (Do not Add HTML, Head, Body, title tag). The chapters:\"chapters\": [\n    {\n      \"chapterTitle\": \"Object-Oriented Programming (OOP) in C++\",\n      \"chapterSummary\": \"This chapter delves into the core principles of OOP in C++, including classes, objects, inheritance, polymorphism, and encapsulation.  We'll explore how to design efficient and maintainable C++ code using OOP principles.\",\n      \"topics\": [\n        \"Classes and Objects\",\n        \"Constructors and Destructors\",\n        \"Inheritance (Single, Multiple, Multilevel, Hierarchical)\",\n        \"Polymorphism (Virtual Functions, Abstract Classes)\",\n        \"Encapsulation and Data Hiding\",\n        \"Access Specifiers (public, private, protected)\",\n        \"OOP Design Patterns (Introduction to Singleton, Factory)\"\n      ]\n    },"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```html\n<div>\n  <h2>Object-Oriented Programming (OOP) in C++</h2>\n  <p>This chapter covers the fundamental concepts of Object-Oriented Programming (OOP) in C++.  Understanding these principles is crucial for writing efficient, reusable, and maintainable C++ code.</p>\n\n  <h3>Classes and Objects</h3>\n  <p>This section explains the definition and declaration of classes, the building blocks of OOP.  It covers member variables (data) and member functions (methods) and how to create objects (instances) of a class.  Examples will demonstrate how to define classes and instantiate objects.</p>\n\n  <h3>Constructors and Destructors</h3>\n  <p>Learn about constructors, special member functions automatically called when an object is created.  We will cover different types of constructors (default, parameterized, copy) and their usage.  Destructors, which are called when an object is destroyed, will also be explained, emphasizing resource management and memory cleanup.</p>\n\n  <h3>Inheritance (Single, Multiple, Multilevel, Hierarchical)</h3>\n  <p>This section explores the concept of inheritance, enabling code reuse and creating class hierarchies. We'll examine single inheritance (one base class), multiple inheritance (multiple base classes), multilevel inheritance (a chain of inheritance), and hierarchical inheritance (multiple derived classes from a single base class).  The importance of base classes and derived classes will be emphasized along with examples demonstrating each type of inheritance.</p>\n\n  <h3>Polymorphism (Virtual Functions, Abstract Classes)</h3>\n  <p>Polymorphism allows objects of different classes to be treated as objects of a common type.  This section covers virtual functions, which enable runtime polymorphism, and abstract classes, which cannot be instantiated directly but serve as blueprints for derived classes. The use of virtual functions to achieve dynamic dispatch will be demonstrated, along with examples of abstract classes and pure virtual functions.</p>\n\n  <h3>Encapsulation and Data Hiding</h3>\n  <p>Encapsulation is the bundling of data and methods that operate on that data within a class.  Data hiding protects the internal state of an object from unauthorized access. This section explains the benefits of encapsulation and how to achieve it using access specifiers.</p>\n\n  <h3>Access Specifiers (public, private, protected)</h3>\n  <p>This section details the three access specifiers in C++: `public`, `private`, and `protected`.  We'll explain how each specifier controls the accessibility of class members from other parts of the program.  Examples will illustrate the differences in access levels and their implications for data protection and code organization.</p>\n\n  <h3>OOP Design Patterns (Introduction to Singleton, Factory)</h3>\n  <p>This section provides an introduction to the concept of design patterns.  It focuses on two common patterns: the Singleton pattern (ensuring only one instance of a class exists) and the Factory pattern (creating objects without specifying their concrete classes).  Simple examples of each pattern will be provided, showing how they can be implemented in C++.</p>\n</div>\n```\n"},
          ],
        },
      ],
    });
  
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());

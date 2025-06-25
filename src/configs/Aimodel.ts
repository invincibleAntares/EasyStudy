const { GoogleGenerativeAI } = require("@google/generative-ai");
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
  

    export   const GenerateStudyTypeContentAiModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate the flashcard on topic: Flutter Fundamentals, User Interface (UI) Development, Basic App Navigation in JSON format with front back content, Maximum 15"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"front\": \"What is a Widget in Flutter?\",\n    \"back\": \"The fundamental building block of a Flutter UI. Everything you see on the screen is a widget.\"\n  },\n  {\n    \"front\": \"What are the two main types of widgets?\",\n    \"back\": \"StatelessWidget and StatefulWidget.\"\n  },\n  {\n    \"front\": \"What is the difference between StatelessWidget and StatefulWidget?\",\n    \"back\": \"StatelessWidget: immutable, doesn't change after creation. StatefulWidget: mutable, can update its UI.\"\n  },\n  {\n    \"front\": \"What is a MaterialApp widget?\",\n    \"back\": \"A widget that provides many common Material Design features to an app, including a navigation bar and theme.\"\n  },\n  {\n    \"front\": \"What is Scaffold widget?\",\n    \"back\": \"A basic layout structure for Material Design apps, providing app bar, body, and bottom navigation.\"\n  },\n  {\n    \"front\": \"How do you create a simple Text widget?\",\n    \"back\": \"```dart\\nText('Hello World!')\\n```\"\n  },\n  {\n    \"front\": \"How to display an image in Flutter?\",\n    \"back\": \"Use the `Image.network()` or `Image.asset()` widget.\"\n  },\n  {\n    \"front\": \"What is a `Container` widget?\",\n    \"back\": \"A widget that allows you to decorate a child widget with padding, margins, background colors, etc.\"\n  },\n  {\n    \"front\": \"What is `Row` and `Column`?\",\n    \"back\": \"Widgets used to arrange children horizontally (Row) or vertically (Column).\"\n  },\n  {\n    \"front\": \"What is `Expanded` widget?\",\n    \"back\": \"Used within `Row` or `Column` to allow a child to take up available space.\"\n  },\n  {\n    \"front\": \"How to navigate to a new screen in Flutter?\",\n    \"back\": \"Use `Navigator.push()`.\"\n  },\n  {\n    \"front\": \"How to pass data to a new screen during navigation?\",\n    \"back\": \"Use `arguments` in `Navigator.push()` and access them in the new screen's constructor.\"\n  },\n  {\n    \"front\": \"How to return data from a new screen after navigation?\",\n    \"back\": \"Use `Navigator.pop(context, data)`\"\n  },\n  {\n    \"front\": \"What is a `Route` in Flutter?\",\n    \"back\": \"A description of how to transition between screens.\"\n  },\n  {\n    \"front\": \"What is a `MaterialPageRoute`?\",\n    \"back\": \"A type of route that uses Material Design transitions.\"\n  }\n]\n```\n"},
          ],
        },
      ],
    });


    export const GenerateQuizAiModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Quiz on topic: Flutter Fundamentals, User Interface (UI) Development, Basic App Navigation with Question and Options along with correct answer in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"quizTitle\": \"Flutter Fundamentals, UI Development, and Basic Navigation\",\n  \"questions\": [\n    {\n      \"question\": \"What is the core building block of Flutter's UI?\",\n      \"options\": [\"Widget\", \"Layout\", \"Screen\", \"View\"],\n      \"answer\": \"Widget\"\n    },\n    {\n      \"question\": \"Which widget is used to arrange children in a column?\",\n      \"options\": [\"Row\", \"Column\", \"Stack\", \"Container\"],\n      \"answer\": \"Column\"\n    },\n    {\n      \"question\": \"What does the `Scaffold` widget provide?\",\n      \"options\": [\"Text styling\", \"Image loading\",  \"Basic app structure including AppBar and body\", \"Data persistence\"],\n      \"answer\": \"Basic app structure including AppBar and body\"\n    },\n    {\n      \"question\": \"Which widget is best for displaying a list of items that can be scrolled?\",\n      \"options\": [\"ListView\", \"GridView\", \"Column\", \"Row\"],\n      \"answer\": \"ListView\"\n    },\n    {\n      \"question\": \"How do you navigate to a new route in Flutter?\",\n      \"options\": [\"`Navigator.push(context, MaterialPageRoute(builder: (context) => NewScreen()))`\", \"`runApp(NewScreen())`\", \"`setState()`\", \"`Navigator.pop(context)`\"],\n      \"answer\": \"`Navigator.push(context, MaterialPageRoute(builder: (context) => NewScreen()))`\"\n    },\n    {\n      \"question\": \"What is the purpose of the `BuildContext`?\",\n      \"options\": [\"To store app data\", \"To access the widget tree\", \"To handle user input\", \"To define app theme\"],\n      \"answer\": \"To access the widget tree\"\n    },\n    {\n      \"question\": \"Which widget is used to create a flexible layout that adapts to different screen sizes?\",\n      \"options\": [\"Container\", \"Row\", \"Expanded\", \"Stack\"],\n      \"answer\": \"Expanded\"\n    },\n    {\n      \"question\": \"What is the difference between `StatelessWidget` and `StatefulWidget`?\",\n      \"options\": [\"`StatelessWidget` updates its UI based on state changes, while `StatefulWidget` does not.\", \"`StatefulWidget` updates its UI based on state changes, while `StatelessWidget` does not.\", \"There is no difference.\", \"One is used for text, the other for images.\"],\n      \"answer\": \"`StatefulWidget` updates its UI based on state changes, while `StatelessWidget` does not.\"\n    },\n    {\n      \"question\": \"What is the `key` property used for in widgets?\",\n      \"options\": [\"Styling\", \"Navigation\", \"Unique identification of widgets\", \"Data binding\"],\n      \"answer\": \"Unique identification of widgets\"\n    },\n    {\n      \"question\": \"What does the `MaterialApp` widget provide?\",\n      \"options\": [\"A basic app structure with material design\", \"State management\", \"Data persistence\", \"Navigation\"],\n      \"answer\": \"A basic app structure with material design\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });

    export const GenerateQAAiModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate comprehensive Question and Answer pairs on topic: React Fundamentals, Component Development, State Management in JSON format with detailed questions and comprehensive answers, Maximum 15"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"qaTitle\": \"React Fundamentals, Component Development, and State Management Q&A\",\n  \"qaPairs\": [\n    {\n      \"question\": \"What is React and what are its key features?\",\n      \"answer\": \"React is a JavaScript library for building user interfaces, particularly web applications. Key features include: Virtual DOM for efficient updates, Component-based architecture for reusable UI elements, Unidirectional data flow for predictable state management, JSX syntax for writing HTML-like code in JavaScript, and a rich ecosystem with extensive community support.\"\n    },\n    {\n      \"question\": \"Explain the difference between functional and class components in React.\",\n      \"answer\": \"Functional components are simple JavaScript functions that accept props and return JSX. They are easier to write and test. Class components are ES6 classes that extend React.Component, have lifecycle methods, and can manage state. With React Hooks, functional components can now handle state and lifecycle events, making them the preferred approach.\"\n    },\n    {\n      \"question\": \"What is JSX and how does it work?\",\n      \"answer\": \"JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript. It gets transpiled to React.createElement() calls by tools like Babel. JSX makes React code more readable and allows you to embed JavaScript expressions using curly braces {}.\"\n    },\n    {\n      \"question\": \"How do you pass data between parent and child components?\",\n      \"answer\": \"Data flows down from parent to child through props. The parent component passes data as attributes to the child component. The child receives this data through the props parameter. For child-to-parent communication, you pass callback functions as props that the child can call to send data back up.\"\n    },\n    {\n      \"question\": \"What is state in React and how do you manage it?\",\n      \"answer\": \"State is a JavaScript object that stores component data that can change over time. In functional components, use the useState hook. In class components, use this.state and this.setState(). State should be treated as immutable - always create new objects/arrays rather than modifying existing ones.\"\n    },\n    {\n      \"question\": \"Explain the concept of lifting state up in React.\",\n      \"answer\": \"Lifting state up means moving state from child components to their common parent component when multiple components need to share the same data. This ensures a single source of truth and allows sibling components to communicate through their shared parent.\"\n    },\n    {\n      \"question\": \"What are React Hooks and why were they introduced?\",\n      \"answer\": \"React Hooks are functions that allow you to use state and other React features in functional components. They were introduced to eliminate the need for class components, make code more reusable, and solve problems like wrapper hell and complex lifecycle methods. Common hooks include useState, useEffect, useContext, and useReducer.\"\n    },\n    {\n      \"question\": \"How does the useEffect hook work and what are its use cases?\",\n      \"answer\": \"useEffect is a hook that performs side effects in functional components. It runs after every render by default. Use cases include: data fetching, subscriptions, timers, and DOM manipulation. You can control when it runs using the dependency array as the second argument. Return a cleanup function to handle cleanup tasks.\"\n    },\n    {\n      \"question\": \"What is the Virtual DOM and how does it improve performance?\",\n      \"answer\": \"The Virtual DOM is a lightweight JavaScript representation of the real DOM. React creates a virtual DOM tree, compares it with the previous version (diffing), and only updates the parts that have changed (reconciliation). This minimizes expensive DOM operations and improves performance.\"\n    },\n    {\n      \"question\": \"Explain the component lifecycle methods in React class components.\",\n      \"answer\": \"Lifecycle methods are: Mounting (componentDidMount), Updating (componentDidUpdate, getSnapshotBeforeUpdate), Unmounting (componentWillUnmount). componentDidMount is used for initial data fetching, componentDidUpdate for responding to prop/state changes, and componentWillUnmount for cleanup tasks.\"\n    },\n    {\n      \"question\": \"What is prop drilling and how can you avoid it?\",\n      \"answer\": \"Prop drilling occurs when you pass props through multiple component layers to reach a deeply nested component. Avoid it using: React Context API for global state, State management libraries like Redux or Zustand, Component composition patterns, or Custom hooks for shared logic.\"\n    },\n    {\n      \"question\": \"How do you handle forms in React?\",\n      \"answer\": \"Use controlled components where form data is handled by React state. Create state variables for form fields, use onChange handlers to update state, and handle form submission with onSubmit. For complex forms, consider using libraries like Formik or React Hook Form.\"\n    },\n    {\n      \"question\": \"What is the Context API and when should you use it?\",\n      \"answer\": \"Context API allows you to share data across the component tree without passing props manually at every level. Use it for global state like user authentication, theme preferences, or language settings. Create a context with createContext(), provide values with Provider, and consume with useContext hook.\"\n    },\n    {\n      \"question\": \"What are keys in React and why are they important?\",\n      \"answer\": \"Keys are unique identifiers for list elements that help React identify which items have changed, been added, or removed. They improve performance during re-rendering and prevent issues with component state. Use stable, unique values like IDs rather than array indices when possible.\"\n    },\n    {\n      \"question\": \"How do you optimize React application performance?\",\n      \"answer\": \"Performance optimization techniques include: Using React.memo for component memoization, useMemo and useCallback hooks to prevent unnecessary recalculations, Code splitting with lazy loading, Optimizing bundle size, Using React DevTools Profiler, Implementing virtual scrolling for large lists, and avoiding inline objects/functions in JSX.\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());

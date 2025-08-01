Quiz App
A simple, interactive quiz application built with React, Vite, and TailwindCSS. Test your knowledge across various categories like Biology, History, and General Knowledge, with customizable difficulty levels and question counts. Powered by the OpenTDB API for dynamic quiz questions.


Features
•	Multiple Categories: Choose from 8 categories (e.g., Biology, Chemistry, Mathematics).
•	Customizable Settings: Adjust difficulty (Easy, Medium, Hard) and question count (5, 10, 15, 20).
•	Responsive Design: Works on both desktop and mobile with a hamburger menu for navigation.
•	Score Tracking: Displays your score at the end of the quiz.
•	Dynamic Questions: Fetches questions from the OpenTDB API using Axios.
•	Simple Navigation: Built with React Router for seamless page transitions.
________________________________________
Technologies
•	Vite: Fast build tool and development server.
•	React: JavaScript library for building the UI.
•	TailwindCSS: Utility-first CSS framework for styling.
•	React Router: Version 6.2.2 for client-side routing.
•	Axios: Promise-based HTTP client for API requests.
•	PostCSS: CSS processor for TailwindCSS integration.
•	OpenTDB API: Source of quiz questions (https://opentdb.com/).
________________________________________
Project Structure
quiz-app/
├── index.html          # Entry point for Vite
├── package.json        # Dependencies and scripts
├── postcss.config.js   # PostCSS configuration for Tailwind
├── tailwind.config.js  # TailwindCSS configuration
├── src/
│   ├── main.jsx        # Mounts React app and imports styles
│   ├── index.css       # TailwindCSS directives
│   ├── App.jsx         # Main app component with routing
│   ├── components/
│   │   └── Navbar.jsx  # Responsive navigation bar
│   └── pages/
│       ├── Home.jsx    # Welcome page with Start Quiz button
│       ├── Category.jsx # Category selection page
│       ├── About.jsx   # App info and contact details
│       ├── Settings.jsx # Quiz configuration options
│       ├── Quiz.jsx    # Displays quiz questions
│       └── Result.jsx  # Shows quiz score


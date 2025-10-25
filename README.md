# Kid's Learning Hub

An interactive learning website for students in grades 1 to 5, covering subjects like Math, English, General Science, and General Knowledge. It features curated lessons and quizzes to make learning fun and engaging. This project was built by Muhammad Ibrahim (ibrahimvers15@gmail.com).

## Features

-   **Curated Content:** All lessons and quizzes are stored locally, providing instant access without needing an internet connection for content generation.
-   **Multiple Subjects:** Covers Math, English, General Science, and General Knowledge.
-   **Grade Levels:** Content is tailored for different grade levels.
-   **Interactive Quizzes:** Multiple-choice questionnaires to test understanding.
-   **Modern UI:** A clean, responsive, and kid-friendly interface built with React and Tailwind CSS.

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn
-   Git

### Local Development Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ibrahimvers15/learning.git
    cd learning
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) (or the URL provided) in your browser to see the app.

## Deployment to GitHub Pages

This guide will help you deploy your site for free using GitHub Pages.

1.  **Create a new GitHub Repository:**
    -   Go to [GitHub](https://github.com) and create a new public repository. For this guide, we'll assume it's named `learning`.

2.  **Push your code to the repository:**
    -   Initialize Git and push your local project to the new repository.
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/ibrahimvers15/learning.git
    git push -u origin main
    ```

3.  **Update `package.json`:**
    -   Open `package.json` and ensure a `homepage` field exists at the top. The URL should follow this format: `https://YOUR_USERNAME.github.io/REPOSITORY_NAME/`.
    ```json
    {
      "homepage": "https://ibrahimvers15.github.io/learning/",
      "name": "kids-learning-hub",
      // ... rest of the file
    }
    ```

4.  **Update `vite.config.ts`:**
    - Open `vite.config.ts` and ensure the `base` property matches your repository name.
    ```typescript
    // ...
    export default defineConfig({
      // ...
      base: "/learning/", // Must match your repository name
      // ...
    })
    ```

5.  **Deploy the application:**
    -   Run the `deploy` script. This command will build your application and push the `dist` folder to a special `gh-pages` branch on your repository.
    ```bash
    npm run deploy
    ```

6.  **Configure GitHub Pages:**
    -   In your GitHub repository, go to `Settings` > `Pages`.
    -   Under `Build and deployment`, set the `Source` to `Deploy from a branch`.
    -   Set the `Branch` to `gh-pages` and the folder to `/ (root)`.
    -   Click `Save`.

Your website should be live at the `homepage` URL you specified in a few minutes!
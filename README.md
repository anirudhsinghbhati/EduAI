# EduTrack - Smart Attendance & Personalized Learning System

EduAI is a modern, AI-powered educational platform designed to streamline school administration, enhance the teaching process, and provide personalized learning experiences for students. Built with Next.js, Genkit, and ShadCN UI, this application demonstrates a practical implementation of AI in education.

## Key Features

- **Role-Based Dashboards**: Tailored interfaces for Students, Teachers, and Admins, providing relevant tools and information at a glance.
- **AI Attendance Capture**: Teachers can take attendance in seconds by capturing or uploading a single class photo. The system uses facial recognition to identify and mark students as present.
- **Manual Attendance**: A flexible manual attendance system allows teachers to mark students as present, absent, or late, providing a reliable backup.
- **AI Learning Coach**: Students receive personalized learning recommendations and study tips based on their academic profile and performance data.
- **Goal Setting & Progress Tracking**: Students can set personal academic goals and monitor their course progress through a clean, intuitive interface.
- **Centralized Roster Management**: Admins can easily manage the student roster, add or remove students, create class groups, and upload student photos.
- **System-Wide Announcements**: Admins can broadcast announcements to all users of the platform.
- **Responsive & Modern UI**: A sleek, responsive design built with Tailwind CSS and ShadCN UI components, ensuring a great user experience on any device.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **AI Integration**: Google's Genkit
- **Forms**: React Hook Form
- **Schema Validation**: Zod

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your Google AI API key. You can obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).
    ```env
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```

### Running the Application

1.  **Start the development server:**
    ```sh
    npm run dev
    ```
    This will run the Next.js application, typically on `http://localhost:9002`.

2.  **Start the Genkit development server (optional but recommended for AI debugging):**
    In a separate terminal, run:
    ```sh
    npm run genkit:watch
    ```
    This will start the Genkit development UI, usually on `http://localhost:4000`, where you can inspect and test your AI flows.

## How to Use

1.  Navigate to the login page.
2.  For demonstration purposes, you can log in directly as a **Student**, **Teacher**, or **Admin** by clicking the corresponding buttons.
3.  Explore the different dashboards and features tailored to each role.
    -   As an **Admin**, try adding a new student to the roster.
    -   As a **Teacher**, use the **AI Attendance Capture** or **Manual Attendance** feature.
    -   As a **Student**, generate new recommendations from the **AI Learning Coach**.

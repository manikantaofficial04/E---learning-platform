import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Circle,
  GraduationCap,
} from "lucide-react";

import "../LearningPage.css";

const courses = [
  {
    id: 1,
    title: "Complete Web Development",
    lessons: [
      "Introduction to Web Development",
      "HTML Fundamentals",
      "CSS Fundamentals",
      "Responsive Web Design",
      "JavaScript Basics",
      "JavaScript Functions",
      "Introduction to React",
      "React Components",
      "React State and Props",
      "Build Your First Project",
    ],
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    lessons: [
      "Introduction to UI/UX",
      "Understanding User Research",
      "User Personas",
      "Wireframing",
      "Visual Design Principles",
      "Color and Typography",
      "Prototyping",
      "Usability Testing",
    ],
  },
  {
    id: 3,
    title: "Business & Entrepreneurship",
    lessons: [
      "Introduction to Business",
      "Market Research",
      "Business Planning",
      "Understanding Customers",
      "Marketing Fundamentals",
      "Financial Planning",
      "Business Strategy",
      "Final Business Plan",
    ],
  },
  {
    id: 4,
    title: "Data Analytics with Python",
    lessons: [
      "Introduction to Python",
      "Python Variables and Data Types",
      "Lists and Dictionaries",
      "Working with Data",
      "Introduction to Pandas",
      "Data Cleaning",
      "Data Visualization",
      "Final Analytics Project",
    ],
  },
];

function LearningPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find(
    (item) => item.id === Number(id)
  );

  const storageKey = `courseProgress-${id}`;

  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(storageKey) || "[]"
      );
    } catch {
      return [];
    }
  });

  if (!course) {
    return (
      <div className="learning-error">
        <h2>Course not found</h2>
        <button onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  const totalLessons = course.lessons.length;

  const progress = Math.round(
    (completedLessons.length / totalLessons) * 100
  );

  function toggleLesson(index) {
    const updated = completedLessons.includes(index)
      ? completedLessons.filter((lesson) => lesson !== index)
      : [...completedLessons, index];

    setCompletedLessons(updated);

    localStorage.setItem(
      storageKey,
      JSON.stringify(updated)
    );
  }

  return (
    <div className="learning-page">
      <header className="learning-page-navbar">
        <button
          className="learning-back-button"
          onClick={() => navigate(`/course/${course.id}`)}
        >
          <ArrowLeft size={18} />
          Course Details
        </button>

        <div className="learning-page-brand">
          <BookOpen size={22} />
          LearnSphere
        </div>
      </header>

      <main className="learning-page-main">
        <section className="learning-page-heading">
          <div className="learning-page-icon">
            <GraduationCap size={30} />
          </div>

          <div>
            <span>YOUR LEARNING JOURNEY</span>
            <h1>{course.title}</h1>
            <p>Complete lessons to track your progress.</p>
          </div>
        </section>

        <section className="lesson-progress-card">
          <div className="lesson-progress-heading">
            <div>
              <h2>Course Progress</h2>
              <p>
                {completedLessons.length} of {totalLessons} lessons
                completed
              </p>
            </div>

            <strong>{progress}%</strong>
          </div>

          <div className="lesson-progress-track">
            <span style={{ width: `${progress}%` }} />
          </div>

          {progress === 100 && (
            <p className="course-completed-message">
              🎉 Congratulations! You completed every lesson.
            </p>
          )}
        </section>

        <section className="lessons-section">
          <div className="lessons-section-heading">
            <h2>Course Lessons</h2>
            <span>{totalLessons} lessons</span>
          </div>

          <div className="lesson-list">
            {course.lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(index);

              return (
                <button
                  key={lesson}
                  className={
                    isCompleted
                      ? "lesson-item completed"
                      : "lesson-item"
                  }
                  onClick={() => toggleLesson(index)}
                >
                  <span className="lesson-status">
                    {isCompleted ? (
                      <CheckCircle size={22} />
                    ) : (
                      <Circle size={22} />
                    )}
                  </span>

                  <span className="lesson-number">
                    Lesson {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="lesson-title">
                    {lesson}
                  </span>

                  <span className="lesson-action">
                    {isCompleted ? "Completed" : "Mark Complete"}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="lesson-help-text">
            Click a lesson to mark it complete. Click again to undo.
            Your progress is saved in this browser.
          </p>
        </section>

        <button
          className="back-to-learning-button"
          onClick={() => navigate("/my-learning")}
        >
          Back to My Learning
        </button>
      </main>
    </div>
  );
}

export default LearningPage;
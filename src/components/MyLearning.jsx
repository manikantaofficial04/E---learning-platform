import { Link, useNavigate } from "react-router-dom";

import {
  BookOpen,
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Clock,
  PlayCircle,
} from "lucide-react";

import { useState, useEffect } from "react";

import "../MyLearning.css";

const courses = [
  {
    id: 1,
    title: "Complete Web Development",
    category: "Development",
    instructor: "Alex Johnson",
    price: "$49.99",
    lessons: 10,
    duration: "12 weeks",
    color: "blue",
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    category: "Design",
    instructor: "Sarah Williams",
    price: "$39.99",
    lessons: 8,
    duration: "8 weeks",
    color: "purple",
  },
  {
    id: 3,
    title: "Business & Entrepreneurship",
    category: "Business",
    instructor: "David Miller",
    price: "$59.99",
    lessons: 8,
    duration: "10 weeks",
    color: "orange",
  },
  {
    id: 4,
    title: "Data Analytics with Python",
    category: "Data Science",
    instructor: "Emily Carter",
    price: "$44.99",
    lessons: 8,
    duration: "9 weeks",
    color: "green",
  },
];

function MyLearning() {
  const navigate = useNavigate();

  const [enrolledIds, setEnrolledIds] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("enrolledCourses") || "[]"
      );
    } catch {
      return [];
    }
  });

  // Read progress saved by the Learning Page.
  const [progressVersion, setProgressVersion] = useState(0);

  useEffect(() => {
    function refreshProgress() {
      setProgressVersion((version) => version + 1);
    }

    window.addEventListener("focus", refreshProgress);

    return () => {
      window.removeEventListener("focus", refreshProgress);
    };
  }, []);

  const enrolledCourses = courses.filter((course) =>
    enrolledIds.includes(course.id)
  );

  function getCourseProgress(course) {
    // Reference progressVersion so the UI can refresh after returning.
    void progressVersion;

    try {
      const completedLessons = JSON.parse(
        localStorage.getItem(`courseProgress-${course.id}`) || "[]"
      );

      return Math.round(
        (completedLessons.length / course.lessons) * 100
      );
    } catch {
      return 0;
    }
  }

  return (
    <div className="my-learning-page">
      {/* NAVIGATION */}

      <header className="learning-navbar">
        <Link to="/" className="learning-logo">
          <span className="learning-logo-icon">
            <BookOpen size={22} />
          </span>

          Learn<span>Sphere</span>
        </Link>

        <Link to="/" className="back-home-link">
          <ArrowLeft size={17} />
          Back to Home
        </Link>
      </header>

      <main className="learning-main">
        {/* PAGE HEADING */}

        <section className="learning-heading">
          <div className="learning-heading-icon">
            <GraduationCap size={30} />
          </div>

          <div>
            <span className="learning-eyebrow">
              YOUR PERSONAL LEARNING SPACE
            </span>

            <h1>My Learning</h1>

            <p>
              Keep building your skills, one lesson at a time.
            </p>
          </div>
        </section>

        {/* SUMMARY */}

        <section className="learning-summary">
          <div className="summary-card">
            <span>Enrolled Courses</span>
            <strong>{enrolledCourses.length}</strong>
          </div>

          <div className="summary-card">
            <span>Completed Courses</span>

            <strong>
              {
                enrolledCourses.filter(
                  (course) => getCourseProgress(course) === 100
                ).length
              }
            </strong>
          </div>

          <div className="summary-card">
            <span>Learning Status</span>

            <strong>
              {enrolledCourses.length > 0 ? "Active" : "Not Started"}
            </strong>
          </div>
        </section>

        {/* ENROLLED COURSES */}

        <section className="enrolled-section">
          <div className="enrolled-heading">
            <div>
              <h2>Your Courses</h2>

              <p>
                {enrolledCourses.length > 0
                  ? "Pick up where you left off."
                  : "Enroll in a course to start learning."}
              </p>
            </div>

            <span className="course-count">
              {enrolledCourses.length}{" "}
              {enrolledCourses.length === 1 ? "course" : "courses"}
            </span>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="empty-learning">
              <div className="empty-learning-icon">
                <BookOpen size={38} />
              </div>

              <h3>Your learning journey starts here</h3>

              <p>
                You haven't enrolled in any courses yet.
                Explore the catalog and find a course that interests you.
              </p>

              <button onClick={() => navigate("/")}>
                Explore Courses <ArrowRight size={17} />
              </button>
            </div>
          ) : (
            <div className="enrolled-grid">
              {enrolledCourses.map((course) => {
                const progress = getCourseProgress(course);

                return (
                  <article
                    className="enrolled-card"
                    key={course.id}
                  >
                    <div className={`enrolled-art ${course.color}`}>
                      <div className="enrolled-art-circle">
                        <BookOpen size={48} />
                      </div>

                      <span>{course.category}</span>
                    </div>

                    <div className="enrolled-card-content">
                      <span className="enrolled-category">
                        {course.category}
                      </span>

                      <h3>{course.title}</h3>

                      <p className="enrolled-instructor">
                        Instructor: {course.instructor}
                      </p>

                      <div className="enrolled-meta">
                        <span>
                          <PlayCircle size={15} />
                          {course.lessons} lessons
                        </span>

                        <span>
                          <Clock size={15} />
                          {course.duration}
                        </span>
                      </div>

                      <div className="learning-progress-info">
                        <div>
                          <span>Learning progress</span>
                          <strong>{progress}%</strong>
                        </div>

                        <div className="learning-progress-bar">
                          <span
                            style={{
                              width: `${progress}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="enrolled-card-actions">
                        <button
                          className="continue-learning-btn"
                          onClick={() =>
                            navigate(`/learn/${course.id}`)
                          }
                        >
                          {progress === 100
                            ? "Review Course"
                            : "Continue Learning"}

                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}

      <footer className="learning-footer">
        <Link to="/" className="learning-footer-logo">
          LearnSphere
        </Link>

        <p>Learn today. Lead tomorrow.</p>

        <span>
          © {new Date().getFullYear()} LearnSphere
        </span>
      </footer>
    </div>
  );
}

export default MyLearning;
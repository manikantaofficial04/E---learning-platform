import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  Star,
  CheckCircle,
  PlayCircle,
  GraduationCap,
} from "lucide-react";
import "../CourseDetails.css";

const courses = [
  {
    id: 1,
    title: "Complete Web Development",
    category: "Development",
    instructor: "Alex Johnson",
    rating: "4.9",
    students: "2,400",
    price: 49.99,
    duration: "12 weeks",
    lessons: 48,
    description:
      "Learn HTML, CSS, JavaScript, and React from the ground up. Build practical projects and develop the skills needed to create modern, responsive websites.",
    syllabus: [
      "HTML and CSS fundamentals",
      "Responsive web design",
      "JavaScript essentials",
      "React components and hooks",
      "Build and deploy a complete project",
    ],
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    category: "Design",
    instructor: "Sarah Williams",
    rating: "4.8",
    students: "1,800",
    price: 39.99,
    duration: "8 weeks",
    lessons: 32,
    description:
      "Explore user research, wireframing, prototyping, and interface design. Learn how to create clear, accessible, and engaging digital experiences.",
    syllabus: [
      "Introduction to UI/UX",
      "User research and personas",
      "Wireframing and prototyping",
      "Visual design principles",
      "Design a complete application",
    ],
  },
  {
    id: 3,
    title: "Business & Entrepreneurship",
    category: "Business",
    instructor: "David Miller",
    rating: "4.9",
    students: "3,100",
    price: 59.99,
    duration: "10 weeks",
    lessons: 40,
    description:
      "Understand business fundamentals, business planning, marketing, and financial management. Develop a foundation for turning ideas into practical business plans.",
    syllabus: [
      "Business fundamentals",
      "Market research",
      "Business planning",
      "Marketing strategies",
      "Financial planning",
    ],
  },
  {
    id: 4,
    title: "Data Analytics with Python",
    category: "Data Science",
    instructor: "Emily Carter",
    rating: "4.7",
    students: "1,500",
    price: 44.99,
    duration: "9 weeks",
    lessons: 36,
    description:
      "Learn Python for data analysis, work with datasets, and understand how to turn raw data into meaningful insights using practical exercises.",
    syllabus: [
      "Python fundamentals",
      "Working with datasets",
      "Data analysis with pandas",
      "Data visualization",
      "Complete a data analysis project",
    ],
  },
];

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [enrolled, setEnrolled] = useState(() => {
    const saved = JSON.parse(
      localStorage.getItem("enrolledCourses") || "[]"
    );

    return saved.includes(Number(id));
  });

  const course = courses.find((item) => item.id === Number(id));

  if (!course) {
    return (
      <div className="course-not-found">
        <h2>Course not found</h2>
        <p>The course you are looking for does not exist.</p>
        <button onClick={() => navigate("/")}>
          Return Home
        </button>
      </div>
    );
  }

  function handleEnrollment() {
    const saved = JSON.parse(
      localStorage.getItem("enrolledCourses") || "[]"
    );

    if (saved.includes(course.id)) {
      navigate("/my-learning");
      return;
    }

    const updated = [...saved, course.id];

    localStorage.setItem(
      "enrolledCourses",
      JSON.stringify(updated)
    );

    setEnrolled(true);

    alert("Successfully enrolled in " + course.title + "!");
  }

  return (
    <div className="course-details-page">
      <header className="details-navbar">
        <button
          className="back-home"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          Back to Courses
        </button>

        <div className="details-logo">
          <BookOpen size={23} />
          LearnSphere
        </div>
      </header>

      <section className="details-hero">
        <div className="details-content">
          <span className="details-category">
            {course.category}
          </span>

          <h1>{course.title}</h1>

          <p className="details-description">
            {course.description}
          </p>

          <div className="details-rating">
            <Star size={18} fill="currentColor" />
            <strong>{course.rating}</strong>
            <span>({course.students} students)</span>
          </div>

          <div className="details-instructor">
            <div className="instructor-avatar">
              <GraduationCap size={25} />
            </div>

            <div>
              <span>Course instructor</span>
              <strong>{course.instructor}</strong>
            </div>
          </div>
        </div>

        <div className="details-visual">
          <div className="details-book">
            <BookOpen size={100} strokeWidth={1.3} />
          </div>

          <div className="visual-caption">
            <PlayCircle size={20} />
            <span>Learn at your own pace</span>
          </div>
        </div>
      </section>

      <section className="details-main">
        <div className="syllabus-section">
          <span className="section-label">
            COURSE CONTENT
          </span>

          <h2>What you'll learn</h2>

          <p className="syllabus-description">
            Explore the key topics included in this course.
          </p>

          <div className="syllabus-list">
            {course.syllabus.map((topic, index) => (
              <div className="syllabus-item" key={topic}>
                <CheckCircle size={19} />

                <div>
                  <span>Module {index + 1}</span>
                  <h3>{topic}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="enrollment-card">
          <div className="enrollment-price">
            <span>Course price</span>
            <strong>${course.price.toFixed(2)}</strong>
          </div>

          <div className="course-facts">
            <div>
              <Clock size={19} />
              <span>Duration</span>
              <strong>{course.duration}</strong>
            </div>

            <div>
              <BookOpen size={19} />
              <span>Lessons</span>
              <strong>{course.lessons}</strong>
            </div>

            <div>
              <Users size={19} />
              <span>Students</span>
              <strong>{course.students}</strong>
            </div>
          </div>

          <button
            className="enroll-button"
            onClick={handleEnrollment}
          >
            {enrolled ? "Go to My Learning" : "Enroll Now"}
          </button>

          <p className="enrollment-note">
            {enrolled
              ? "You are enrolled in this course."
              : "Start learning at your own pace."}
          </p>
        </aside>
      </section>
    </div>
  );
}

export default CourseDetails;
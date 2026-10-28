import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BookOpen,
  Search,
  Menu,
  X,
  ArrowRight,
  PlayCircle,
  GraduationCap,
  Users,
  Star,
  Code,
  Palette,
  BriefcaseBusiness,
  ChartNoAxesColumn,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  UserRound,
  LogOut,
  ChevronDown,
} from "lucide-react";

import "./App.css";

function App() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [contactSent, setContactSent] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("learnSphereCurrentUser")) || null;
    } catch {
      return null;
    }
  });
  const [profileOpen, setProfileOpen] = useState(false);

  function handleContactSubmit(event) {
    event.preventDefault();
    setContactSent(true);
    event.currentTarget.reset();
  }

  // COURSE DATA
  const courses = [
    {
      id: 1,
      title: "Complete Web Development",
      category: "Development",
      instructor: "Alex Johnson",
      rating: "4.9",
      students: "2.4k",
      price: "$49.99",
      icon: Code,
      color: "blue",
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      category: "Design",
      instructor: "Sarah Williams",
      rating: "4.8",
      students: "1.8k",
      price: "$39.99",
      icon: Palette,
      color: "purple",
    },
    {
      id: 3,
      title: "Business & Entrepreneurship",
      category: "Business",
      instructor: "David Miller",
      rating: "4.9",
      students: "3.1k",
      price: "$59.99",
      icon: BriefcaseBusiness,
      color: "orange",
    },
    {
      id: 4,
      title: "Data Analytics with Python",
      category: "Data Science",
      instructor: "Emily Carter",
      rating: "4.7",
      students: "1.5k",
      price: "$44.99",
      icon: ChartNoAxesColumn,
      color: "green",
    },
  ];

  // COURSE CATEGORIES
  const categories = [
    "All",
    "Development",
    "Design",
    "Business",
    "Data Science",
  ];

  // SEARCH AND CATEGORY FILTERS
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = `${course.title} ${course.category} ${course.instructor}`
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    const matchesCategory =
      selectedCategory === "All" ||
      course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // OPEN COURSE DETAILS
  function openCourse(courseId) {
    navigate(`/course/${courseId}`);
  }

  // RESET SEARCH AND FILTERS
  function resetFilters() {
    setSearch("");
    setSelectedCategory("All");
  }

  return (
    <div className="app">
      {/* =========================
          NAVIGATION
      ========================= */}

      <header className="navbar">
        <a href="#home" className="logo">
          <span className="logo-icon">
            <BookOpen size={23} />
          </span>

          <span>
            Learn<span className="logo-highlight">Sphere</span>
          </span>
        </a>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a
            href="#home"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>

          <a
            href="#courses"
            onClick={() => setMenuOpen(false)}
          >
            Courses
          </a>

          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
          >
            About
          </a>

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
        </nav>

        <div className="nav-actions">
          {/* Admin dashboard shortcut */}
          <button
            className="login-btn"
            onClick={() => navigate("/admin")}
          >
            Admin Dashboard
          </button>

          {currentUser ? (
            <div className="profile-menu-container">
              <button
                type="button"
                className="profile-menu-button"
                onClick={() => setProfileOpen((open) => !open)}
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
              >
                <span className="profile-avatar">
                  {currentUser.name?.trim()?.charAt(0)?.toUpperCase() || <UserRound size={20} />}
                </span>
                <span className="profile-user-name">
                  {currentUser.name?.trim()?.split(" ")[0] || "Profile"}
                </span>
                <ChevronDown size={16} />
              </button>

              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-header">
                    <span className="profile-avatar">
                      {currentUser.name?.trim()?.charAt(0)?.toUpperCase() || <UserRound size={20} />}
                    </span>
                    <div>
                      <strong>{currentUser.name || "Student"}</strong>
                      <p>{currentUser.email || "Signed in"}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/my-learning");
                    }}
                  >
                    <BookOpen size={17} /> My Learning
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("learnSphereCurrentUser");
                      setCurrentUser(null);
                      setProfileOpen(false);
                      navigate("/");
                    }}
                  >
                    <LogOut size={17} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className="login-btn"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>

              <button
                className="signup-btn"
                onClick={() => navigate("/register")}
              >
                Get Started <ArrowRight size={16} />
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU */}

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        {/* =========================
            HERO SECTION
        ========================= */}

        <section className="hero" id="home">
          <div className="hero-content">
            <div className="eyebrow">
              <GraduationCap size={17} />

              <span>YOUR JOURNEY STARTS HERE</span>
            </div>

            <h1>
              Unlock Your Potential With{" "}
              <span>Online Learning</span>
            </h1>

            <p className="hero-description">
              Learn new skills, explore your passions, and achieve
              your goals with expert-led courses designed for your
              future.
            </p>

            <div className="hero-actions">
              <a href="#courses" className="primary-btn">
                Explore Courses <ArrowRight size={18} />
              </a>

              <a href="#about" className="secondary-btn">
                <PlayCircle size={19} />
                Discover More
              </a>
            </div>

            {/* HERO STATISTICS */}

            <div className="hero-stats">
              <div>
                <strong>25K+</strong>
                <span>Active learners</span>
              </div>

              <div>
                <strong>500+</strong>
                <span>Expert courses</span>
              </div>

              <div>
                <strong>98%</strong>
                <span>Satisfaction</span>
              </div>
            </div>
          </div>

          {/* HERO VISUAL */}

          <div className="hero-visual">
            <div className="visual-glow"></div>

            <div className="learning-card">
              <div className="learning-card-top">
                <span className="live-dot"></span>

                <span>YOUR LEARNING SPACE</span>
              </div>

              <div className="book-illustration">
                <div className="book book-back"></div>

                <div className="book book-middle"></div>

                <div className="book book-front">
                  <BookOpen size={65} strokeWidth={1.5} />
                </div>
              </div>

              <h3>Knowledge is your superpower.</h3>

              <p>Small steps. Big achievements.</p>

              <div className="learning-progress">
                <div>
                  <span>Weekly learning goal</span>

                  <strong>75%</strong>
                </div>

                <div className="progress-track">
                  <span></span>
                </div>
              </div>
            </div>

            {/* FLOATING RATING CARD */}

            <div className="floating-card floating-top">
              <span className="floating-icon">
                <Star size={20} />
              </span>

              <div>
                <strong>4.9/5 Rating</strong>

                <p>Loved by learners</p>
              </div>
            </div>

            {/* FLOATING STUDENTS CARD */}

            <div className="floating-card floating-bottom">
              <span className="floating-icon people-icon">
                <Users size={21} />
              </span>

              <div>
                <strong>25,000+</strong>

                <p>Happy students</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            TRUST SECTION
        ========================= */}

        <section className="trust-section">
          <p>BUILD SKILLS THAT MOVE YOU FORWARD</p>

          <div className="trust-items">
            <span>
              <Code size={20} />
              TechSkills
            </span>

            <span>
              <GraduationCap size={21} />
              EduPath
            </span>

            <span>
              <BookOpen size={20} />
              SkillBridge
            </span>

            <span>
              <Star size={20} />
              BrightMind
            </span>
          </div>
        </section>

        {/* =========================
            COURSES SECTION
        ========================= */}

        <section className="courses-section" id="courses">
          {/* SECTION HEADING */}

          <div className="section-heading">
            <div>
              <span className="section-label">
                LEARN SOMETHING NEW
              </span>

              <h2>Explore Popular Courses</h2>

              <p>
                Discover courses that match your interests and
                career goals.
              </p>
            </div>

            {/* COURSE SEARCH */}

            <div className="search-box">
              <Search size={19} />

              <input
                type="search"
                placeholder="Search courses..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                aria-label="Search courses"
              />
            </div>
          </div>

          {/* CATEGORY FILTER BUTTONS */}

          <div
            className="category-filters"
            aria-label="Filter courses by category"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  selectedCategory === category
                    ? "category-btn active"
                    : "category-btn"
                }
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          {/* COURSE GRID */}

          <div className="course-grid">
            {filteredCourses.map((course) => {
              const CourseIcon = course.icon;

              return (
                <article
                  className="course-card"
                  key={course.id}
                >
                  {/* COURSE IMAGE / ICON */}

                  <div className={`course-art ${course.color}`}>
                    <div className="course-art-circle"></div>

                    <CourseIcon
                      size={57}
                      strokeWidth={1.4}
                    />

                    <span className="course-category">
                      {course.category}
                    </span>
                  </div>

                  {/* COURSE INFORMATION */}

                  <div className="course-info">
                    <div className="course-rating">
                      <Star
                        size={15}
                        fill="currentColor"
                      />

                      <span>{course.rating}</span>

                      <span className="student-count">
                        ({course.students} students)
                      </span>
                    </div>

                    <h3>{course.title}</h3>

                    <p className="instructor">
                      By {course.instructor}
                    </p>

                    <div className="course-card-bottom">
                      <strong>{course.price}</strong>

                      <button
                        className="course-link"
                        onClick={() => openCourse(course.id)}
                      >
                        View Course <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* NO COURSES FOUND */}

          {filteredCourses.length === 0 && (
            <div className="no-courses">
              <Search size={32} />

              <h3>No courses found</h3>

              <p>
                Try another course name or category.
              </p>

              <button
                type="button"
                className="signup-btn"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* EXPLORE ALL COURSES */}

          <div className="all-courses">
            <button onClick={resetFilters}>
              Explore All Courses <ArrowRight size={17} />
            </button>
          </div>
        </section>

        {/* =========================
            ABOUT SECTION
        ========================= */}

        <section className="about-section" id="about">
          <div className="about-icon">
            <GraduationCap size={42} />
          </div>

          <div className="about-copy">
            <span className="section-label">ABOUT LEARNSPHERE</span>
            <h2>Learning that moves you forward.</h2>
            <p>
              LearnSphere helps learners build practical, career-ready skills
              through accessible online learning. Learn at your own pace,
              explore new interests, and take the next step toward your goals.
            </p>
            <div className="about-values">
              <article>
                <span className="value-number">01</span>
                <div>
                  <h3>Our Mission</h3>
                  <p>Make skill-building approachable, flexible, and useful for everyone.</p>
                </div>
              </article>
              <article>
                <span className="value-number">02</span>
                <div>
                  <h3>Our Vision</h3>
                  <p>Help every learner turn curiosity into confidence and opportunity.</p>
                </div>
              </article>
            </div>
          </div>
          <a href="#courses" className="about-btn">
            Start Learning <ArrowRight size={17} />
          </a>
        </section>

        {/* CONTACT SECTION */}
        <section className="contact-section" id="contact">
          <div className="contact-heading">
            <span className="section-label">GET IN TOUCH</span>
            <h2>We’d love to hear from you.</h2>
            <p>Have a question about a course or your learning journey? Send us a message.</p>
          </div>

          <div className="contact-layout">
            <aside className="contact-info">
              <h3>Let’s talk</h3>
              <p>Share your question with us and we’ll help you find the right next step.</p>
              <div className="contact-detail">
                <span><Mail size={19} /></span>
                <div><strong>Email</strong><p>support@learnsphere.example</p></div>
              </div>
              <div className="contact-detail">
                <span><Phone size={19} /></span>
                <div><strong>Support</strong><p>Online learner support</p></div>
              </div>
              <div className="contact-detail">
                <span><MapPin size={19} /></span>
                <div><strong>Learning, everywhere</strong><p>Learn online, at your own pace</p></div>
              </div>
              <div className="contact-note">Your next opportunity can start with one message.</div>
            </aside>

            <form className="contact-form" onSubmit={handleContactSubmit} onChange={() => setContactSent(false)}>
              <div className="contact-form-row">
                <label>Full name<input name="name" type="text" placeholder="Your name" required minLength={2} /></label>
                <label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label>
              </div>
              <label>Subject<input name="subject" type="text" placeholder="What can we help with?" required /></label>
              <label>Message<textarea name="message" placeholder="Write your message here..." rows="5" required minLength={10}></textarea></label>
              <button className="contact-submit" type="submit">Send Message <Send size={16} /></button>
              {contactSent && (
                <p className="contact-success" role="status"><CheckCircle2 size={18} /> Thanks! Your message has been validated in this demo.</p>
              )}
              <p className="contact-disclaimer">Demo form: messages are not sent to a server yet.</p>
            </form>
          </div>
        </section>
      </main>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="footer" id="footer">
        <a href="#home" className="logo footer-logo">
          <span className="logo-icon">
            <BookOpen size={22} />
          </span>

          <span>
            Learn<span className="logo-highlight">Sphere</span>
          </span>
        </a>

        <p>Learn today. Lead tomorrow.</p>

        <a className="footer-contact-link" href="#contact">Contact us</a>

        <span className="copyright">
          © {new Date().getFullYear()} LearnSphere.
          All rights reserved.
        </span>
      </footer>
    </div>
  );
}

export default App;
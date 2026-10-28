import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CheckCircle,
  Clock,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import "./AdminDashboard.css";

const courseCompletionData = [
  { course: "Web Development", completed: 45, learning: 25 },
  { course: "UI/UX Design", completed: 32, learning: 28 },
  { course: "Business", completed: 24, learning: 16 },
  { course: "Data Analytics", completed: 38, learning: 22 },
];

const learningHoursData = [
  { day: "Mon", hours: 35 },
  { day: "Tue", hours: 48 },
  { day: "Wed", hours: 42 },
  { day: "Thu", hours: 60 },
  { day: "Fri", hours: 52 },
  { day: "Sat", hours: 75 },
  { day: "Sun", hours: 45 },
];

const enrollmentData = [
  { name: "Web Development", students: 70 },
  { name: "UI/UX Design", students: 60 },
  { name: "Business", students: 40 },
  { name: "Data Analytics", students: 60 },
];

const COLORS = ["#E85D35", "#1F1F1F", "#E9A23B", "#A8A095"];

function AdminDashboard() {
  const navigate = useNavigate();

  const totalStudents = 156;
  const completedCourses = 139;
  const coursesInProgress = 91;
  const totalLearningHours = 1257;

  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: Users,
      change: "+12% this month",
    },
    {
      title: "Completed Courses",
      value: completedCourses,
      icon: CheckCircle,
      change: "Across all courses",
    },
    {
      title: "In Progress",
      value: coursesInProgress,
      icon: BookOpen,
      change: "Currently learning",
    },
    {
      title: "Learning Hours",
      value: totalLearningHours.toLocaleString(),
      icon: Clock,
      change: "Total hours recorded",
    },
  ];

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-icon">
            <BookOpen size={23} />
          </div>

          <div>
            <h2>LearnSphere</h2>
            <span>ADMIN PANEL</span>
          </div>
        </div>

        <div className="admin-nav-label">MENU</div>

        <button className="admin-nav-item active">
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </button>

        <button
          className="admin-nav-item"
          onClick={() => navigate("/")}
        >
          <BookOpen size={19} />
          <span>View Courses</span>
        </button>

        <div className="admin-sidebar-bottom">
          <div className="admin-profile">
            <div className="admin-avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <span>Dashboard Demo</span>
            </div>
          </div>

          <button
            className="admin-back-button"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={17} />
            Back to Website
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">OVERVIEW</p>
            <h1>Admin Dashboard</h1>
            <p className="admin-subtitle">
              Track student progress and learning activity.
            </p>
          </div>

          <div className="admin-header-badge">
            <span className="admin-status-dot"></span>
            Demo Analytics
          </div>
        </header>

        <section className="admin-stats-grid">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article className="admin-stat-card" key={stat.title}>
                <div className="admin-stat-top">
                  <div className="admin-stat-icon">
                    <Icon size={22} />
                  </div>

                  <TrendingUp size={18} className="admin-trend-icon" />
                </div>

                <p>{stat.title}</p>
                <h2>{stat.value}</h2>
                <span>{stat.change}</span>
              </article>
            );
          })}
        </section>

        <section className="admin-charts-grid">
          <article className="admin-chart-card admin-chart-wide">
            <div className="admin-chart-heading">
              <div>
                <h2>Course Completion</h2>
                <p>Students who completed courses vs those still learning</p>
              </div>

              <span className="admin-chart-tag">BY COURSE</span>
            </div>

            <div className="admin-chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={courseCompletionData}
                  margin={{ top: 15, right: 10, left: -15, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5DED3"
                  />

                  <XAxis
                    dataKey="course"
                    tick={{ fill: "#625D55", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                  />

                  <YAxis
                    tick={{ fill: "#625D55", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    contentStyle={{
                      background: "#FFFFFF",
                      border: "1px solid #E5DED3",
                      borderRadius: "10px",
                    }}
                  />

                  <Legend />

                  <Bar
                    dataKey="completed"
                    name="Completed"
                    fill="#E85D35"
                    radius={[5, 5, 0, 0]}
                  />

                  <Bar
                    dataKey="learning"
                    name="In Progress"
                    fill="#1F1F1F"
                    radius={[5, 5, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="admin-chart-card">
            <div className="admin-chart-heading">
              <div>
                <h2>Course Enrollments</h2>
                <p>Student enrollment distribution</p>
              </div>
            </div>

            <div className="admin-pie-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={enrollmentData}
                    dataKey="students"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={4}
                  >
                    {enrollmentData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend verticalAlign="bottom" height={45} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="admin-chart-card admin-chart-wide">
            <div className="admin-chart-heading">
              <div>
                <h2>Student Learning Hours</h2>
                <p>Total study hours recorded each day this week</p>
              </div>

              <span className="admin-chart-tag">THIS WEEK</span>
            </div>

            <div className="admin-chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={learningHoursData}
                  margin={{ top: 15, right: 15, left: -15, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5DED3"
                  />

                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#625D55", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{ fill: "#625D55", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    formatter={(value) => [`${value} hours`, "Learning Time"]}
                  />

                  <Line
                    type="monotone"
                    dataKey="hours"
                    name="Learning Hours"
                    stroke="#E85D35"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#E85D35" }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>

        <footer className="admin-footer">
          <p>LearnSphere Admin Dashboard</p>
          <span>Sample analytics data · Not live student records</span>
        </footer>
      </main>
    </div>
  );
}

export default AdminDashboard;
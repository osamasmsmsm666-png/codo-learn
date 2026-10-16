
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

type Section =
    | "overview"
    | "courses"
    | "learning"
    | "enrollments"
    | "payments"
    | "notifications"
    | "profile";

const initialCourses = [
    {
        id: 1,
        title: "Frontend Development",
        category: "Web Development",
        instructor: "Ahmed Mohamed",
        progress: 75,
        completedLessons: 18,
        totalLessons: 24,
        color: "#869CFF",
    },
    {
        id: 2,
        title: "UI/UX Design",
        category: "Design",
        instructor: "Sara Ali",
        progress: 45,
        completedLessons: 9,
        totalLessons: 20,
        color: "#E2A3FF",
    },
    {
        id: 3,
        title: "JavaScript Fundamentals",
        category: "Programming",
        instructor: "Omar Hassan",
        progress: 60,
        completedLessons: 12,
        totalLessons: 20,
        color: "#A8B5FF",
    },
];

const initialNotifications = [
    {
        id: 1,
        title: "Enrollment confirmed",
        message: "Your Frontend Development enrollment is confirmed.",
        time: "2 hours ago",
        read: false,
    },
    {
        id: 2,
        title: "New course material",
        message: "New materials are available in UI/UX Design.",
        time: "Yesterday",
        read: false,
    },
    {
        id: 3,
        title: "Payment successful",
        message: "Your payment for JavaScript Fundamentals was received.",
        time: "2 days ago",
        read: true,
    },
];

const navItems: { id: Section; label: string; icon: string }[] = [
    { id: "overview", label: "Student Overview", icon: "⌂" },
    { id: "courses", label: "My Courses", icon: "▤" },
    { id: "learning", label: "Course Learning", icon: "▷" },
    { id: "enrollments", label: "My Enrollments", icon: "✓" },
    { id: "payments", label: "My Payments", icon: "$" },
    { id: "notifications", label: "Notifications", icon: "♧" },
    { id: "profile", label: "My Profile", icon: "♙" },
];

const payments = [
    {
        id: "PAY-1001",
        course: "Frontend Development",
        date: "Oct 10, 2026",
        amount: "$120",
        status: "Paid",
    },
    {
        id: "PAY-1002",
        course: "UI/UX Design",
        date: "Oct 12, 2026",
        amount: "$95",
        status: "Pending",
    },
    {
        id: "PAY-1003",
        course: "JavaScript Fundamentals",
        date: "Oct 14, 2026",
        amount: "$80",
        status: "Paid",
    },
];

export default function StudentDashboard() {
    const [activeSection, setActiveSection] =
        useState<Section>("overview");

    const [selectedCourseId, setSelectedCourseId] = useState(1);
    const [courses, setCourses] = useState(initialCourses);
    const [notifications, setNotifications] =
        useState(initialNotifications);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [studentName, setStudentName] = useState("Student Name");
    const [email, setEmail] = useState("student@example.com");
    const [phone, setPhone] = useState("");
    const [saveMessage, setSaveMessage] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    const selectedCourse =
        courses.find((course) => course.id === selectedCourseId) ??
        courses[0];

    const unreadCount = notifications.filter((n) => !n.read).length;

    function openSection(section: Section) {
        setActiveSection(section);
        setSidebarOpen(false);
        setSaveMessage("");
        setPasswordMessage("");
    }

    function markAllRead() {
        setNotifications((previous) =>
            previous.map((item) => ({ ...item, read: true }))
        );
    }

    function markLessonComplete() {
        setCourses((previous) =>
            previous.map((course) => {
                if (course.id !== selectedCourseId) return course;

                const completedLessons = Math.min(
                    course.completedLessons + 1,
                    course.totalLessons
                );

                return {
                    ...course,
                    completedLessons,
                    progress: Math.round(
                        (completedLessons / course.totalLessons) * 100
                    ),
                };
            })
        );
    }

    function saveProfile(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaveMessage("Your profile changes have been saved in this demo.");
    }

    function changePassword(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (newPassword.length < 8) {
            setPasswordMessage("Password must be at least 8 characters.");
            return;
        }

        setPasswordMessage(
            "Demo only: connect the backend to update your real password."
        );
        setCurrentPassword("");
        setNewPassword("");
    }

    const pageTitles: Record<Section, string> = {
        overview: "Student Overview",
        courses: "My Courses",
        learning: "Course Learning",
        enrollments: "My Enrollments",
        payments: "My Payments",
        notifications: "Notifications",
        profile: "My Profile",
    };

    return (
        <div className="min-h-screen bg-[#F8F8FC] text-[#20243A]">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <button
                    aria-label="Close navigation"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-[#20243A]/30 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-[#ECECF5] bg-white transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex h-20 items-center justify-between border-b border-[#ECECF5] px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logoooo-removebg-preview.png"
                            alt="Codo Learn"
                            width={145}
                            height={48}
                            priority
                            className="h-auto w-[145px] object-contain"
                        />
                    </Link>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="rounded-lg p-2 text-xl lg:hidden"
                        aria-label="Close menu"
                    >
                        ×
                    </button>
                </div>

                <div className="px-5 pb-3 pt-7">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                        Student Portal
                    </p>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto px-3">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => openSection(item.id)}
                            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${activeSection === item.id
                                ? "bg-[#869CFF]/15 text-[#586FD6]"
                                : "text-gray-500 hover:bg-[#F8F8FC] hover:text-[#586FD6]"
                                }`}
                        >
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-lg">
                                {item.icon}
                            </span>

                            <span className="flex-1">{item.label}</span>

                            {item.id === "notifications" && unreadCount > 0 && (
                                <span className="rounded-full bg-[#E2A3FF] px-2 py-0.5 text-xs text-[#20243A]">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="m-4 rounded-2xl bg-gradient-to-br from-[#869CFF]/20 to-[#E2A3FF]/30 p-4">
                    <p className="font-bold">Keep learning!</p>
                    <p className="mt-1 text-xs leading-5 text-gray-600">
                        Every lesson takes you one step closer to your goals.
                    </p>
                    <button
                        onClick={() => openSection("courses")}
                        className="mt-3 rounded-lg bg-white px-3 py-2 text-xs font-bold text-[#586FD6]"
                    >
                        Explore my courses
                    </button>
                </div>
            </aside>

            {/* Main area */}
            <main className="min-h-screen lg:ml-[270px]">
                {/* Topbar */}
                <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#ECECF5] bg-white/90 px-4 backdrop-blur-md sm:px-8">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="rounded-xl border border-gray-200 px-3 py-2 lg:hidden"
                            aria-label="Open navigation"
                        >
                            ☰
                        </button>

                        <div>
                            <p className="text-xs text-gray-400">Student Portal</p>
                            <h1 className="text-lg font-bold sm:text-xl">
                                {pageTitles[activeSection]}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => openSection("notifications")}
                            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-lg hover:bg-gray-50"
                            aria-label="Notifications"
                        >
                            ♧
                            {unreadCount > 0 && (
                                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-[#E2A3FF]" />
                            )}
                        </button>

                        <button
                            onClick={() => openSection("profile")}
                            className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-gray-50"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] font-bold text-white">
                                {studentName.charAt(0).toUpperCase()}
                            </div>
                            <div className="hidden text-left sm:block">
                                <p className="max-w-32 truncate text-sm font-semibold">
                                    {studentName}
                                </p>
                                <p className="text-xs text-gray-400">Student</p>
                            </div>
                        </button>
                    </div>
                </header>

                <div className="mx-auto max-w-[1500px] p-4 sm:p-8">
                    {/* OVERVIEW */}
                    {activeSection === "overview" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-7"
                        >
                            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#869CFF]/25 via-[#E2A3FF]/25 to-white p-6 sm:p-9">
                                <div className="relative z-10 max-w-2xl">
                                    <p className="text-sm font-semibold text-[#586FD6]">
                                        YOUR LEARNING JOURNEY
                                    </p>
                                    <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                                        Welcome back, {studentName}!
                                    </h2>
                                    <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
                                        Keep building your skills. Continue your courses,
                                        track your progress, and reach your next goal.
                                    </p>
                                    <button
                                        onClick={() => openSection("courses")}
                                        className="mt-6 rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#455BC1]"
                                    >
                                        Continue Learning →
                                    </button>
                                </div>

                                <div className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full bg-[#869CFF]/25 blur-2xl" />
                                <div className="pointer-events-none absolute -bottom-16 right-28 h-40 w-40 rounded-full bg-[#E2A3FF]/40 blur-2xl" />
                            </section>

                            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                {[
                                    {
                                        label: "Enrolled Courses",
                                        value: String(courses.length),
                                        icon: "▤",
                                        color: "#869CFF",
                                    },
                                    {
                                        label: "Lessons Completed",
                                        value: String(
                                            courses.reduce(
                                                (total, course) => total + course.completedLessons,
                                                0
                                            )
                                        ),
                                        icon: "✓",
                                        color: "#E2A3FF",
                                    },
                                    {
                                        label: "Average Progress",
                                        value:
                                            Math.round(
                                                courses.reduce(
                                                    (total, course) => total + course.progress,
                                                    0
                                                ) / Math.max(courses.length, 1)
                                            ) + "%",
                                        icon: "↗",
                                        color: "#A8B5FF",
                                    },
                                    {
                                        label: "Unread Notifications",
                                        value: String(unreadCount),
                                        icon: "♧",
                                        color: "#F2C3E8",
                                    },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="rounded-2xl border border-[#ECECF5] bg-white p-5"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-gray-500">{stat.label}</p>
                                            <span
                                                className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                                                style={{ backgroundColor: `${stat.color}35` }}
                                            >
                                                {stat.icon}
                                            </span>
                                        </div>
                                        <p className="mt-4 text-3xl font-extrabold">
                                            {stat.value}
                                        </p>
                                    </div>
                                ))}
                            </section>

                            <section>
                                <div className="mb-4 flex items-center justify-between gap-3">
                                    <div>
                                        <h3 className="text-xl font-bold">Continue Learning</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Pick up where you left off.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => openSection("courses")}
                                        className="text-sm font-bold text-[#586FD6]"
                                    >
                                        View all →
                                    </button>
                                </div>

                                <div className="grid gap-5 xl:grid-cols-3">
                                    {courses.map((course) => (
                                        <CourseCard
                                            key={course.id}
                                            course={course}
                                            onClick={() => {
                                                setSelectedCourseId(course.id);
                                                openSection("learning");
                                            }}
                                        />
                                    ))}
                                </div>
                            </section>

                            <section className="grid gap-5 xl:grid-cols-2">
                                <div className="rounded-2xl border border-[#ECECF5] bg-white p-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold">Upcoming Activities</h3>
                                        <span className="text-xs text-gray-400">Coming up</span>
                                    </div>
                                    <div className="mt-5 space-y-4">
                                        {[
                                            {
                                                date: "16",
                                                month: "OCT",
                                                title: "React Components & Props",
                                                time: "10:00 AM – 11:30 AM",
                                            },
                                            {
                                                date: "18",
                                                month: "OCT",
                                                title: "Design Systems Workshop",
                                                time: "2:00 PM – 3:30 PM",
                                            },
                                            {
                                                date: "20",
                                                month: "OCT",
                                                title: "JavaScript Practice",
                                                time: "12:00 PM – 1:00 PM",
                                            },
                                        ].map((activity) => (
                                            <div
                                                key={activity.title}
                                                className="flex items-center gap-4"
                                            >
                                                <div className="w-14 shrink-0 rounded-xl bg-[#869CFF]/15 p-2 text-center">
                                                    <p className="text-xs font-bold text-[#586FD6]">
                                                        {activity.month}
                                                    </p>
                                                    <p className="text-xl font-extrabold">
                                                        {activity.date}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold">
                                                        {activity.title}
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        {activity.time}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-[#ECECF5] bg-white p-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold">Recent Notifications</h3>
                                        <button
                                            onClick={() => openSection("notifications")}
                                            className="text-sm font-bold text-[#586FD6]"
                                        >
                                            View all →
                                        </button>
                                    </div>
                                    <div className="mt-5 space-y-4">
                                        {notifications.slice(0, 3).map((notification) => (
                                            <div
                                                key={notification.id}
                                                className="flex gap-3 rounded-xl bg-[#F8F8FC] p-3"
                                            >
                                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E2A3FF]/30">
                                                    ♧
                                                </span>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold">
                                                        {notification.title}
                                                    </p>
                                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                                        {notification.message}
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {notification.time}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </motion.div>
                    )}

                    {/* MY COURSES */}
                    {activeSection === "courses" && (
                        <SectionPanel
                            title="My Courses"
                            description="All the courses you're currently enrolled in."
                        >
                            <div className="grid gap-5 xl:grid-cols-2">
                                {courses.map((course) => (
                                    <CourseCard
                                        key={course.id}
                                        course={course}
                                        onClick={() => {
                                            setSelectedCourseId(course.id);
                                            openSection("learning");
                                        }}
                                    />
                                ))}
                            </div>
                        </SectionPanel>
                    )}

                    {/* COURSE LEARNING */}
                    {activeSection === "learning" && (
                        <SectionPanel
                            title="Course Learning"
                            description="Access lessons, course materials, and your progress."
                        >
                            <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
                                <div className="h-fit rounded-2xl border border-[#ECECF5] bg-white p-4">
                                    <h3 className="mb-3 font-bold">Choose a course</h3>
                                    {courses.map((course) => (
                                        <button
                                            key={course.id}
                                            onClick={() => setSelectedCourseId(course.id)}
                                            className={`mb-2 w-full rounded-xl p-3 text-left text-sm font-medium ${selectedCourseId === course.id
                                                ? "bg-[#869CFF]/15 text-[#586FD6]"
                                                : "hover:bg-gray-50"
                                                }`}
                                        >
                                            {course.title}
                                            <p className="mt-1 text-xs text-gray-400">
                                                {course.progress}% complete
                                            </p>
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-5">
                                    <div className="rounded-2xl border border-[#ECECF5] bg-white p-6">
                                        <p className="text-sm text-gray-500">
                                            {selectedCourse.category}
                                        </p>
                                        <h3 className="mt-2 text-2xl font-extrabold">
                                            {selectedCourse.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Instructor: {selectedCourse.instructor}
                                        </p>

                                        <div className="mt-6 flex items-center justify-between text-sm">
                                            <span>Course progress</span>
                                            <strong>{selectedCourse.progress}%</strong>
                                        </div>
                                        <ProgressBar value={selectedCourse.progress} />

                                        <p className="mt-2 text-xs text-gray-400">
                                            {selectedCourse.completedLessons} of{" "}
                                            {selectedCourse.totalLessons} lessons completed
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-[#ECECF5] bg-white p-6">
                                        <h3 className="text-lg font-bold">Course Lessons</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Demo lesson list — replace with lessons from your API.
                                        </p>

                                        <div className="mt-5 space-y-3">
                                            {Array.from(
                                                { length: Math.min(selectedCourse.totalLessons, 6) },
                                                (_, index) => {
                                                    const lessonNumber = index + 1;
                                                    const completed =
                                                        lessonNumber <= selectedCourse.completedLessons;

                                                    return (
                                                        <div
                                                            key={lessonNumber}
                                                            className="flex items-center gap-3 rounded-xl border border-gray-100 p-4"
                                                        >
                                                            <span
                                                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${completed
                                                                    ? "bg-[#869CFF]/20 text-[#586FD6]"
                                                                    : "bg-gray-100 text-gray-500"
                                                                    }`}
                                                            >
                                                                {completed ? "✓" : "▷"}
                                                            </span>
                                                            <div className="flex-1">
                                                                <p className="text-sm font-semibold">
                                                                    Lesson {lessonNumber}:{" "}
                                                                    {[
                                                                        "Introduction",
                                                                        "Getting Started",
                                                                        "Core Concepts",
                                                                        "Practical Examples",
                                                                        "Build a Project",
                                                                        "Review and Practice",
                                                                    ][index]}
                                                                </p>
                                                                <p className="mt-1 text-xs text-gray-400">
                                                                    {completed ? "Completed" : "Not completed"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>

                                        <button
                                            onClick={markLessonComplete}
                                            disabled={
                                                selectedCourse.completedLessons >=
                                                selectedCourse.totalLessons
                                            }
                                            className="mt-5 rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white hover:bg-[#455BC1] disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            Mark next lesson complete
                                        </button>
                                    </div>

                                    <div className="rounded-2xl border border-[#ECECF5] bg-white p-6">
                                        <h3 className="text-lg font-bold">Course Materials</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Add real files and links when the course API is ready.
                                        </p>
                                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                            {[
                                                ["Course notes.pdf", "PDF document"],
                                                ["Practice exercises", "Exercise collection"],
                                                ["Reference links", "External resources"],
                                                ["Final project brief", "Project instructions"],
                                            ].map(([title, type]) => (
                                                <div
                                                    key={title}
                                                    className="flex items-center gap-3 rounded-xl bg-[#F8F8FC] p-4"
                                                >
                                                    <span className="text-xl">▧</span>
                                                    <div>
                                                        <p className="text-sm font-semibold">{title}</p>
                                                        <p className="mt-1 text-xs text-gray-400">{type}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SectionPanel>
                    )}

                    {/* ENROLLMENTS */}
                    {activeSection === "enrollments" && (
                        <SectionPanel
                            title="My Enrollments"
                            description="Review your registration status for each course."
                        >
                            <div className="overflow-x-auto rounded-2xl border border-[#ECECF5] bg-white">
                                <table className="w-full min-w-[650px] text-left text-sm">
                                    <thead className="bg-[#F8F8FC] text-gray-500">
                                        <tr>
                                            <th className="p-4 font-medium">Course</th>
                                            <th className="p-4 font-medium">Enrollment ID</th>
                                            <th className="p-4 font-medium">Date</th>
                                            <th className="p-4 font-medium">Status</th>
                                            <th className="p-4 font-medium">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courses.map((course, index) => (
                                            <tr
                                                key={course.id}
                                                className="border-t border-gray-100"
                                            >
                                                <td className="p-4 font-semibold">{course.title}</td>
                                                <td className="p-4 text-gray-500">
                                                    ENR-10{course.id}
                                                </td>
                                                <td className="p-4 text-gray-500">
                                                    Oct {10 + index * 2}, 2026
                                                </td>
                                                <td className="p-4">
                                                    <StatusBadge status="Approved" />
                                                </td>
                                                <td className="p-4">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedCourseId(course.id);
                                                            openSection("learning");
                                                        }}
                                                        className="font-semibold text-[#586FD6]"
                                                    >
                                                        Open course →
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-4 text-xs text-gray-400">
                                Enrollment records and statuses are sample data.
                            </p>
                        </SectionPanel>
                    )}

                    {/* PAYMENTS */}
                    {activeSection === "payments" && (
                        <SectionPanel
                            title="My Payments"
                            description="Check your payment history and transaction statuses."
                        >
                            <div className="mb-5 grid gap-4 sm:grid-cols-3">
                                <SummaryCard
                                    label="Total Paid"
                                    value="$200"
                                    description="Sample completed payments"
                                />
                                <SummaryCard
                                    label="Pending"
                                    value="$95"
                                    description="Awaiting confirmation"
                                />
                                <SummaryCard
                                    label="Transactions"
                                    value={String(payments.length)}
                                    description="Payment records"
                                />
                            </div>

                            <div className="overflow-x-auto rounded-2xl border border-[#ECECF5] bg-white">
                                <table className="w-full min-w-[650px] text-left text-sm">
                                    <thead className="bg-[#F8F8FC] text-gray-500">
                                        <tr>
                                            <th className="p-4 font-medium">Transaction ID</th>
                                            <th className="p-4 font-medium">Course</th>
                                            <th className="p-4 font-medium">Date</th>
                                            <th className="p-4 font-medium">Amount</th>
                                            <th className="p-4 font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payments.map((payment) => (
                                            <tr
                                                key={payment.id}
                                                className="border-t border-gray-100"
                                            >
                                                <td className="p-4 font-semibold">{payment.id}</td>
                                                <td className="p-4">{payment.course}</td>
                                                <td className="p-4 text-gray-500">{payment.date}</td>
                                                <td className="p-4 font-semibold">{payment.amount}</td>
                                                <td className="p-4">
                                                    <StatusBadge status={payment.status} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </SectionPanel>
                    )}

                    {/* NOTIFICATIONS */}
                    {activeSection === "notifications" && (
                        <SectionPanel
                            title="Notifications"
                            description="Stay updated about enrollments, courses, and payments."
                        >
                            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                                <p className="text-sm text-gray-500">
                                    {unreadCount} unread notification(s)
                                </p>
                                <button
                                    onClick={markAllRead}
                                    className="rounded-xl border border-[#869CFF]/40 px-4 py-2 text-sm font-semibold text-[#586FD6] hover:bg-[#869CFF]/10"
                                >
                                    Mark all as read
                                </button>
                            </div>

                            <div className="space-y-3">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`flex items-start gap-4 rounded-2xl border p-5 ${notification.read
                                            ? "border-[#ECECF5] bg-white"
                                            : "border-[#869CFF]/30 bg-[#869CFF]/[0.06]"
                                            }`}
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#869CFF]/30 to-[#E2A3FF]/40 text-xl">
                                            ♧
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-bold">{notification.title}</h3>
                                                {!notification.read && (
                                                    <span className="rounded-full bg-[#869CFF]/20 px-2 py-1 text-[10px] font-bold text-[#586FD6]">
                                                        NEW
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                                {notification.message}
                                            </p>
                                            <p className="mt-2 text-xs text-gray-400">
                                                {notification.time}
                                            </p>
                                        </div>
                                        {!notification.read && (
                                            <button
                                                onClick={() =>
                                                    setNotifications((previous) =>
                                                        previous.map((item) =>
                                                            item.id === notification.id
                                                                ? { ...item, read: true }
                                                                : item
                                                        )
                                                    )
                                                }
                                                className="shrink-0 text-xs font-semibold text-[#586FD6]"
                                            >
                                                Mark read
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </SectionPanel>
                    )}

                    {/* PROFILE */}
                    {activeSection === "profile" && (
                        <SectionPanel
                            title="My Profile"
                            description="Manage your personal information and password."
                        >
                            <div className="grid items-start gap-6 xl:grid-cols-[1fr_1fr]">
                                <form
                                    onSubmit={saveProfile}
                                    className="rounded-2xl border border-[#ECECF5] bg-white p-6"
                                >
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] text-2xl font-bold text-white">
                                            {studentName.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold">
                                                Personal Information
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Update your profile details.
                                            </p>
                                        </div>
                                    </div>

                                    <label className="mb-2 block text-sm font-semibold">
                                        Full Name
                                    </label>
                                    <input
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                        required
                                        className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]"
                                        placeholder="Enter your full name"
                                    />

                                    <label className="mb-2 block text-sm font-semibold">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]"
                                        placeholder="Enter your email"
                                    />

                                    <label className="mb-2 block text-sm font-semibold">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]"
                                        placeholder="Enter your phone number"
                                    />

                                    {saveMessage && (
                                        <p className="mb-4 rounded-xl bg-[#869CFF]/10 p-3 text-sm text-[#455BC1]">
                                            {saveMessage}
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        className="rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white hover:bg-[#455BC1]"
                                    >
                                        Save Changes
                                    </button>
                                </form>

                                <form
                                    onSubmit={changePassword}
                                    className="rounded-2xl border border-[#ECECF5] bg-white p-6"
                                >
                                    <h3 className="text-lg font-bold">Change Password</h3>
                                    <p className="mb-6 mt-1 text-sm text-gray-500">
                                        Choose a strong password for your account.
                                    </p>

                                    <label className="mb-2 block text-sm font-semibold">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                        className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]"
                                        placeholder="Enter current password"
                                    />

                                    <label className="mb-2 block text-sm font-semibold">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        minLength={8}
                                        className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]"
                                        placeholder="At least 8 characters"
                                    />

                                    {passwordMessage && (
                                        <p className="mb-4 rounded-xl bg-[#E2A3FF]/20 p-3 text-sm">
                                            {passwordMessage}
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        className="rounded-xl border border-[#869CFF]/50 px-5 py-3 text-sm font-bold text-[#586FD6] hover:bg-[#869CFF]/10"
                                    >
                                        Update Password
                                    </button>

                                    <p className="mt-4 text-xs leading-5 text-gray-400">
                                        Password changes require backend authentication before
                                        they can update a real account.
                                    </p>
                                </form>
                            </div>
                        </SectionPanel>
                    )}

                    <footer className="mt-10 border-t border-[#ECECF5] py-6 text-center text-xs text-gray-400">
                        {new Date().getFullYear()} Codo Learn. Keep learning, keep growing.
                    </footer>
                </div>
            </main>
        </div>
    );
}

type Course = (typeof initialCourses)[number];

function CourseCard({
    course,
    onClick,
}: {
    course: Course;
    onClick: () => void;
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#ECECF5] bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-[#869CFF]/10">
            <div
                className="h-2"
                style={{
                    background: `linear-gradient(to right, ${course.color}, #E2A3FF)`,
                }}
            />
            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <span className="rounded-lg bg-[#869CFF]/10 px-3 py-1.5 text-xs font-semibold text-[#586FD6]">
                        {course.category}
                    </span>
                    <span className="text-xs text-gray-400">
                        {course.completedLessons}/{course.totalLessons} lessons
                    </span>
                </div>

                <h3 className="mt-5 text-lg font-bold">{course.title}</h3>
                <p className="mt-2 text-sm text-gray-500">
                    Instructor: {course.instructor}
                </p>

                <div className="mt-5 flex items-center justify-between text-sm">
                    <span className="text-gray-500">Your progress</span>
                    <strong>{course.progress}%</strong>
                </div>
                <ProgressBar value={course.progress} />

                <button
                    onClick={onClick}
                    className="mt-5 w-full rounded-xl bg-[#869CFF]/15 px-4 py-3 text-sm font-bold text-[#586FD6] transition hover:bg-[#869CFF]/25"
                >
                    Continue Course →
                </button>
            </div>
        </div>
    );
}

function ProgressBar({ value }: { value: number }) {
    return (
        <div
            className="mt-3 h-2.5 overflow-hidden rounded-full bg-gray-100"
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                    width: `${value}%`,
                    background: "linear-gradient(to right, #869CFF, #E2A3FF)",
                }}
            />
        </div>
    );
}

function SectionPanel({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div>
                <h2 className="text-2xl font-extrabold">{title}</h2>
                <p className="mt-2 text-sm text-gray-500">{description}</p>
            </div>
            {children}
        </motion.section>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        Paid: "bg-emerald-50 text-emerald-700",
        Approved: "bg-emerald-50 text-emerald-700",
        Pending: "bg-amber-50 text-amber-700",
        Rejected: "bg-red-50 text-red-700",
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${styles[status] ?? "bg-gray-100 text-gray-600"
                }`}
        >
            {status}
        </span>
    );
}

function SummaryCard({
    label,
    value,
    description,
}: {
    label: string;
    value: string;
    description: string;
}) {
    return (
        <div className="rounded-2xl border border-[#ECECF5] bg-white p-5">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-3 text-2xl font-extrabold">{value}</p>
            <p className="mt-2 text-xs text-gray-400">{description}</p>
        </div>
    );
}

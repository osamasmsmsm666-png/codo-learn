
"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

type Section =
    | "overview"
    | "courses"
    | "content"
    | "students"
    | "assignments"
    | "schedule"
    | "reviews"
    | "profile";

type Course = {
    id: number;
    title: string;
    category: string;
    students: number;
    lessons: number;
    status: "Published" | "Draft";
    color: string;
};

const initialCourses: Course[] = [
    {
        id: 1,
        title: "Frontend Development",
        category: "Web Development",
        students: 42,
        lessons: 24,
        status: "Published",
        color: "#869CFF",
    },
    {
        id: 2,
        title: "JavaScript Fundamentals",
        category: "Programming",
        students: 35,
        lessons: 20,
        status: "Published",
        color: "#E2A3FF",
    },
    {
        id: 3,
        title: "React Advanced",
        category: "Web Development",
        students: 0,
        lessons: 0,
        status: "Draft",
        color: "#A8B5FF",
    },
];

const initialStudents = [
    {
        id: 1,
        name: "Omar Hassan",
        email: "omar@example.com",
        course: "Frontend Development",
        progress: 78,
        status: "Active",
    },
    {
        id: 2,
        name: "Sara Ahmed",
        email: "sara@example.com",
        course: "JavaScript Fundamentals",
        progress: 92,
        status: "Active",
    },
    {
        id: 3,
        name: "Ali Mohamed",
        email: "ali@example.com",
        course: "Frontend Development",
        progress: 35,
        status: "Active",
    },
    {
        id: 4,
        name: "Mariam Adel",
        email: "mariam@example.com",
        course: "JavaScript Fundamentals",
        progress: 60,
        status: "Active",
    },
];

const initialAssignments = [
    {
        id: 1,
        title: "Build a Responsive Landing Page",
        course: "Frontend Development",
        dueDate: "2026-10-20",
        submissions: 28,
        status: "Open",
    },
    {
        id: 2,
        title: "JavaScript Array Methods",
        course: "JavaScript Fundamentals",
        dueDate: "2026-10-22",
        submissions: 21,
        status: "Open",
    },
];

const initialSessions = [
    {
        id: 1,
        title: "React Components & Props",
        course: "Frontend Development",
        date: "Oct 16, 2026",
        time: "10:00 AM – 11:30 AM",
        type: "Live Session",
    },
    {
        id: 2,
        title: "JavaScript Practice",
        course: "JavaScript Fundamentals",
        date: "Oct 18, 2026",
        time: "12:00 PM – 1:00 PM",
        type: "Workshop",
    },
    {
        id: 3,
        title: "React State Management",
        course: "React Advanced",
        date: "Oct 20, 2026",
        time: "2:00 PM – 3:30 PM",
        type: "Live Session",
    },
];

const reviews = [
    {
        name: "Omar Hassan",
        course: "Frontend Development",
        rating: 5,
        message:
            "The explanations are clear, and the practical projects make learning easier.",
    },
    {
        name: "Sara Ahmed",
        course: "JavaScript Fundamentals",
        rating: 5,
        message:
            "A well-organized course with useful examples and exercises.",
    },
    {
        name: "Ali Mohamed",
        course: "Frontend Development",
        rating: 4,
        message:
            "Great learning experience. I would love to see more advanced projects.",
    },
];

const navItems: {
    id: Section;
    label: string;
    icon: string;
}[] = [
        { id: "overview", label: "Overview", icon: "⌂" },
        { id: "courses", label: "My Courses", icon: "▤" },
        { id: "content", label: "Course Content", icon: "▷" },
        { id: "students", label: "My Students", icon: "♙" },
        { id: "assignments", label: "Assignments", icon: "✓" },
        { id: "schedule", label: "Schedule", icon: "▦" },
        { id: "reviews", label: "Reviews", icon: "☆" },
        { id: "profile", label: "My Profile", icon: "⚙" },
    ];

export default function InstructorDashboard() {
    const [activeSection, setActiveSection] =
        useState<Section>("overview");

    const [courses, setCourses] = useState(initialCourses);
    const [students] = useState(initialStudents);
    const [assignments, setAssignments] = useState(initialAssignments);
    const [sessions] = useState(initialSessions);

    const [selectedCourseId, setSelectedCourseId] = useState(1);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showCourseForm, setShowCourseForm] = useState(false);
    const [showAssignmentForm, setShowAssignmentForm] = useState(false);

    const [courseTitle, setCourseTitle] = useState("");
    const [courseCategory, setCourseCategory] = useState("Web Development");
    const [courseStatus, setCourseStatus] =
        useState<"Published" | "Draft">("Draft");

    const [lessonTitle, setLessonTitle] = useState("");
    const [courseLessons, setCourseLessons] = useState<
        { id: number; courseId: number; title: string; type: string }[]
    >([
        { id: 1, courseId: 1, title: "Introduction to HTML", type: "Video" },
        { id: 2, courseId: 1, title: "CSS Fundamentals", type: "Video" },
        { id: 3, courseId: 1, title: "Responsive Design", type: "Material" },
        {
            id: 4,
            courseId: 2,
            title: "Variables and Data Types",
            type: "Video",
        },
    ]);

    const [assignmentTitle, setAssignmentTitle] = useState("");
    const [assignmentCourseId, setAssignmentCourseId] = useState("1");
    const [assignmentDueDate, setAssignmentDueDate] = useState("2026-10-25");

    const [instructorName, setInstructorName] = useState("Instructor Name");
    const [email, setEmail] = useState("instructor@example.com");
    const [bio, setBio] = useState(
        "Instructor at Codo Learn, passionate about teaching and building projects."
    );

    const [message, setMessage] = useState("");

    const selectedCourse =
        courses.find((course) => course.id === selectedCourseId) ??
        courses[0];

    const totalStudents = courses.reduce(
        (sum, course) => sum + course.students,
        0
    );

    const publishedCourses = courses.filter(
        (course) => course.status === "Published"
    ).length;

    const averageRating =
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length;

    const pageTitles: Record<Section, string> = {
        overview: "Instructor Overview",
        courses: "My Courses",
        content: "Course Content",
        students: "My Students",
        assignments: "Assignments",
        schedule: "Schedule",
        reviews: "Student Reviews",
        profile: "My Profile",
    };

    function openSection(section: Section) {
        setActiveSection(section);
        setSidebarOpen(false);
        setMessage("");
    }

    function addCourse(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!courseTitle.trim()) return;

        const newCourse: Course = {
            id: Date.now(),
            title: courseTitle.trim(),
            category: courseCategory,
            students: 0,
            lessons: 0,
            status: courseStatus,
            color: courses.length % 2 === 0 ? "#E2A3FF" : "#869CFF",
        };

        setCourses((previous) => [...previous, newCourse]);
        setSelectedCourseId(newCourse.id);
        setCourseTitle("");
        setCourseStatus("Draft");
        setShowCourseForm(false);
        setMessage("Course added to this demo dashboard.");
    }

    function addLesson(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!lessonTitle.trim()) return;

        setCourseLessons((previous) => [
            ...previous,
            {
                id: Date.now(),
                courseId: selectedCourseId,
                title: lessonTitle.trim(),
                type: "Lesson",
            },
        ]);

        setCourses((previous) =>
            previous.map((course) =>
                course.id === selectedCourseId
                    ? { ...course, lessons: course.lessons + 1 }
                    : course
            )
        );

        setLessonTitle("");
        setMessage("Lesson added to the local demo.");
    }

    function addAssignment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!assignmentTitle.trim()) return;

        const course = courses.find(
            (item) => item.id === Number(assignmentCourseId)
        );

        if (!course) return;

        setAssignments((previous) => [
            ...previous,
            {
                id: Date.now(),
                title: assignmentTitle.trim(),
                course: course.title,
                dueDate: assignmentDueDate,
                submissions: 0,
                status: "Open",
            },
        ]);

        setAssignmentTitle("");
        setShowAssignmentForm(false);
        setMessage("Assignment added to this demo dashboard.");
    }

    function saveProfile(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage("Profile saved in this demo. Backend integration is still needed.");
    }

    const currentLessons = courseLessons.filter(
        (lesson) => lesson.courseId === selectedCourseId
    );

    return (
        <div className="min-h-screen bg-[#F8F8FC] text-[#20243A]">
            {sidebarOpen && (
                <button
                    aria-label="Close sidebar"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-[#20243A]/30 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-[#ECECF5] bg-white transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex h-20 items-center justify-between border-b border-[#ECECF5] px-5">
                    <Link href="/" aria-label="Codo Learn home">
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
                        Instructor Portal
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
                            {item.label}
                        </button>
                    ))}
                </nav>


            </aside>

            {/* Main */}
            <main className="min-h-screen lg:ml-[270px]">
                <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#ECECF5] bg-white/90 px-4 backdrop-blur-md sm:px-8">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="rounded-xl border border-gray-200 px-3 py-2 lg:hidden"
                            aria-label="Open menu"
                        >
                            ☰
                        </button>
                        <div>
                            <p className="text-xs text-gray-400">Instructor Portal</p>
                            <h1 className="text-lg font-bold sm:text-xl">
                                {pageTitles[activeSection]}
                            </h1>
                        </div>
                    </div>

                    <button
                        onClick={() => openSection("profile")}
                        className="flex items-center gap-3 rounded-xl p-1.5 hover:bg-gray-50"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] font-bold text-white">
                            {instructorName.charAt(0).toUpperCase()}
                        </div>
                        <div className="hidden text-left sm:block">
                            <p className="max-w-36 truncate text-sm font-semibold">
                                {instructorName}
                            </p>
                            <p className="text-xs text-gray-400">Instructor</p>
                        </div>
                    </button>
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
                                        INSTRUCTOR WORKSPACE
                                    </p>
                                    <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                                        Welcome back, {instructorName}!
                                    </h2>
                                    <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
                                        Manage your courses, support your students, and
                                        track your teaching activity from one place.
                                    </p>

                                </div>
                                <div className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full bg-[#869CFF]/25 blur-2xl" />
                                <div className="pointer-events-none absolute -bottom-16 right-28 h-40 w-40 rounded-full bg-[#E2A3FF]/40 blur-2xl" />
                            </section>

                            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                <StatCard
                                    label="Total Courses"
                                    value={String(courses.length)}
                                    icon="▤"
                                />
                                <StatCard
                                    label="Published Courses"
                                    value={String(publishedCourses)}
                                    icon="✓"
                                />
                                <StatCard
                                    label="Total Students"
                                    value={String(totalStudents)}
                                    icon="♙"
                                />
                                <StatCard
                                    label="Average Rating"
                                    value={`${averageRating.toFixed(1)} / 5`}
                                    icon="☆"
                                />
                            </section>

                            <section>
                                <div className="mb-4 flex items-center justify-between gap-3">
                                    <div>
                                        <h3 className="text-xl font-bold">Your Courses</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            A quick overview of your courses.
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
                                    {courses.slice(0, 3).map((course) => (
                                        <CourseCard
                                            key={course.id}
                                            course={course}
                                            onManage={() => {
                                                setSelectedCourseId(course.id);
                                                openSection("content");
                                            }}
                                        />
                                    ))}
                                </div>
                            </section>

                            <section className="grid gap-5 xl:grid-cols-2">
                                <div className="rounded-2xl border border-[#ECECF5] bg-white p-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold">Upcoming Sessions</h3>
                                        <button
                                            onClick={() => openSection("schedule")}
                                            className="text-sm font-bold text-[#586FD6]"
                                        >
                                            View schedule →
                                        </button>
                                    </div>
                                    <div className="mt-5 space-y-4">
                                        {sessions.slice(0, 3).map((session) => (
                                            <div
                                                key={session.id}
                                                className="flex items-start gap-3"
                                            >
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#869CFF]/15 text-lg">
                                                    ▦
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-semibold">
                                                        {session.title}
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        {session.course}
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {session.date} · {session.time}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-[#ECECF5] bg-white p-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold">Recent Assignments</h3>
                                        <button
                                            onClick={() => openSection("assignments")}
                                            className="text-sm font-bold text-[#586FD6]"
                                        >
                                            View all →
                                        </button>
                                    </div>
                                    <div className="mt-5 space-y-4">
                                        {assignments.slice(0, 3).map((assignment) => (
                                            <div
                                                key={assignment.id}
                                                className="flex items-start gap-3 rounded-xl bg-[#F8F8FC] p-3"
                                            >
                                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E2A3FF]/30">
                                                    ✓
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-semibold">
                                                        {assignment.title}
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        {assignment.course}
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {assignment.submissions} submissions · Due{" "}
                                                        {assignment.dueDate}
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
                            description="Create and manage the courses you teach."

                        >
                            {showCourseForm}



                            {message && <Message>{message}</Message>}

                            <div className="grid gap-5 xl:grid-cols-3">
                                {courses.map((course) => (
                                    <CourseCard
                                        key={course.id}
                                        course={course}
                                        onManage={() => {
                                            setSelectedCourseId(course.id);
                                            openSection("content");
                                        }}
                                    />
                                ))}
                            </div>
                        </SectionPanel>
                    )}

                    {/* COURSE CONTENT */}
                    {activeSection === "content" && (
                        <SectionPanel
                            title="Course Content"
                            description="Choose a course and manage its lesson list."
                        >
                            <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
                                <div className="h-fit rounded-2xl border border-[#ECECF5] bg-white p-4">
                                    <h3 className="mb-3 font-bold">Select a Course</h3>
                                    {courses.map((course) => (
                                        <button
                                            key={course.id}
                                            onClick={() => {
                                                setSelectedCourseId(course.id);
                                                setMessage("");
                                            }}
                                            className={`mb-2 w-full rounded-xl p-3 text-left text-sm font-medium ${selectedCourseId === course.id
                                                ? "bg-[#869CFF]/15 text-[#586FD6]"
                                                : "hover:bg-gray-50"
                                                }`}
                                        >
                                            {course.title}
                                            <p className="mt-1 text-xs text-gray-400">
                                                {course.lessons} lessons
                                            </p>
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-5">
                                    <div className="rounded-2xl border border-[#ECECF5] bg-white p-6">
                                        <p className="text-sm text-gray-500">Selected Course</p>
                                        <h3 className="mt-2 text-2xl font-extrabold">
                                            {selectedCourse.title}
                                        </h3>
                                        <div className="mt-3 flex flex-wrap gap-3">
                                            <StatusBadge status={selectedCourse.status} />
                                            <span className="text-sm text-gray-500">
                                                {selectedCourse.lessons} lessons
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {selectedCourse.students} students
                                            </span>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-[#ECECF5] bg-white p-6">
                                        <h3 className="text-lg font-bold">Lessons</h3>

                                        <form
                                            onSubmit={addLesson}
                                            className="mt-4 flex flex-col gap-3 sm:flex-row"
                                        >
                                            <input
                                                required
                                                value={lessonTitle}
                                                onChange={(e) => setLessonTitle(e.target.value)}
                                                placeholder="Enter a new lesson title"
                                                className={`${inputClass} flex-1`}
                                            />
                                            <button className="rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white">
                                                + Add Lesson
                                            </button>
                                        </form>

                                        {message && <Message>{message}</Message>}

                                        <div className="mt-5 space-y-3">
                                            {currentLessons.length === 0 ? (
                                                <EmptyState text="No lessons yet. Add your first lesson above." />
                                            ) : (
                                                currentLessons.map((lesson, index) => (
                                                    <div
                                                        key={lesson.id}
                                                        className="flex items-center gap-3 rounded-xl border border-gray-100 p-4"
                                                    >
                                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#869CFF]/15 text-[#586FD6]">
                                                            {index + 1}
                                                        </span>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-semibold">
                                                                {lesson.title}
                                                            </p>
                                                            <p className="mt-1 text-xs text-gray-400">
                                                                {lesson.type}
                                                            </p>
                                                        </div>
                                                        <span className="text-xs text-gray-400">
                                                            Lesson
                                                        </span>
                                                    </div>
                                                ))
                                            )}
                                        </div>

                                        <p className="mt-5 text-xs leading-5 text-gray-400">
                                            This demo stores lesson titles in local page state.
                                            Video uploads, PDF uploads, and lesson editing need
                                            backend and file-storage integration.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SectionPanel>
                    )}

                    {/* STUDENTS */}
                    {activeSection === "students" && (
                        <SectionPanel
                            title="My Students"
                            description="View your students and their course progress."
                        >
                            <div className="mb-5 grid gap-4 sm:grid-cols-3">
                                <StatCard label="Sample Students" value={String(students.length)} icon="♙" />
                                <StatCard
                                    label="Average Progress"
                                    value={`${Math.round(
                                        students.reduce((sum, student) => sum + student.progress, 0) /
                                        Math.max(students.length, 1)
                                    )}%`}
                                    icon="↗"
                                />
                                <StatCard
                                    label="Active Students"
                                    value={String(
                                        students.filter((student) => student.status === "Active").length
                                    )}
                                    icon="✓"
                                />
                            </div>

                            <div className="overflow-x-auto rounded-2xl border border-[#ECECF5] bg-white">
                                <table className="w-full min-w-[750px] text-left text-sm">
                                    <thead className="bg-[#F8F8FC] text-gray-500">
                                        <tr>
                                            <th className="p-4 font-medium">Student</th>
                                            <th className="p-4 font-medium">Course</th>
                                            <th className="p-4 font-medium">Progress</th>
                                            <th className="p-4 font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student) => (
                                            <tr key={student.id} className="border-t border-gray-100">
                                                <td className="p-4">
                                                    <p className="font-semibold">{student.name}</p>
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {student.email}
                                                    </p>
                                                </td>
                                                <td className="p-4">{student.course}</td>
                                                <td className="p-4">
                                                    <div className="w-36">
                                                        <div className="mb-2 flex justify-between text-xs">
                                                            <span>{student.progress}%</span>
                                                        </div>
                                                        <ProgressBar value={student.progress} />
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <StatusBadge status={student.status} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-4 text-xs text-gray-400">
                                Student records are examples. Real student data should come
                                from courses the instructor is authorized to manage.
                            </p>
                        </SectionPanel>
                    )}

                    {/* ASSIGNMENTS */}
                    {activeSection === "assignments" && (
                        <SectionPanel
                            title="Assignments"
                            description="Create assignments and monitor submissions."
                            action={
                                <button
                                    onClick={() =>
                                        setShowAssignmentForm((previous) => !previous)
                                    }
                                    className="rounded-xl bg-[#586FD6] px-4 py-3 text-sm font-bold text-white"
                                >
                                    {showAssignmentForm ? "Cancel" : "+ New Assignment"}
                                </button>
                            }
                        >
                            {showAssignmentForm && (
                                <form
                                    onSubmit={addAssignment}
                                    className="mb-6 rounded-2xl border border-[#ECECF5] bg-white p-6"
                                >
                                    <h3 className="mb-5 text-lg font-bold">
                                        Create an Assignment
                                    </h3>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <Field label="Assignment Title">
                                            <input
                                                required
                                                value={assignmentTitle}
                                                onChange={(e) => setAssignmentTitle(e.target.value)}
                                                placeholder="Enter assignment title"
                                                className={inputClass}
                                            />
                                        </Field>
                                        <Field label="Course">
                                            <select
                                                value={assignmentCourseId}
                                                onChange={(e) => setAssignmentCourseId(e.target.value)}
                                                className={inputClass}
                                            >
                                                {courses.map((course) => (
                                                    <option key={course.id} value={course.id}>
                                                        {course.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </Field>
                                        <Field label="Due Date">
                                            <input
                                                required
                                                type="date"
                                                value={assignmentDueDate}
                                                onChange={(e) => setAssignmentDueDate(e.target.value)}
                                                className={inputClass}
                                            />
                                        </Field>
                                    </div>
                                    <button className="mt-5 rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white">
                                        Save Assignment
                                    </button>
                                </form>
                            )}

                            {message && <Message>{message}</Message>}

                            <div className="space-y-4">
                                {assignments.map((assignment) => (
                                    <div
                                        key={assignment.id}
                                        className="flex flex-col justify-between gap-4 rounded-2xl border border-[#ECECF5] bg-white p-5 sm:flex-row sm:items-center"
                                    >
                                        <div>
                                            <h3 className="font-bold">{assignment.title}</h3>
                                            <p className="mt-2 text-sm text-gray-500">
                                                {assignment.course}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                Due: {assignment.dueDate}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-xl font-extrabold">
                                                    {assignment.submissions}
                                                </p>
                                                <p className="text-xs text-gray-400">Submissions</p>
                                            </div>
                                            <StatusBadge status={assignment.status} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="mt-4 text-xs text-gray-400">
                                Assignment creation is local demo functionality. Submission
                                uploads, grading, feedback, and deadlines need backend support.
                            </p>
                        </SectionPanel>
                    )}

                    {/* SCHEDULE */}
                    {activeSection === "schedule" && (
                        <SectionPanel
                            title="Teaching Schedule"
                            description="Review your upcoming live sessions and workshops."
                        >
                            <div className="mb-5 rounded-2xl bg-gradient-to-r from-[#869CFF]/20 to-[#E2A3FF]/20 p-6">
                                <p className="text-sm text-gray-500">Scheduled activities</p>
                                <p className="mt-2 text-3xl font-extrabold">
                                    {sessions.length}
                                </p>
                            </div>

                            <div className="space-y-4">
                                {sessions.map((session) => (
                                    <div
                                        key={session.id}
                                        className="flex flex-col gap-4 rounded-2xl border border-[#ECECF5] bg-white p-5 sm:flex-row sm:items-center"
                                    >
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#869CFF]/15 text-xl text-[#586FD6]">
                                            ▦
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-xs font-semibold text-[#586FD6]">
                                                {session.type}
                                            </span>
                                            <h3 className="mt-1 font-bold">{session.title}</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {session.course}
                                            </p>
                                        </div>
                                        <div className="sm:text-right">
                                            <p className="text-sm font-semibold">{session.date}</p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                {session.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-xs text-gray-400">
                                Session dates are examples. Calendar integration and creating
                                or editing sessions have not been connected.
                            </p>
                        </SectionPanel>
                    )}

                    {/* REVIEWS */}
                    {activeSection === "reviews" && (
                        <SectionPanel
                            title="Student Reviews"
                            description="See what students think about your courses."
                        >
                            <div className="mb-5 grid gap-4 sm:grid-cols-2">
                                <StatCard
                                    label="Average Rating"
                                    value={`${averageRating.toFixed(1)} / 5`}
                                    icon="☆"
                                />
                                <StatCard
                                    label="Total Reviews"
                                    value={String(reviews.length)}
                                    icon="☷"
                                />
                            </div>

                            <div className="grid gap-4 xl:grid-cols-2">
                                {reviews.map((review, index) => (
                                    <div
                                        key={`${review.name}-${index}`}
                                        className="rounded-2xl border border-[#ECECF5] bg-white p-6"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#869CFF]/40 to-[#E2A3FF]/50 font-bold">
                                                    {review.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold">{review.name}</p>
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {review.course}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-sm font-bold text-[#B78636]">
                                                {"★".repeat(review.rating)}
                                                <span className="text-gray-200">
                                                    {"★".repeat(5 - review.rating)}
                                                </span>
                                            </span>
                                        </div>
                                        <p className="mt-5 text-sm leading-6 text-gray-600">
                                            “{review.message}”
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-xs text-gray-400">
                                These are example reviews, not real student feedback.
                            </p>
                        </SectionPanel>
                    )}

                    {/* PROFILE */}
                    {activeSection === "profile" && (
                        <SectionPanel
                            title="My Profile"
                            description="Manage your instructor information."
                        >
                            <form
                                onSubmit={saveProfile}
                                className="max-w-3xl rounded-2xl border border-[#ECECF5] bg-white p-6 sm:p-8"
                            >
                                <div className="mb-7 flex items-center gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] text-2xl font-bold text-white">
                                        {instructorName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">Instructor Details</h3>
                                        <p className="text-sm text-gray-500">
                                            Keep your professional profile up to date.
                                        </p>
                                    </div>
                                </div>

                                <Field label="Full Name">
                                    <input
                                        required
                                        value={instructorName}
                                        onChange={(e) => setInstructorName(e.target.value)}
                                        className={inputClass}
                                        placeholder="Your full name"
                                    />
                                </Field>

                                <Field label="Email Address">
                                    <input
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={inputClass}
                                        placeholder="Your email address"
                                    />
                                </Field>

                                <Field label="Professional Bio">
                                    <textarea
                                        rows={4}
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        className={inputClass}
                                        placeholder="Tell students about your experience"
                                    />
                                </Field>

                                {message && <Message>{message}</Message>}

                                <button
                                    type="submit"
                                    className="mt-5 rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white hover:bg-[#455BC1]"
                                >
                                    Save Profile
                                </button>
                            </form>
                        </SectionPanel>
                    )}

                    <footer className="mt-10 border-t border-[#ECECF5] py-6 text-center text-xs text-gray-400">
                        © {new Date().getFullYear()} Codo Learn. Empowering instructors.
                    </footer>
                </div>
            </main>
        </div>
    );
}

const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#869CFF] focus:ring-2 focus:ring-[#869CFF]/10";

function SectionPanel({
    title,
    description,
    action,
    children,
}: {
    title: string;
    description: string;
    action?: ReactNode;
    children: ReactNode;
}) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold">{title}</h2>
                    <p className="mt-2 text-sm text-gray-500">{description}</p>
                </div>
                {action}
            </div>
            {children}
        </motion.section>
    );
}

function StatCard({
    label,
    value,
    icon,
}: {
    label: string;
    value: string;
    icon: string;
}) {
    return (
        <div className="rounded-2xl border border-[#ECECF5] bg-white p-5">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{label}</p>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#869CFF]/25 to-[#E2A3FF]/35 text-lg">
                    {icon}
                </span>
            </div>
            <p className="mt-4 text-3xl font-extrabold">{value}</p>
        </div>
    );
}

function CourseCard({
    course,
    onManage,
}: {
    course: Course;
    onManage: () => void;
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
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-lg bg-[#869CFF]/10 px-3 py-1.5 text-xs font-semibold text-[#586FD6]">
                        {course.category}
                    </span>
                    <StatusBadge status={course.status} />
                </div>

                <h3 className="mt-5 text-lg font-bold">{course.title}</h3>

                <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F8F8FC] p-3">
                        <p className="text-xs text-gray-500">Students</p>
                        <p className="mt-1 text-xl font-extrabold">{course.students}</p>
                    </div>
                    <div className="rounded-xl bg-[#F8F8FC] p-3">
                        <p className="text-xs text-gray-500">Lessons</p>
                        <p className="mt-1 text-xl font-extrabold">{course.lessons}</p>
                    </div>
                </div>

                <button
                    onClick={onManage}
                    className="mt-5 w-full rounded-xl bg-[#869CFF]/15 px-4 py-3 text-sm font-bold text-[#586FD6] transition hover:bg-[#869CFF]/25"
                >
                    Manage Content →
                </button>
            </div>
        </div>
    );
}

function ProgressBar({ value }: { value: number }) {
    return (
        <div
            className="h-2.5 overflow-hidden rounded-full bg-gray-100"
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

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        Published: "bg-emerald-50 text-emerald-700",
        Active: "bg-emerald-50 text-emerald-700",
        Open: "bg-emerald-50 text-emerald-700",
        Draft: "bg-amber-50 text-amber-700",
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

function Field({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    return (
        <label className="mb-4 block">
            <span className="mb-2 block text-sm font-semibold">{label}</span>
            {children}
        </label>
    );
}

function Message({ children }: { children: ReactNode }) {
    return (
        <p className="mt-4 rounded-xl bg-[#869CFF]/10 p-3 text-sm text-[#455BC1]">
            {children}
        </p>
    );
}

function EmptyState({ text }: { text: string }) {
    return (
        <div className="rounded-xl bg-[#F8F8FC] p-6 text-center text-sm text-gray-500">
            {text}
        </div>
    );
}

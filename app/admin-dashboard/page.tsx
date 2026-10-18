
"use client";

import { useMemo, useState } from "react";

type Section =
    | "overview"
    | "students"
    | "instructors"
    | "employees"
    | "users"
    | "invitations"
    | "courses"
    | "services"
    | "projects"
    | "enrollments"
    | "payments"
    | "notifications"
    | "profile"
    | "settings";

type RecordItem = {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    status?: string;
    role?: string;
    category?: string;
    amount?: string;
    date?: string;
    description?: string;
    instructor?: string;
    image?: string;
};

const initialData: Record<string, RecordItem[]> = {
    students: [
        { id: 1, name: "Ahmed Mohamed", email: "ahmed@example.com", status: "Active" },
        { id: 2, name: "Sara Ali", email: "sara@example.com", status: "Active" },
        { id: 3, name: "Omar Hassan", email: "omar@example.com", status: "Inactive" },
    ],
    instructors: [
        { id: 1, name: "Mohamed Khaled", email: "mohamed@example.com", status: "Active", category: "Frontend" },
        { id: 2, name: "Mariam Adel", email: "mariam@example.com", status: "Active", category: "UI/UX Design" },
    ],
    employees: [
        { id: 1, name: "Nour Ahmed", email: "nour@example.com", status: "Active", category: "HR" },
        { id: 2, name: "Youssef Samir", email: "youssef@example.com", status: "Active", category: "Marketing" },
    ],
    users: [
        { id: 1, name: "Ahmed Mohamed", email: "ahmed@example.com", role: "Student", status: "Active" },
        { id: 2, name: "Mohamed Khaled", email: "mohamed@example.com", role: "Instructor", status: "Active" },
        { id: 3, name: "Admin Account", email: "admin@codolearn.com", role: "Admin", status: "Active" },
    ],
    invitations: [
        { id: 1, name: "newadmin@example.com", category: "Administrator", status: "Pending", date: "2026-10-15" },
    ],
    courses: [
        { id: 1, name: "Complete React.js Course", category: "Frontend", status: "Published", description: "Build modern React applications." },
        { id: 2, name: "UI/UX Design Fundamentals", category: "Design", status: "Draft", description: "Learn modern interface design." },
        { id: 3, name: "Node.js Backend Development", category: "Backend", status: "Published", description: "Build APIs with Node.js." },
    ],
    services: [
        { id: 1, name: "Web Development", category: "Digital Service", status: "Active" },
        { id: 2, name: "UI/UX Design", category: "Digital Service", status: "Active" },
        { id: 3, name: "Technical Consulting", category: "Digital Service", status: "Inactive" },
    ],
    projects: [
        { id: 1, name: "E-commerce Website", category: "Portfolio", status: "Published" },
        { id: 2, name: "Mobile Learning App", category: "Portfolio", status: "In Review" },
        { id: 3, name: "Company Website Request", category: "Project Request", status: "Pending" },
    ],
    enrollments: [
        { id: 1, name: "Ahmed Mohamed", email: "ahmed@example.com", category: "Complete React.js Course", status: "Approved", date: "2026-10-12" },
        { id: 2, name: "Sara Ali", email: "sara@example.com", category: "UI/UX Design Fundamentals", status: "Pending", date: "2026-10-15" },
        { id: 3, name: "Omar Hassan", email: "omar@example.com", category: "Node.js Backend Development", status: "Approved", date: "2026-10-16" },
    ],
    payments: [
        { id: 1, name: "Ahmed Mohamed", category: "React.js Course", amount: "$120", status: "Paid", date: "2026-10-10" },
        { id: 2, name: "Sara Ali", category: "UI/UX Course", amount: "$90", status: "Pending", date: "2026-10-15" },
        { id: 3, name: "Omar Hassan", category: "Backend Course", amount: "$150", status: "Failed", date: "2026-10-16" },
    ],
    notifications: [
        { id: 1, name: "Welcome to Codo Learn", category: "Announcement", status: "Published", description: "Welcome message for new students." },
        { id: 2, name: "New Courses Available", category: "Announcement", status: "Draft", description: "Explore our latest courses." },
    ],
};

const navigation: { label: string; items: { id: Section; label: string; icon: string }[] }[] = [
    {
        label: "MAIN",
        items: [
            { id: "overview", label: "Overview", icon: "▦" },
        ],
    },
    {
        label: "PEOPLE",
        items: [
            { id: "students", label: "Students", icon: "♙" },
            { id: "instructors", label: "Instructors", icon: "♧" },
            { id: "employees", label: "Employees", icon: "♙" },
            { id: "users", label: "Users & Roles", icon: "♧" },
            { id: "invitations", label: "Admin Invitations", icon: "✉" },
        ],
    },
    {
        label: "ACADEMY",
        items: [
            { id: "courses", label: "Courses", icon: "▤" },
            { id: "services", label: "Services", icon: "◇" },
            { id: "projects", label: "Projects", icon: "▧" },
            { id: "enrollments", label: "Enrollments", icon: "☷" },
            { id: "payments", label: "Payments", icon: "$" },
            { id: "notifications", label: "Notifications", icon: "♧" },
        ],
    },
    {
        label: "ACCOUNT",
        items: [
            { id: "profile", label: "My Profile", icon: "♙" },
            { id: "settings", label: "Settings", icon: "⚙" },
        ],
    },
];

const sectionTitles: Record<Section, string> = {
    overview: "Admin Overview",
    students: "Students Management",
    instructors: "Instructors Management",
    employees: "Employees Management",
    users: "Users & Roles",
    invitations: "Admin Invitations",
    courses: "Courses Management",
    services: "Services Management",
    projects: "Projects Management",
    enrollments: "Enrollments Management",
    payments: "Payments Management",
    notifications: "Notifications Management",
    profile: "My Profile",
    settings: "Settings",
};

const sectionDescriptions: Record<Section, string> = {
    overview: "Monitor your academy performance and activity.",
    students: "View, search and manage student records.",
    instructors: "Manage your academy instructors.",
    employees: "View and manage employee records.",
    users: "Review accounts and their assigned roles.",
    invitations: "Invite new administrators to your team.",
    courses: "Create and manage your academy courses.",
    services: "Manage the digital services offered by your academy.",
    projects: "Manage portfolio projects and project requests.",
    enrollments: "Review and manage student enrollments.",
    payments: "Track payment records and payment statuses.",
    notifications: "Create and manage system announcements.",
    profile: "Manage your personal administrator information.",
    settings: "Manage your dashboard preferences.",
};

function StatusBadge({ status }: { status?: string }) {
    const value = status || "Unknown";

    const style =
        ["Active", "Published", "Approved", "Paid"].includes(value)
            ? "bg-emerald-50 text-emerald-700"
            : ["Pending", "Draft", "In Review"].includes(value)
                ? "bg-amber-50 text-amber-700"
                : ["Inactive", "Failed", "Rejected", "Unpublished"].includes(value)
                    ? "bg-red-50 text-red-600"
                    : "bg-gray-100 text-gray-600";

    return (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
            {value}
        </span>
    );
}

function Panel({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`rounded-2xl border border-[#ECECF5] bg-white p-5 sm:p-6 ${className}`}>
            {children}
        </div>
    );
}

export default function AdminDashboard() {
    const [instructorName, setInstructorName] = useState("");
    const [instructorEmail, setInstructorEmail] = useState("");
    const [instructorPhone, setInstructorPhone] = useState("");
    const [instructorSpecialty, setInstructorSpecialty] =
        useState("Frontend");
    const [instructorImage, setInstructorImage] = useState("");
    const [instructorStatus, setInstructorStatus] = useState("Active");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseInstructor, setCourseInstructor] = useState("");
    const [coursePrice, setCoursePrice] = useState("");
    const [courseImage, setCourseImage] = useState("");
    const [activeSection, setActiveSection] = useState<Section>("overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [data, setData] = useState(initialData);
    const [notice, setNotice] = useState("");
    const [studentName, setStudentName] = useState("Admin User");
    const [email, setEmail] = useState("admin@codolearn.com");
    const [phone, setPhone] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [courseName, setCourseName] = useState("");
    const [courseCategory, setCourseCategory] = useState("Frontend");
    const [announcement, setAnnouncement] = useState("");
    const [invitationEmail, setInvitationEmail] = useState("");
    const [newRole, setNewRole] = useState("Student");
    const [settings, setSettings] = useState({
        emailNotifications: true,
        enrollmentAlerts: true,
        paymentAlerts: true,
    });
    const handleAddInstructor = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const normalizedEmail = instructorEmail.trim().toLowerCase();

        if (!instructorName.trim() || !normalizedEmail) {
            return;
        }

        const emailExists = (data.instructors ?? []).some(
            (instructor) =>
                instructor.email?.trim().toLowerCase() === normalizedEmail
        );

        if (emailExists) {
            setNotice("This email already exists.");
            return;
        }

        addRecord("instructors", {
            name: instructorName.trim(),
            email: normalizedEmail,
            phone: instructorPhone.trim(),
            category: instructorSpecialty,
            status: instructorStatus,
            role: "Instructor",
            image: instructorImage,
        });

        setInstructorName("");
        setInstructorEmail("");
        setInstructorPhone("");
        setInstructorSpecialty("Frontend");
        setInstructorImage("");
        setInstructorStatus("Active");

        setNotice("Instructor added successfully!");
    };
    const currentRows = data[activeSection] || [];

    const filteredRows = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return currentRows;

        return currentRows.filter((item) =>
            Object.values(item).some((value) =>
                String(value ?? "").toLowerCase().includes(query)
            )
        );
    }, [currentRows, search]);

    const updateRecord = (
        section: string,
        id: number,
        updates: Partial<RecordItem>
    ) => {
        setData((previous) => ({
            ...previous,
            [section]: previous[section].map((item) =>
                item.id === id ? { ...item, ...updates } : item
            ),
        }));
    };

    const deleteRecord = (section: string, id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this record?");
        if (!confirmed) return;

        setData((previous) => ({
            ...previous,
            [section]: previous[section].filter((item) => item.id !== id),
        }));

        setNotice("Record deleted from this demo.");
    };

    const addRecord = (section: string, record: Omit<RecordItem, "id">) => {
        setData((previous) => ({
            ...previous,
            [section]: [
                ...previous[section],
                {
                    ...record,
                    id: Math.max(0, ...previous[section].map((item) => item.id)) + 1,
                },
            ],
        }));
    };

    const totalRecords = (key: string) => data[key]?.length || 0;

    const pageTitle = sectionTitles[activeSection];
    const isPeopleSection = [
        "students",
        "instructors",
        "employees",
        "users",
        "invitations",
        "courses",
        "services",
        "projects",
        "enrollments",
        "payments",
        "notifications",
    ].includes(activeSection);

    const searchPlaceholder =
        activeSection === "payments"
            ? "Search payments..."
            : `Search ${pageTitle.toLowerCase()}...`;

    const selectSection = (section: Section) => {
        setActiveSection(section);
        setSearch("");
        setNotice("");
        setSidebarOpen(false);
    };


    const handleAddCourse = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!courseName.trim() || !courseDescription.trim()) return;

        addRecord("courses", {
            name: courseName.trim(),
            category: courseCategory,
            status: "Draft",
            description: courseDescription.trim(),
            instructor: courseInstructor.trim() || "Not assigned",
            amount: coursePrice ? `$${coursePrice}` : "Free",
            image: courseImage,
        });

        setCourseName("");
        setCourseCategory("Frontend");
        setCourseDescription("");
        setCourseInstructor("");
        setCoursePrice("");
        setCourseImage("");
        setNotice("Course created successfully as a draft.");
    };


    const handleInviteAdmin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!invitationEmail.trim()) return;

        addRecord("invitations", {
            name: invitationEmail.trim(),
            category: "Administrator",
            status: "Pending",
            date: new Date().toISOString().slice(0, 10),
        });

        setInvitationEmail("");
        setNotice("Demo invitation added to the list.");
    };

    const handleAnnouncement = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!announcement.trim()) return;

        addRecord("notifications", {
            name: announcement.trim(),
            category: "Announcement",
            status: "Published",
            description: "Created from Admin Dashboard.",
        });

        setAnnouncement("");
        setNotice("Announcement added to the demo list.");
    };

    const handleProfileSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setNotice("Profile changes saved in this demo.");
    };

    const handleRoleChange = (id: number, role: string) => {
        updateRecord("users", id, { role });
        setNotice("User role updated in this demo.");
    };

    return (
        <div className="min-h-screen bg-[#F8F8FC] text-[#25243A]">
            {sidebarOpen && (
                <button
                    aria-label="Close sidebar"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden"
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-[#ECECF5] bg-white transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex h-[78px] items-center gap-3 border-b border-[#ECECF5] px-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] text-xl font-black text-white">
                        C
                    </div>
                    <div>
                        <h1 className="text-xl font-extrabold tracking-tight">
                            <span className="text-[#869CFF]">Codo</span>{" "}
                            <span className="text-[#C184E5]">Learn</span>
                        </h1>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                            Admin Console
                        </p>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="ml-auto text-xl text-gray-400 lg:hidden"
                        aria-label="Close navigation"
                    >
                        ×
                    </button>
                </div>

                <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
                    {navigation.map((group) => (
                        <div key={group.label}>
                            <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.2em] text-gray-400">
                                {group.label}
                            </p>

                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const active = activeSection === item.id;

                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => selectSection(item.id)}
                                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${active
                                                ? "bg-gradient-to-r from-[#869CFF]/20 to-[#E2A3FF]/20 text-[#586FD6]"
                                                : "text-gray-500 hover:bg-[#F8F8FC] hover:text-[#586FD6]"
                                                }`}
                                        >
                                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                                                {item.icon}
                                            </span>
                                            <span className="flex-1">{item.label}</span>
                                            {active && (
                                                <span className="h-2 w-2 rounded-full bg-[#869CFF]" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="border-t border-[#ECECF5] p-4">
                    <div className="flex items-center gap-3 rounded-2xl bg-[#F8F8FC] p-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] font-bold text-white">
                            {profilePhoto ? (
                                <img
                                    src={profilePhoto}
                                    alt="Admin"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                studentName.charAt(0).toUpperCase()
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold">{studentName}</p>
                            <p className="text-xs text-gray-500">Administrator</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN */}
            <main className="min-h-screen lg:pl-[270px]">
                <header className="sticky top-0 z-30 flex h-[78px] items-center justify-between border-b border-[#ECECF5] bg-white/90 px-4 backdrop-blur-xl sm:px-8">
                    <div className="flex min-w-0 items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="rounded-xl border border-gray-200 px-3 py-2 text-lg lg:hidden"
                            aria-label="Open navigation"
                        >
                            ☰
                        </button>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-bold sm:text-base">
                                {pageTitle}
                            </p>
                            <p className="hidden text-xs text-gray-400 sm:block">
                                Codo Learn / {pageTitle}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-5">
                        <button
                            onClick={() => selectSection("notifications")}
                            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 text-lg transition hover:bg-[#F8F8FC]"
                            aria-label="Notifications"
                        >
                            ♧
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#E2A3FF]" />
                        </button>

                        <button
                            onClick={() => selectSection("profile")}
                            className="flex items-center gap-2"
                        >
                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] font-bold text-white">
                                {profilePhoto ? (
                                    <img
                                        src={profilePhoto}
                                        alt="Admin"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    studentName.charAt(0).toUpperCase()
                                )}
                            </div>
                            <div className="hidden text-left sm:block">
                                <p className="text-sm font-bold">{studentName}</p>
                                <p className="text-xs text-gray-400">Admin</p>
                            </div>
                        </button>
                    </div>
                </header>

                <div className="mx-auto max-w-[1600px] p-4 sm:p-8">
                    <div className="mb-7">
                        <p className="mb-2 text-sm font-semibold text-[#7D82C8]">
                            Welcome back, {studentName} 👋
                        </p>
                        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                            {pageTitle}
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            {sectionDescriptions[activeSection]}
                        </p>
                    </div>

                    {notice && (
                        <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-[#869CFF]/20 bg-[#869CFF]/10 p-4 text-sm text-[#455BC1]">
                            <span>{notice}</span>
                            <button
                                onClick={() => setNotice("")}
                                className="font-bold"
                                aria-label="Dismiss message"
                            >
                                ×
                            </button>
                        </div>
                    )}

                    {/* OVERVIEW */}
                    {activeSection === "overview" && (
                        <div className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {[
                                    { label: "Total Students", value: totalRecords("students"), icon: "♙", color: "#869CFF", note: "Registered students" },
                                    { label: "Instructors", value: totalRecords("instructors"), icon: "♧", color: "#C184E5", note: "Teaching team" },
                                    { label: "Employees", value: totalRecords("employees"), icon: "♙", color: "#68B8A8", note: "Academy employees" },
                                    { label: "Courses", value: totalRecords("courses"), icon: "▤", color: "#E2A3FF", note: "All course records" },
                                    { label: "Payments", value: totalRecords("payments"), icon: "$", color: "#E7B85C", note: "Payment records" },
                                    { label: "Projects", value: totalRecords("projects"), icon: "▧", color: "#7D9DBD", note: "Projects and requests" },
                                ].map((stat) => (
                                    <button
                                        key={stat.label}
                                        onClick={() => {
                                            const destination: Record<string, Section> = {
                                                "Total Students": "students",
                                                Instructors: "instructors",
                                                Employees: "employees",
                                                Courses: "courses",
                                                Payments: "payments",
                                                Projects: "projects",
                                            };
                                            selectSection(destination[stat.label]);
                                        }}
                                        className="rounded-2xl border border-[#ECECF5] bg-white p-5 text-left transition hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                                <p className="mt-3 text-3xl font-extrabold">{stat.value}</p>
                                            </div>
                                            <span
                                                className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-bold"
                                                style={{ backgroundColor: `${stat.color}25`, color: stat.color }}
                                            >
                                                {stat.icon}
                                            </span>
                                        </div>
                                        <p className="mt-4 text-xs text-gray-400">{stat.note}</p>
                                    </button>
                                ))}
                            </div>

                            <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
                                <Panel>
                                    <div className="mb-5 flex items-center justify-between gap-3">
                                        <div>
                                            <h3 className="font-bold">Recent Enrollments</h3>
                                            <p className="mt-1 text-sm text-gray-400">Latest student registrations</p>
                                        </div>
                                        <button
                                            onClick={() => selectSection("enrollments")}
                                            className="text-sm font-bold text-[#586FD6] hover:underline"
                                        >
                                            View all
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {data.enrollments.slice(0, 4).map((item) => (
                                            <div key={item.id} className="flex items-center gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#869CFF]/15 font-bold text-[#586FD6]">
                                                    {item.name.charAt(0)}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-bold">{item.name}</p>
                                                    <p className="truncate text-xs text-gray-400">{item.category}</p>
                                                </div>
                                                <StatusBadge status={item.status} />
                                            </div>
                                        ))}
                                    </div>
                                </Panel>

                                <Panel>
                                    <h3 className="font-bold">Academy Snapshot</h3>
                                    <p className="mb-5 mt-1 text-sm text-gray-400">Current demo records</p>

                                    <div className="space-y-5">
                                        {[
                                            { label: "Published Courses", count: data.courses.filter((item) => item.status === "Published").length, total: Math.max(data.courses.length, 1), color: "#869CFF" },
                                            { label: "Paid Transactions", count: data.payments.filter((item) => item.status === "Paid").length, total: Math.max(data.payments.length, 1), color: "#68B8A8" },
                                            { label: "Pending Enrollments", count: data.enrollments.filter((item) => item.status === "Pending").length, total: Math.max(data.enrollments.length, 1), color: "#E2A3FF" },
                                        ].map((item) => (
                                            <div key={item.label}>
                                                <div className="mb-2 flex justify-between gap-3 text-sm">
                                                    <span className="text-gray-500">{item.label}</span>
                                                    <span className="font-bold">{item.count}</span>
                                                </div>
                                                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                                    <div
                                                        className="h-full rounded-full"
                                                        style={{
                                                            width: `${(item.count / item.total) * 100}%`,
                                                            backgroundColor: item.color,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Panel>
                            </div>
                        </div>
                    )}

                    {/* GENERIC MANAGEMENT TABLES */}
                    {isPeopleSection && (
                        <div className="space-y-6">
                            {activeSection === "instructors" && (
                                <div className="mb-8 rounded-3xl border border-[#869CFF]/20 bg-white p-6 shadow-sm sm:p-8">
                                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-semibold text-[#869CFF]">
                                                TEAM MANAGEMENT
                                            </p>
                                            <h2 className="mt-1 text-2xl font-bold text-gray-900">
                                                Add New Instructor
                                            </h2>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Add an instructor to your Codo Learn team.
                                            </p>
                                        </div>

                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E2A3FF]/20 text-2xl text-[#869CFF]">
                                            +
                                        </div>
                                    </div>

                                    <form onSubmit={handleAddInstructor} className="space-y-5">
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Full Name *
                                                </label>
                                                <input
                                                    required
                                                    value={instructorName}
                                                    onChange={(e) => setInstructorName(e.target.value)}
                                                    placeholder="Enter instructor name"
                                                    className="w-full rounded-xl border border-gray-200 bg-[#F8F8FC] px-4 py-3 outline-none transition focus:border-[#869CFF]"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Email Address *
                                                </label>
                                                <input
                                                    required
                                                    type="email"
                                                    value={instructorEmail}
                                                    onChange={(e) => setInstructorEmail(e.target.value)}
                                                    placeholder="instructor@example.com"
                                                    className="w-full rounded-xl border border-gray-200 bg-[#F8F8FC] px-4 py-3 outline-none transition focus:border-[#869CFF]"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={instructorPhone}
                                                    onChange={(e) => setInstructorPhone(e.target.value)}
                                                    placeholder="Enter phone number"
                                                    className="w-full rounded-xl border border-gray-200 bg-[#F8F8FC] px-4 py-3 outline-none transition focus:border-[#869CFF]"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Specialization *
                                                </label>
                                                <select
                                                    required
                                                    value={instructorSpecialty}
                                                    onChange={(e) => setInstructorSpecialty(e.target.value)}
                                                    className="w-full rounded-xl border border-gray-200 bg-[#F8F8FC] px-4 py-3 outline-none focus:border-[#869CFF]"
                                                >
                                                    <option value="Frontend">Frontend Development</option>
                                                    <option value="Backend">Backend Development</option>
                                                    <option value="Full Stack">Full Stack Development</option>
                                                    <option value="UI/UX">UI/UX Design</option>
                                                    <option value="Mobile">Mobile Development</option>
                                                    <option value="AI">Artificial Intelligence</option>
                                                    <option value="Data Science">Data Science</option>
                                                    <option value="Cybersecurity">Cybersecurity</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Account Status
                                                </label>
                                                <select
                                                    value={instructorStatus}
                                                    onChange={(e) => setInstructorStatus(e.target.value)}
                                                    className="w-full rounded-xl border border-gray-200 bg-[#F8F8FC] px-4 py-3 outline-none focus:border-[#869CFF]"
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Pending">Pending</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Profile Image
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (!file) return;

                                                        if (file.size > 5 * 1024 * 1024) {
                                                            setNotice("Image must be smaller than 5 MB.");
                                                            e.target.value = "";
                                                            return;
                                                        }

                                                        const reader = new FileReader();

                                                        reader.onload = () => {
                                                            if (typeof reader.result === "string") {
                                                                setInstructorImage(reader.result);
                                                            }
                                                        };

                                                        reader.readAsDataURL(file);
                                                    }}
                                                    className="w-full rounded-xl border border-gray-200 bg-[#F8F8FC] px-3 py-2.5 text-sm"
                                                />
                                            </div>
                                        </div>

                                        {instructorImage && (
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={instructorImage}
                                                    alt="Instructor preview"
                                                    className="h-16 w-16 rounded-2xl border border-gray-200 object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setInstructorImage("")}
                                                    className="text-sm font-medium text-red-500 hover:text-red-600"
                                                >
                                                    Remove image
                                                </button>
                                            </div>
                                        )}

                                        <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-5">
                                            <button
                                                type="submit"
                                                className="rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-6 py-3 font-semibold text-white shadow-sm transition hover:opacity-90"
                                            >
                                                + Add Instructor
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setInstructorName("");
                                                    setInstructorEmail("");
                                                    setInstructorPhone("");
                                                    setInstructorSpecialty("Frontend");
                                                    setInstructorImage("");
                                                    setInstructorStatus("Active");
                                                }}
                                                className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-600 transition hover:bg-gray-50"
                                            >
                                                Clear Form
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {activeSection === "courses" && (
                                <Panel>
                                    <h3 className="mb-4 font-bold">Create a Course</h3>
                                    <form onSubmit={handleAddCourse} className="grid gap-3 md:grid-cols-[1fr_200px_auto]">
                                        <input
                                            value={courseName}
                                            onChange={(e) => setCourseName(e.target.value)}
                                            required
                                            placeholder="Course name"
                                            className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]"
                                        />
                                        <select
                                            value={courseCategory}
                                            onChange={(e) => setCourseCategory(e.target.value)}
                                            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#869CFF]"
                                        >
                                            <option>Frontend</option>
                                            <option>Backend</option>
                                            <option>Mobile Development</option>
                                            <option>Design</option>
                                            <option>Data Science</option>
                                            <option>Other</option>
                                        </select>
                                        <button className="rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#455BC1]">
                                            + Add Course
                                        </button>
                                    </form>
                                </Panel>
                            )}

                            {activeSection === "invitations" && (
                                <Panel>
                                    <h3 className="mb-4 font-bold">Invite an Administrator</h3>
                                    <form onSubmit={handleInviteAdmin} className="flex flex-col gap-3 sm:flex-row">
                                        <input
                                            type="email"
                                            required
                                            value={invitationEmail}
                                            onChange={(e) => setInvitationEmail(e.target.value)}
                                            placeholder="Enter administrator email"
                                            className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]"
                                        />
                                        <button className="rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white hover:bg-[#455BC1]">
                                            + Create Invitation
                                        </button>
                                    </form>
                                    <p className="mt-3 text-xs text-gray-400">
                                        Demo only: this adds a pending invitation record. No email is sent.
                                    </p>
                                </Panel>
                            )}

                            {activeSection === "notifications" && (
                                <Panel>
                                    <h3 className="mb-4 font-bold">Create Announcement</h3>
                                    <form onSubmit={handleAnnouncement} className="flex flex-col gap-3 sm:flex-row">
                                        <input
                                            required
                                            value={announcement}
                                            onChange={(e) => setAnnouncement(e.target.value)}
                                            placeholder="Announcement title or message"
                                            className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]"
                                        />
                                        <button className="rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white hover:bg-[#455BC1]">
                                            + Publish
                                        </button>
                                    </form>
                                </Panel>
                            )}

                            <Panel className="!p-0">
                                <div className="flex flex-col gap-4 border-b border-[#ECECF5] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                                    <div>
                                        <h3 className="font-bold">{pageTitle}</h3>
                                        <p className="mt-1 text-sm text-gray-400">
                                            {filteredRows.length} record{filteredRows.length === 1 ? "" : "s"} found
                                        </p>
                                    </div>
                                    <div className="relative w-full sm:max-w-xs">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">⌕</span>
                                        <input
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder={searchPlaceholder}
                                            className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-4 text-sm outline-none focus:border-[#869CFF]"
                                        />
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[720px] text-left text-sm">
                                        <thead className="bg-[#F8F8FC] text-xs uppercase tracking-wide text-gray-400">
                                            <tr>
                                                <th className="px-6 py-4">Name / Record</th>
                                                <th className="px-6 py-4">Details</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4">Date / Amount</th>
                                                <th className="px-6 py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {filteredRows.map((item) => (
                                                <tr key={item.id} className="transition hover:bg-[#FAFAFE]">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#869CFF]/20 to-[#E2A3FF]/30 font-bold text-[#586FD6]">
                                                                {item.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-[#25243A]">{item.name}</p>
                                                                {item.email && (
                                                                    <p className="mt-1 text-xs text-gray-400">{item.email}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="max-w-[260px] px-6 py-4 text-gray-500">
                                                        {activeSection === "users" ? (
                                                            <select
                                                                value={item.role || "Student"}
                                                                onChange={(e) => handleRoleChange(item.id, e.target.value)}
                                                                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs outline-none focus:border-[#869CFF]"
                                                            >
                                                                <option>Student</option>
                                                                <option>Instructor</option>
                                                                <option>Employee</option>
                                                                <option>Admin</option>
                                                            </select>
                                                        ) : (
                                                            <div>
                                                                <p>{item.category || item.role || "—"}</p>
                                                                {item.description && (
                                                                    <p className="mt-1 truncate text-xs text-gray-400">{item.description}</p>
                                                                )}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <StatusBadge status={item.status} />
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-500">
                                                        {item.amount || item.date || "—"}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-end gap-2">
                                                            {activeSection === "courses" && (
                                                                <button
                                                                    onClick={() => {
                                                                        const next = item.status === "Published" ? "Unpublished" : "Published";
                                                                        updateRecord("courses", item.id, { status: next });
                                                                        setNotice(`Course status changed to ${next}.`);
                                                                    }}
                                                                    className="rounded-lg border border-[#869CFF]/30 px-3 py-2 text-xs font-semibold text-[#586FD6] hover:bg-[#869CFF]/10"
                                                                >
                                                                    {item.status === "Published" ? "Unpublish" : "Publish"}
                                                                </button>
                                                            )}

                                                            {activeSection === "enrollments" && item.status === "Pending" && (
                                                                <button
                                                                    onClick={() => {
                                                                        updateRecord("enrollments", item.id, { status: "Approved" });
                                                                        setNotice("Enrollment approved in this demo.");
                                                                    }}
                                                                    className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                                                                >
                                                                    Approve
                                                                </button>
                                                            )}

                                                            {(activeSection === "services" || activeSection === "projects") && (
                                                                <button
                                                                    onClick={() => {
                                                                        const next = item.status === "Active" || item.status === "Published"
                                                                            ? "Inactive"
                                                                            : "Published";
                                                                        updateRecord(activeSection, item.id, { status: next });
                                                                        setNotice("Record status updated in this demo.");
                                                                    }}
                                                                    className="rounded-lg border border-[#869CFF]/30 px-3 py-2 text-xs font-semibold text-[#586FD6] hover:bg-[#869CFF]/10"
                                                                >
                                                                    Change Status
                                                                </button>
                                                            )}

                                                            <button
                                                                onClick={() => deleteRecord(activeSection, item.id)}
                                                                className="rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                            {filteredRows.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-12 text-center">
                                                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#869CFF]/10 text-xl text-[#586FD6]">
                                                            ⌕
                                                        </div>
                                                        <p className="font-semibold">No records found</p>
                                                        <p className="mt-1 text-sm text-gray-400">
                                                            Try another search term.
                                                        </p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </Panel>
                        </div>
                    )}

                    {/* ADMIN PROFILE */}
                    {activeSection === "profile" && (
                        <div className="grid items-start gap-6 xl:grid-cols-2">
                            <Panel>
                                <form onSubmit={handleProfileSave}>
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="relative h-20 w-20 shrink-0">
                                            {profilePhoto ? (
                                                <img
                                                    src={profilePhoto}
                                                    alt="Admin profile"
                                                    className="h-20 w-20 rounded-2xl object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] text-3xl font-bold text-white">
                                                    {studentName.charAt(0).toUpperCase()}
                                                </div>
                                            )}

                                            <label
                                                htmlFor="admin-photo"
                                                className="absolute -bottom-2 -right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#586FD6] text-white shadow-md"
                                                title="Upload photo"
                                            >
                                                +
                                            </label>

                                            <input
                                                id="admin-photo"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;

                                                    if (!file.type.startsWith("image/")) {
                                                        alert("Please select an image.");
                                                        e.target.value = "";
                                                        return;
                                                    }

                                                    if (file.size > 5 * 1024 * 1024) {
                                                        alert("Image must be 5 MB or less.");
                                                        e.target.value = "";
                                                        return;
                                                    }

                                                    const reader = new FileReader();
                                                    reader.onload = () => {
                                                        if (typeof reader.result === "string") {
                                                            setProfilePhoto(reader.result);
                                                        }
                                                    };
                                                    reader.readAsDataURL(file);
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="font-bold">Personal Information</h3>
                                            <p className="mt-1 text-sm text-gray-400">
                                                Update your admin details.
                                            </p>
                                            <label
                                                htmlFor="admin-photo"
                                                className="mt-2 inline-block cursor-pointer text-sm font-semibold text-[#586FD6] hover:underline"
                                            >
                                                Upload Photo
                                            </label>
                                            {profilePhoto && (
                                                <button
                                                    type="button"
                                                    onClick={() => setProfilePhoto("")}
                                                    className="ml-3 text-sm font-semibold text-red-500 hover:underline"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <label className="mb-2 block text-sm font-semibold">Full Name</label>
                                    <input
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                        required
                                        className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]"
                                    />

                                    <label className="mb-2 block text-sm font-semibold">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]"
                                    />

                                    <label className="mb-2 block text-sm font-semibold">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="mb-5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#869CFF]"
                                    />

                                    <button className="rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white hover:bg-[#455BC1]">
                                        Save Changes
                                    </button>
                                </form>
                            </Panel>

                            <Panel>
                                <h3 className="font-bold">Administrator Account</h3>
                                <p className="mb-5 mt-1 text-sm text-gray-400">
                                    Account information and access.
                                </p>

                                <div className="space-y-4">
                                    <div className="rounded-xl bg-[#F8F8FC] p-4">
                                        <p className="text-xs text-gray-400">Account Role</p>
                                        <p className="mt-1 font-bold">Super Admin (Demo)</p>
                                    </div>
                                    <div className="rounded-xl bg-[#F8F8FC] p-4">
                                        <p className="text-xs text-gray-400">Account Email</p>
                                        <p className="mt-1 break-all font-bold">{email}</p>
                                    </div>
                                    <div className="rounded-xl bg-[#F8F8FC] p-4">
                                        <p className="text-xs text-gray-400">Security</p>
                                        <p className="mt-1 font-bold">Authentication not connected</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-400">
                                        Connect backend authentication before using these details for real administrator access.
                                    </p>
                                </div>
                            </Panel>
                        </div>
                    )}

                    {/* SETTINGS */}
                    {activeSection === "settings" && (
                        <div className="max-w-3xl space-y-6">
                            <Panel>
                                <h3 className="font-bold">Notification Preferences</h3>
                                <p className="mb-5 mt-1 text-sm text-gray-400">
                                    Choose which demo alerts you want to enable.
                                </p>

                                <div className="space-y-5">
                                    {[
                                        { key: "emailNotifications" as const, label: "Email Notifications", description: "Receive general account updates." },
                                        { key: "enrollmentAlerts" as const, label: "Enrollment Alerts", description: "Get notified about new enrollments." },
                                        { key: "paymentAlerts" as const, label: "Payment Alerts", description: "Get notified about payment status changes." },
                                    ].map((setting) => (
                                        <label key={setting.key} className="flex cursor-pointer items-center justify-between gap-4 border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                                            <div>
                                                <p className="text-sm font-bold">{setting.label}</p>
                                                <p className="mt-1 text-xs text-gray-400">{setting.description}</p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={settings[setting.key]}
                                                onChange={(e) =>
                                                    setSettings((previous) => ({
                                                        ...previous,
                                                        [setting.key]: e.target.checked,
                                                    }))
                                                }
                                                className="h-5 w-5 accent-[#586FD6]"
                                            />
                                        </label>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setNotice("Settings saved in this demo.")}
                                    className="mt-6 rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-bold text-white hover:bg-[#455BC1]"
                                >
                                    Save Settings
                                </button>
                            </Panel>

                            <Panel>
                                <h3 className="font-bold">System Information</h3>
                                <p className="mb-4 mt-1 text-sm text-gray-400">
                                    Current dashboard configuration.
                                </p>
                                <div className="flex items-center justify-between border-b border-gray-100 py-3 text-sm">
                                    <span className="text-gray-500">Application</span>
                                    <span className="font-semibold">Codo Learn</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-gray-100 py-3 text-sm">
                                    <span className="text-gray-500">Mode</span>
                                    <span className="font-semibold">Frontend Demo</span>
                                </div>
                                <div className="flex items-center justify-between py-3 text-sm">
                                    <span className="text-gray-500">Backend Connection</span>
                                    <StatusBadge status="Inactive" />
                                </div>
                            </Panel>
                        </div>
                    )}

                    <footer className="mt-10 flex flex-col justify-between gap-2 border-t border-[#ECECF5] pt-5 text-xs text-gray-400 sm:flex-row">
                        <p>© 2026 Codo Learn. All rights reserved.</p>
                        <p>Admin Dashboard · Frontend Demo</p>
                    </footer>
                </div>
            </main>
        </div>
    );
}

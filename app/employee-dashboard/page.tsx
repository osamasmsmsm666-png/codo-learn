"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

type Section =
    | "overview"
    | "clients"
    | "projects"
    | "tasks"
    | "notifications"
    | "profile";

type Priority = "High" | "Medium" | "Low";
type TaskStatus = "To Do" | "In Progress" | "Done";
type ProjectStatus = "Planning" | "In Progress" | "On Hold" | "Completed";

type Client = {
    id: number;
    name: string;
    company: string;
    email: string;
    phone: string;
    status: "Active" | "Lead" | "Inactive";
    notes: string;
    // Permission: can this employee edit this client? (view-only otherwise)
    canEdit: boolean;
};

type Project = {
    id: number;
    title: string;
    clientId: number;
    status: ProjectStatus;
    progress: number;
    deadline: string;
};

type Task = {
    id: number;
    title: string;
    projectId: number;
    priority: Priority;
    deadline: string;
    status: TaskStatus;
};

type Notification = {
    id: number;
    type: "Task" | "Project";
    text: string;
    time: string;
    read: boolean;
};

const initialClients: Client[] = [
    {
        id: 1,
        name: "Khaled Mansour",
        company: "Nile Retail Co.",
        email: "khaled@nileretail.com",
        phone: "+20 100 123 4567",
        status: "Active",
        notes: "Prefers weekly progress emails.",
        canEdit: true,
    },
    {
        id: 2,
        name: "Dina Farouk",
        company: "BrightPath Academy",
        email: "dina@brightpath.edu",
        phone: "+20 111 987 6543",
        status: "Active",
        notes: "Needs Arabic and English support.",
        canEdit: false,
    },
    {
        id: 3,
        name: "Youssef Samy",
        company: "Delta Logistics",
        email: "youssef@deltalogistics.com",
        phone: "+20 122 555 0199",
        status: "Lead",
        notes: "Waiting for the proposal.",
        canEdit: true,
    },
];

const initialProjects: Project[] = [
    {
        id: 1,
        title: "E-commerce Website",
        clientId: 1,
        status: "In Progress",
        progress: 65,
        deadline: "2026-11-15",
    },
    {
        id: 2,
        title: "Learning Management Portal",
        clientId: 2,
        status: "In Progress",
        progress: 40,
        deadline: "2026-12-05",
    },
    {
        id: 3,
        title: "Fleet Tracking Dashboard",
        clientId: 3,
        status: "Planning",
        progress: 10,
        deadline: "2027-01-20",
    },
];

const initialTasks: Task[] = [
    {
        id: 1,
        title: "Design product listing page",
        projectId: 1,
        priority: "High",
        deadline: "2026-10-22",
        status: "In Progress",
    },
    {
        id: 2,
        title: "Integrate payment gateway",
        projectId: 1,
        priority: "High",
        deadline: "2026-10-30",
        status: "To Do",
    },
    {
        id: 3,
        title: "Build course catalog UI",
        projectId: 2,
        priority: "Medium",
        deadline: "2026-10-28",
        status: "To Do",
    },
    {
        id: 4,
        title: "Write requirements document",
        projectId: 3,
        priority: "Low",
        deadline: "2026-10-18",
        status: "Done",
    },
];

const initialNotifications: Notification[] = [
    {
        id: 1,
        type: "Task",
        text: "New task assigned: Integrate payment gateway",
        time: "2 hours ago",
        read: false,
    },
    {
        id: 2,
        type: "Project",
        text: "E-commerce Website deadline was moved to Nov 15",
        time: "Yesterday",
        read: false,
    },
    {
        id: 3,
        type: "Task",
        text: "Task 'Write requirements document' was marked as done",
        time: "2 days ago",
        read: true,
    },
];

const navItems: { id: Section; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "⌂" },
    { id: "clients", label: "Clients", icon: "♙" },
    { id: "projects", label: "Projects", icon: "▤" },
    { id: "tasks", label: "Tasks", icon: "✓" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "profile", label: "My Profile", icon: "⚙" },
];

const pageTitles: Record<Section, string> = {
    overview: "Employee Overview",
    clients: "Clients Management",
    projects: "Projects Management",
    tasks: "Tasks Management",
    notifications: "Notifications",
    profile: "My Profile",
};

const inputClass =
    "w-full rounded-xl border border-[#ECECF5] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#869CFF] focus:ring-2 focus:ring-[#869CFF]/20";

export default function EmployeeDashboard() {
    const [activeSection, setActiveSection] = useState<Section>("overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [clients, setClients] = useState(initialClients);
    const [projects, setProjects] = useState(initialProjects);
    const [tasks, setTasks] = useState(initialTasks);
    const [notifications, setNotifications] = useState(initialNotifications);

    const [editingClientId, setEditingClientId] = useState<number | null>(null);
    const [clientNotes, setClientNotes] = useState("");
    const [clientPhone, setClientPhone] = useState("");

    const [taskFilter, setTaskFilter] = useState<"All" | TaskStatus>("All");

    const [employeeName, setEmployeeName] = useState("Employee Name");
    const [email, setEmail] = useState("employee@example.com");
    const [phone, setPhone] = useState("+20 100 000 0000");
    const [jobTitle, setJobTitle] = useState("Software Developer");

    const [message, setMessage] = useState("");

    const unreadCount = notifications.filter((n) => !n.read).length;
    const openTasks = tasks.filter((t) => t.status !== "Done").length;
    const activeProjects = projects.filter(
        (p) => p.status === "In Progress"
    ).length;
    const today = new Date().toISOString().slice(0, 10);
    const overdueTasks = tasks.filter(
        (t) => t.status !== "Done" && t.deadline < today
    ).length;

    const visibleTasks =
        taskFilter === "All"
            ? tasks
            : tasks.filter((t) => t.status === taskFilter);

    const upcomingTasks = [...tasks]
        .filter((t) => t.status !== "Done")
        .sort((a, b) => a.deadline.localeCompare(b.deadline))
        .slice(0, 4);

    function clientName(id: number) {
        return clients.find((c) => c.id === id)?.name ?? "—";
    }

    function projectTitle(id: number) {
        return projects.find((p) => p.id === id)?.title ?? "—";
    }

    function openSection(section: Section) {
        setActiveSection(section);
        setSidebarOpen(false);
        setMessage("");
    }

    function startEditClient(client: Client) {
        if (!client.canEdit) return;
        setEditingClientId(client.id);
        setClientNotes(client.notes);
        setClientPhone(client.phone);
    }

    function saveClient(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setClients((previous) =>
            previous.map((client) =>
                client.id === editingClientId && client.canEdit
                    ? {
                          ...client,
                          notes: clientNotes.trim(),
                          phone: clientPhone.trim(),
                      }
                    : client
            )
        );

        setEditingClientId(null);
        setMessage("Client information updated in this demo dashboard.");
    }

    function updateProject(
        id: number,
        changes: Partial<Pick<Project, "status" | "progress">>
    ) {
        setProjects((previous) =>
            previous.map((project) =>
                project.id === id ? { ...project, ...changes } : project
            )
        );
        setMessage("Project updated in this demo dashboard.");
    }

    function updateTaskStatus(id: number, status: TaskStatus) {
        setTasks((previous) =>
            previous.map((task) =>
                task.id === id ? { ...task, status } : task
            )
        );
        setMessage("Task status updated in this demo dashboard.");
    }

    function markNotificationRead(id: number) {
        setNotifications((previous) =>
            previous.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    }

    function markAllRead() {
        setNotifications((previous) =>
            previous.map((n) => ({ ...n, read: true }))
        );
    }

    function saveProfile(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!employeeName.trim()) {
            setMessage("Please enter your name.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.trim())) {
            setMessage("Please enter a valid email address.");
            return;
        }

        setMessage("Profile saved in this demo. Backend integration is still needed.");
    }

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
                className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-[#ECECF5] bg-white transition-transform duration-300 lg:translate-x-0 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
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
                        Employee Portal
                    </p>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto px-3">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => openSection(item.id)}
                            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                                activeSection === item.id
                                    ? "bg-[#869CFF]/15 text-[#586FD6]"
                                    : "text-gray-500 hover:bg-[#F8F8FC] hover:text-[#586FD6]"
                            }`}
                        >
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-lg">
                                {item.icon}
                            </span>
                            <span className="flex-1">{item.label}</span>
                            {item.id === "notifications" && unreadCount > 0 && (
                                <span className="rounded-full bg-[#586FD6] px-2 py-0.5 text-xs font-bold text-white">
                                    {unreadCount}
                                </span>
                            )}
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
                            <p className="text-xs text-gray-400">Employee Portal</p>
                            <h1 className="text-lg font-bold sm:text-xl">
                                {pageTitles[activeSection]}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => openSection("notifications")}
                            className="relative rounded-xl border border-gray-200 px-3 py-2 text-lg hover:bg-gray-50"
                            aria-label={`Notifications, ${unreadCount} unread`}
                        >
                            🔔
                            {unreadCount > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#586FD6] px-1 text-[10px] font-bold text-white">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => openSection("profile")}
                            className="flex items-center gap-3 rounded-xl p-1.5 hover:bg-gray-50"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] font-bold text-white">
                                {employeeName.charAt(0).toUpperCase()}
                            </div>
                            <div className="hidden text-left sm:block">
                                <p className="max-w-36 truncate text-sm font-semibold">
                                    {employeeName}
                                </p>
                                <p className="text-xs text-gray-400">Employee</p>
                            </div>
                        </button>
                    </div>
                </header>

                <div className="mx-auto max-w-[1500px] p-4 sm:p-8">
                    {message && activeSection !== "profile" && (
                        <Message>{message}</Message>
                    )}

                    {/* OVERVIEW */}
                    {activeSection === "overview" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 space-y-7"
                        >
                            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#869CFF]/25 via-[#E2A3FF]/25 to-white p-6 sm:p-9">
                                <div className="relative z-10 max-w-2xl">
                                    <p className="text-sm font-semibold text-[#586FD6]">
                                        EMPLOYEE WORKSPACE
                                    </p>
                                    <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                                        Welcome back, {employeeName}!
                                    </h2>
                                    <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
                                        See your assigned work, track deadlines, and stay
                                        up to date with client and project updates.
                                    </p>
                                </div>
                                <div className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full bg-[#869CFF]/25 blur-2xl" />
                                <div className="pointer-events-none absolute -bottom-16 right-28 h-40 w-40 rounded-full bg-[#E2A3FF]/40 blur-2xl" />
                            </section>

                            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                <StatCard
                                    label="Assigned Clients"
                                    value={String(clients.length)}
                                    icon="♙"
                                />
                                <StatCard
                                    label="Active Projects"
                                    value={String(activeProjects)}
                                    icon="▤"
                                />
                                <StatCard
                                    label="Open Tasks"
                                    value={String(openTasks)}
                                    icon="✓"
                                />
                                <StatCard
                                    label="Overdue Tasks"
                                    value={String(overdueTasks)}
                                    icon="!"
                                />
                            </section>

                            <section className="grid gap-6 xl:grid-cols-2">
                                <div className="rounded-2xl border border-[#ECECF5] bg-white p-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="text-lg font-bold">Upcoming Deadlines</h3>
                                        <button
                                            onClick={() => openSection("tasks")}
                                            className="text-sm font-bold text-[#586FD6]"
                                        >
                                            View all →
                                        </button>
                                    </div>
                                    {upcomingTasks.length === 0 ? (
                                        <EmptyState text="No open tasks. Nice work!" />
                                    ) : (
                                        <ul className="space-y-3">
                                            {upcomingTasks.map((task) => (
                                                <li
                                                    key={task.id}
                                                    className="flex items-center justify-between gap-3 rounded-xl bg-[#F8F8FC] p-4"
                                                >
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-semibold">
                                                            {task.title}
                                                        </p>
                                                        <p className="mt-1 text-xs text-gray-500">
                                                            {projectTitle(task.projectId)} · Due{" "}
                                                            {task.deadline}
                                                        </p>
                                                    </div>
                                                    <Badge label={task.priority} />
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="rounded-2xl border border-[#ECECF5] bg-white p-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="text-lg font-bold">Project Progress</h3>
                                        <button
                                            onClick={() => openSection("projects")}
                                            className="text-sm font-bold text-[#586FD6]"
                                        >
                                            View all →
                                        </button>
                                    </div>
                                    <ul className="space-y-5">
                                        {projects.map((project) => (
                                            <li key={project.id}>
                                                <div className="mb-2 flex items-center justify-between text-sm">
                                                    <span className="font-semibold">
                                                        {project.title}
                                                    </span>
                                                    <span className="text-gray-500">
                                                        {project.progress}%
                                                    </span>
                                                </div>
                                                <ProgressBar value={project.progress} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>
                        </motion.div>
                    )}

                    {/* CLIENTS */}
                    {activeSection === "clients" && (
                        <PageSection
                            title="Clients"
                            description="View client information. You can edit only the clients you have permission for."
                        >
                            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                                {clients.map((client) => (
                                    <div
                                        key={client.id}
                                        className="rounded-2xl border border-[#ECECF5] bg-white p-5"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] font-bold text-white">
                                                    {client.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold">{client.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {client.company}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge label={client.status} />
                                        </div>

                                        {editingClientId === client.id ? (
                                            <form onSubmit={saveClient} className="mt-5">
                                                <Field label="Phone">
                                                    <input
                                                        value={clientPhone}
                                                        onChange={(e) =>
                                                            setClientPhone(e.target.value)
                                                        }
                                                        className={inputClass}
                                                    />
                                                </Field>
                                                <Field label="Notes">
                                                    <textarea
                                                        rows={3}
                                                        value={clientNotes}
                                                        onChange={(e) =>
                                                            setClientNotes(e.target.value)
                                                        }
                                                        className={inputClass}
                                                    />
                                                </Field>
                                                <div className="flex gap-2">
                                                    <button
                                                        type="submit"
                                                        className="flex-1 rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-4 py-3 text-sm font-bold text-white"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditingClientId(null)}
                                                        className="rounded-xl border border-[#ECECF5] px-4 py-3 text-sm font-semibold text-gray-600"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <>
                                                <dl className="mt-5 space-y-2 text-sm">
                                                    <div className="flex justify-between gap-3">
                                                        <dt className="text-gray-500">Email</dt>
                                                        <dd className="truncate font-medium">
                                                            {client.email}
                                                        </dd>
                                                    </div>
                                                    <div className="flex justify-between gap-3">
                                                        <dt className="text-gray-500">Phone</dt>
                                                        <dd className="font-medium">{client.phone}</dd>
                                                    </div>
                                                </dl>
                                                <p className="mt-4 rounded-xl bg-[#F8F8FC] p-3 text-sm text-gray-600">
                                                    {client.notes || "No notes."}
                                                </p>
                                                <button
                                                    onClick={() => startEditClient(client)}
                                                    disabled={!client.canEdit}
                                                    className="mt-5 w-full rounded-xl bg-[#869CFF]/15 px-4 py-3 text-sm font-bold text-[#586FD6] transition hover:bg-[#869CFF]/25 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                                                >
                                                    {client.canEdit
                                                        ? "Edit Information"
                                                        : "View only (no edit permission)"}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </PageSection>
                    )}

                    {/* PROJECTS */}
                    {activeSection === "projects" && (
                        <PageSection
                            title="Assigned Projects"
                            description="Update the status and progress of the projects assigned to you."
                        >
                            <div className="grid gap-5 xl:grid-cols-2">
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="rounded-2xl border border-[#ECECF5] bg-white p-6"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h3 className="text-lg font-bold">
                                                    {project.title}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Client: {clientName(project.clientId)} · Deadline{" "}
                                                    {project.deadline}
                                                </p>
                                            </div>
                                            <Badge label={project.status} />
                                        </div>

                                        <div className="mt-5">
                                            <div className="mb-2 flex justify-between text-sm">
                                                <span className="font-semibold">Progress</span>
                                                <span className="text-gray-500">
                                                    {project.progress}%
                                                </span>
                                            </div>
                                            <ProgressBar value={project.progress} />
                                            <input
                                                type="range"
                                                min={0}
                                                max={100}
                                                step={5}
                                                value={project.progress}
                                                onChange={(e) =>
                                                    updateProject(project.id, {
                                                        progress: Number(e.target.value),
                                                    })
                                                }
                                                aria-label={`Progress of ${project.title}`}
                                                className="mt-3 w-full accent-[#869CFF]"
                                            />
                                        </div>

                                        <Field label="Status">
                                            <select
                                                value={project.status}
                                                onChange={(e) =>
                                                    updateProject(project.id, {
                                                        status: e.target.value as ProjectStatus,
                                                    })
                                                }
                                                className={inputClass}
                                            >
                                                <option>Planning</option>
                                                <option>In Progress</option>
                                                <option>On Hold</option>
                                                <option>Completed</option>
                                            </select>
                                        </Field>
                                    </div>
                                ))}
                            </div>
                        </PageSection>
                    )}

                    {/* TASKS */}
                    {activeSection === "tasks" && (
                        <PageSection
                            title="My Tasks"
                            description="Track priorities, deadlines, and statuses."
                            action={
                                <select
                                    value={taskFilter}
                                    onChange={(e) =>
                                        setTaskFilter(e.target.value as "All" | TaskStatus)
                                    }
                                    aria-label="Filter tasks by status"
                                    className={`${inputClass} w-auto`}
                                >
                                    <option value="All">All statuses</option>
                                    <option>To Do</option>
                                    <option>In Progress</option>
                                    <option>Done</option>
                                </select>
                            }
                        >
                            {visibleTasks.length === 0 ? (
                                <EmptyState text="No tasks match this filter." />
                            ) : (
                                <div className="overflow-x-auto rounded-2xl border border-[#ECECF5] bg-white">
                                    <table className="w-full min-w-[720px] text-left text-sm">
                                        <thead className="bg-[#F8F8FC] text-xs uppercase tracking-wide text-gray-500">
                                            <tr>
                                                <th className="px-5 py-4">Task</th>
                                                <th className="px-5 py-4">Project</th>
                                                <th className="px-5 py-4">Priority</th>
                                                <th className="px-5 py-4">Deadline</th>
                                                <th className="px-5 py-4">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {visibleTasks.map((task) => (
                                                <tr
                                                    key={task.id}
                                                    className="border-t border-[#ECECF5]"
                                                >
                                                    <td className="px-5 py-4 font-semibold">
                                                        {task.title}
                                                    </td>
                                                    <td className="px-5 py-4 text-gray-500">
                                                        {projectTitle(task.projectId)}
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <Badge label={task.priority} />
                                                    </td>
                                                    <td
                                                        className={`px-5 py-4 ${
                                                            task.status !== "Done" &&
                                                            task.deadline < today
                                                                ? "font-semibold text-rose-600"
                                                                : "text-gray-500"
                                                        }`}
                                                    >
                                                        {task.deadline}
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <select
                                                            value={task.status}
                                                            onChange={(e) =>
                                                                updateTaskStatus(
                                                                    task.id,
                                                                    e.target.value as TaskStatus
                                                                )
                                                            }
                                                            aria-label={`Status of ${task.title}`}
                                                            className="rounded-lg border border-[#ECECF5] bg-white px-3 py-2 text-sm outline-none focus:border-[#869CFF]"
                                                        >
                                                            <option>To Do</option>
                                                            <option>In Progress</option>
                                                            <option>Done</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </PageSection>
                    )}

                    {/* NOTIFICATIONS */}
                    {activeSection === "notifications" && (
                        <PageSection
                            title="Notifications"
                            description="Task and project updates."
                            action={
                                <button
                                    onClick={markAllRead}
                                    disabled={unreadCount === 0}
                                    className="rounded-xl bg-[#869CFF]/15 px-4 py-2.5 text-sm font-bold text-[#586FD6] disabled:opacity-50"
                                >
                                    Mark all as read
                                </button>
                            }
                        >
                            {notifications.length === 0 ? (
                                <EmptyState text="You're all caught up." />
                            ) : (
                                <ul className="space-y-3">
                                    {notifications.map((n) => (
                                        <li
                                            key={n.id}
                                            className={`flex items-start justify-between gap-4 rounded-2xl border p-5 ${
                                                n.read
                                                    ? "border-[#ECECF5] bg-white"
                                                    : "border-[#869CFF]/40 bg-[#869CFF]/5"
                                            }`}
                                        >
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <Badge label={n.type} />
                                                    {!n.read && (
                                                        <span className="h-2 w-2 rounded-full bg-[#586FD6]" />
                                                    )}
                                                </div>
                                                <p className="mt-2 text-sm font-medium">{n.text}</p>
                                                <p className="mt-1 text-xs text-gray-400">
                                                    {n.time}
                                                </p>
                                            </div>
                                            {!n.read && (
                                                <button
                                                    onClick={() => markNotificationRead(n.id)}
                                                    className="shrink-0 text-xs font-bold text-[#586FD6]"
                                                >
                                                    Mark as read
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </PageSection>
                    )}

                    {/* PROFILE */}
                    {activeSection === "profile" && (
                        <PageSection
                            title="My Profile"
                            description="Update your personal information."
                        >
                            <form
                                onSubmit={saveProfile}
                                className="max-w-2xl rounded-2xl border border-[#ECECF5] bg-white p-6"
                            >
                                <Field label="Full name">
                                    <input
                                        value={employeeName}
                                        onChange={(e) => setEmployeeName(e.target.value)}
                                        className={inputClass}
                                    />
                                </Field>
                                <Field label="Email">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={inputClass}
                                    />
                                </Field>
                                <Field label="Phone">
                                    <input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className={inputClass}
                                    />
                                </Field>
                                <Field label="Job title">
                                    <input
                                        value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                        className={inputClass}
                                    />
                                </Field>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-6 py-3 text-sm font-bold text-white"
                                >
                                    Save Changes
                                </button>

                                {message && <Message>{message}</Message>}
                            </form>
                        </PageSection>
                    )}
                </div>
            </main>
        </div>
    );
}

/* ---------- Helper components ---------- */

function PageSection({
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
            className="mt-4 space-y-6"
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

function Badge({ label }: { label: string }) {
    const styles: Record<string, string> = {
        High: "bg-rose-50 text-rose-700",
        Medium: "bg-amber-50 text-amber-700",
        Low: "bg-sky-50 text-sky-700",
        Active: "bg-emerald-50 text-emerald-700",
        Lead: "bg-amber-50 text-amber-700",
        Inactive: "bg-gray-100 text-gray-600",
        Planning: "bg-sky-50 text-sky-700",
        "In Progress": "bg-[#869CFF]/15 text-[#586FD6]",
        "On Hold": "bg-amber-50 text-amber-700",
        Completed: "bg-emerald-50 text-emerald-700",
        Task: "bg-[#869CFF]/15 text-[#586FD6]",
        Project: "bg-[#E2A3FF]/30 text-[#8A3FB0]",
    };

    return (
        <span
            className={`inline-flex shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                styles[label] ?? "bg-gray-100 text-gray-600"
            }`}
        >
            {label}
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

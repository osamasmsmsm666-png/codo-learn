"use client";

import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
    type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

type Section = "overview" | "request" | "projects" | "payments" | "profile";

type FormNote = { type: "success" | "error"; text: string };

type ServiceType =
    | "Web Development"
    | "Mobile App"
    | "UI/UX Design"
    | "E-commerce"
    | "Digital Marketing"
    | "Other";

type RequestStatus = "Pending" | "In Review" | "Approved" | "Rejected";
type ProjectStatus = "Planning" | "In Progress" | "On Hold" | "Completed";
type PaymentStatus = "Paid" | "Pending" | "Overdue";

type ServiceRequest = {
    id: number;
    service: ServiceType;
    title: string;
    budget: string;
    submittedOn: string;
    status: RequestStatus;
};

type Requirement = {
    id: number;
    title: string;
    done: boolean;
};

// A project is split into phases, and each phase into small requirements.
type Phase = {
    id: number;
    title: string;
    requirements: Requirement[];
};

type Project = {
    id: number;
    title: string;
    service: ServiceType;
    status: ProjectStatus;
    phases: Phase[];
    deadline: string;
    manager: string;
};

type Invoice = {
    id: string;
    projectId: number;
    description: string;
    amount: number;
    issuedOn: string;
    dueDate: string;
    status: PaymentStatus;
};

const serviceTypes: ServiceType[] = [
    "Web Development",
    "Mobile App",
    "UI/UX Design",
    "E-commerce",
    "Digital Marketing",
    "Other",
];

const initialRequests: ServiceRequest[] = [
    {
        id: 1,
        service: "Web Development",
        title: "Company website redesign",
        budget: "25,000",
        submittedOn: "2026-10-02",
        status: "Approved",
    },
    {
        id: 2,
        service: "Mobile App",
        title: "Customer loyalty app",
        budget: "60,000",
        submittedOn: "2026-10-12",
        status: "In Review",
    },
];

const initialProjects: Project[] = [
    {
        id: 1,
        title: "Company Website Redesign",
        service: "Web Development",
        status: "In Progress",
        deadline: "2026-11-30",
        manager: "Ahmed Samir",
        phases: [
            {
                id: 1,
                title: "Design",
                requirements: [
                    { id: 1, title: "Wireframes", done: true },
                    { id: 2, title: "UI mockups", done: true },
                    { id: 3, title: "Client approval", done: true },
                ],
            },
            {
                id: 2,
                title: "Development",
                requirements: [
                    { id: 4, title: "Homepage", done: true },
                    { id: 5, title: "About & Services pages", done: true },
                    { id: 6, title: "Contact form", done: false },
                    { id: 7, title: "Blog section", done: false },
                ],
            },
            {
                id: 3,
                title: "Launch",
                requirements: [
                    { id: 8, title: "Testing & fixes", done: false },
                    { id: 9, title: "Deployment", done: false },
                    { id: 10, title: "Team training", done: false },
                ],
            },
        ],
    },
    {
        id: 2,
        title: "Brand Identity & UI Kit",
        service: "UI/UX Design",
        status: "Completed",
        deadline: "2026-09-20",
        manager: "Mona Hassan",
        phases: [
            {
                id: 1,
                title: "Brand Identity",
                requirements: [
                    { id: 1, title: "Logo design", done: true },
                    { id: 2, title: "Colors & typography", done: true },
                    { id: 3, title: "Brand guidelines", done: true },
                ],
            },
            {
                id: 2,
                title: "UI Kit",
                requirements: [
                    { id: 4, title: "Component library", done: true },
                    { id: 5, title: "Design files handoff", done: true },
                ],
            },
        ],
    },
    {
        id: 3,
        title: "Online Store Setup",
        service: "E-commerce",
        status: "Planning",
        deadline: "2027-01-15",
        manager: "Omar Khaled",
        phases: [
            {
                id: 1,
                title: "Planning",
                requirements: [
                    { id: 1, title: "Requirements gathering", done: false },
                    { id: 2, title: "Product catalog structure", done: false },
                ],
            },
            {
                id: 2,
                title: "Store Setup",
                requirements: [
                    { id: 3, title: "Store configuration", done: false },
                    { id: 4, title: "Payment methods", done: false },
                    { id: 5, title: "Shipping options", done: false },
                ],
            },
            {
                id: 3,
                title: "Launch",
                requirements: [
                    { id: 6, title: "Test orders", done: false },
                    { id: 7, title: "Go live", done: false },
                ],
            },
        ],
    },
];

// Progress is never typed in by hand: it is the share of requirements that
// are done, so it always matches the checkmarks.
function countRequirements(project: Project) {
    const all = project.phases.flatMap((phase) => phase.requirements);
    return { done: all.filter((r) => r.done).length, total: all.length };
}

function progressOf(project: Project) {
    const { done, total } = countRequirements(project);
    return total === 0 ? 0 : Math.round((done / total) * 100);
}

const invoices: Invoice[] = [
    {
        id: "INV-1001",
        projectId: 2,
        description: "Brand Identity & UI Kit — final payment",
        amount: 12000,
        issuedOn: "2026-09-18",
        dueDate: "2026-09-30",
        status: "Paid",
    },
    {
        id: "INV-1002",
        projectId: 1,
        description: "Website Redesign — milestone 1",
        amount: 10000,
        issuedOn: "2026-10-05",
        dueDate: "2026-10-15",
        status: "Paid",
    },
    {
        id: "INV-1003",
        projectId: 1,
        description: "Website Redesign — milestone 2",
        amount: 10000,
        issuedOn: "2026-10-16",
        dueDate: "2026-10-26",
        status: "Pending",
    },
    {
        id: "INV-1004",
        projectId: 3,
        description: "Online Store Setup — deposit",
        amount: 8000,
        issuedOn: "2026-10-01",
        dueDate: "2026-10-10",
        status: "Overdue",
    },
];

const navItems: { id: Section; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "⌂" },
    { id: "request", label: "Request a Service", icon: "+" },
    { id: "projects", label: "My Projects", icon: "▤" },
    { id: "payments", label: "Payments", icon: "$" },
    { id: "profile", label: "My Profile", icon: "⚙" },
];

const pageTitles: Record<Section, string> = {
    overview: "Client Overview",
    request: "Request a Service",
    projects: "My Projects",
    payments: "Payments & Invoices",
    profile: "My Profile",
};

const inputClass =
    "w-full rounded-xl border border-[#ECECF5] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#869CFF] focus:ring-2 focus:ring-[#869CFF]/20";

function formatMoney(amount: number) {
    return `EGP ${amount.toLocaleString("en-US")}`;
}

export default function ClientDashboard() {
    const [activeSection, setActiveSection] = useState<Section>("overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [requests, setRequests] = useState(initialRequests);
    const [projects] = useState(initialProjects);

    // Which project cards have their requirements list open.
    const [expandedProjects, setExpandedProjects] = useState<number[]>([]);

    function toggleExpanded(id: number) {
        setExpandedProjects((previous) =>
            previous.includes(id)
                ? previous.filter((item) => item !== id)
                : [...previous, id]
        );
    }

    // Request form
    const [service, setService] = useState<ServiceType>("Web Development");
    const [requestTitle, setRequestTitle] = useState("");
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState("");
    const [requestError, setRequestError] = useState("");

    // Payments filter
    const [paymentFilter, setPaymentFilter] =
        useState<"All" | PaymentStatus>("All");

    // Profile
    const [clientName, setClientName] = useState("Client Name");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("client@example.com");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);
    const [profileNote, setProfileNote] = useState<FormNote | null>(null);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordNote, setPasswordNote] = useState<FormNote | null>(null);

    // Free the temporary photo preview when it is replaced or the page closes.
    useEffect(() => {
        return () => {
            if (photoUrl) URL.revokeObjectURL(photoUrl);
        };
    }, [photoUrl]);

    const [message, setMessage] = useState("");

    const activeProjects = projects.filter(
        (p) => p.status === "In Progress" || p.status === "Planning"
    ).length;
    const openRequests = requests.filter(
        (r) => r.status === "Pending" || r.status === "In Review"
    ).length;
    const totalPaid = invoices
        .filter((i) => i.status === "Paid")
        .reduce((sum, i) => sum + i.amount, 0);
    const totalDue = invoices
        .filter((i) => i.status !== "Paid")
        .reduce((sum, i) => sum + i.amount, 0);

    const visibleInvoices =
        paymentFilter === "All"
            ? invoices
            : invoices.filter((i) => i.status === paymentFilter);

    function projectTitle(id: number) {
        return projects.find((p) => p.id === id)?.title ?? "—";
    }

    function openSection(section: Section) {
        setActiveSection(section);
        setSidebarOpen(false);
        setMessage("");
    }

    function submitRequest(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setRequestError("");
        setMessage("");

        if (!requestTitle.trim()) {
            setRequestError("Please enter a title for your request.");
            return;
        }

        if (description.trim().length < 10) {
            setRequestError(
                "Please describe what you need (at least 10 characters)."
            );
            return;
        }

        if (budget && (Number.isNaN(Number(budget)) || Number(budget) < 0)) {
            setRequestError("Budget must be a positive number.");
            return;
        }

        const newRequest: ServiceRequest = {
            id: Date.now(),
            service,
            title: requestTitle.trim(),
            budget: budget ? Number(budget).toLocaleString("en-US") : "—",
            // Date is read inside the event handler, not during render.
            submittedOn: new Date().toISOString().slice(0, 10),
            status: "Pending",
        };

        setRequests((previous) => [newRequest, ...previous]);
        setRequestTitle("");
        setDescription("");
        setBudget("");
        setService("Web Development");
        setMessage(
            "Request submitted in this demo dashboard. Backend integration is still needed."
        );
    }

    function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        event.target.value = ""; // lets the same file be picked again

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setProfileNote({ type: "error", text: "Please choose an image file." });
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setProfileNote({
                type: "error",
                text: "The image must be smaller than 2 MB.",
            });
            return;
        }

        setPhotoUrl(URL.createObjectURL(file));
        setProfileNote({
            type: "success",
            text: "Photo selected. Backend storage is still needed to keep it after a refresh.",
        });
    }

    function saveProfile(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setProfileNote(null);

        if (!clientName.trim()) {
            setProfileNote({ type: "error", text: "Please enter your full name." });
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.trim())) {
            setProfileNote({
                type: "error",
                text: "Please enter a valid email address.",
            });
            return;
        }

        if (phone.trim() && !/^[+\d\s()-]{7,20}$/.test(phone.trim())) {
            setProfileNote({
                type: "error",
                text: "Please enter a valid phone number.",
            });
            return;
        }

        setProfileNote({
            type: "success",
            text: "Profile saved in this demo. Backend integration is still needed.",
        });
    }

    function updatePassword(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setPasswordNote(null);

        if (!currentPassword) {
            setPasswordNote({
                type: "error",
                text: "Please enter your current password.",
            });
            return;
        }

        if (newPassword.length < 8) {
            setPasswordNote({
                type: "error",
                text: "The new password must contain at least 8 characters.",
            });
            return;
        }

        if (newPassword === currentPassword) {
            setPasswordNote({
                type: "error",
                text: "The new password must be different from the current one.",
            });
            return;
        }

        setCurrentPassword("");
        setNewPassword("");
        setPasswordNote({
            type: "success",
            text: "Password form is valid. Backend authentication is needed to change a real password.",
        });
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
                        Client Portal
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
                            <p className="text-xs text-gray-400">Client Portal</p>
                            <h1 className="text-lg font-bold sm:text-xl">
                                {pageTitles[activeSection]}
                            </h1>
                        </div>
                    </div>

                    <button
                        onClick={() => openSection("profile")}
                        className="flex items-center gap-3 rounded-xl p-1.5 hover:bg-gray-50"
                    >
                        <Avatar
                            name={clientName}
                            photoUrl={photoUrl}
                            className="h-10 w-10 rounded-xl"
                        />
                        <div className="hidden text-left sm:block">
                            <p className="max-w-36 truncate text-sm font-semibold">
                                {clientName}
                            </p>
                            <p className="text-xs text-gray-400">Client</p>
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
                                        CLIENT WORKSPACE
                                    </p>
                                    <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                                        Welcome, {clientName}!
                                    </h2>
                                    <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
                                        Request digital services, follow your projects, and
                                        keep track of your invoices in one place.
                                    </p>
                                    <button
                                        onClick={() => openSection("request")}
                                        className="mt-6 rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#869CFF]/20"
                                    >
                                        Request a Service
                                    </button>
                                </div>
                                <div className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full bg-[#869CFF]/25 blur-2xl" />
                                <div className="pointer-events-none absolute -bottom-16 right-28 h-40 w-40 rounded-full bg-[#E2A3FF]/40 blur-2xl" />
                            </section>

                            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                <StatCard
                                    label="Active Projects"
                                    value={String(activeProjects)}
                                    icon="▤"
                                />
                                <StatCard
                                    label="Open Requests"
                                    value={String(openRequests)}
                                    icon="+"
                                />
                                <StatCard
                                    label="Total Paid"
                                    value={formatMoney(totalPaid)}
                                    icon="✓"
                                />
                                <StatCard
                                    label="Outstanding"
                                    value={formatMoney(totalDue)}
                                    icon="$"
                                />
                            </section>

                            <section className="grid gap-6 xl:grid-cols-2">
                                <div className="rounded-2xl border border-[#ECECF5] bg-white p-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="text-lg font-bold">Active Projects</h3>
                                        <button
                                            onClick={() => openSection("projects")}
                                            className="text-sm font-bold text-[#586FD6]"
                                        >
                                            View all →
                                        </button>
                                    </div>
                                    <ul className="space-y-5">
                                        {projects
                                            .filter((p) => p.status !== "Completed")
                                            .map((project) => (
                                                <li key={project.id}>
                                                    <div className="mb-2 flex items-center justify-between text-sm">
                                                        <span className="font-semibold">
                                                            {project.title}
                                                        </span>
                                                        <span className="text-gray-500">
                                                            {progressOf(project)}%
                                                        </span>
                                                    </div>
                                                    <ProgressBar value={progressOf(project)} />
                                                </li>
                                            ))}
                                    </ul>
                                </div>

                                <div className="rounded-2xl border border-[#ECECF5] bg-white p-6">
                                    <h3 className="mb-4 text-lg font-bold">
                                        Requested Services
                                    </h3>
                                    {requests.length === 0 ? (
                                        <EmptyState text="You haven't requested any service yet." />
                                    ) : (
                                        <ul className="space-y-3">
                                            {requests.slice(0, 4).map((request) => (
                                                <li
                                                    key={request.id}
                                                    className="flex items-center justify-between gap-3 rounded-xl bg-[#F8F8FC] p-4"
                                                >
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-semibold">
                                                            {request.title}
                                                        </p>
                                                        <p className="mt-1 text-xs text-gray-500">
                                                            {request.service} · {request.submittedOn}
                                                        </p>
                                                    </div>
                                                    <Badge label={request.status} />
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </section>
                        </motion.div>
                    )}

                    {/* REQUEST A SERVICE */}
                    {activeSection === "request" && (
                        <PageSection
                            title="Request a Service"
                            description="Tell us what you need and our team will get back to you."
                        >
                            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                                <form
                                    onSubmit={submitRequest}
                                    className="rounded-2xl border border-[#ECECF5] bg-white p-6"
                                >
                                    <Field label="Service type">
                                        <select
                                            value={service}
                                            onChange={(e) =>
                                                setService(e.target.value as ServiceType)
                                            }
                                            className={inputClass}
                                        >
                                            {serviceTypes.map((type) => (
                                                <option key={type}>{type}</option>
                                            ))}
                                        </select>
                                    </Field>

                                    <Field label="Request title">
                                        <input
                                            value={requestTitle}
                                            onChange={(e) => setRequestTitle(e.target.value)}
                                            placeholder="e.g. Corporate website for my company"
                                            className={inputClass}
                                        />
                                    </Field>

                                    <Field label="Description">
                                        <textarea
                                            rows={5}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Describe your goals, features, and any deadlines."
                                            className={inputClass}
                                        />
                                    </Field>

                                    <Field label="Estimated budget (EGP, optional)">
                                        <input
                                            type="number"
                                            min={0}
                                            value={budget}
                                            onChange={(e) => setBudget(e.target.value)}
                                            placeholder="e.g. 20000"
                                            className={inputClass}
                                        />
                                    </Field>

                                    {requestError && (
                                        <p
                                            role="alert"
                                            className="mb-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700"
                                        >
                                            {requestError}
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        className="rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-6 py-3 text-sm font-bold text-white"
                                    >
                                        Submit Request
                                    </button>

                                    {message && <Message>{message}</Message>}
                                </form>

                                <div className="rounded-2xl border border-[#ECECF5] bg-white p-6">
                                    <h3 className="mb-4 text-lg font-bold">Your Requests</h3>
                                    {requests.length === 0 ? (
                                        <EmptyState text="No requests yet." />
                                    ) : (
                                        <ul className="space-y-3">
                                            {requests.map((request) => (
                                                <li
                                                    key={request.id}
                                                    className="rounded-xl bg-[#F8F8FC] p-4"
                                                >
                                                    <div className="flex items-start justify-between gap-3">
                                                        <p className="text-sm font-semibold">
                                                            {request.title}
                                                        </p>
                                                        <Badge label={request.status} />
                                                    </div>
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        {request.service} · Budget {request.budget}{" "}
                                                        · {request.submittedOn}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </PageSection>
                    )}

                    {/* MY PROJECTS */}
                    {activeSection === "projects" && (
                        <PageSection
                            title="My Projects"
                            description="Track the status and progress of your projects."
                        >
                            <div className="grid items-start gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                {projects.map((project) => {
                                    const { done, total } = countRequirements(project);
                                    const expanded = expandedProjects.includes(project.id);
                                    const panelId = `project-${project.id}-requirements`;

                                    return (
                                        <div
                                            key={project.id}
                                            className="flex flex-col rounded-2xl border border-[#ECECF5] bg-white p-5"
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="truncate rounded-lg bg-[#869CFF]/10 px-3 py-1.5 text-xs font-semibold text-[#586FD6]">
                                                    {project.service}
                                                </span>
                                                <Badge label={project.status} />
                                            </div>

                                            <h3 className="mt-4 line-clamp-2 min-h-14 text-lg font-bold leading-7">
                                                {project.title}
                                            </h3>

                                            <div className="mt-4">
                                                <div className="mb-2 flex justify-between text-sm">
                                                    <span className="font-semibold">Progress</span>
                                                    <span className="text-gray-500">
                                                        {progressOf(project)}%
                                                    </span>
                                                </div>
                                                <ProgressBar value={progressOf(project)} />
                                            </div>

                                            <div className="mt-4 grid grid-cols-2 gap-3">
                                                <div className="min-w-0 rounded-xl bg-[#F8F8FC] p-3">
                                                    <p className="text-xs text-gray-500">Deadline</p>
                                                    <p className="mt-1 truncate text-sm font-bold">
                                                        {project.deadline}
                                                    </p>
                                                </div>
                                                <div className="min-w-0 rounded-xl bg-[#F8F8FC] p-3">
                                                    <p className="text-xs text-gray-500">Manager</p>
                                                    <p className="mt-1 truncate text-sm font-bold">
                                                        {project.manager}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-5">
                                                <button
                                                    onClick={() => toggleExpanded(project.id)}
                                                    aria-expanded={expanded}
                                                    aria-controls={panelId}
                                                    className="flex w-full items-center justify-between rounded-xl bg-[#869CFF]/15 px-4 py-3 text-sm font-bold text-[#586FD6] transition hover:bg-[#869CFF]/25"
                                                >
                                                    <span>
                                                        {expanded
                                                            ? "Hide requirements"
                                                            : "View requirements"}
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        <span className="font-semibold opacity-70">
                                                            {done}/{total}
                                                        </span>
                                                        <span
                                                            aria-hidden="true"
                                                            className={`transition ${
                                                                expanded ? "rotate-180" : ""
                                                            }`}
                                                        >
                                                            ⌄
                                                        </span>
                                                    </span>
                                                </button>
                                            </div>

                                            {expanded && (
                                                <div id={panelId}>
                                                    <PhaseList phases={project.phases} />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </PageSection>
                    )}

                    {/* PAYMENTS */}
                    {activeSection === "payments" && (
                        <PageSection
                            title="Payments & Invoices"
                            description="View your invoices and payment records."
                            action={
                                <select
                                    value={paymentFilter}
                                    onChange={(e) =>
                                        setPaymentFilter(
                                            e.target.value as "All" | PaymentStatus
                                        )
                                    }
                                    aria-label="Filter invoices by status"
                                    className={`${inputClass} w-auto`}
                                >
                                    <option value="All">All invoices</option>
                                    <option>Paid</option>
                                    <option>Pending</option>
                                    <option>Overdue</option>
                                </select>
                            }
                        >
                            <div className="grid gap-4 sm:grid-cols-2">
                                <StatCard
                                    label="Total Paid"
                                    value={formatMoney(totalPaid)}
                                    icon="✓"
                                />
                                <StatCard
                                    label="Outstanding Balance"
                                    value={formatMoney(totalDue)}
                                    icon="$"
                                />
                            </div>

                            {visibleInvoices.length === 0 ? (
                                <EmptyState text="No invoices match this filter." />
                            ) : (
                                <div className="overflow-x-auto rounded-2xl border border-[#ECECF5] bg-white">
                                    <table className="w-full min-w-[820px] text-left text-sm">
                                        <thead className="bg-[#F8F8FC] text-xs uppercase tracking-wide text-gray-500">
                                            <tr>
                                                <th className="px-5 py-4">Invoice</th>
                                                <th className="px-5 py-4">Description</th>
                                                <th className="px-5 py-4">Project</th>
                                                <th className="px-5 py-4">Due date</th>
                                                <th className="px-5 py-4">Amount</th>
                                                <th className="px-5 py-4">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {visibleInvoices.map((invoice) => (
                                                <tr
                                                    key={invoice.id}
                                                    className="border-t border-[#ECECF5]"
                                                >
                                                    <td className="px-5 py-4 font-semibold">
                                                        {invoice.id}
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        {invoice.description}
                                                    </td>
                                                    <td className="px-5 py-4 text-gray-500">
                                                        {projectTitle(invoice.projectId)}
                                                    </td>
                                                    <td className="px-5 py-4 text-gray-500">
                                                        {invoice.dueDate}
                                                    </td>
                                                    <td className="px-5 py-4 font-semibold">
                                                        {formatMoney(invoice.amount)}
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <Badge label={invoice.status} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </PageSection>
                    )}

                    {/* PROFILE */}
                    {activeSection === "profile" && (
                        <PageSection
                            title="My Profile"
                            description="Manage your personal information and password."
                        >
                            <div className="grid items-start gap-6 lg:grid-cols-2">
                                {/* Personal information */}
                                <form
                                    onSubmit={saveProfile}
                                    noValidate
                                    className="rounded-3xl border border-[#ECECF5] bg-white p-6 sm:p-8"
                                >
                                    <div className="mb-7 flex items-center gap-5">
                                        <div className="relative shrink-0">
                                            <Avatar
                                                name={clientName}
                                                photoUrl={photoUrl}
                                                className="h-[68px] w-[68px] rounded-2xl text-3xl"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => photoInputRef.current?.click()}
                                                aria-label="Upload photo"
                                                className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#586FD6] text-white shadow-md hover:bg-[#455BC1]"
                                            >
                                                <CameraIcon />
                                            </button>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-extrabold">
                                                Personal Information
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Update your profile details and photo.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => photoInputRef.current?.click()}
                                                className="mt-2 text-sm font-bold text-[#586FD6] hover:text-[#455BC1]"
                                            >
                                                Upload Photo
                                            </button>
                                            <input
                                                ref={photoInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handlePhotoChange}
                                                className="hidden"
                                            />
                                        </div>
                                    </div>

                                    <Field label="Full Name">
                                        <input
                                            value={clientName}
                                            onChange={(e) => setClientName(e.target.value)}
                                            placeholder="Enter your full name"
                                            autoComplete="name"
                                            className={inputClass}
                                        />
                                    </Field>
                                    <Field label="Company">
                                        <input
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                            placeholder="Enter your company name"
                                            autoComplete="organization"
                                            className={inputClass}
                                        />
                                    </Field>
                                    <Field label="Email Address">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            autoComplete="email"
                                            className={inputClass}
                                        />
                                    </Field>
                                    <Field label="Phone Number">
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Enter your phone number"
                                            autoComplete="tel"
                                            className={inputClass}
                                        />
                                    </Field>
                                    <Field label="Address">
                                        <input
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Enter your address"
                                            autoComplete="street-address"
                                            className={inputClass}
                                        />
                                    </Field>

                                    <button
                                        type="submit"
                                        className="rounded-xl bg-[#586FD6] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#455BC1]"
                                    >
                                        Save Changes
                                    </button>

                                    <NoteBanner note={profileNote} />
                                </form>

                                {/* Change password */}
                                <form
                                    onSubmit={updatePassword}
                                    noValidate
                                    className="rounded-3xl border border-[#ECECF5] bg-white p-6 sm:p-8"
                                >
                                    <h3 className="text-xl font-extrabold">Change Password</h3>
                                    <p className="mb-7 mt-1 text-sm text-gray-500">
                                        Choose a strong password for your account.
                                    </p>

                                    <Field label="Current Password">
                                        <input
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            placeholder="Enter current password"
                                            autoComplete="current-password"
                                            className={inputClass}
                                        />
                                    </Field>
                                    <Field label="New Password">
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="At least 8 characters"
                                            autoComplete="new-password"
                                            className={inputClass}
                                        />
                                    </Field>

                                    <button
                                        type="submit"
                                        className="rounded-xl border border-[#869CFF]/60 bg-white px-6 py-3.5 text-sm font-bold text-[#586FD6] transition hover:bg-[#869CFF]/10"
                                    >
                                        Update Password
                                    </button>

                                    <NoteBanner note={passwordNote} />

                                    <p className="mt-6 text-sm text-gray-400">
                                        Password changes require backend authentication before
                                        they can update a real account.
                                    </p>
                                </form>
                            </div>
                        </PageSection>
                    )}

                    <footer className="mt-10 border-t border-[#ECECF5] py-6 text-center text-xs text-gray-400">
                        © 2026 Codo Learn. Empowering clients.
                    </footer>
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
            <p className="mt-4 text-2xl font-extrabold sm:text-3xl">{value}</p>
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
        Pending: "bg-amber-50 text-amber-700",
        "In Review": "bg-sky-50 text-sky-700",
        Approved: "bg-emerald-50 text-emerald-700",
        Rejected: "bg-rose-50 text-rose-700",
        Planning: "bg-sky-50 text-sky-700",
        "In Progress": "bg-[#869CFF]/15 text-[#586FD6]",
        "On Hold": "bg-amber-50 text-amber-700",
        Completed: "bg-emerald-50 text-emerald-700",
        Paid: "bg-emerald-50 text-emerald-700",
        Overdue: "bg-rose-50 text-rose-700",
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

function Avatar({
    name,
    photoUrl,
    className,
}: {
    name: string;
    photoUrl: string | null;
    className: string;
}) {
    if (photoUrl) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={photoUrl}
                alt={`${name} profile photo`}
                className={`object-cover ${className}`}
            />
        );
    }

    return (
        <div
            className={`flex items-center justify-center bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] font-bold text-white ${className}`}
        >
            {name.charAt(0).toUpperCase()}
        </div>
    );
}

function CameraIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
        </svg>
    );
}

function NoteBanner({ note }: { note: FormNote | null }) {
    if (!note) return null;

    return (
        <p
            role={note.type === "error" ? "alert" : "status"}
            className={`mt-4 rounded-xl p-3 text-sm ${
                note.type === "error"
                    ? "bg-rose-50 text-rose-700"
                    : "bg-emerald-50 text-emerald-700"
            }`}
        >
            {note.text}
        </p>
    );
}

function CheckCircle({
    checked,
    small = false,
}: {
    checked: boolean;
    small?: boolean;
}) {
    const size = small ? "h-5 w-5 text-[11px]" : "h-6 w-6 text-xs";

    return (
        <span
            className={`flex shrink-0 items-center justify-center rounded-full border-2 font-bold ${size} ${
                checked
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-gray-300 bg-white text-transparent"
            }`}
        >
            <span aria-hidden="true">✓</span>
            <span className="sr-only">{checked ? "Completed" : "Not completed"}</span>
        </span>
    );
}

function PhaseList({ phases }: { phases: Phase[] }) {
    return (
        <ol className="mt-4 space-y-3">
            {phases.map((phase, index) => {
                const done = phase.requirements.filter((r) => r.done).length;
                const total = phase.requirements.length;
                const complete = total > 0 && done === total;

                return (
                    <li
                        key={phase.id}
                        className="rounded-xl border border-[#ECECF5] p-4"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <CheckCircle checked={complete} />
                                <p className="text-sm font-bold">
                                    {index + 1}. {phase.title}
                                </p>
                            </div>
                            <span
                                className={`text-xs font-semibold ${
                                    complete ? "text-emerald-600" : "text-gray-400"
                                }`}
                            >
                                {done}/{total}
                            </span>
                        </div>

                        <ul className="ml-3 mt-3 space-y-2 border-l-2 border-[#ECECF5] pl-4">
                            {phase.requirements.map((requirement) => (
                                <li
                                    key={requirement.id}
                                    className="flex items-center gap-3 text-sm"
                                >
                                    <CheckCircle checked={requirement.done} small />
                                    <span
                                        className={
                                            requirement.done
                                                ? "text-gray-500"
                                                : "text-[#20243A]"
                                        }
                                    >
                                        {requirement.title}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </li>
                );
            })}
        </ol>
    );
}

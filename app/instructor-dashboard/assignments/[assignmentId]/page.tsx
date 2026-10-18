
"use client";

import { useEffect, useState, useRef, type ChangeEvent } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Attachment = {
    id: string;
    name: string;
    type: string;
    data: string;
};

type AssignmentContent = {
    title: string;
    description: string;
    referenceLink: string;
    videoUrl: string;
    attachments: Attachment[];
};

const EMPTY_CONTENT: AssignmentContent = {
    title: "",
    description: "",
    referenceLink: "",
    videoUrl: "",
    attachments: [],
};

const STORAGE_KEY = "codo-instructor-assignment-content-";

export default function AssignmentDetailsPage() {
    const params = useParams<{ assignmentId: string }>();
    const assignmentId = params.assignmentId;
    const [videoName, setVideoName] = useState("");
    const [videoPreview, setVideoPreview] = useState("");
    const [videoSize, setVideoSize] = useState("");

    const [content, setContent] =
        useState<AssignmentContent>(EMPTY_CONTENT);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] =
        useState<"success" | "error">("success");

    const storageKey = STORAGE_KEY + assignmentId;

    useEffect(() => {
        try {
            const stored = localStorage.getItem(storageKey);
            const queryTitle = new URLSearchParams(
                window.location.search
            ).get("title");

            if (stored) {
                const parsed: unknown = JSON.parse(stored);

                if (
                    parsed &&
                    typeof parsed === "object" &&
                    "title" in parsed &&
                    "description" in parsed &&
                    "referenceLink" in parsed &&
                    "attachments" in parsed &&
                    typeof parsed.title === "string" &&
                    typeof parsed.description === "string" &&
                    typeof parsed.referenceLink === "string" &&
                    Array.isArray(parsed.attachments)
                ) {
                    setContent(parsed as AssignmentContent);
                } else {
                    setContent({
                        ...EMPTY_CONTENT,
                        title: queryTitle || `Assignment ${assignmentId}`,
                    });
                }
            } else {
                setContent({
                    ...EMPTY_CONTENT,
                    title: queryTitle || `Assignment ${assignmentId}`,
                });
            }
        } catch {
            setMessageType("error");
            setMessage("Could not load saved assignment data.");
        } finally {
            setLoading(false);
        }
    }, [storageKey, assignmentId]);

    function updateField(
        field: "title" | "description" | "referenceLink" | "videoUrl",
        value: string
    ) {
        setContent((previous) => ({
            ...previous,
            [field]: value,
        }));
        setMessage("");
    }

    async function handleFiles(event: ChangeEvent<HTMLInputElement>) {
        const files = Array.from(event.target.files ?? []);
        event.target.value = "";

        if (!files.length) return;

        const maxFileSize = 2 * 1024 * 1024;
        const available = 10 - content.attachments.length;

        if (available <= 0) {
            setMessageType("error");
            setMessage("You can add up to 10 files.");
            return;
        }

        if (files.length > available) {
            setMessageType("error");
            setMessage(`You can add only ${available} more file(s).`);
            return;
        }

        const invalidFile = files.find(
            (file) => file.size > maxFileSize
        );

        if (invalidFile) {
            setMessageType("error");
            setMessage("Each file must be 2 MB or smaller.");
            return;
        }

        try {
            const attachments = await Promise.all(
                files.map(
                    (file) =>
                        new Promise<Attachment>((resolve, reject) => {
                            const reader = new FileReader();

                            reader.onload = () => {
                                if (typeof reader.result === "string") {
                                    resolve({
                                        id: `${Date.now()}-${Math.random()}`,
                                        name: file.name,
                                        type: file.type,
                                        data: reader.result,
                                    });
                                } else {
                                    reject(new Error("Could not read file."));
                                }
                            };

                            reader.onerror = () =>
                                reject(new Error("Could not read file."));

                            reader.readAsDataURL(file);
                        })
                )
            );

            setContent((previous) => ({
                ...previous,
                attachments: [
                    ...previous.attachments,
                    ...attachments,
                ],
            }));

            setMessage("");
        } catch {
            setMessageType("error");
            setMessage("Could not read one of the selected files.");
        }
    }

    function removeAttachment(id: string) {
        setContent((previous) => ({
            ...previous,
            attachments: previous.attachments.filter(
                (file) => file.id !== id
            ),
        }));

        setMessage("");
    }
    function handleVideoUpload(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        event.target.value = "";

        if (!file) return;

        if (!file.type.startsWith("video/")) {
            setMessageType("error");
            setMessage("Please select a valid video file.");
            return;
        }

        if (file.size > 100 * 1024 * 1024) {
            setMessageType("error");
            setMessage("Video size must be 100 MB or smaller.");
            return;
        }

        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
        }

        setVideoName(file.name);
        setVideoSize((file.size / (1024 * 1024)).toFixed(2));
        setVideoPreview(URL.createObjectURL(file));
        setMessage("");
    }

    function removeVideo() {
        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
        }

        setVideoPreview("");
        setVideoName("");
        setVideoSize("");
    }

    function saveAssignment() {
        try {
            if (content.referenceLink.trim()) {
                const url = new URL(content.referenceLink.trim());

                if (!["http:", "https:"].includes(url.protocol)) {
                    throw new Error("Invalid reference URL");
                }
            }

            if (content.videoUrl.trim()) {
                const url = new URL(content.videoUrl.trim());

                if (!["http:", "https:"].includes(url.protocol)) {
                    throw new Error("Invalid video URL");
                }
            }

            localStorage.setItem(storageKey, JSON.stringify(content));

            setMessageType("success");
            setMessage("Assignment saved successfully.");
        } catch {
            setMessageType("error");
            setMessage(
                "Could not save. Check your URLs or remove some large files."
            );
        }
    }

    const inputClass =
        "w-full rounded-xl border border-[#DADCE0] bg-white px-4 py-3 text-sm text-[#202124] outline-none transition placeholder:text-[#80868B] focus:border-[#869CFF] focus:ring-2 focus:ring-[#869CFF]/20";

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#F8F9FA] text-[#5F6368]">
                Loading assignment...
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F8F9FA] text-[#202124]">
            {/* Top navigation */}
            <header className="sticky top-0 z-30 border-b border-[#E0E3E7] bg-white">
                <div className="flex min-h-[72px] items-center justify-between gap-4 px-4 sm:px-8">
                    <div className="flex min-w-0 items-center gap-3">
                        <Link
                            href="/instructor-dashboard"
                            aria-label="Back to instructor dashboard"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl text-[#5F6368] transition hover:bg-gray-100"
                        >
                            ←
                        </Link>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#869CFF]/15 text-xl">
                            📝
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-[#586FD6]">
                                Codo Learn
                            </p>
                            <h1 className="truncate text-base font-semibold sm:text-lg">
                                {content.title || "Assignment Details"}
                            </h1>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={saveAssignment}
                        className="shrink-0 rounded-full bg-[#586FD6] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#455BC1] sm:px-6"
                    >
                        Save
                    </button>
                </div>
            </header>

            <div className="mx-auto flex max-w-[1440px]">
                {/* Sidebar */}
                <aside className="hidden min-h-[calc(100vh-72px)] w-[250px] shrink-0 border-r border-[#E0E3E7] bg-white px-4 py-7 md:block">
                    <p className="mb-3 px-4 text-xs font-bold uppercase tracking-wider text-[#80868B]">
                        Teaching
                    </p>

                    <Link
                        href="/instructor-dashboard"
                        className="mb-2 flex items-center gap-3 rounded-r-full px-4 py-3 text-sm font-medium text-[#3C4043] transition hover:bg-gray-100"
                    >
                        <span className="text-lg">▤</span>
                        My Courses
                    </Link>

                    <div className="mb-2 flex items-center gap-3 rounded-r-full bg-[#E8ECFF] px-4 py-3 text-sm font-semibold text-[#455BC1]">
                        <span className="text-lg">▣</span>
                        Assignments
                    </div>

                    <div className="my-6 border-t border-[#E8EAED]" />

                    <div className="rounded-2xl bg-gradient-to-br from-[#869CFF]/15 to-[#E2A3FF]/20 p-4">
                        <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-lg">
                            ✨
                        </div>
                        <p className="text-sm font-bold">
                            Keep teaching!
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#5F6368]">
                            Create clear assignments and share helpful
                            learning materials with your students.
                        </p>
                    </div>
                </aside>

                {/* Main content */}
                <div className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-9 lg:px-12">
                    <div className="mx-auto max-w-4xl">
                        {/* Breadcrumb */}
                        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-[#5F6368]">
                            <Link
                                href="/instructor-dashboard"
                                className="hover:text-[#586FD6] hover:underline"
                            >
                                Dashboard
                            </Link>
                            <span>›</span>
                            <span className="font-medium text-[#202124]">
                                Assignment editor
                            </span>
                        </div>

                        {/* Assignment banner */}
                        <section className="relative mb-7 overflow-hidden rounded-2xl border border-[#E0E3E7] bg-white">
                            <div className="h-2 bg-gradient-to-r from-[#869CFF] via-[#B5A0FF] to-[#E2A3FF]" />

                            <div className="p-6 sm:p-9">
                                <div className="mb-4 flex flex-wrap items-center gap-2">
                                    <span className="rounded-full bg-[#E8ECFF] px-3 py-1 text-xs font-bold text-[#455BC1]">
                                        ASSIGNMENT
                                    </span>
                                </div>

                                <h2 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
                                    {content.title || "Untitled Assignment"}
                                </h2>

                                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5F6368]">
                                    Add instructions, reference links, images,
                                    and files to help students complete their
                                    assignment.
                                </p>

                                <div className="mt-6 flex flex-wrap gap-3 text-xs text-[#5F6368]">
                                    <span className="rounded-full border border-[#E0E3E7] px-3 py-2">
                                        {content.description.trim()
                                            ? "Instructions added"
                                            : "No instructions yet"}
                                    </span>
                                    <span className="rounded-full border border-[#E0E3E7] px-3 py-2">
                                        {content.referenceLink.trim()
                                            ? "Reference link added"
                                            : "No reference link"}
                                    </span>
                                    <span className="rounded-full border border-[#E0E3E7] px-3 py-2">
                                        {content.attachments.length} files
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Status message */}
                        {message && (
                            <div
                                role="status"
                                className={`mb-6 flex items-start gap-3 rounded-xl border p-4 text-sm ${messageType === "success"
                                    ? "border-[#C6E7D0] bg-[#EAF5ED] text-[#216E39]"
                                    : "border-red-200 bg-red-50 text-red-700"
                                    }`}
                            >
                                <span>
                                    {messageType === "success" ? "✓" : "!"}
                                </span>
                                <p>{message}</p>
                            </div>
                        )}

                        <div className="space-y-5">
                            {/* Assignment title */}
                            <section className="rounded-2xl border border-[#E0E3E7] bg-white p-5 sm:p-7">
                                <div className="mb-5 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8ECFF] text-lg">
                                        📝
                                    </div>

                                    <div>
                                        <h3 className="font-bold">
                                            Assignment information
                                        </h3>
                                        <p className="mt-1 text-sm text-[#5F6368]">
                                            Give your assignment a clear title.
                                        </p>
                                    </div>
                                </div>

                                <label
                                    htmlFor="assignment-title"
                                    className="mb-2 block text-sm font-medium text-[#202124]"
                                >
                                    Assignment title
                                </label>

                                <input
                                    id="assignment-title"
                                    value={content.title}
                                    onChange={(event) =>
                                        updateField("title", event.target.value)
                                    }
                                    placeholder="Enter assignment title..."
                                    className={inputClass}
                                />
                            </section>

                            {/* Description */}
                            <section className="rounded-2xl border border-[#E0E3E7] bg-white p-5 sm:p-7">
                                <div className="mb-5 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8ECFF] text-lg">
                                        📄
                                    </div>

                                    <div>
                                        <h3 className="font-bold">
                                            Assignment instructions
                                        </h3>
                                        <p className="mt-1 text-sm text-[#5F6368]">
                                            Explain the requirements and what
                                            students need to submit.
                                        </p>
                                    </div>
                                </div>

                                <label
                                    htmlFor="assignment-description"
                                    className="mb-2 block text-sm font-medium text-[#202124]"
                                >
                                    Description and instructions
                                </label>

                                <textarea
                                    id="assignment-description"
                                    value={content.description}
                                    onChange={(event) =>
                                        updateField(
                                            "description",
                                            event.target.value
                                        )
                                    }
                                    placeholder="Write the assignment instructions here..."
                                    rows={9}
                                    className={`${inputClass} resize-y leading-7`}
                                />

                                <p className="mt-3 text-xs text-[#80868B]">
                                    Include the task requirements and any
                                    important submission guidelines.
                                </p>
                            </section>

                            {/* Reference link */}
                            <section className="rounded-2xl border border-[#E0E3E7] bg-white p-5 sm:p-7">
                                <div className="mb-5 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E4F4EA] text-lg">
                                        🔗
                                    </div>

                                    <div>
                                        <h3 className="font-bold">
                                            Reference materials
                                        </h3>
                                        <p className="mt-1 text-sm text-[#5F6368]">
                                            Share articles, documentation, or
                                            useful websites.
                                        </p>
                                    </div>
                                </div>

                                <label
                                    htmlFor="assignment-reference"
                                    className="mb-2 block text-sm font-medium text-[#202124]"
                                >
                                    Reference URL
                                </label>

                                <input
                                    id="assignment-reference"
                                    type="url"
                                    value={content.referenceLink}
                                    onChange={(event) =>
                                        updateField(
                                            "referenceLink",
                                            event.target.value
                                        )
                                    }
                                    placeholder="https://example.com"
                                    className={inputClass}
                                />

                                {content.referenceLink.trim() && (
                                    <a
                                        href={content.referenceLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-3 inline-block break-all text-sm font-semibold text-[#455BC1] hover:underline"
                                    >
                                        Open reference link ↗
                                    </a>
                                )}
                            </section>

                            {/* Assignment Video */}
                            <section className="rounded-2xl border border-[#E0E3E7] bg-white p-5 sm:p-7">
                                <div className="mb-5 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8ECFF] text-lg">
                                        🎬
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-[#202124]">
                                            Assignment Video
                                        </h3>
                                        <p className="mt-1 text-sm text-[#5F6368]">
                                            Add a video URL or upload a video from your device.
                                        </p>
                                    </div>
                                </div>

                                {/* Video URL */}
                                <div className="mb-6">
                                    <label
                                        htmlFor="assignment-video-url"
                                        className="mb-2 block text-sm font-medium text-[#202124]"
                                    >
                                        Video URL
                                    </label>

                                    <input
                                        id="assignment-video-url"
                                        type="url"
                                        value={content.videoUrl}
                                        onChange={(event) =>
                                            updateField("videoUrl", event.target.value)
                                        }
                                        placeholder="https://example.com/video.mp4"
                                        className={inputClass}
                                    />

                                    {content.videoUrl.trim() && (
                                        <a
                                            href={content.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-3 inline-block break-all text-sm font-semibold text-[#455BC1] hover:underline"
                                        >
                                            Open video link ↗
                                        </a>
                                    )}

                                    <p className="mt-2 text-xs text-[#80868B]">
                                        Paste a direct video link or a link to a video platform.
                                    </p>
                                </div>

                                {/* Divider */}
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-[#E0E3E7]" />
                                    <span className="text-xs font-medium text-[#80868B]">
                                        OR UPLOAD A VIDEO
                                    </span>
                                    <div className="h-px flex-1 bg-[#E0E3E7]" />
                                </div>

                                {/* Upload */}
                                {!videoPreview ? (
                                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#C9CEFF] bg-[#F8F9FF] px-5 py-9 text-center transition hover:bg-[#F0F2FF]">
                                        <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8ECFF] text-3xl">
                                            📁
                                        </span>

                                        <span className="text-sm font-bold text-[#202124]">
                                            Choose a video from your device
                                        </span>

                                        <span className="mt-2 text-xs text-[#80868B]">
                                            MP4, WebM, or other supported video formats · Up to 100 MB
                                        </span>

                                        <span className="mt-4 rounded-xl bg-[#586FD6] px-5 py-3 text-sm font-semibold text-white">
                                            Browse Videos
                                        </span>

                                        <input
                                            type="file"
                                            accept="video/*"
                                            onChange={handleVideoUpload}
                                            className="sr-only"
                                        />
                                    </label>
                                ) : (
                                    <div className="rounded-2xl border border-[#E0E3E7] bg-[#F8F9FC] p-4">
                                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E2A3FF]/30 text-2xl">
                                                    🎥
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="break-all text-sm font-semibold text-[#202124]">
                                                        {videoName}
                                                    </p>
                                                    <p className="mt-1 text-xs text-[#80868B]">
                                                        {videoSize} MB
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={removeVideo}
                                                className="rounded-lg px-3 py-2 text-sm font-semibold text-[#B3261E] hover:bg-red-50"
                                            >
                                                Remove video
                                            </button>
                                        </div>

                                        <video
                                            src={videoPreview}
                                            controls
                                            className="max-h-[400px] w-full rounded-xl bg-black"
                                        />

                                        <p className="mt-3 text-xs text-[#80868B]">
                                            Preview only — the uploaded video is not stored permanently.
                                        </p>
                                    </div>
                                )}
                            </section>


                            {/* Attachments */}
                            <section className="rounded-2xl border border-[#E0E3E7] bg-white p-5 sm:p-7">
                                <div className="mb-5 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF0DC] text-lg">
                                        🖼️
                                    </div>

                                    <div>
                                        <h3 className="font-bold">
                                            Images and files
                                        </h3>
                                        <p className="mt-1 text-sm text-[#5F6368]">
                                            Upload images, PDFs, documents, and
                                            other assignment resources.
                                        </p>
                                    </div>
                                </div>

                                {content.attachments.length > 0 && (
                                    <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {content.attachments.map((file) => (
                                            <div
                                                key={file.id}
                                                className="min-w-0 overflow-hidden rounded-xl border border-[#E0E3E7] bg-white p-3"
                                            >
                                                {file.type.startsWith("image/") ? (
                                                    <a
                                                        href={file.data}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={file.data}
                                                            alt={file.name}
                                                            className="h-40 w-full rounded-lg object-cover"
                                                        />
                                                    </a>
                                                ) : (
                                                    <div className="flex h-24 items-center justify-center rounded-xl bg-[#E8ECFF] text-3xl">
                                                        📄
                                                    </div>
                                                )}

                                                <p
                                                    className="mt-3 truncate text-sm font-semibold text-[#202124]"
                                                    title={file.name}
                                                >
                                                    {file.name}
                                                </p>

                                                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                                                    <a
                                                        href={file.data}
                                                        download={file.name}
                                                        className="text-sm font-semibold text-[#455BC1] hover:underline"
                                                    >
                                                        Download
                                                    </a>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeAttachment(file.id)
                                                        }
                                                        className="rounded-lg px-2 py-1 text-sm font-semibold text-[#B3261E] hover:bg-red-50"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {content.attachments.length < 10 && (
                                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#C7D0FF] bg-[#F8F9FF] px-5 py-9 text-center transition hover:bg-[#F0F2FF]">
                                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl text-[#586FD6] shadow-sm">
                                            +
                                        </span>

                                        <span className="mt-3 text-sm font-bold text-[#3C4043]">
                                            Upload images or files
                                        </span>

                                        <span className="mt-1 text-xs text-[#80868B]">
                                            Images, PDF, DOC, DOCX, TXT, ZIP ·
                                            Maximum 2 MB each
                                        </span>

                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*,.pdf,.doc,.docx,.txt,.zip"
                                            onChange={handleFiles}
                                            className="sr-only"
                                        />
                                    </label>
                                )}

                                <p className="mt-3 text-xs text-[#80868B]">
                                    {content.attachments.length} of 10 files added
                                </p>
                            </section>

                            {/* Bottom actions */}
                            <div className="flex flex-col-reverse justify-between gap-3 border-t border-[#E0E3E7] pt-5 sm:flex-row sm:items-center">
                                <Link
                                    href="/instructor-dashboard"
                                    className="rounded-full border border-[#DADCE0] bg-white px-5 py-3 text-center text-sm font-semibold text-[#3C4043] transition hover:bg-gray-50"
                                >
                                    ← Back to dashboard
                                </Link>

                                <button
                                    type="button"
                                    onClick={saveAssignment}
                                    className="rounded-full bg-[#586FD6] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#455BC1]"
                                >
                                    Save assignment
                                </button>
                            </div>

                            <p className="pb-5 text-center text-xs leading-5 text-[#80868B]">
                                Demo mode: assignment content is saved in this
                                browser only. Sharing it with students requires
                                a backend and file storage.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

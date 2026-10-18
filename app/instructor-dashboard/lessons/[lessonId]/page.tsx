
"use client";

import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Lesson = {
    id: number;
    courseId: number;
    title: string;
    type: string;
};

type LessonContent = {
    description: string;
    videoUrl: string;
    links: string[];
    images: string[];
};

const EMPTY_CONTENT: LessonContent = {
    description: "",
    videoUrl: "",
    links: [],
    images: [],
};

const CONTENT_KEY = "codo-instructor-lesson-content-";

export default function LessonDetailsPage() {

    const params = useParams<{ lessonId: string }>();
    const lessonId = Number(params.lessonId);

    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [content, setContent] = useState<LessonContent>(EMPTY_CONTENT);
    const [resourceUrl, setResourceUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error">("success");

    useEffect(() => {
        try {
            const savedLessons = localStorage.getItem("codo-instructor-lessons");

            if (savedLessons) {
                const parsed: unknown = JSON.parse(savedLessons);

                if (Array.isArray(parsed)) {
                    const found = parsed.find(
                        (item) =>
                            item &&
                            item.id === lessonId &&
                            typeof item.title === "string" &&
                            typeof item.courseId === "number"
                    );

                    if (found) setLesson(found as Lesson);
                }
            }

            const savedContent = localStorage.getItem(CONTENT_KEY + lessonId);

            if (savedContent) {
                const parsed: unknown = JSON.parse(savedContent);

                if (
                    parsed &&
                    typeof parsed === "object" &&
                    "description" in parsed &&
                    "videoUrl" in parsed &&
                    "links" in parsed &&
                    "images" in parsed &&
                    typeof parsed.description === "string" &&
                    typeof parsed.videoUrl === "string" &&
                    Array.isArray(parsed.links) &&
                    parsed.links.every((item) => typeof item === "string") &&
                    Array.isArray(parsed.images) &&
                    parsed.images.every((item) => typeof item === "string")
                ) {
                    setContent(parsed as LessonContent);
                }
            }
        } catch {
            setMessageType("error");
            setMessage("Could not load saved lesson data.");
        } finally {
            setLoading(false);
        }
    }, [lessonId]);

    function updateContent(updates: Partial<LessonContent>) {
        setContent((previous) => ({ ...previous, ...updates }));
        setMessage("");
    }

    function saveContent() {
        if (content.videoUrl.trim()) {
            try {
                const video = new URL(content.videoUrl.trim());

                if (!["http:", "https:"].includes(video.protocol)) {
                    throw new Error("Invalid video URL");
                }
            } catch {
                setMessageType("error");
                setMessage("Please enter a valid video URL, or clear the field.");
                return;
            }
        }

        try {
            localStorage.setItem(
                CONTENT_KEY + lessonId,
                JSON.stringify(content)
            );
            setMessageType("success");
            setMessage("Lesson content saved successfully.");
        } catch {
            setMessageType("error");
            setMessage("Could not save the content. Try removing some large images.");
        }
    }

    function addResource(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const url = resourceUrl.trim();

        try {
            const parsed = new URL(url);

            if (!["http:", "https:"].includes(parsed.protocol)) {
                throw new Error("Invalid URL");
            }
        } catch {
            setMessageType("error");
            setMessage("Please enter a valid HTTP or HTTPS link.");
            return;
        }

        if (content.links.includes(url)) {
            setMessageType("error");
            setMessage("This resource has already been added.");
            return;
        }

        updateContent({ links: [...content.links, url] });
        setResourceUrl("");
    }

    function removeResource(url: string) {
        updateContent({
            links: content.links.filter((item) => item !== url),
        });
    }

    function addImages(event: ChangeEvent<HTMLInputElement>) {
        const files = Array.from(event.target.files ?? []);
        event.target.value = "";

        if (!files.length) return;

        const available = 5 - content.images.length;

        if (available <= 0) {
            setMessageType("error");
            setMessage("You can add up to 5 images per lesson.");
            return;
        }

        if (files.length > available) {
            setMessageType("error");
            setMessage(`You can add only ${available} more image(s).`);
            return;
        }

        if (
            files.some(
                (file) =>
                    !file.type.startsWith("image/") ||
                    file.size > 5 * 1024 * 1024
            )
        ) {
            setMessageType("error");
            setMessage("Each file must be an image no larger than 5 MB.");
            return;
        }

        Promise.all(
            files.map(
                (file) =>
                    new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();

                        reader.onload = () => {
                            if (typeof reader.result === "string") {
                                resolve(reader.result);
                            } else {
                                reject(new Error("Could not read image."));
                            }
                        };

                        reader.onerror = () =>
                            reject(new Error("Could not read image."));

                        reader.readAsDataURL(file);
                    })
            )
        )
            .then((images) => {
                setContent((previous) => ({
                    ...previous,
                    images: [...previous.images, ...images],
                }));
                setMessage("");
            })
            .catch(() => {
                setMessageType("error");
                setMessage("Could not read one of the selected images.");
            });
    }

    function removeImage(index: number) {
        updateContent({
            images: content.images.filter((_, i) => i !== index),
        });
    }

    const inputClass =
        "w-full rounded-xl border border-[#DADCE0] bg-white px-4 py-3 text-sm text-[#202124] outline-none transition placeholder:text-[#80868B] focus:border-[#869CFF] focus:ring-2 focus:ring-[#869CFF]/20";

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#F8F9FA] text-[#5F6368]">
                Loading lesson...
            </main>
        );
    }

    if (!lesson || !Number.isFinite(lessonId) || lessonId <= 0) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F8F9FA] p-6 text-[#202124]">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#869CFF]/15 text-3xl">
                    📚
                </div>
                <h1 className="text-2xl font-bold">Lesson not found</h1>
                <p className="text-center text-sm text-[#5F6368]">
                    This lesson may have been removed or is unavailable.
                </p>
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
                            📘
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-[#586FD6]">
                                Codo Learn
                            </p>
                            <h1 className="truncate text-base font-semibold sm:text-lg">
                                {lesson.title}
                            </h1>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={saveContent}
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
                        Current Lesson
                    </div>

                    <div className="my-6 border-t border-[#E8EAED]" />

                    <div className="rounded-2xl bg-gradient-to-br from-[#869CFF]/15 to-[#E2A3FF]/20 p-4">
                        <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-lg">
                            ✨
                        </div>
                        <p className="text-sm font-bold">Keep teaching!</p>
                        <p className="mt-1 text-xs leading-5 text-[#5F6368]">
                            Add helpful resources to make your lesson more engaging.
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
                            <span className="font-medium text-[#202124]">Lesson editor</span>
                        </div>

                        {/* Lesson banner */}
                        <section className="relative mb-7 overflow-hidden rounded-2xl border border-[#E0E3E7] bg-white">
                            <div className="h-2 bg-gradient-to-r from-[#869CFF] via-[#B5A0FF] to-[#E2A3FF]" />

                            <div className="p-6 sm:p-9">
                                <div className="mb-4 flex flex-wrap items-center gap-2">
                                    <span className="rounded-full bg-[#E8ECFF] px-3 py-1 text-xs font-bold text-[#455BC1]">
                                        LESSON
                                    </span>

                                </div>

                                <h2 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
                                    {lesson.title}
                                </h2>

                                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5F6368]">
                                    Organize your lesson content and share useful learning
                                    materials with your students.
                                </p>

                                <div className="mt-6 flex flex-wrap gap-3 text-xs text-[#5F6368]">
                                    <span className="rounded-full border border-[#E0E3E7] px-3 py-2">
                                        {content.links.length} resource links
                                    </span>
                                    <span className="rounded-full border border-[#E0E3E7] px-3 py-2">
                                        {content.images.length}/5 images
                                    </span>
                                    <span className="rounded-full border border-[#E0E3E7] px-3 py-2">
                                        {content.videoUrl ? "Video added" : "No video yet"}
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
                                <span>{messageType === "success" ? "✓" : "!"}</span>
                                <p>{message}</p>
                            </div>
                        )}

                        <div className="space-y-5">

                            {/* Description */}
                            <section className="rounded-2xl border border-[#E0E3E7] bg-white p-5 sm:p-7">
                                <div className="mb-5 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8ECFF] text-lg">
                                        📝
                                    </div>

                                    <div>
                                        <h3 className="font-bold">Lesson description</h3>
                                        <p className="mt-1 text-sm text-[#5F6368]">
                                            Write and format your lesson description.
                                        </p>
                                    </div>
                                </div>

                                <label className="mb-2 block text-sm font-medium">
                                    Description and instructions
                                </label>

                                <RichTextEditor
                                    value={content.description}
                                    onChange={(description) => {
                                        updateContent({ description });
                                    }}
                                />

                                <p className="mt-3 text-xs text-[#80868B]">
                                    Select text to format it. Remember to save your lesson.
                                </p>
                            </section>


                            {/* Video Section */}
                            <section className="rounded-2xl border border-[#E0E3E7] bg-white p-5 sm:p-7">
                                <div className="mb-5 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8ECFF] text-lg">
                                        🎬
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-[#202124]">Lesson Video</h3>
                                        <p className="mt-1 text-sm text-[#5F6368]">
                                            Add a video URL or choose a video from your device.
                                        </p>
                                    </div>
                                </div>

                                {/* Video URL */}
                                <div className="mb-6">
                                    <label
                                        htmlFor="lesson-video-url"
                                        className="mb-2 block text-sm font-medium text-[#202124]"
                                    >
                                        Video URL
                                    </label>

                                    <input
                                        id="lesson-video-url"
                                        type="url"
                                        value={content.videoUrl}
                                        onChange={(event) =>
                                            updateContent({ videoUrl: event.target.value })
                                        }
                                        placeholder="https://example.com/video.mp4"
                                        className={inputClass}
                                    />

                                    <p className="mt-2 text-xs text-[#80868B]">
                                        Paste a link to your lesson video.
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

                                {/* Upload Video UI */}
                                <VideoUploadPreview />
                            </section>

                            {/* Resource links */}
                            <section className="rounded-2xl border border-[#E0E3E7] bg-white p-5 sm:p-7">
                                <div className="mb-5 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E4F4EA] text-lg">
                                        🔗
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Learning materials</h3>
                                        <p className="mt-1 text-sm text-[#5F6368]">
                                            Share articles, documentation, and useful websites.
                                        </p>
                                    </div>
                                </div>

                                <form
                                    onSubmit={addResource}
                                    className="flex flex-col gap-3 sm:flex-row"
                                >
                                    <input
                                        type="url"
                                        required
                                        value={resourceUrl}
                                        onChange={(event) => setResourceUrl(event.target.value)}
                                        placeholder="Paste a resource link..."
                                        className={`${inputClass} flex-1`}
                                    />
                                    <button
                                        type="submit"
                                        className="rounded-full bg-[#E8ECFF] px-5 py-3 text-sm font-bold text-[#455BC1] transition hover:bg-[#DCE3FF]"
                                    >
                                        + Add link
                                    </button>
                                </form>

                                <div className="mt-5 space-y-3">
                                    {content.links.length === 0 ? (
                                        <div className="rounded-xl border border-dashed border-[#DADCE0] bg-[#FAFBFC] px-4 py-8 text-center">
                                            <p className="text-sm font-medium text-[#5F6368]">
                                                No learning materials yet
                                            </p>
                                            <p className="mt-1 text-xs text-[#80868B]">
                                                Add your first resource using the field above.
                                            </p>
                                        </div>
                                    ) : (
                                        content.links.map((url) => (
                                            <div
                                                key={url}
                                                className="flex min-w-0 items-center gap-3 rounded-xl border border-[#E0E3E7] p-3 sm:p-4"
                                            >
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F1F3F4] text-lg">
                                                    ↗
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <a
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block break-all text-sm font-semibold text-[#455BC1] hover:underline"
                                                    >
                                                        {url}
                                                    </a>
                                                    <p className="mt-1 text-xs text-[#80868B]">
                                                        External learning resource
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeResource(url)}
                                                    aria-label="Remove resource"
                                                    className="shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-[#B3261E] hover:bg-red-50"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>

                            {/* Images */}
                            <section className="rounded-2xl border border-[#E0E3E7] bg-white p-5 sm:p-7">
                                <div className="mb-5 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF0DC] text-lg">
                                        🖼️
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Images and visual materials</h3>
                                        <p className="mt-1 text-sm text-[#5F6368]">
                                            Upload up to 5 images, maximum 5 MB per image.
                                        </p>
                                    </div>
                                </div>

                                {content.images.length > 0 && (
                                    <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                        {content.images.map((src, index) => (
                                            <div
                                                key={`${index}-${src.slice(0, 30)}`}
                                                className="overflow-hidden rounded-xl border border-[#E0E3E7] bg-white"
                                            >
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={src}
                                                    alt={`Lesson image ${index + 1}`}
                                                    className="h-36 w-full object-cover sm:h-44"
                                                />
                                                <div className="flex items-center justify-between gap-2 p-3">
                                                    <span className="text-xs font-medium text-[#5F6368]">
                                                        Image {index + 1}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="text-xs font-semibold text-[#B3261E] hover:underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {content.images.length < 5 && (
                                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#C7D0FF] bg-[#F8F9FF] px-5 py-9 text-center transition hover:bg-[#F0F2FF]">
                                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl text-[#586FD6] shadow-sm">
                                            +
                                        </span>
                                        <span className="mt-3 text-sm font-bold text-[#3C4043]">
                                            Upload images
                                        </span>
                                        <span className="mt-1 text-xs text-[#80868B]">
                                            PNG, JPG, WebP · Up to 5 MB each
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={addImages}
                                            className="sr-only"
                                        />
                                    </label>
                                )}

                                <p className="mt-3 text-xs text-[#80868B]">
                                    {content.images.length} of 5 images added
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
                                    onClick={saveContent}
                                    className="rounded-full bg-[#586FD6] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#455BC1]"
                                >
                                    Save lesson content
                                </button>
                            </div>

                            <p className="pb-5 text-center text-xs leading-5 text-[#80868B]">
                                Demo mode: lesson content is saved in this browser only.
                                Shared student access and real file uploads require a backend
                                and file storage.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

type RichTextEditorProps = {
    value: string;
    onChange: (value: string) => void;
};

function RichTextEditor({
    value,
    onChange,
}: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const editor = editorRef.current;

        if (editor && editor.innerHTML !== value) {
            editor.innerHTML = value || "";
        }
    }, [value]);

    function runCommand(
        command: string,
        argument?: string
    ) {
        const editor = editorRef.current;

        if (!editor) return;

        editor.focus();

        document.execCommand(
            command,
            false,
            argument
        );

        onChange(editor.innerHTML);
    }

    function handleInput() {
        const editor = editorRef.current;

        if (editor) {
            onChange(editor.innerHTML);
        }
    }

    const buttonClass =
        "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-[#DADCE0] bg-white px-3 text-sm text-[#3C4043] transition hover:bg-[#E8ECFF] hover:text-[#455BC1]";

    return (
        <div className="overflow-hidden rounded-xl border border-[#DADCE0] bg-white">
            {/* Toolbar */}
            <div className="border-b border-[#E0E3E7] bg-[#F8F9FC] p-3">
                <div className="flex flex-wrap items-center gap-2">
                    {/* Font family */}
                    <select
                        aria-label="Font family"
                        defaultValue="Arial"
                        className="h-9 max-w-full rounded-lg border border-[#DADCE0] bg-white px-2 text-sm"
                        onChange={(event) =>
                            runCommand("fontName", event.target.value)
                        }
                    >
                        <option value="Arial">Arial</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Tahoma">Tahoma</option>
                        <option value="Times New Roman">
                            Times New Roman
                        </option>
                        <option value="Courier New">
                            Courier New
                        </option>
                    </select>

                    {/* Font size */}
                    <select
                        aria-label="Font size"
                        defaultValue="3"
                        className="h-9 rounded-lg border border-[#DADCE0] bg-white px-2 text-sm"
                        onChange={(event) =>
                            runCommand("fontSize", event.target.value)
                        }
                    >
                        <option value="1">Small</option>
                        <option value="2">Small +</option>
                        <option value="3">Normal</option>
                        <option value="4">Large</option>
                        <option value="5">Larger</option>
                        <option value="6">Very large</option>
                        <option value="7">Huge</option>
                    </select>

                    {/* Bold */}
                    <button
                        type="button"
                        title="Bold"
                        aria-label="Bold"
                        className={`${buttonClass} font-black`}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => runCommand("bold")}
                    >
                        B
                    </button>

                    {/* Italic */}
                    <button
                        type="button"
                        title="Italic"
                        aria-label="Italic"
                        className={`${buttonClass} italic`}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => runCommand("italic")}
                    >
                        I
                    </button>

                    {/* Underline */}
                    <button
                        type="button"
                        title="Underline"
                        aria-label="Underline"
                        className={`${buttonClass} underline`}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => runCommand("underline")}
                    >
                        U
                    </button>

                    {/* Text color */}
                    <label className="flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-[#DADCE0] bg-white px-2 text-xs font-medium">
                        <span>Text color</span>
                        <input
                            type="color"
                            aria-label="Text color"
                            defaultValue="#202124"
                            className="h-6 w-6 cursor-pointer border-0 bg-transparent p-0"
                            onChange={(event) =>
                                runCommand("foreColor", event.target.value)
                            }
                        />
                    </label>

                    {/* Highlight color */}
                    <label className="flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-[#DADCE0] bg-white px-2 text-xs font-medium">
                        <span>Highlight</span>
                        <input
                            type="color"
                            aria-label="Highlight color"
                            defaultValue="#E2A3FF"
                            className="h-6 w-6 cursor-pointer border-0 bg-transparent p-0"
                            onChange={(event) =>
                                runCommand("hiliteColor", event.target.value)
                            }
                        />
                    </label>

                    {/* Alignment */}
                    <button
                        type="button"
                        title="Align left"
                        aria-label="Align left"
                        className={buttonClass}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => runCommand("justifyLeft")}
                    >
                        ⇤
                    </button>

                    <button
                        type="button"
                        title="Center"
                        aria-label="Center"
                        className={buttonClass}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => runCommand("justifyCenter")}
                    >
                        ☰
                    </button>

                    <button
                        type="button"
                        title="Align right"
                        aria-label="Align right"
                        className={buttonClass}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => runCommand("justifyRight")}
                    >
                        ⇥
                    </button>

                    {/* Lists */}
                    <button
                        type="button"
                        title="Bullet list"
                        className={buttonClass}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => runCommand("insertUnorderedList")}
                    >
                        • List
                    </button>

                    <button
                        type="button"
                        title="Numbered list"
                        className={buttonClass}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => runCommand("insertOrderedList")}
                    >
                        1. List
                    </button>

                    {/* Headings */}
                    <button
                        type="button"
                        title="Heading"
                        className={buttonClass}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() =>
                            runCommand("formatBlock", "h2")
                        }
                    >
                        H2
                    </button>

                    <button
                        type="button"
                        title="Paragraph"
                        className={buttonClass}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() =>
                            runCommand("formatBlock", "p")
                        }
                    >
                        P
                    </button>

                    {/* Clear formatting */}
                    <button
                        type="button"
                        title="Clear formatting"
                        className={buttonClass}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => runCommand("removeFormat")}
                    >
                        Clear
                    </button>
                </div>
            </div>

            {/* Editable description */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                role="textbox"
                aria-label="Lesson description editor"
                aria-multiline="true"
                onInput={handleInput}
                className="min-h-[280px] px-4 py-4 text-sm leading-7 text-[#202124] outline-none [&_h2]:mb-3 [&_h2]:mt-4 [&_h2]:text-2xl [&_h2]:font-bold [&_p]:my-2 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6"
                data-placeholder="Write your lesson description here..."
            />
        </div>
    );
}

function VideoUploadPreview() {
    const [videoName, setVideoName] = useState("");
    const [videoPreview, setVideoPreview] = useState("");
    const [videoSize, setVideoSize] = useState("");

    function handleVideoChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("video/")) {
            alert("Please choose a valid video file.");
            event.target.value = "";
            return;
        }

        if (file.size > 100 * 1024 * 1024) {
            alert("Please choose a video smaller than 100 MB.");
            event.target.value = "";
            return;
        }

        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
        }

        setVideoName(file.name);
        setVideoSize((file.size / (1024 * 1024)).toFixed(2));
        setVideoPreview(URL.createObjectURL(file));
    }

    useEffect(() => {
        return () => {
            if (videoPreview) {
                URL.revokeObjectURL(videoPreview);
            }
        };
    }, [videoPreview]);

    return (
        <div className="rounded-2xl border-2 border-dashed border-[#C9CEFF] bg-[#F8F8FC] p-5 sm:p-8">
            <input
                id="lesson-video-upload"
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
            />

            {!videoPreview ? (
                <label
                    htmlFor="lesson-video-upload"
                    className="flex cursor-pointer flex-col items-center text-center"
                >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8ECFF] text-3xl">
                        📁
                    </div>

                    <h4 className="font-bold text-[#202124]">
                        Choose a video from your device
                    </h4>

                    <p className="mt-2 text-sm text-[#5F6368]">
                        Click to browse your files
                    </p>

                    <span className="mt-4 rounded-xl bg-[#869CFF] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                        Browse Videos
                    </span>

                    <p className="mt-3 text-xs text-[#80868B]">
                        Video files only · Maximum 100 MB
                    </p>
                </label>
            ) : (
                <div>
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2A3FF]/30 text-2xl">
                                🎥
                            </div>

                            <div>
                                <p className="max-w-[220px] break-words text-sm font-semibold text-[#202124]">
                                    {videoName}
                                </p>
                                <p className="mt-1 text-xs text-[#80868B]">
                                    {videoSize} MB
                                </p>
                            </div>
                        </div>

                        <label
                            htmlFor="lesson-video-upload"
                            className="cursor-pointer rounded-lg border border-[#DADCE0] bg-white px-4 py-2 text-sm font-medium text-[#455BC1] hover:bg-[#E8ECFF]"
                        >
                            Change video
                        </label>
                    </div>

                    <video
                        src={videoPreview}
                        controls
                        className="max-h-[400px] w-full rounded-xl bg-black"
                    />

                    <button
                        type="button"
                        onClick={() => {
                            URL.revokeObjectURL(videoPreview);
                            setVideoPreview("");
                            setVideoName("");
                            setVideoSize("");
                        }}
                        className="mt-4 text-sm font-medium text-red-500 hover:text-red-700"
                    >
                        Remove video
                    </button>

                    <p className="mt-3 text-xs text-[#80868B]">
                        Preview only — this video has not been uploaded.
                    </p>
                </div>
            )}
        </div>
    );
}



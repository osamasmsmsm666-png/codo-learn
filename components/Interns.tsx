"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const interns = [
    {
        name: "Ahmed Mohamed",
        role: "Frontend Intern",
        description:
            "Building modern web experiences and learning advanced frontend technologies.",
        video: "https://www.youtube.com/embed/VIDEO_ID_1",
    },
    {
        name: "Sara Ahmed",
        role: "UI / UX Intern",
        description:
            "Creating clean interfaces and turning ideas into engaging digital experiences.",
        video: "https://www.youtube.com/embed/VIDEO_ID_2",
    },
    {
        name: "Omar Ali",
        role: "Backend Intern",
        description:
            "Working with APIs, databases, and scalable backend systems.",
        video: "https://www.youtube.com/embed/VIDEO_ID_3",
    },
    {
        name: "Mariam Hassan",
        role: "Full Stack Intern",
        description:
            "Developing complete digital products from frontend to backend.",
        video: "https://www.youtube.com/embed/VIDEO_ID_4",
    },
];

export default function Interns() {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    return (
        <section
            id="interns"
            className="bg-[#F8F8FC] px-6 py-24"
        >
            <div className="mx-auto max-w-7xl">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="mb-14 max-w-3xl"
                >
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#869CFF]">
                        Internship Program
                    </p>

                    <h2 className="text-4xl font-black leading-tight tracking-tight text-[#20243A] md:text-6xl">
                        Meet Our
                        <span className="bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] bg-clip-text text-transparent">
                            {" "}Interns.
                        </span>
                    </h2>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-[#7B829D]">
                        Real people. Real projects. Real experience.
                        Discover what our interns are building and how they're growing
                        with Codo Learn.
                    </p>
                </motion.div>

                {/* Featured Video */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                    className="group relative mb-10 overflow-hidden rounded-[32px] bg-[#20243A] shadow-xl"
                >
                    <div className="grid min-h-[420px] md:grid-cols-2">

                        {/* Video Area */}
                        <div
                            onClick={() => setSelectedVideo(interns[0].video)}
                            className="relative flex cursor-pointer items-center justify-center overflow-hidden bg-gradient-to-br from-[#869CFF] to-[#E2A3FF]"
                        >
                            {/* Decorative Circles */}
                            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
                            <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

                            {/* Play Button */}
                            <motion.div
                                whileHover={{ scale: 1.12 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-2xl"
                            >
                                <span className="ml-1 text-3xl text-[#869CFF]">
                                    ▶
                                </span>
                            </motion.div>

                            <div className="absolute bottom-6 left-6 rounded-full bg-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                                Featured Intern
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col justify-center p-8 md:p-12">

                            <p className="text-sm font-bold uppercase tracking-widest text-[#E2A3FF]">
                                {interns[0].role}
                            </p>

                            <h3 className="mt-4 text-3xl font-black text-white md:text-4xl">
                                {interns[0].name}
                            </h3>

                            <p className="mt-5 max-w-md leading-7 text-white/60">
                                {interns[0].description}
                            </p>

                            <button
                                onClick={() => setSelectedVideo(interns[0].video)}
                                className="mt-8 w-fit rounded-full bg-white px-6 py-3 font-bold text-[#20243A] transition hover:-translate-y-1 hover:bg-[#E2A3FF]"
                            >
                                Watch Story →
                            </button>

                        </div>
                    </div>
                </motion.div>

                {/* Video Cards */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.12,
                            },
                        },
                    }}
                    className="grid gap-5 md:grid-cols-3"
                >
                    {interns.slice(1).map((intern) => (
                        <motion.div
                            key={intern.name}
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 40,
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                },
                            }}
                            transition={{ duration: 0.6 }}
                            whileHover={{ y: -8 }}
                            className="overflow-hidden rounded-[28px] border border-[#E8EAF3] bg-white shadow-sm transition-shadow hover:shadow-xl"
                        >

                            {/* Video Thumbnail */}
                            <div
                                onClick={() => setSelectedVideo(intern.video)}
                                className="group relative flex h-52 cursor-pointer items-center justify-center overflow-hidden bg-gradient-to-br from-[#869CFF]/80 to-[#E2A3FF]/80"
                            >

                                {/* Pattern */}
                                <div className="absolute inset-0 opacity-20">
                                    <div className="absolute left-10 top-10 h-24 w-24 rounded-full border border-white" />
                                    <div className="absolute bottom-5 right-10 h-32 w-32 rounded-full border border-white" />
                                </div>

                                {/* Play */}
                                <motion.div
                                    whileHover={{ scale: 1.15 }}
                                    className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg"
                                >
                                    <span className="ml-1 text-xl text-[#869CFF]">
                                        ▶
                                    </span>
                                </motion.div>

                                {/* Duration */}
                                <span className="absolute bottom-4 right-4 rounded-md bg-black/40 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                    VIDEO
                                </span>

                            </div>

                            {/* Card Content */}
                            <div className="p-6">

                                <p className="text-xs font-bold uppercase tracking-widest text-[#869CFF]">
                                    {intern.role}
                                </p>

                                <h3 className="mt-2 text-xl font-black text-[#20243A]">
                                    {intern.name}
                                </h3>

                                <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#7B829D]">
                                    {intern.description}
                                </p>

                                <button
                                    onClick={() => setSelectedVideo(intern.video)}
                                    className="mt-5 font-bold text-[#869CFF] transition hover:text-[#E2A3FF]"
                                >
                                    Watch Video →
                                </button>

                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedVideo(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#20243A]/80 px-6 backdrop-blur-md"
                    >

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-5xl overflow-hidden rounded-[28px] bg-black shadow-2xl"
                        >

                            {/* Close */}
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg font-bold text-[#20243A] transition hover:bg-[#E2A3FF]"
                            >
                                ✕
                            </button>

                            {/* Video */}
                            <div className="aspect-video w-full">
                                <iframe
                                    src={selectedVideo}
                                    title="Intern Video"
                                    className="h-full w-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>

                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
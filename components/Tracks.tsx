"use client";

import { motion } from "motion/react";

const tracks = [
    {
        number: "01",
        title: "Web Development",
        description:
            "Master frontend, backend, databases, and build complete web applications.",
        skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    },
    {
        number: "02",
        title: "UI / UX Design",
        description:
            "Learn how to design modern interfaces and create better digital experiences.",
        skills: ["Figma", "UI Design", "UX", "Prototyping"],
    },
    {
        number: "03",
        title: "Data & AI",
        description:
            "Explore data analysis, machine learning, and the fundamentals of artificial intelligence.",
        skills: ["Python", "Data Analysis", "ML", "AI"],
    },
];

export default function Tracks() {
    return (
        <section
            id="tracks"
            className="bg-[#F8F8FC] px-6 py-24"
        >
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="max-w-2xl"
                >
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#869CFF]">
                        Learning Tracks
                    </p>

                    <h2 className="mt-4 text-4xl font-black tracking-tight text-[#20243A] md:text-5xl">
                        Choose Your

                        <span className="block bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] bg-clip-text text-transparent">
                            Career Path.
                        </span>
                    </h2>

                    <p className="mt-6 leading-7 text-[#7B829D]">
                        Follow a structured learning path and develop the skills you need
                        to move from beginner to job-ready.
                    </p>
                </motion.div>

                {/* Tracks */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.15,
                            },
                        },
                    }}
                    className="mt-14 grid gap-6 lg:grid-cols-3"
                >

                    {tracks.map((track) => (
                        <motion.div
                            key={track.number}
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 50,
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                },
                            }}
                            transition={{ duration: 0.6 }}
                            whileHover={{
                                y: -8,
                            }}
                            className="group relative overflow-hidden rounded-[32px] border border-[#E7E8F0] bg-white p-8 shadow-sm"
                        >

                            {/* Number */}
                            <div className="flex items-center justify-between">

                                <span className="text-5xl font-black text-[#E2A3FF]/40">
                                    {track.number}
                                </span>

                                <motion.div
                                    whileHover={{
                                        rotate: 45,
                                        scale: 1.1,
                                    }}
                                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#869CFF]/10 text-xl text-[#869CFF]"
                                >
                                    →
                                </motion.div>

                            </div>

                            {/* Title */}
                            <h3 className="mt-10 text-2xl font-black text-[#20243A]">
                                {track.title}
                            </h3>

                            {/* Description */}
                            <p className="mt-4 min-h-[80px] text-sm leading-6 text-[#7B829D]">
                                {track.description}
                            </p>

                            {/* Skills */}
                            <div className="mt-7 flex flex-wrap gap-2">
                                {track.skills.map((skill) => (
                                    <motion.span
                                        key={skill}
                                        whileHover={{
                                            scale: 1.05,
                                        }}
                                        className="rounded-full bg-[#F3F3F9] px-3 py-2 text-xs font-semibold text-[#5F6785]"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>

                            {/* Bottom Line */}
                            <div className="mt-8 h-[2px] w-full bg-[#F0F0F6]">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-[#869CFF] to-[#E2A3FF]"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                />
                            </div>

                        </motion.div>
                    ))}

                </motion.div>

            </div>
        </section>
    );
}
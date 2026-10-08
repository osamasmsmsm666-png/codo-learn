"use client";

import { motion } from "motion/react";

const courses = [
    {
        title: "Full Stack Development",
        category: "Web Development",
        level: "Beginner",
        duration: "6 Months",
        color: "#869CFF",
    },
    {
        title: "UI / UX Design",
        category: "Design",
        level: "Beginner",
        duration: "4 Months",
        color: "#E2A3FF",
    },
    {
        title: "Data Science",
        category: "Data",
        level: "Intermediate",
        duration: "5 Months",
        color: "#869CFF",
    },
];

export default function Courses() {
    return (
        <section
            id="courses"
            className="bg-white px-6 py-24"
        >
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"
                >
                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#869CFF]">
                            Explore Learning
                        </p>

                        <h2 className="max-w-2xl text-4xl font-black tracking-tight text-[#20243A] md:text-5xl">
                            Learn Skills That

                            <span className="block bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] bg-clip-text text-transparent">
                                Move You Forward.
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-md leading-7 text-[#7B829D]">
                        Practical courses designed to help you build real skills,
                        complete real projects, and become ready for the tech industry.
                    </p>
                </motion.div>

                {/* Course Cards */}
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
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >

                    {courses.map((course) => (
                        <motion.div
                            key={course.title}
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
                            className="group overflow-hidden rounded-[28px] border border-[#E8EAF3] bg-[#FAFAFD] shadow-sm"
                        >

                            {/* Image Area */}
                            <div
                                className="relative h-52 overflow-hidden"
                                style={{
                                    background: `linear-gradient(135deg, ${course.color}, #F8F8FC)`,
                                }}
                            >

                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        rotate: [0, 5, 0],
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/30"
                                />

                                <div className="absolute bottom-6 left-6">
                                    <span className="rounded-full bg-white/80 px-4 py-2 text-xs font-bold text-[#3F4764] backdrop-blur">
                                        {course.category}
                                    </span>
                                </div>

                            </div>

                            {/* Content */}
                            <div className="p-7">

                                <h3 className="text-2xl font-black text-[#20243A]">
                                    {course.title}
                                </h3>

                                <div className="mt-6 flex flex-wrap gap-3">

                                    <span className="rounded-full bg-[#869CFF]/10 px-3 py-2 text-xs font-semibold text-[#667BE0]">
                                        {course.level}
                                    </span>

                                    <span className="rounded-full bg-[#E2A3FF]/15 px-3 py-2 text-xs font-semibold text-[#8A63A0]">
                                        {course.duration}
                                    </span>

                                </div>

                                <motion.button
                                    whileHover={{
                                        scale: 1.02,
                                    }}
                                    whileTap={{
                                        scale: 0.98,
                                    }}
                                    className="mt-7 flex w-full items-center justify-between rounded-2xl bg-[#20243A] px-5 py-4 font-semibold text-white transition-colors hover:bg-[#869CFF]"
                                >
                                    View Course

                                    <motion.span
                                        className="inline-block"
                                        whileHover={{ x: 5 }}
                                    >
                                        →
                                    </motion.span>
                                </motion.button>

                            </div>

                        </motion.div>
                    ))}

                </motion.div>

            </div>
        </section>
    );
}
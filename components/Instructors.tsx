"use client";

import { motion } from "motion/react";

const instructors = [
    {
        name: "Ahmed Hassan",
        role: "Full Stack Instructor",
        initials: "AH",
    },
    {
        name: "Mariam Ali",
        role: "UI / UX Instructor",
        initials: "MA",
    },
    {
        name: "Omar Khaled",
        role: "Data & AI Instructor",
        initials: "OK",
    },
];

export default function Instructors() {
    return (
        <section className="bg-[#F8F8FC] px-6 py-24">
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
                        Meet Our Instructors
                    </p>

                    <h2 className="mt-4 text-4xl font-black text-[#20243A] md:text-5xl">
                        Learn From
                        <span className="block bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] bg-clip-text text-transparent">
                            People Who Build.
                        </span>
                    </h2>
                </motion.div>

                {/* Instructors */}
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
                    className="mt-14 grid gap-6 md:grid-cols-3"
                >
                    {instructors.map((instructor) => (
                        <motion.div
                            key={instructor.name}
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
                            whileHover={{
                                y: -8,
                            }}
                            className="rounded-[30px] border border-[#E7E8F0] bg-white p-7 text-center shadow-sm"
                        >

                            {/* Avatar */}
                            <motion.div
                                whileHover={{
                                    scale: 1.08,
                                    rotate: 5,
                                }}
                                className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] text-2xl font-black text-white"
                            >
                                {instructor.initials}
                            </motion.div>

                            <h3 className="mt-6 text-xl font-black text-[#20243A]">
                                {instructor.name}
                            </h3>

                            <p className="mt-2 text-sm text-[#7B829D]">
                                {instructor.role}
                            </p>

                            <div className="mt-6 flex justify-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[#869CFF]" />
                                <span className="h-2 w-2 rounded-full bg-[#E2A3FF]" />
                                <span className="h-2 w-2 rounded-full bg-[#869CFF]" />
                            </div>

                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
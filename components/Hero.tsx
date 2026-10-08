"use client";

import { motion } from "motion/react";

export default function Hero() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-screen overflow-hidden bg-[#F8F8FC] pt-20"
        >
            {/* Background Decorations */}
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    x: [0, 20, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -right-32 top-24 h-96 w-96 rounded-full bg-[#E2A3FF]/30 blur-3xl"
            />

            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, -20, 0],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -left-32 bottom-20 h-96 w-96 rounded-full bg-[#869CFF]/20 blur-3xl"
            />

            <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">

                {/* Left Content */}
                <div>

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#869CFF]/20 bg-white px-4 py-2 shadow-sm"
                    >
                        <span className="h-2.5 w-2.5 rounded-full bg-[#869CFF]" />

                        <span className="text-sm font-medium text-[#5F6785]">
                            Learn. Build. Grow.
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-[#20243A] sm:text-6xl lg:text-7xl"
                    >
                        Build Your

                        <span className="block bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] bg-clip-text text-transparent">
                            Future
                        </span>

                        With Technology.
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="mt-7 max-w-xl text-lg leading-8 text-[#68708D]"
                    >
                        Learn practical technology skills, build real-world projects,
                        and take your first step toward a successful career in tech.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-9 flex flex-wrap gap-4"
                    >
                        <motion.a
                            whileHover={{
                                y: -5,
                                scale: 1.03,
                            }}
                            whileTap={{ scale: 0.97 }}
                            href="#courses"
                            className="rounded-full bg-[#869CFF] px-7 py-4 font-semibold text-white shadow-lg shadow-[#869CFF]/20"
                        >
                            Explore Courses →
                        </motion.a>

                        <motion.a
                            whileHover={{
                                y: -5,
                                scale: 1.03,
                            }}
                            whileTap={{ scale: 0.97 }}
                            href="#about"
                            className="rounded-full border border-[#869CFF]/20 bg-white px-7 py-4 font-semibold text-[#3F4764]"
                        >
                            Why Codo Learn?
                        </motion.a>
                    </motion.div>

                    {/* Statistics */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-12 flex flex-wrap gap-10 border-t border-[#20243A]/10 pt-7"
                    >
                        <div>
                            <h3 className="text-2xl font-black text-[#20243A]">
                                20+
                            </h3>

                            <p className="mt-1 text-sm text-[#7B829D]">
                                Tech Courses
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-black text-[#20243A]">
                                5K+
                            </h3>

                            <p className="mt-1 text-sm text-[#7B829D]">
                                Students
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-black text-[#20243A]">
                                15+
                            </h3>

                            <p className="mt-1 text-sm text-[#7B829D]">
                                Expert Instructors
                            </p>
                        </div>
                    </motion.div>

                </div>

                {/* Right Design */}
                <div className="relative hidden lg:block">

                    <div className="relative mx-auto h-[560px] w-[480px]">

                        {/* Main Card */}
                        <motion.div
                            animate={{
                                y: [0, -12, 0],
                                rotate: [3, 4, 3],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute right-0 top-8 h-[430px] w-[370px] rounded-[40px] bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] p-[2px] shadow-2xl"
                        >
                            <div className="flex h-full flex-col justify-between rounded-[38px] bg-white p-8">

                                <div>
                                    <p className="text-sm font-semibold tracking-widest text-[#869CFF]">
                                        CODO LEARN
                                    </p>

                                    <h2 className="mt-10 text-4xl font-black leading-tight text-[#20243A]">
                                        Turn
                                        <br />
                                        Knowledge
                                        <br />
                                        Into Skills.
                                    </h2>

                                    <p className="mt-6 max-w-[250px] text-sm leading-6 text-[#7B829D]">
                                        Learn the skills that companies are looking for.
                                    </p>
                                </div>

                                <div className="flex items-end justify-between">

                                    <motion.div
                                        animate={{
                                            rotate: 360,
                                        }}
                                        transition={{
                                            duration: 12,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        className="flex h-20 w-20 items-center justify-center rounded-full bg-[#869CFF]/10"
                                    >
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#869CFF] to-[#E2A3FF]" />
                                    </motion.div>

                                    <span className="text-6xl font-black text-[#E2A3FF]">
                                        01
                                    </span>

                                </div>

                            </div>
                        </motion.div>

                        {/* Floating Course Card */}
                        <motion.div
                            animate={{
                                y: [0, 10, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute bottom-12 left-0 w-64 rounded-3xl bg-white p-6 shadow-xl"
                        >
                            <div className="flex items-center justify-between">

                                <p className="text-xs font-semibold uppercase tracking-wider text-[#8A91AA]">
                                    Popular Track
                                </p>

                                <span className="rounded-full bg-[#E2A3FF]/20 px-3 py-1 text-xs font-bold text-[#869CFF]">
                                    NEW
                                </span>

                            </div>

                            <h3 className="mt-4 text-xl font-black text-[#20243A]">
                                Full Stack Development
                            </h3>

                            <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#EEF0F8]">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "75%" }}
                                    transition={{
                                        duration: 1.5,
                                        delay: 1,
                                    }}
                                    className="h-full rounded-full bg-gradient-to-r from-[#869CFF] to-[#E2A3FF]"
                                />
                            </div>

                            <p className="mt-2 text-xs text-[#8A91AA]">
                                75% students completed
                            </p>
                        </motion.div>

                        {/* Small Circle */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 10, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute bottom-0 right-0 flex h-24 w-24 items-center justify-center rounded-full bg-[#20243A] shadow-xl"
                        >
                            <span className="text-2xl font-black text-white">
                                ✦
                            </span>
                        </motion.div>

                    </div>

                </div>

            </div>
        </motion.section>
    );
}
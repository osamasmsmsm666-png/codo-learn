"use client";

import { motion } from "motion/react";

export default function CTA() {
    return (
        <section className="px-6 py-24">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-[#20243A] px-8 py-16 text-center md:px-16"
            >

                {/* Decorations */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 20, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#E2A3FF]/20 blur-2xl"
                />

                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        x: [0, 20, 0],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#869CFF]/20 blur-2xl"
                />

                <div className="relative">

                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#E2A3FF]">
                        Start Your Journey
                    </p>

                    <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">
                        Your Future
                        <span className="block text-[#E2A3FF]">
                            Starts Here.
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl leading-7 text-white/60">
                        Start learning today and build the skills that can shape
                        your future in technology.
                    </p>

                    <motion.a
                        whileHover={{
                            scale: 1.05,
                            y: -4,
                        }}
                        whileTap={{
                            scale: 0.97,
                        }}
                        href="#courses"
                        className="mt-9 inline-flex rounded-full bg-[#869CFF] px-8 py-4 font-bold text-white shadow-xl shadow-[#869CFF]/20"
                    >
                        Explore Courses →
                    </motion.a>

                </div>

            </motion.div>
        </section>
    );
}
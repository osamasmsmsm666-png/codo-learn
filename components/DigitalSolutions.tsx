"use client";

import { motion } from "motion/react";

const solutions = [
    {
        number: "01",
        title: "Web Development",
        description:
            "Modern, fast, and scalable websites built around your business goals.",
        tags: ["Websites", "Web Apps", "Next.js"],
        icon: "</>",
    },
    {
        number: "02",
        title: "Mobile Applications",
        description:
            "Powerful mobile applications designed to deliver seamless digital experiences.",
        tags: ["iOS", "Android", "Cross Platform"],
        icon: "⌁",
    },
    {
        number: "03",
        title: "UI / UX Design",
        description:
            "Beautiful and intuitive interfaces that turn complex ideas into simple experiences.",
        tags: ["UI Design", "UX", "Prototyping"],
        icon: "✦",
    },
    {
        number: "04",
        title: "E-Commerce",
        description:
            "Complete online stores designed to help your business sell and grow.",
        tags: ["Stores", "Payments", "Management"],
        icon: "◈",
    },
    {
        number: "05",
        title: "Software Solutions",
        description:
            "Custom software built to solve your unique business challenges.",
        tags: ["Custom Software", "APIs", "Systems"],
        icon: "⚙",
    },
    {
        number: "06",
        title: "Digital Transformation",
        description:
            "Turn traditional processes into smarter, faster, and more efficient digital solutions.",
        tags: ["Automation", "Cloud", "Integration"],
        icon: "↗",
    },
];

export default function DigitalSolutions() {
    return (
        <section
            id="solutions"
            className="bg-white px-6 py-24"
        >
            <div className="mx-auto max-w-7xl">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col justify-between gap-8 md:flex-row md:items-end"
                >

                    <div className="max-w-3xl">

                        <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#869CFF]">
                            Digital Solutions
                        </p>

                        <h2 className="text-4xl font-black leading-tight tracking-tight text-[#20243A] md:text-6xl">
                            We Build Digital Solutions
                            <span className="block bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] bg-clip-text text-transparent">
                                That Move Your Business Forward.
                            </span>
                        </h2>

                    </div>

                    <p className="max-w-md leading-7 text-[#7B829D]">
                        From ideas to digital products, we create technology solutions
                        that help businesses grow, connect with customers, and work smarter.
                    </p>

                </motion.div>

                {/* Solutions Grid */}
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
                    className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
                >

                    {solutions.map((solution) => (
                        <motion.div
                            key={solution.number}
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
                            transition={{
                                duration: 0.6,
                            }}
                            whileHover={{
                                y: -8,
                            }}
                            className="group relative overflow-hidden rounded-[30px] border border-[#E8EAF3] bg-[#FAFAFD] p-7 transition-shadow duration-300 hover:shadow-2xl"
                        >

                            {/* Background Glow */}
                            <motion.div
                                className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#E2A3FF]/10 blur-2xl"
                                whileHover={{
                                    scale: 1.5,
                                }}
                                transition={{
                                    duration: 0.5,
                                }}
                            />

                            {/* Top */}
                            <div className="relative flex items-center justify-between">

                                <span className="text-sm font-black text-[#E2A3FF]">
                                    {solution.number}
                                </span>

                                <motion.div
                                    whileHover={{
                                        rotate: 12,
                                        scale: 1.1,
                                    }}
                                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] text-lg font-black text-white shadow-lg shadow-[#869CFF]/10"
                                >
                                    {solution.icon}
                                </motion.div>

                            </div>

                            {/* Content */}
                            <div className="relative">

                                <h3 className="mt-10 text-2xl font-black text-[#20243A]">
                                    {solution.title}
                                </h3>

                                <p className="mt-4 min-h-[72px] text-sm leading-6 text-[#7B829D]">
                                    {solution.description}
                                </p>

                                {/* Tags */}
                                <div className="mt-7 flex flex-wrap gap-2">
                                    {solution.tags.map((tag) => (
                                        <motion.span
                                            key={tag}
                                            whileHover={{
                                                scale: 1.05,
                                            }}
                                            className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#5F6785] shadow-sm"
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </div>

                                {/* Bottom */}
                                <div className="mt-8 flex items-center justify-between border-t border-[#E8EAF3] pt-5">

                                    <span className="text-sm font-semibold text-[#869CFF]">
                                        Learn More
                                    </span>

                                    <motion.span
                                        whileHover={{
                                            x: 6,
                                        }}
                                        className="text-xl text-[#869CFF]"
                                    >
                                        →
                                    </motion.span>

                                </div>

                            </div>

                        </motion.div>
                    ))}

                </motion.div>

            </div>
        </section>
    );
}
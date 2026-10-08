"use client";

import { motion } from "motion/react";

const reviews = [
    {
        name: "Ahmed Mohamed",
        role: "Frontend Developer",
        review:
            "The experience at Codo Learn was amazing. I worked on real projects and improved my development skills.",
        rating: 5,
        initials: "AM",
    },
    {
        name: "Sara Ahmed",
        role: "UI / UX Designer",
        review:
            "I learned a lot through practical projects and the team was always supportive and helpful.",
        rating: 5,
        initials: "SA",
    },
    {
        name: "Omar Ali",
        role: "Backend Developer",
        review:
            "Codo Learn gave me the opportunity to work with real technologies and understand how professional teams work.",
        rating: 5,
        initials: "OA",
    },
    {
        name: "Mariam Hassan",
        role: "Full Stack Developer",
        review:
            "A great environment to learn, build projects, and gain real experience. Highly recommended.",
        rating: 5,
        initials: "MH",
    },
    {
        name: "Youssef Adel",
        role: "Software Developer",
        review:
            "The practical experience made a huge difference. I became more confident working on real-world projects.",
        rating: 5,
        initials: "YA",
    },
    {
        name: "Nour Khaled",
        role: "Product Designer",
        review:
            "I really enjoyed the journey. The projects were challenging and helped me develop my skills.",
        rating: 5,
        initials: "NK",
    },
];

export default function Reviews() {
    return (
        <section
            id="reviews"
            className="bg-white px-6 py-24"
        >
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#869CFF]">
                        Testimonials
                    </p>

                    <h2 className="text-4xl font-black leading-tight tracking-tight text-[#20243A] md:text-6xl">
                        What People
                        <span className="bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] bg-clip-text text-transparent">
                            {" "}Say.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#7B829D]">
                        Discover what our learners and interns say about their experience
                        with Codo Learn.
                    </p>
                </motion.div>

                {/* Reviews Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                    className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
                >
                    {reviews.map((review) => (
                        <motion.div
                            key={review.name}
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
                            whileHover={{
                                y: -8,
                            }}
                            className="group rounded-[28px] border border-[#E8EAF3] bg-[#FAFAFD] p-7 transition-shadow duration-300 hover:shadow-xl"
                        >

                            {/* Top */}
                            <div className="flex items-center justify-between">

                                {/* Avatar */}
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] font-black text-white">
                                    {review.initials}
                                </div>

                                {/* Stars */}
                                <div className="flex gap-1">
                                    {Array.from({ length: review.rating }).map(
                                        (_, index) => (
                                            <span
                                                key={index}
                                                className="text-lg text-[#869CFF]"
                                            >
                                                ★
                                            </span>
                                        )
                                    )}
                                </div>

                            </div>

                            {/* Review */}
                            <p className="mt-7 min-h-[120px] text-sm leading-7 text-[#5F6785]">
                                “{review.review}”
                            </p>

                            {/* User */}
                            <div className="mt-6 border-t border-[#E8EAF3] pt-5">

                                <h3 className="font-black text-[#20243A]">
                                    {review.name}
                                </h3>

                                <p className="mt-1 text-xs font-semibold text-[#869CFF]">
                                    {review.role}
                                </p>

                            </div>

                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
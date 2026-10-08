"use client";

import { useState } from "react";
import { motion } from "motion/react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="fixed left-0 right-0 top-0 z-50 border-b border-[#869CFF]/20 bg-white/95 backdrop-blur-md"
        >
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <motion.a
                    href="/"
                    whileHover={{ scale: 1.03 }}
                    className="text-2xl font-black text-[#869CFF]"
                >
                    Codo{" "}
                    <span className="text-[#E2A3FF]">
                        Learn
                    </span>
                </motion.a>

                {/* Desktop Menu */}
                <div className="hidden items-center gap-8 md:flex">

                    <a
                        href="#solutions"
                        className="font-medium text-[#5F6785] transition hover:text-[#869CFF]"
                    >
                        Solutions
                    </a>

                    <a
                        href="#tracks"
                        className="font-medium text-[#5F6785] transition hover:text-[#869CFF]"
                    >
                        Tracks
                    </a>

                    <a
                        href="#interns"
                        className="font-medium text-[#5F6785] transition hover:text-[#869CFF]"
                    >
                        Interns
                    </a>

                    <a
                        href="#about"
                        className="font-medium text-[#5F6785] transition hover:text-[#869CFF]"
                    >
                        About Us
                    </a>

                    <a
                        href="#contact"
                        className="font-medium text-[#5F6785] transition hover:text-[#869CFF]"
                    >
                        Contact
                    </a>

                </div>

                {/* Desktop Button */}
                <motion.a
                    whileHover={{
                        scale: 1.05,
                        y: -2,
                    }}
                    whileTap={{
                        scale: 0.97,
                    }}
                    href="#solutions"
                    className="hidden rounded-full bg-[#869CFF] px-6 py-3 font-semibold text-white shadow-lg shadow-[#869CFF]/20 transition hover:bg-[#7289F5] md:block"
                >
                    Explore Solutions
                </motion.a>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-2xl text-[#869CFF] md:hidden"
                    aria-label="Open menu"
                >
                    {isOpen ? "✕" : "☰"}
                </button>

            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-[#869CFF]/20 bg-white px-6 py-6 md:hidden"
                >
                    <div className="flex flex-col gap-5">

                        <a
                            href="#solutions"
                            onClick={() => setIsOpen(false)}
                            className="font-medium text-[#5F6785] transition hover:text-[#869CFF]"
                        >
                            Solutions
                        </a>

                        <a
                            href="#tracks"
                            onClick={() => setIsOpen(false)}
                            className="font-medium text-[#5F6785] transition hover:text-[#869CFF]"
                        >
                            Tracks
                        </a>

                        <a
                            href="#interns"
                            onClick={() => setIsOpen(false)}
                            className="font-medium text-[#5F6785] transition hover:text-[#869CFF]"
                        >
                            Interns
                        </a>

                        <a
                            href="#about"
                            onClick={() => setIsOpen(false)}
                            className="font-medium text-[#5F6785] transition hover:text-[#869CFF]"
                        >
                            About Us
                        </a>

                        <a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="font-medium text-[#5F6785] transition hover:text-[#869CFF]"
                        >
                            Contact
                        </a>

                        <a
                            href="#solutions"
                            onClick={() => setIsOpen(false)}
                            className="w-fit rounded-full bg-[#869CFF] px-6 py-3 font-semibold text-white transition hover:bg-[#E2A3FF]"
                        >
                            Explore Solutions
                        </a>

                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
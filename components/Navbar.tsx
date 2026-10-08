"use client";

import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#869CFF]/20">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <a
                    href="/"
                    className="text-2xl font-bold text-[#869CFF]"
                >
                    Codo{" "}
                    <span className="text-[#E2A3FF]">
                        Learn
                    </span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">

                    <a
                        href="#courses"
                        className="text-[#5f6785] hover:text-[#869CFF] transition"
                    >
                        Courses
                    </a>

                    <a
                        href="#tracks"
                        className="text-[#5f6785] hover:text-[#869CFF] transition"
                    >
                        Tracks
                    </a>

                    <a
                        href="#about"
                        className="text-[#5f6785] hover:text-[#869CFF] transition"
                    >
                        About Us
                    </a>

                    <a
                        href="#contact"
                        className="text-[#5f6785] hover:text-[#869CFF] transition"
                    >
                        Contact
                    </a>

                </div>

                {/* Desktop Button */}
                <a
                    href="#courses"
                    className="
            hidden md:block
            bg-[#869CFF]
            hover:bg-[#E2A3FF]
            text-white
            px-6
            py-3
            rounded-full
            transition
          "
                >
                    Explore Courses
                </a>

                {/* Mobile Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-2xl text-[#869CFF]"
                    aria-label="Open menu"
                >
                    ☰
                </button>

            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-6 py-6 bg-white border-t border-[#869CFF]/20">

                    <div className="flex flex-col gap-5">

                        <a
                            href="#courses"
                            onClick={() => setIsOpen(false)}
                            className="text-[#5f6785] hover:text-[#869CFF]"
                        >
                            Courses
                        </a>

                        <a
                            href="#tracks"
                            onClick={() => setIsOpen(false)}
                            className="text-[#5f6785] hover:text-[#869CFF]"
                        >
                            Tracks
                        </a>

                        <a
                            href="#about"
                            onClick={() => setIsOpen(false)}
                            className="text-[#5f6785] hover:text-[#869CFF]"
                        >
                            About Us
                        </a>

                        <a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="text-[#5f6785] hover:text-[#869CFF]"
                        >
                            Contact
                        </a>

                        <a
                            href="#courses"
                            onClick={() => setIsOpen(false)}
                            className="
                w-fit
                bg-[#869CFF]
                hover:bg-[#E2A3FF]
                text-white
                px-6
                py-3
                rounded-full
                transition
              "
                        >
                            Explore Courses
                        </a>

                    </div>

                </div>
            )}
        </nav>
    );
}
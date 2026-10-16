
"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

const navLinks = [
    { name: "Solutions", href: "#solutions" },
    { name: "Tracks", href: "#tracks" },
    { name: "Interns", href: "#interns" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.header
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-50 border-b border-[#20243A]/5 bg-white shadow-sm"
        >
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
                {/* Logo */}
                <motion.a
                    href="/"
                    whileHover={{ scale: 1.03 }}
                    className="flex shrink-0 items-center"
                    aria-label="Codo Learn Home"
                >
                    <img
                        src="/Logos.png"
                        alt="Codo Learn — For Training & Digital Solutions"
                        className="h-auto w-[190px] object-contain sm:w-[220px] lg:w-[200px]"
                    />
                </motion.a>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-7 lg:flex xl:gap-9">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-[#20243A] transition-colors duration-200 hover:text-[#869CFF]"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 lg:flex">
                    <Link
                        href="/login"
                        className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#20243A] transition-colors hover:bg-[#869CFF]/10 hover:text-[#7187F3]"
                    >
                        Log In
                    </Link>

                    <Link
                        href="#solutions"
                        className="rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#869CFF]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                        Explore Solutions
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#20243A]/10 bg-white text-[#20243A] transition-colors hover:bg-[#F8F8FC] lg:hidden"
                >
                    <span className="text-2xl leading-none">
                        {isOpen ? "×" : "☰"}
                    </span>
                </button>
            </nav>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-[#20243A]/5 bg-white lg:hidden"
                    >
                        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-5 sm:px-8">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block rounded-xl px-4 py-3 text-sm font-medium text-[#20243A] transition-colors hover:bg-[#869CFF]/10 hover:text-[#7187F3]"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <div className="mt-3 flex flex-col gap-3 border-t border-[#20243A]/5 pt-4">
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-xl border border-[#869CFF]/30 px-4 py-3 text-center text-sm font-semibold text-[#20243A] transition-colors hover:bg-[#869CFF]/10"
                                >
                                    Log In
                                </Link>

                                <Link
                                    href="#solutions"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-xl bg-gradient-to-r from-[#869CFF] to-[#E2A3FF] px-4 py-3 text-center text-sm font-semibold text-white shadow-md shadow-[#869CFF]/20 transition-transform hover:scale-[1.01]"
                                >
                                    Explore Solutions
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

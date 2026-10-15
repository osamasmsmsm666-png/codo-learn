"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "motion/react";

type AccountRole = "student" | "instructor" | "employee";

export default function SignupPage() {
    const [role, setRole] = useState<AccountRole>("student");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    function clearFeedback() {
        setError("");
        setMessage("");
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        clearFeedback();

        if (
            !fullName.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {
            setError("Please fill in all required fields.");
            return;
        }

        if (fullName.trim().length < 2) {
            setError("Please enter your full name.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.trim())) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            setError("Your password must contain at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }

        if (!acceptTerms) {
            setError("Please agree to the Terms and Privacy Policy.");
            return;
        }

        // Frontend only: connect this form to your backend API
        // to create a real account.
        setMessage(
            `Your registration form is valid for the ${role} account. Backend registration is not connected yet.`
        );
    }

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F8FC] px-4 py-12 sm:px-6">
            {/* Animated background */}
            <motion.div
                aria-hidden="true"
                animate={{
                    x: [0, 25, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.12, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#869CFF]/25 blur-3xl"
            />

            <motion.div
                aria-hidden="true"
                animate={{
                    x: [0, -20, 0],
                    y: [0, 25, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#E2A3FF]/30 blur-3xl"
            />

            {/* Main card */}
            <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/80 bg-white/80 shadow-2xl shadow-[#869CFF]/10 backdrop-blur-xl lg:grid-cols-2">
                {/* Left branding panel */}
                <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] p-10 text-white lg:flex xl:p-14">
                    <motion.div
                        aria-hidden="true"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 35,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -right-20 top-24 h-64 w-64 rounded-full border border-white/30"
                    />

                    <motion.div
                        aria-hidden="true"
                        animate={{ rotate: -360 }}
                        transition={{
                            duration: 45,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full border border-white/20"
                    />

                    {/* Logo */}
                    <motion.a
                        href="/"
                        whileHover={{ scale: 1.03 }}
                        className="flex shrink-0 items-center"
                        aria-label="Codo Learn Home"
                    >
                        <img
                            src="/logoooo-removebg-preview.png"
                            alt="Codo Learn — For Training & Digital Solutions"
                            className="h-auto w-[190px] object-contain sm:w-[220px] lg:w-[270px]"
                        />
                    </motion.a>

                    {/* Branding text */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative z-10 my-12"
                    >
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/20 text-3xl shadow-lg backdrop-blur">
                            {"</>"}
                        </div>

                        <h1 className="max-w-md text-4xl font-black leading-tight xl:text-5xl">
                            Start your journey with Codo Learn.
                        </h1>

                        <p className="mt-5 max-w-md text-base leading-8 text-white/90">
                            Learn new skills, build real projects, and take the
                            next step toward your future with our community.
                        </p>
                    </motion.div>

                    <p className="relative z-10 text-sm text-white/80">
                        Learn. Build. Grow.
                    </p>
                </section>

                {/* Signup form */}
                <section className="p-6 sm:p-10 lg:p-12 xl:p-14">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto w-full max-w-md"
                    >
                        {/* Mobile home link */}
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#68708D] transition hover:text-[#7587E8] lg:hidden"
                        >
                            <span aria-hidden="true">←</span> Back to home
                        </Link>

                        {/* Heading */}
                        <div className="mb-7 mt-5 lg:mt-0">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#869CFF]">
                                Join Codo Learn
                            </p>

                            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#20243A] sm:text-4xl">
                                Create your account
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-[#7B829D]">
                                Fill in your details to start your learning
                                journey with us.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} noValidate>
                            {/* Full name */}
                            <div className="mb-5">
                                <label
                                    htmlFor="fullName"
                                    className="mb-2 block text-sm font-semibold text-[#343B58]"
                                >
                                    Full name
                                </label>

                                <div className="flex items-center gap-3 rounded-xl border border-[#E5E7F2] bg-white px-4 transition focus-within:border-[#869CFF] focus-within:ring-4 focus-within:ring-[#869CFF]/10">
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        className="h-5 w-5 shrink-0 text-[#9299B1]"
                                    >
                                        <circle cx="12" cy="8" r="4" />
                                        <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                                    </svg>

                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Enter your full name"
                                        value={fullName}
                                        onChange={(event) => {
                                            setFullName(event.target.value);
                                            clearFeedback();
                                        }}
                                        className="min-w-0 flex-1 bg-transparent py-4 text-sm text-[#20243A] outline-none placeholder:text-[#A3A8BC]"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-5">
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-[#343B58]"
                                >
                                    Email address
                                </label>

                                <div className="flex items-center gap-3 rounded-xl border border-[#E5E7F2] bg-white px-4 transition focus-within:border-[#869CFF] focus-within:ring-4 focus-within:ring-[#869CFF]/10">
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        className="h-5 w-5 shrink-0 text-[#9299B1]"
                                    >
                                        <rect
                                            x="3"
                                            y="5"
                                            width="18"
                                            height="14"
                                            rx="3"
                                        />
                                        <path d="m4 7 8 6 8-6" />
                                    </svg>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(event) => {
                                            setEmail(event.target.value);
                                            clearFeedback();
                                        }}
                                        className="min-w-0 flex-1 bg-transparent py-4 text-sm text-[#20243A] outline-none placeholder:text-[#A3A8BC]"
                                    />
                                </div>
                            </div>

                            {/* Account type */}
                            <div className="mb-5">
                                <label className="mb-3 block text-sm font-semibold text-[#343B58]">
                                    Account type
                                </label>

                                <div className="grid grid-cols-3 gap-1.5 rounded-2xl bg-[#F1F2FA] p-1.5">
                                    {(
                                        [
                                            {
                                                value: "student",
                                                label: "Student",
                                            },
                                            {
                                                value: "instructor",
                                                label: "Instructor",
                                            },
                                            {
                                                value: "employee",
                                                label: "Employee",
                                            },
                                        ] as const
                                    ).map((item) => (
                                        <button
                                            key={item.value}
                                            type="button"
                                            onClick={() => {
                                                setRole(item.value);
                                                clearFeedback();
                                            }}
                                            aria-pressed={role === item.value}
                                            className={`rounded-xl px-1 py-3 text-xs font-semibold transition-all duration-200 sm:text-sm ${role === item.value
                                                    ? "bg-white text-[#7587E8] shadow-sm ring-1 ring-[#869CFF]/20"
                                                    : "text-[#7B829D] hover:text-[#E2A3FF]"
                                                }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Password */}
                            <div className="mb-5">
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-semibold text-[#343B58]"
                                >
                                    Password
                                </label>

                                <div className="flex items-center gap-3 rounded-xl border border-[#E5E7F2] bg-white px-4 transition focus-within:border-[#869CFF] focus-within:ring-4 focus-within:ring-[#869CFF]/10">
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        className="h-5 w-5 shrink-0 text-[#9299B1]"
                                    >
                                        <rect
                                            x="4"
                                            y="10"
                                            width="16"
                                            height="11"
                                            rx="2"
                                        />
                                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                    </svg>

                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        placeholder="Create a password"
                                        value={password}
                                        onChange={(event) => {
                                            setPassword(event.target.value);
                                            clearFeedback();
                                        }}
                                        className="min-w-0 flex-1 bg-transparent py-4 text-sm text-[#20243A] outline-none placeholder:text-[#A3A8BC]"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((current) => !current)
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        className="shrink-0 text-xs font-semibold text-[#7587E8] hover:text-[#596CCB]"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>

                                <p className="mt-2 text-xs text-[#9299B1]">
                                    Use at least 6 characters.
                                </p>
                            </div>

                            {/* Confirm password */}
                            <div className="mb-5">
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-sm font-semibold text-[#343B58]"
                                >
                                    Confirm password
                                </label>

                                <div className="flex items-center gap-3 rounded-xl border border-[#E5E7F2] bg-white px-4 transition focus-within:border-[#869CFF] focus-within:ring-4 focus-within:ring-[#869CFF]/10">
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        className="h-5 w-5 shrink-0 text-[#9299B1]"
                                    >
                                        <rect
                                            x="4"
                                            y="10"
                                            width="16"
                                            height="11"
                                            rx="2"
                                        />
                                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                        <path d="m9 15 2 2 4-4" />
                                    </svg>

                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        autoComplete="new-password"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(event) => {
                                            setConfirmPassword(
                                                event.target.value
                                            );
                                            clearFeedback();
                                        }}
                                        className="min-w-0 flex-1 bg-transparent py-4 text-sm text-[#20243A] outline-none placeholder:text-[#A3A8BC]"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (current) => !current
                                            )
                                        }
                                        aria-label={
                                            showConfirmPassword
                                                ? "Hide confirm password"
                                                : "Show confirm password"
                                        }
                                        className="shrink-0 text-xs font-semibold text-[#7587E8] hover:text-[#596CCB]"
                                    >
                                        {showConfirmPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            {/* Terms and privacy */}
                            <label className="mb-6 flex cursor-pointer items-start gap-2.5 text-sm leading-6 text-[#68708D]">
                                <input
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={(event) => {
                                        setAcceptTerms(event.target.checked);
                                        clearFeedback();
                                    }}
                                    className="mt-1 h-4 w-4 shrink-0 accent-[#869CFF]"
                                />

                                <span>
                                    I agree to the{" "}
                                    <Link
                                        href="/terms"
                                        className="font-semibold text-[#7587E8] transition hover:text-[#596CCB]"
                                    >
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href="/privacy"
                                        className="font-semibold text-[#7587E8] transition hover:text-[#596CCB]"
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </span>
                            </label>

                            {/* Error message */}
                            {error && (
                                <p
                                    role="alert"
                                    className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                                >
                                    {error}
                                </p>
                            )}

                            {/* Success / status message */}
                            {message && (
                                <p
                                    role="status"
                                    className="mb-4 rounded-xl border border-[#869CFF]/30 bg-[#869CFF]/10 px-4 py-3 text-sm leading-6 text-[#454F85]"
                                >
                                    {message}
                                </p>
                            )}

                            {/* Create account button */}
                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#869CFF] to-[#A7A0FF] px-5 py-4 font-bold text-white shadow-lg shadow-[#869CFF]/20 transition hover:shadow-xl hover:shadow-[#869CFF]/30"
                            >
                                Create Account{" "}
                                <span aria-hidden="true">→</span>
                            </motion.button>
                        </form>

                        {/* Login link */}
                        <p className="mt-7 text-center text-sm text-[#7B829D]">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-bold text-[#7587E8] transition hover:text-[#596CCB]"
                            >
                                Log in
                            </Link>
                        </p>

                        <p className="mt-8 text-center text-xs leading-5 text-[#9A9FB3]">
                            Join Codo Learn and take the next step in your
                            learning journey.
                        </p>
                    </motion.div>
                </section>
            </div>
        </main>
    );
}
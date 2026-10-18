
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "motion/react";

type AccountRole = "student" | "instructor" | "employee" | "admin";
export default function LoginPage() {
    const [role, setRole] = useState<AccountRole>("student");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");
        setMessage("");

        if (!email.trim() || !password) {
            setError("Please enter your email and password.");
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

        // Frontend only: no authentication request is sent yet.
        setMessage(
            `Your form is valid for the ${role} account. Backend authentication is not connected yet.`
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

            <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/80 bg-white/80 shadow-2xl shadow-[#869CFF]/10 backdrop-blur-xl lg:grid-cols-2">
                {/* Left branding panel */}
                <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#869CFF] to-[#E2A3FF] p-10 text-white lg:flex xl:p-14">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 35,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -right-20 top-24 h-64 w-64 rounded-full border border-white/30"
                    />

                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{
                            duration: 45,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full border border-white/20"
                    />

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
                            Your next chapter in tech starts here.
                        </h1>

                        <p className="mt-5 max-w-md text-base leading-8 text-white/90">
                            Learn new skills, build real projects, and move forward
                            with the Codo Learn community.
                        </p>
                    </motion.div>

                    <p className="relative z-10 text-sm text-white/80">
                        Learn. Build. Grow.
                    </p>
                </section>

                {/* Login form */}
                <section className="p-6 sm:p-10 lg:p-12 xl:p-14">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto w-full max-w-md"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#68708D] transition hover:text-[#7587E8] lg:hidden"
                        >
                            <span aria-hidden="true">←</span> Back to home
                        </Link>

                        <div className="mb-8 mt-5 lg:mt-0">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#869CFF]">
                                Welcome back
                            </p>

                            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#20243A] sm:text-4xl">
                                Log in to your account
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-[#7B829D]">
                                Enter your details to continue your learning journey.
                            </p>
                        </div>

                        {/* Account type */}
                        <div className="mb-6">
                            <label className="mb-3 block text-sm font-semibold text-[#343B58]">
                                Account type
                            </label>

                            <div className="grid grid-cols-3 gap-2 rounded-2xl bg-[#F1F2FA] p-1.5">
                                {(
                                    [
                                        { value: "student", label: "Student" },
                                        { value: "instructor", label: "Instructor" },

                                        { value: "employee", label: "Employee" },
                                    ] as const
                                ).map((item) => (
                                    <button
                                        key={item.value}
                                        type="button"
                                        onClick={() => {
                                            setRole(item.value);
                                            setError("");
                                            setMessage("");
                                        }}
                                        aria-pressed={role === item.value}
                                        className={`rounded-xl px-2 py-3 text-sm font-semibold transition-all duration-200 ${role === item.value
                                            ? "bg-white text-[#7587E8] shadow-sm ring-1 ring-[#869CFF]/20"
                                            : "text-[#7B829D] hover:text-[#E2A3FF]"
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} noValidate>
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
                                        <rect x="3" y="5" width="18" height="14" rx="3" />
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
                                            setError("");
                                            setMessage("");
                                        }}
                                        className="min-w-0 flex-1 bg-transparent py-4 text-sm text-[#20243A] outline-none placeholder:text-[#A3A8BC]"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <div className="mb-2 flex items-center justify-between gap-3">
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-semibold text-[#343B58]"
                                    >
                                        Password
                                    </label>

                                    <Link
                                        href="/forgot-password"
                                        className="text-xs font-semibold text-[#7587E8] transition hover:text-[#596CCB]"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <div className="flex items-center gap-3 rounded-xl border border-[#E5E7F2] bg-white px-4 transition focus-within:border-[#869CFF] focus-within:ring-4 focus-within:ring-[#869CFF]/10">
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        className="h-5 w-5 shrink-0 text-[#9299B1]"
                                    >
                                        <rect x="4" y="10" width="16" height="11" rx="2" />
                                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                    </svg>

                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(event) => {
                                            setPassword(event.target.value);
                                            setError("");
                                            setMessage("");
                                        }}
                                        className="min-w-0 flex-1 bg-transparent py-4 text-sm text-[#20243A] outline-none placeholder:text-[#A3A8BC]"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((current) => !current)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="shrink-0 text-xs font-semibold text-[#7587E8] hover:text-[#596CCB]"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            {/* Remember me */}
                            <label className="mb-6 flex cursor-pointer items-center gap-2.5 text-sm text-[#68708D]">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(event) => setRememberMe(event.target.checked)}
                                    className="h-4 w-4 accent-[#869CFF]"
                                />
                                Remember me
                            </label>

                            {/* Feedback */}
                            {error && (
                                <p
                                    role="alert"
                                    className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                                >
                                    {error}
                                </p>
                            )}

                            {message && (
                                <p
                                    role="status"
                                    className="mb-4 rounded-xl border border-[#869CFF]/30 bg-[#869CFF]/10 px-4 py-3 text-sm leading-6 text-[#454F85]"
                                >
                                    {message}
                                </p>
                            )}

                            {/* Submit */}
                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#869CFF] to-[#A7A0FF] px-5 py-4 font-bold text-white shadow-lg shadow-[#869CFF]/20 transition hover:shadow-xl hover:shadow-[#869CFF]/30"
                            >
                                Log In <span aria-hidden="true">→</span>
                            </motion.button>
                        </form>

                        <p className="mt-7 text-center text-sm text-[#7B829D]">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/signup"
                                className="font-bold text-[#7587E8] transition hover:text-[#596CCB]"
                            >
                                Sign up
                            </Link>
                        </p>

                        <div className="flex flex-col items-center gap-4 w-full">


                            {/* الرابط الجديد الخاص بالأدمن */}
                            <div className="pt-3 text-xs text-gray-500 border-t border-gray-100 w-full text-center">
                                Are you an administrator?{' '}
                                <Link
                                    href="/admin/login"
                                    className="font-medium text-[#7587E8] hover:text-[#596CCB] transition-colors underline offset-2"
                                >
                                    Admin Login
                                </Link>
                            </div>

                        </div>
                        ;


                        <p className="mt-8 text-center text-xs leading-5 text-[#9A9FB3]">
                            By continuing, you agree to the Codo Learn terms and privacy
                            policy.
                        </p>
                    </motion.div>
                </section>
            </div>
        </main >
    );
}

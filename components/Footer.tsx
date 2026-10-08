export default function Footer() {
    return (
        <footer
            id="contact"
            className="bg-[#F8F8FC] px-6 pb-8 pt-16"
        >
            <div className="mx-auto max-w-7xl">

                <div className="grid gap-10 border-b border-[#20243A]/10 pb-12 md:grid-cols-4">

                    {/* Brand */}
                    <div className="md:col-span-2">

                        <a
                            href="/"
                            className="text-2xl font-black text-[#869CFF]"
                        >
                            Codo{" "}
                            <span className="text-[#E2A3FF]">
                                Learn
                            </span>
                        </a>

                        <p className="mt-5 max-w-md leading-7 text-[#7B829D]">
                            A modern learning platform helping people build practical
                            technology skills and prepare for their future.
                        </p>

                    </div>

                    {/* Platform */}
                    <div>
                        <h3 className="font-black text-[#20243A]">
                            Platform
                        </h3>

                        <div className="mt-5 flex flex-col gap-3 text-sm text-[#7B829D]">
                            <a href="#courses" className="hover:text-[#869CFF]">
                                Courses
                            </a>

                            <a href="#tracks" className="hover:text-[#869CFF]">
                                Learning Tracks
                            </a>

                            <a href="#about" className="hover:text-[#869CFF]">
                                About Us
                            </a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-black text-[#20243A]">
                            Contact
                        </h3>

                        <div className="mt-5 flex flex-col gap-3 text-sm text-[#7B829D]">
                            <span>hello@codolearn.com</span>
                            <span>Egypt</span>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col justify-between gap-4 py-6 text-sm text-[#8A91AA] md:flex-row">
                    <p>
                        © 2026 Codo Learn. All rights reserved.
                    </p>

                    <p>
                        Learn. Build. Grow.
                    </p>
                </div>

            </div>
        </footer>
    );
}
'use client';
import Image from 'next/image';

const About = () => {
    return (
        <section
            id="about"
            className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden"
        >
            {/* Background Ambient Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-87.5 bg-brand-600/10 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute top-1/3 right-10 w-75 h-75 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Hero Left Info */}
                    <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-mono">
                            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                            <span>Open for AI/ML & Senior Software Engineering Roles</span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                            Building{' '}
                            <span className="bg-linear-to-r from-brand-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                                Next-Gen AI{' '}
                            </span>
                            & Scalable Systems
                        </h1>

                        {/* Bio Subtitle */}
                        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            I&apos;m <strong className="text-slate-200">Ashikur Rahman</strong>, a
                            Machine Learning & Full-Stack Software Engineer with 2+ years of
                            experience constructing high-performance neural networks, PyTorch
                            model pipelines, microservices with FastAPI, and production
                            React/Next.js web architectures.
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800/80 font-mono">
                            <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-800/80">
                                <span className="block text-xl font-bold text-teal-400">
                                    2+ Years
                                </span>
                                <span className="text-[11px] text-gray-500">Engineering Dev</span>
                            </div>
                            <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-800/80">
                                <span className="block text-xl font-bold text-cyan-400">
                                    PyTorch / CNN
                                </span>
                                <span className="text-[11px] text-gray-500">Deep Learning</span>
                            </div>
                            <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-800/80">
                                <span className="block text-xl font-bold text-teal-400">
                                    FastAPI
                                </span>
                                <span className="text-[11px] text-gray-500">Async Services</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Right Card / Visual Profile Showcase */}
                    <div className="lg:col-span-5 flex justify-center">
                        <div className="relative w-full max-w-md">
                            {/* Neon Glow Ring */}
                            <div className="absolute -inset-1 bg-linear-to-r from-brand-500 to-indigo-600 rounded-3xl blur-md opacity-40 group-hover:opacity-100 transition duration-1000" />

                            {/* Main Card */}
                            <div className="relative glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl">
                                {/* Card Header Profile Info */}
                                <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
                                    <Image
                                        src="https://i.ibb.co.com/XrYW5Y7C/1761391955495.jpg?w=300&auto=format&fit=crop&q=80"
                                        alt="Ashikur Rahman"
                                        width={64}
                                        height={64}
                                        className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500/50 shadow-md"
                                    />
                                    <div>
                                        <h3 className="font-bold text-lg text-white">
                                            Ashikur Rahman
                                        </h3>
                                        <p className="text-xs text-brand-400 font-mono">
                                            Senior AI & Software Dev
                                        </p>
                                    </div>
                                </div>

                                {/* Live Stat Cards Grid */}
                                <div className="grid grid-cols-2 gap-4 py-6">
                                    <div className="bg-darkbg/80 border border-slate-800 p-3.5 rounded-xl">
                                        <span className="text-xs text-slate-400 font-mono block mb-1">
                                            Production Models
                                        </span>
                                        <span className="text-2xl font-bold text-white font-mono">
                                            14+
                                        </span>
                                        <span className="text-[10px] text-emerald-400 block mt-0.5">
                                            <i className="ri-arrow-up-line" /> PyTorch / ONNX
                                        </span>
                                    </div>
                                    <div className="bg-darkbg/80 border border-slate-800 p-3.5 rounded-xl">
                                        <span className="text-xs text-slate-400 font-mono block mb-1">
                                            Years Experience
                                        </span>
                                        <span className="text-2xl font-bold text-white font-mono">
                                            02+
                                        </span>
                                        <span className="text-[10px] text-brand-400 block mt-0.5">
                                            <i className="ri-sparkles-line" /> Full Stack AI
                                        </span>
                                    </div>
                                    <div className="bg-darkbg/80 border border-slate-800 p-3.5 rounded-xl">
                                        <span className="text-xs text-slate-400 font-mono block mb-1">
                                            Total Commits
                                        </span>
                                        <span className="text-2xl font-bold text-white font-mono">
                                            879
                                        </span>
                                        <span className="text-[10px] text-indigo-400 block mt-0.5">
                                            <i className="ri-git-commit-line" /> GitHub Active
                                        </span>
                                    </div>
                                    <div className="bg-darkbg/80 border border-slate-800 p-3.5 rounded-xl">
                                        <span className="text-xs text-slate-400 font-mono block mb-1">
                                            API Reliability
                                        </span>
                                        <span className="text-2xl font-bold text-emerald-400 font-mono">
                                            99.9%
                                        </span>
                                        <span className="text-[10px] text-slate-400 block mt-0.5">
                                            FastAPI & Docker
                                        </span>
                                    </div>
                                </div>

                                {/* Floating Live Interactive Terminal Snippet */}
                                <div className="bg-slate-950 rounded-xl p-3 border border-slate-800/80 text-xs font-mono">
                                    <div className="flex items-center justify-between pb-2 text-slate-500 text-[10px]">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-red-500" />
                                            <span className="w-2 h-2 rounded-full bg-yellow-500" />
                                            <span className="w-2 h-2 rounded-full bg-green-500" />
                                            inference.py
                                        </span>
                                        <span>GPU: CUDA 12.1</span>
                                    </div>
                                    <p className="text-slate-400">
                                        <span className="text-purple-400">import</span> torch, fastapi
                                    </p>
                                    <p className="text-slate-400">
                                        <span className="text-brand-400">model</span> = torch.hub.load(
                                        <span className="text-amber-300">&apos;custom/v2&apos;</span>)
                                    </p>
                                    <p className="text-emerald-400 mt-1">
                                        ✓ Neural pipeline initialized in 142ms
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
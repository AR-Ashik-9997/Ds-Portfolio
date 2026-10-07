'use client';
/* eslint-disable react/jsx-no-comment-textnodes */
import { ExperienceItem } from "@/Shared/types/global_interface";


const EXPERIENCE_DATA: ExperienceItem[] = [
    {
        period: '2022 - Present',
        role: 'Lead Machine Learning & Full-Stack Engineer',
        company: 'Core AI Tech Solutions',
        dotBgColor: 'bg-brand-500',
        companyTextColor: 'text-brand-400',
        hoverBorderColor: 'group-hover:border-brand-500/30',
        responsibilities: [
            'Architected and deployed PyTorch deep learning models for client inference APIs serving 2M+ monthly requests.',
            'Engineered reactive frontend interfaces in Next.js 14 and Tailwind CSS integrated with async Python microservices.',
            'Reduced server response latency by 35% using Redis Caching and optimized Docker container deployment.'
        ]
    },
    {
        period: '2020 - 2022',
        role: 'Software Engineer (Backend & ML)',
        company: 'Neural Systems Lab',
        dotBgColor: 'bg-indigo-500',
        companyTextColor: 'text-indigo-400',
        hoverBorderColor: 'group-hover:border-indigo-500/30',
        responsibilities: [
            'Developed RESTful API endpoints using Python FastAPI and PostgreSQL with SQLAlchemy ORM.',
            'Built automated data preprocessing pipelines for computer vision models using OpenCV and Scikit-learn.'
        ]
    }
];

const Experience = () => {
    return (
        <section
            id="experience"
            className="py-24 bg-darkcard/30 border-y border-slate-800/80 relative"
        >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="text-xs font-mono text-brand-400 uppercase tracking-widest mb-2">
            // Professional Journey
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">
                        Work Experience & Milestones
                    </h2>
                </div>

                {/* Timeline Line */}
                <div className="relative border-l-2 border-slate-800 ml-4 md:ml-32 space-y-12">
                    {EXPERIENCE_DATA.map((item, index) => (
                        <div key={index} className="relative pl-8 md:pl-12 group">
                            {/* Dot */}
                            <div
                                className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full ${item.dotBgColor} border-4 border-darkbg group-hover:scale-125 transition-transform`}
                            ></div>

                            {/* Desktop Period Badge */}
                            <div className="hidden md:block absolute -left-36 top-1 text-xs font-mono text-slate-400">
                                {item.period}
                            </div>

                            {/* Experience Card */}
                            <div
                                className={`glass-panel rounded-2xl p-6 border border-slate-800 ${item.hoverBorderColor} transition-all`}
                            >
                                {/* Mobile Period Badge */}
                                <div className={`md:hidden text-xs font-mono ${item.companyTextColor} mb-2`}>
                                    {item.period}
                                </div>

                                <h3 className="text-xl font-bold text-white">
                                    {item.role}
                                </h3>
                                <p className={`text-xs ${item.companyTextColor} font-mono mb-4`}>
                                    {item.company}
                                </p>

                                <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside">
                                    {item.responsibilities.map((task, taskIdx) => (
                                        <li key={taskIdx}>{task}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
'use client';
/* eslint-disable react/jsx-no-comment-textnodes */
import { ExperienceItem } from "@/Shared/types/global_interface";


const EXPERIENCE_DATA: ExperienceItem[] = [
    {
        period: 'Apr 2026 - Present',
        role: 'Surveillance Engineer',
        company: 'Khadiza Enterprise',
        dotBgColor: 'bg-emerald-500',
        companyTextColor: 'text-emerald-400',
        hoverBorderColor: 'group-hover:border-emerald-500/30',
        responsibilities: [
            'Engineered and installed end-to-end CCTV and IP camera surveillance systems, ensuring optimal field-of-view, coverage, and site security.',
            'Configured local network infrastructure, IP address assignment, router/switch setups, and secure remote viewing protocols for seamless live monitoring.',
            'Performed routine diagnostic checks, hardware maintenance, firmware updates, and rapid troubleshooting to maintain uninterrupted system uptime.',
            'Managed physical deployment including optical fiber/ethernet structured cabling, power supply provisioning, and camera unbinding or factory reset configurations.',
            'Provided hands-on technical support for client system onboarding, mobile application integration, and storage/NVR setup.'
        ]
    },
    {
        period: 'Jan 2026 - Apr 2026',
        role: 'Software Engineer',
        company: 'Maya Enterprise',
        dotBgColor: 'bg-cyan-500',
        companyTextColor: 'text-cyan-400',
        hoverBorderColor: 'group-hover:border-cyan-500/30',
        responsibilities: [
            'Engineered a complete web application featuring a responsive frontend, custom backend RESTful APIs, and database architecture to power broadband package listings and customer workflows.',
            'Built a secure admin dashboard enabling non-technical staff to manage bandwidth pricing tiers, push dynamic promotional offers, and handle client support inquiries in real time.',
            'Developed a dynamic location verification tool for optical fiber availability checks alongside direct WhatsApp integration for 24/7 client support access.'
        ]
    },
    {
        period: 'Apr 2023 - Jan 2024',
        role: 'Full Stack Developer',
        company: 'PlayerOrbit',
        dotBgColor: 'bg-amber-500',
        companyTextColor: 'text-amber-400',
        hoverBorderColor: 'group-hover:border-amber-500/30',
        responsibilities: [
            'Developed responsive front-end interfaces using Sass and Tailwind CSS.',
            'Integrated Google Meet and Zego Cloud for real-time video conferencing along with a secure PayPal payment gateway system.',
            'Maintained clean codebase, resolved critical bugs, managed NPM packages, and optimized overall application performance.'
        ]
    },
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
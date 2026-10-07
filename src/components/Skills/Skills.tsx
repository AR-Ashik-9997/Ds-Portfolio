'use client';

import { SkillCategory } from "@/Shared/types/global_interface";

/* eslint-disable react/jsx-no-comment-textnodes */



const SKILL_CATEGORIES: SkillCategory[] = [
    {
        title: 'AI / Deep Learning',
        iconClass: 'ri-cpu-line',
        borderColorClass: 'hover:border-brand-500/40',
        iconBgClass: 'bg-brand-500/10 border-brand-500/30 text-brand-400',
        iconTextClass: 'text-brand-400',
        percentageTextClass: 'text-brand-400',
        progressGradientClass: 'from-brand-500 to-teal-400',
        skills: [
            { name: 'PyTorch & TorchVision', percentage: 92 },
            { name: 'TensorFlow / Keras', percentage: 85 },
            { name: 'OpenCV & Vision Transformers', percentage: 88 }
        ]
    },
    {
        title: 'Backend & APIs',
        iconClass: 'ri-server-line',
        borderColorClass: 'hover:border-indigo-500/40',
        iconBgClass: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
        iconTextClass: 'text-indigo-400',
        percentageTextClass: 'text-indigo-400',
        progressGradientClass: 'from-indigo-500 to-purple-400',
        skills: [
            { name: 'Python & FastAPI', percentage: 95 },
            { name: 'Node.js & Express', percentage: 84 },
            { name: 'PostgreSQL & Redis', percentage: 90 }
        ]
    },
    {
        title: 'Frontend Systems',
        iconClass: 'ri-layout-4-line',
        borderColorClass: 'hover:border-sky-500/40',
        iconBgClass: 'bg-sky-500/10 border-sky-500/30 text-sky-400',
        iconTextClass: 'text-sky-400',
        percentageTextClass: 'text-sky-400',
        progressGradientClass: 'from-sky-500 to-cyan-400',
        skills: [
            { name: 'Next.js & React', percentage: 90 },
            { name: 'TypeScript', percentage: 88 },
            { name: 'Tailwind CSS & Framer', percentage: 92 }
        ]
    },
    {
        title: 'DevOps & MLOps',
        iconClass: 'ri-cloud-line',
        borderColorClass: 'hover:border-emerald-500/40',
        iconBgClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        iconTextClass: 'text-emerald-400',
        percentageTextClass: 'text-emerald-400',
        progressGradientClass: 'from-emerald-500 to-teal-400',
        skills: [
            { name: 'Docker & Containerization', percentage: 20 },
            { name: 'CI/CD & GitHub Actions', percentage: 40 },
            { name: 'Cloud & Deployment (Vercel, Render, Railway, Firebase)', percentage: 82 }
        ]
    }
];

const Skills = () => {
    return (
        <section id="skills" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="text-xs font-mono text-brand-400 uppercase tracking-widest mb-2">
            // Technical Stack & Proficiency
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">
                        Core Technical Competencies
                    </h2>
                    <p className="text-slate-400 text-sm mt-3">
                        Specialized in building end-to-end Machine Learning systems and scalable web backends.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SKILL_CATEGORIES.map((category) => (
                        <div
                            key={category.title}
                            className={`glass-panel rounded-2xl p-6 border border-slate-800 ${category.borderColorClass} transition-all`}
                        >
                            <div
                                className={`w-12 h-12 rounded-xl border flex items-center justify-center text-2xl mb-6 ${category.iconBgClass}`}
                            >
                                <i className={category.iconClass}></i>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-4">
                                {category.title}
                            </h3>

                            <div className="space-y-4">
                                {category.skills.map((skill) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between text-xs font-mono mb-1">
                                            <span className="text-slate-300">{skill.name}</span>
                                            <span className={category.percentageTextClass}>
                                                {skill.percentage}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                            <div
                                                className={`bg-linear-to-r ${category.progressGradientClass} h-full rounded-full`}
                                                style={{ width: `${skill.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
'use client';
/* eslint-disable react/jsx-no-comment-textnodes */
import { ContactFormData } from '@/Shared/types/global_interface';
import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id === 'formName' ? 'name' : id === 'formEmail' ? 'email' : id === 'formSubject' ? 'subject' : 'message']: value
        }));
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulated form submission (Replace with actual API endpoint or EmailJS / Formspree)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        setTimeout(() => {
            setSubmitted(false);
        }, 5000);
    };

    return (
        <section
            id="contact"
            className="py-24 bg-darkcard/50 border-t border-slate-800/80 relative"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Contact Info */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="text-xs font-mono text-brand-400 uppercase tracking-widest">
              // Let&apos;s Connect
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white">
                            Start a Project or Discussion
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Looking for an ML engineer, backend specialist, or full-stack
                            software engineer for your team or product? Send a message
                            directly.
                        </p>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-4 glass-panel p-4 rounded-xl border border-slate-800">
                                <div className="w-10 h-10 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center text-xl">
                                    <i className="ri-mail-line"></i>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 font-mono block">
                                        Direct Email
                                    </span>
                                    <span className="text-sm font-semibold text-white">
                                        ashikur.rahman9997@gmail.com
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 glass-panel p-4 rounded-xl border border-slate-800">
                                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xl">
                                    <i className="ri-linkedin-fill"></i>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 font-mono block">
                                        LinkedIn Profile
                                    </span>
                                    <a
                                        href="https://www.linkedin.com/in/md-ashikur-rahman-080483390/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-semibold text-indigo-400 hover:underline"
                                    >
                                        linkedin.com/in/ashikur-rahman
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-7">
                        <form
                            id="contactForm"
                            onSubmit={handleFormSubmit}
                            className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6"
                        >
                            {submitted && (
                                <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono">
                                    ✓ Thank you! Your message has been sent successfully.
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-mono text-slate-300 mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        id="formName"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-darkbg border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                                        placeholder="e.g., Alex Mercer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-slate-300 mb-2">
                                        Your Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        id="formEmail"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-darkbg border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                                        placeholder="alex@company.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="formSubject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-darkbg border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                                    placeholder="Project Inquiry / Job Opportunity"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    required
                                    id="formMessage"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-darkbg border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                                    placeholder="Describe your project requirements or timeline..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                id="submitBtn"
                                disabled={isSubmitting}
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 text-white font-semibold shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <i className="ri-loader-4-line animate-spin"></i> Sending...
                                    </>
                                ) : (
                                    <>
                                        <i className="ri-send-plane-fill"></i> Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
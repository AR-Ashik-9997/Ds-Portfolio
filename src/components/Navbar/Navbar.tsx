'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import { NavItem } from '@/Shared/types/global_interface';



const navItems: NavItem[] = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Competencies', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'AI Playground', href: '#playground' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    // Handle Scroll state change
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Framer Motion Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.08,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    };

    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            x: '100%',
            transition: {
                duration: 0.3,
                ease: easeInOut,
            },
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                ease: easeInOut,
                staggerChildren: 0.08,
            },
        },
    };

    const mobileItemVariants = {
        closed: { opacity: 0, x: 20 },
        open: { opacity: 1, x: 0 },
    };

    return (
        <>
            <motion.header
                id="mainHeader"
                className={`fixed top-0 left-0 right-0 z-50 glass-panel transition-all duration-300 border-b border-slate-800/80 ${isScrolled
                    ? 'bg-slate-950/80 border-slate-800/80 backdrop-blur-md shadow-lg shadow-black/20'
                    : 'bg-transparent border-transparent'
                    }`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="#"
                        className="flex items-center gap-2.5 sm:gap-3 group"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                        {/* Avatar Icon */}
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-linear-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-sm sm:text-base font-bold text-white shadow-lg group-hover:scale-105 transition-transform shrink-0">
                            AR
                        </div>

                        {/* Text Container */}
                        <div className="min-w-0">
                            <span className="font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-brand-400 transition-colors block truncate">
                                Ashikur Rahman
                            </span>
                            <span className="text-[10px] sm:text-xs text-brand-400 font-mono block -mt-0.5 sm:-mt-1 truncate">
                                ML & Full-Stack Eng.
                            </span>
                        </div>
                    </motion.a>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
                        {navItems.map((item) => (
                            <motion.div
                                key={item.name}
                                variants={itemVariants}
                                className="relative"
                                onMouseEnter={() => setHoveredItem(item.name)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <a
                                    href={item.href}
                                    className="relative rounded-lg px-4 py-2 text-slate-300 hover:text-teal-300 transition-colors duration-200 block"
                                >
                                    {hoveredItem === item.name && (
                                        <motion.div
                                            className="absolute inset-0 rounded-lg "
                                            layoutId="navbar-hover"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 400,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.name}</span>
                                </a>
                            </motion.div>
                        ))}
                    </nav>

                    {/* CTA Header Actions */}
                    <motion.div
                        className="hidden sm:flex items-center space-x-3"
                        variants={itemVariants}
                    >
                        <a
                            href="https://github.com/AR-Ashik-9997"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white transition flex items-center gap-2"
                        >
                            <i className="fa-brands fa-github text-teal-400"></i> GitHub
                        </a>
                        <a
                            href="#contact"
                            className="text-xs font-mono px-3 py-2 rounded-lg bg-teal-500/10 border border-teal-500/30 hover:bg-teal-500/20 text-teal-300 transition flex items-center gap-1.5"
                        >
                            <i className="fa-solid fa-paper-plane text-xs"></i> Contact
                        </a>
                    </motion.div>

                    {/* Mobile Menu Toggle Button */}
                    <motion.button
                        id="mobileMenuBtn"
                        className="md:hidden text-slate-300 hover:text-white p-2 text-2xl focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        variants={itemVariants}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle Navigation Menu"
                    >
                        <i
                            className={isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-4-line'}
                        ></i>
                    </motion.button>
                </div>
            </motion.header>

            {/* Mobile Animated Backdrop & Canvas Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Dark Backdrop */}
                        <motion.div
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Mobile Drawer Panel */}
                        <motion.div
                            className="fixed top-20 right-4 z-50 w-72 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-2xl md:hidden"
                            variants={mobileMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <div className="p-5 space-y-2">
                                {navItems.map((item) => (
                                    <motion.div key={item.name} variants={mobileItemVariants}>
                                        <a
                                            href={item.href}
                                            className="block rounded-xl px-4 py-3 text-slate-300 hover:text-teal-300 font-medium transition-colors duration-200"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </a>
                                    </motion.div>
                                ))}

                                {/* Mobile CTAs */}
                                <motion.div
                                    className="border-t border-slate-800 pt-4 mt-2 space-y-2.5"
                                    variants={mobileItemVariants}
                                >
                                    <a
                                        href="https://github.com/AR-Ashik-9997"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full text-xs font-mono px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-300 flex items-center justify-center gap-2"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <i className="fa-brands fa-github text-teal-400"></i> GitHub
                                    </a>
                                    <a
                                        href="#contact"
                                        className="w-full text-xs font-mono px-3 py-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 flex items-center justify-center gap-2"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <i className="fa-solid fa-paper-plane text-xs"></i> Contact
                                    </a>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
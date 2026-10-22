'use client';
/* eslint-disable react/jsx-no-comment-textnodes */
import { useState } from 'react';
import Image from 'next/image';
import { FilterCategory, Project } from '@/Shared/types/global_interface';



const PROJECTS_DATA: Project[] = [
  {
    id: 'ai-gen',
    category: 'ai',
    categoryLabel: 'Deep Learning',
    categoryBadgeStyle: 'bg-brand-500/20 border-brand-500/40 text-brand-300',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    title: 'AI Code Debugger',
    description: 'AI Code Debugger is a Streamlit-based application that helps developers analyze uploaded code screenshots or images and receive AI-powered feedback. The app can identify issues in the image, provide debugging hints, or generate a more complete solution explanation.',
    techStack: ['Streamlit', 'Google GenAI SDK', 'Pillow', 'Python 3.11'],
    actionLabel: 'Live Sandbox',
    actionIcon: 'ri-play-circle-line',
    githubUrl: 'https://github.com/AR-Ashik-9997/Ai-debugger',
    demo_link: "https://ai-debugger.vercel.app/"
  },
  {
    id: 'portfoilo',
    category: 'fullstack',
    categoryLabel: 'Full-Stack',
    categoryBadgeStyle: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    title: 'Next.js AI & Full-Stack Engineer Portfolio',
    description: 'Scalable e-commerce platform integrated with vector embeddings (Pinecone) for smart contextual visual product recommendations.',
    techStack: ['Next.js 16', 'TypeScript', 'Tailwind', 'Framer Motion'],
    actionLabel: 'Live Sandbox',
    actionIcon: 'ri-eye-line',
    githubUrl: 'https://github.com/AR-Ashik-9997/Ds-Portfolio',
    demo_link: "#"
  },
  {
    id: 'medical-ai',
    category: 'ai',
    categoryLabel: 'Computer Vision',
    categoryBadgeStyle: 'bg-brand-500/20 border-brand-500/40 text-brand-300',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
    title: 'MRI Medical Vision Classifier',
    description: 'PyTorch ResNet-50 transfer learning pipeline achieving 98.4% diagnostic accuracy for brain scan segmentation and diagnosis.',
    techStack: ['PyTorch', 'CNN', 'TorchVision', 'CUDA'],
    actionLabel: 'Metrics & Demo',
    actionIcon: 'ri-line-chart-line',
    githubUrl: 'https://github.com/AR-Ashik-9997/Brain-Tumor-MRI-Classification-with-CNN/tree/main',
    demo_link: "#"
  },
  {
    id: 'sentiment',
    category: 'ai',
    categoryLabel: 'Deep Learning',
    categoryBadgeStyle: 'bg-brand-500/20 border-brand-500/40 text-brand-300',
    image: 'https://i.ibb.co.com/JWqLtWqK/premium-photo-1739123854194-90d8d1d024db.jpg',
    title: 'Amazon Review of Sentiment Analysis',
    description: 'Sentiment Pulse is a web dashboard for analyzing customer review sentiment. Enter a review or choose a sample preset, send it to a sentiment-analysis API, and inspect the returned classification, confidence, emotion, aspect impact, priority, and suggested response.',
    techStack: ['PyTorch', 'NLP', 'TorchVision', 'LSTM'],
    actionLabel: 'Live Demo',
    actionIcon: 'ri-line-chart-line',
    githubUrl: 'https://github.com/AR-Ashik-9997/Amazon-Reviews-for-Sentiment-Analysis',
    demo_link: "https://sentiment-pulse-lemon.vercel.app/"
  },
  {
    id: 'Sentiment',
    category: 'api',
    categoryLabel: 'Backend Architecture',
    categoryBadgeStyle: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    title: 'Enterprise FastAPI Gateway',
    description: 'Asynchronous REST & WebSocket gateway handling 10k+ requests/sec with JWT authentication, rate limiting, and PostgreSQL connection pooling.',
    techStack: ['FastAPI', 'scikit-learn / joblib', 'Uvicorn', 'Pydantic v2'],
    actionLabel: 'View Architecture',
    actionIcon: 'ri-article-line',
    githubUrl: 'https://github.com/AR-Ashik-9997/FastAPI-Platform',
    demo_link: "#"
  }
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const openProjectModal = (id: string, link: string) => {
    // Custom modal opening logic or global modal state trigger can be attached here
    console.log('Open project modal:', id);
    if (id && link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((project) => project.category === activeFilter);

  return (
    <section
      id="projects"
      className="py-24 bg-darkcard/50 border-y border-slate-800/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-mono text-brand-400 uppercase tracking-widest mb-2">
              // Selected Engineering Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Featured Projects & Systems
            </h2>
          </div>

          {/* Filter Buttons */}
          <div
            className="mt-6 md:mt-0 flex flex-wrap gap-2"
            id="projectFilterGroup"
          >
            <button
              onClick={() => setActiveFilter('all')}
              className={`filter-btn px-4 py-2 text-xs font-medium rounded-lg transition-all ${activeFilter === 'all'
                ? 'active border border-brand-500 bg-brand-500/20 text-brand-300'
                : 'border border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
                }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveFilter('ai')}
              className={`filter-btn px-4 py-2 text-xs font-medium rounded-lg transition-all ${activeFilter === 'ai'
                ? 'active border border-brand-500 bg-brand-500/20 text-brand-300'
                : 'border border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
                }`}
            >
              AI & Deep Learning
            </button>
            <button
              onClick={() => setActiveFilter('fullstack')}
              className={`filter-btn px-4 py-2 text-xs font-medium rounded-lg transition-all ${activeFilter === 'fullstack'
                ? 'active border border-brand-500 bg-brand-500/20 text-brand-300'
                : 'border border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
                }`}
            >
              Full-Stack Web
            </button>
            <button
              onClick={() => setActiveFilter('api')}
              className={`filter-btn px-4 py-2 text-xs font-medium rounded-lg transition-all ${activeFilter === 'api'
                ? 'active border border-brand-500 bg-brand-500/20 text-brand-300'
                : 'border border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
                }`}
            >
              APIs & Cloud
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          id="projectsGrid"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card glass-panel rounded-2xl overflow-hidden border border-slate-800 glow-card transition-all duration-300 flex flex-col"
              data-category={project.category}
            >
              <div className="relative h-48 overflow-hidden group">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-darkbg via-darkbg/40 to-transparent" />
                <span
                  className={`absolute top-3 right-3 px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold uppercase ${project.categoryBadgeStyle}`}
                >
                  {project.categoryLabel}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                {
                  project.demo_link != '#' ? (
                    <div>
                      <h3
                        className="text-xl font-bold text-white mb-2 hover:text-brand-400 transition-colors cursor-pointer"
                        onClick={() => openProjectModal(project.id, project.demo_link)}
                      >
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3
                        className="text-xl font-bold text-white mb-2 hover:text-brand-400 transition-colors"

                      >
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                }
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                  {project.demo_link !== '#' ? (
                    <button
                      onClick={() => openProjectModal(project.id, project.demo_link)}
                      className="flex-1 py-2 text-xs font-semibold rounded-lg bg-brand-600 hover:bg-brand-500 text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <i className={`${project.actionIcon} text-base`} />{' '}
                      {project.actionLabel}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 py-2 text-xs font-semibold rounded-lg bg-brand-600 hover:bg-brand-500 text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <i className={`${project.actionIcon} text-base`} />{' '}
                      {project.actionLabel}
                    </button>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg glass-panel border border-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="GitHub Source"
                  >
                    <i className="ri-github-line text-lg" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
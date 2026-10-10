export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface ExperienceItem {
    period: string;
    role: string;
    company: string;
    dotBgColor: string;
    companyTextColor: string;
    hoverBorderColor: string;
    responsibilities: string[];
}

export interface NavItem {
    name: string;
    href: string;
}

export type FilterCategory = 'all' | 'ai' | 'fullstack' | 'api';

export interface Project {
    id: string;
    category: FilterCategory;
    categoryLabel: string;
    categoryBadgeStyle: string;
    image: string;
    title: string;
    description: string;
    techStack: string[];
    actionLabel: string;
    actionIcon: string;
    githubUrl: string;
}

export interface SkillItem {
    name: string;
    percentage: number;
}

export interface SkillCategory {
    title: string;
    iconClass: string;
    borderColorClass: string;
    iconBgClass: string;
    iconTextClass: string;
    percentageTextClass: string;
    progressGradientClass: string;
    skills: SkillItem[];
}

export type ModelType = 'brain_tumor' | 'income_salary' | 'house_price';

export interface PredictionDetails {
    label: string;
    confidence: number;
    probabilities?: Record<string, number>;
}

export interface InferenceResponse {
    status: string;
    model_id: string;
    timestamp: string;
    latency_ms: number;
    input_tensor_shape?: string;
    predictions?: PredictionDetails;
    model_metadata?: {
        framework: string;
        device: string;
    };
    error?: string;
    message?: string;
}
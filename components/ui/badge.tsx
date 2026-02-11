import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'spicy' | 'vegetarian' | 'glutenfree' | 'info' | 'outline';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    className = ''
}) => {
    const variants = {
        default: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300',
        spicy: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-900',
        vegetarian: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-900',
        glutenfree: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-900',
        info: 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50',
        outline: 'bg-transparent border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

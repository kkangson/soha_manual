import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-white dark:bg-stone-900 rounded-2xl overflow-hidden shadow-sm border border-stone-100 dark:border-stone-800 transition-shadow hover:shadow-md ${className}`}>
            {children}
        </div>
    );
};

export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => (
    <div className={`relative w-full overflow-hidden ${className}`}>
        {children}
    </div>
);

export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => (
    <div className={`p-4 space-y-3 ${className}`}>
        {children}
    </div>
);

import React from 'react';

interface CategoryHeaderProps {
    title: string;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title }) => {
    return (
        <h2 className="sticky top-[61px] z-[5] py-4 px-5 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md text-xl font-black text-stone-800 dark:text-stone-100 transition-all tracking-tight uppercase border-b border-stone-200 dark:border-stone-800">
            {title}
        </h2>
    );
};

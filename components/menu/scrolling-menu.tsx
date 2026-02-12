'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Filter, Utensils, MessageSquare } from 'lucide-react';
import { MenuData } from '@/types/menu';
import { MenuItemCard } from '@/components/menu/menu-item-card';

interface ScrollingMenuProps {
    data: MenuData;
}

export const ScrollingMenu: React.FC<ScrollingMenuProps> = ({ data }) => {
    const [onlyWithSettings, setOnlyWithSettings] = useState(false);
    const [onlyWithNotes, setOnlyWithNotes] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string>(Object.keys(data.menu)[0]);
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    // Filtered data based on toggles
    const filteredMenu = useMemo(() => {
        if (!onlyWithSettings && !onlyWithNotes) return data.menu;

        const filtered: Record<string, any[]> = {};
        Object.entries(data.menu).forEach(([category, items]) => {
            const filteredItems = items.filter(item => {
                const hasSettings = item.table_settings && item.table_settings.length > 0;
                const hasNotes = item.note && item.note.trim().length > 0;

                return (onlyWithSettings && hasSettings) || (onlyWithNotes && hasNotes);
            });

            if (filteredItems.length > 0) {
                filtered[category] = filteredItems;
            }
        });
        return filtered;
    }, [data.menu, onlyWithSettings, onlyWithNotes]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-90px 0px -80% 0px', // Detect elements in a strip near the top
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveCategory(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        Object.values(sectionRefs.current).forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, [filteredMenu]);

    return (
        <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-950 pb-12">
            {/* Sticky Navbar with Dynamic Category & Toggle */}
            <nav className="sticky top-0 z-20 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border-b border-stone-200 dark:border-stone-800 px-4 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center flex-1">
                    <Link
                        href="/"
                        className="p-2 -ml-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-all active:scale-90"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <button
                        onClick={() => {
                            const categories = Object.keys(filteredMenu);
                            if (categories.length <= 1) return;

                            const currentIndex = categories.indexOf(activeCategory);
                            const nextIndex = (currentIndex + 1) % categories.length;
                            const nextCategory = categories[nextIndex];

                            const element = sectionRefs.current[nextCategory];
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                // Immediate feedback for state
                                setActiveCategory(nextCategory);
                            }
                        }}
                        className="ml-3 flex flex-col items-start flex-1 h-full py-1 cursor-pointer group transition-all text-left outline-none min-w-[140px]"
                    >
                        <p className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em] leading-none mb-1">
                            {data.restaurant}
                        </p>
                        <h1 className="font-black text-xl leading-none uppercase tracking-tighter truncate max-w-[200px] group-hover:text-orange-600 transition-colors duration-300">
                            {activeCategory}
                        </h1>
                    </button>
                </div>

                {/* Filter Toggles */}
                <div className="flex items-center gap-2">
                    {/* Notes Filter */}
                    <button
                        onClick={() => setOnlyWithNotes(!onlyWithNotes)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 active:scale-90 ${onlyWithNotes
                            ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20'
                            : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                            }`}
                        title="Filter items with notes"
                    >
                        <MessageSquare className="w-4 h-4" />
                    </button>

                    {/* Settings Filter */}
                    <button
                        onClick={() => setOnlyWithSettings(!onlyWithSettings)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 active:scale-90 ${onlyWithSettings
                            ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20'
                            : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                            }`}
                        title="Filter items with table settings"
                    >
                        <Utensils className="w-4 h-4" />
                    </button>
                </div>
            </nav>

            {/* Menu Content */}
            <main className="p-0 space-y-0 w-full">
                {Object.entries(filteredMenu).map(([category, items]) => (
                    <section
                        key={category}
                        id={category}
                        ref={(el) => { sectionRefs.current[category] = el; }}
                        className="scroll-mt-20"
                    >
                        <div className="flex flex-col bg-stone-100 dark:bg-stone-800">
                            {items.map((item, idx) => (
                                <MenuItemCard
                                    key={`${category}-${item.name}-${idx}`}
                                    item={item}
                                />
                            ))}
                        </div>
                    </section>
                ))}

                {Object.keys(filteredMenu).length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 px-8 text-center space-y-4">
                        <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center text-stone-300 dark:text-stone-600">
                            <Filter className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="font-bold text-stone-400">No items match your filters</p>
                            <button
                                onClick={() => {
                                    setOnlyWithSettings(false);
                                    setOnlyWithNotes(false);
                                }}
                                className="text-orange-600 text-sm font-bold mt-2 underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

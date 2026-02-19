'use client';

// Import necessary React tools and icons for the menu navigation and filtering
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Filter, Utensils, MessageSquare } from 'lucide-react';
import { MenuData } from '@/types/menu';
import { MenuItemCard } from '@/components/menu/menu-item-card';

// This defines the structure of data this component expects to receive
interface ScrollingMenuProps {
    data: MenuData;
}

// This is the main Menu component that handles scrolling and filtering
export const ScrollingMenu: React.FC<ScrollingMenuProps> = ({ data }) => {
    // These are switches (state) to show only items with special settings or notes
    const [onlyWithSettings, setOnlyWithSettings] = useState(false);
    const [onlyWithNotes, setOnlyWithNotes] = useState(false);

    // This keeps track of which category (like 'Appetizers') the user is currently looking at
    const [activeCategory, setActiveCategory] = useState<string>(Object.keys(data.menu)[0]);

    // This helps the code "find" the different sections of the menu on the screen
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    // This part calculates a "filtered" list of menu items whenever the user flips a switch
    const filteredMenu = useMemo(() => {
        // If no filters are active, show everything
        if (!onlyWithSettings && !onlyWithNotes) return data.menu;

        const filtered: Record<string, any[]> = {};
        Object.entries(data.menu).forEach(([category, items]) => {
            const filteredItems = items.filter(item => {
                const hasSettings = item.table_settings && item.table_settings.length > 0;
                const hasNotes = item.note && item.note.trim().length > 0;

                // Return items that match the user's active filters
                return (onlyWithSettings && hasSettings) || (onlyWithNotes && hasNotes);
            });

            // Only include categories that still have items after filtering
            if (filteredItems.length > 0) {
                filtered[category] = filteredItems;
            }
        });
        return filtered;
    }, [data.menu, onlyWithSettings, onlyWithNotes]);

    // This effect detects when a new category section enters the top of the screen while scrolling
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-90px 0px -80% 0px', // Look at a thin horizontal area near the top
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Update the active category label based on what is visible
                    setActiveCategory(entry.target.id);
                }
            });
        };

        // Initialize the screen "observer"
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Tell the observer to watch each category section
        Object.values(sectionRefs.current).forEach((section) => {
            if (section) observer.observe(section);
        });

        // Clean up when this component is no longer used
        return () => observer.disconnect();
    }, [filteredMenu]);

    return (
        <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-950 pb-12">
            {/* The Header bar that stays at the top (Sticky Navbar) */}
            <nav className="sticky top-0 z-20 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border-b border-stone-200 dark:border-stone-800 px-4 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center flex-1">
                    {/* A button to go back to the home page */}
                    <Link
                        href="/"
                        className="p-2 -ml-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-all active:scale-90"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Link>

                    {/* The title area: Clicking this jumps to the next category in the list */}
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

                {/* The Filter buttons: Circle buttons to toggle notes or table settings visibility */}
                <div className="flex items-center gap-2">
                    {/* Switch: Show only items with special notes */}
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

                    {/* Switch: Show only items that require special table settings */}
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

            {/* The main scrollable list area where all dishes are shown */}
            <main className="p-0 space-y-0 w-full">
                {Object.entries(filteredMenu).map(([category, items]) => (
                    <section
                        key={category}
                        id={category}
                        // Mark this section so the app knows where it is when scrolling
                        ref={(el) => { sectionRefs.current[category] = el; }}
                        className="scroll-mt-20"
                    >
                        <div className="flex flex-col bg-stone-100 dark:bg-stone-800">
                            {items.map((item, idx) => (
                                // For each item, display a "Menu Item Card"
                                <MenuItemCard
                                    key={`${category}-${item.name}-${idx}`}
                                    item={item}
                                />
                            ))}
                        </div>
                    </section>
                ))}

                {/* If the user uses filters and NO items match, show this "Empty" message */}
                {Object.keys(filteredMenu).length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 px-8 text-center space-y-4">
                        <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center text-stone-300 dark:text-stone-600">
                            <Filter className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="font-bold text-stone-400">No items match your filters</p>
                            <button
                                onClick={() => {
                                    // Reset all filters back to normal
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

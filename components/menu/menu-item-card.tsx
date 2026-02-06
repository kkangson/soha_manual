import React from 'react';
import Image from 'next/image';
import { JsonMenuItem } from '@/types/menu';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { guessSettings } from '@/lib/menu';

interface MenuItemCardProps {
    item: JsonMenuItem;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
    const settings = guessSettings(item);

    // Placeholder image logic with a more stable fallback
    const imageUrl = `https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&w=800&q=80`;

    return (
        <div className="flex flex-col bg-white dark:bg-stone-900 overflow-hidden">
            {/* Image (Square like Instagram) */}
            <div className="relative aspect-square w-full overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 512px"
                    priority={item.name === 'Bulgogi'} // Heuristic for early items
                />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm font-bold border border-white/10 shadow-lg">
                    ${item.price}
                </div>
            </div>

            {/* Content (Caption area) */}
            <div className="p-4 space-y-4">
                <div className="space-y-1">
                    <h2 className="text-xl font-bold tracking-tight">{item.name_ko}</h2>
                    <h3 className="text-sm font-medium text-stone-500 dark:text-stone-400">{item.name}</h3>
                </div>

                {/* Table Setting Section */}
                <div className="p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl space-y-2">
                    <div className="flex justify-between items-center px-1">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Essential Setting</h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {settings.map((set, idx) => (
                            <span
                                key={idx}
                                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/50 dark:border-stone-700 shadow-sm"
                            >
                                {set}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Attributes Section */}
                {(item.attributes || item.note) && (
                    <div className="flex flex-wrap gap-2">
                        {item.attributes?.map(attr => (
                            <Badge
                                key={attr}
                                variant={attr.toLowerCase() === 'spicy' ? 'spicy' : attr.toLowerCase() === 'vegetarian' ? 'vegetarian' : 'default'}
                            >
                                {attr}
                            </Badge>
                        ))}
                        {item.note && (
                            <Badge variant="info">
                                {item.note}
                            </Badge>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

import React from 'react';
import Image from 'next/image';
import { JsonMenuItem } from '@/types/menu';
import { Badge } from '@/components/ui/badge';
import { ImageOff } from 'lucide-react';

interface MenuItemCardProps {
    item: JsonMenuItem;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
    const settings = item.table_settings || [];

    return (
        <div className="flex flex-col bg-white dark:bg-stone-900 overflow-hidden">
            {/* Image (Square like Instagram) */}
            <div className="relative aspect-square w-full overflow-hidden">
                {item.image ? (
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 512px"
                        priority={item.name.toLowerCase().includes('bulgogi')}
                    />
                ) : (
                    <div className="w-full h-full bg-stone-100 dark:bg-stone-800 flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-16 h-16 bg-white dark:bg-stone-700 rounded-full flex items-center justify-center shadow-sm mb-4">
                            <ImageOff className="w-7 h-7 text-stone-300 dark:text-stone-500" />
                        </div>
                        <p className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.2em]">
                            Photo coming soon
                        </p>
                    </div>
                )}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm font-bold border border-white/20 shadow-xl">
                    ${item.price}
                </div>
            </div>

            {/* Content (Caption area) */}
            <div className="p-4 space-y-4">
                <div className="space-y-1">
                    <div className="flex items-center flex-wrap gap-2">
                        <h2 className="text-xl font-bold tracking-tight">{item.name_ko}</h2>
                        <div className="flex flex-wrap gap-1.5">
                            {item.attributes?.map(attr => (
                                <Badge
                                    key={attr}
                                    variant={attr.toLowerCase() === 'spicy' ? 'spicy' : attr.toLowerCase() === 'vegetarian' ? 'vegetarian' : 'default'}
                                    className="px-1.5 py-0 text-[9px] uppercase tracking-wider"
                                >
                                    {attr}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <h3 className="text-sm font-medium text-stone-500 dark:text-stone-400">{item.name}</h3>
                </div>

                {/* Table Setting Section */}
                {settings.length > 0 && (
                    <div className="p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Table Setting</h4>
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
                )}

                {/* Note Section (If any) */}
                {item.note && (
                    <div className="px-1">
                        <Badge variant="info" className="text-[10px]">
                            {item.note}
                        </Badge>
                    </div>
                )}
            </div>
        </div>
    );
};

import React, { useState } from 'react';
import Image from 'next/image';
import { JsonMenuItem } from '@/types/menu';
import { Badge } from '@/components/ui/badge';
import { ImageOff, MessageSquare } from 'lucide-react';

interface MenuItemCardProps {
    item: JsonMenuItem;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
    const settings = item.table_settings || [];
    const [showNote, setShowNote] = useState(false);

    return (
        <div className="flex flex-col bg-white dark:bg-stone-900 overflow-hidden border-b border-stone-100 dark:border-stone-800">
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

                {/* Note Icon - Bottom Left */}
                {item.note && (
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                        <button
                            onClick={() => setShowNote(!showNote)}
                            className={`w-9 h-9 backdrop-blur-md rounded-full flex items-center justify-center border transition-all duration-300 shadow-lg ${showNote
                                ? 'bg-orange-600 border-orange-500 text-white scale-110'
                                : 'bg-black/60 border-white/20 text-white hover:bg-black/80'}`}
                            aria-label="Toggle note"
                        >
                            <MessageSquare className="w-4 h-4" />
                        </button>
                        <div className={`transition-all duration-300 transform origin-left ${showNote
                            ? 'opacity-100 scale-100 translate-x-0'
                            : 'opacity-0 scale-95 -translate-x-2 pointer-events-none'}`}>
                            <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl text-white text-[11px] font-medium border border-white/10 shadow-2xl max-w-[200px] leading-relaxed whitespace-pre-line">
                                {item.note.split('∙').map((part, i) => (
                                    <React.Fragment key={i}>
                                        {i > 1 && <br />}
                                        {i > 0 && '∙ '}
                                        {part.trim()}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Price Label - Bottom Right */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm font-bold border border-white/20">
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
                                    variant={
                                        attr.toLowerCase() === 'spicy' ? 'spicy' :
                                            attr.toLowerCase() === 'vegetarian' ? 'vegetarian' :
                                                attr.toLowerCase().includes('gluten') || attr.toLowerCase() === 'gf' ? 'glutenfree' :
                                                    'default'
                                    }
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
            </div>
        </div>
    );
};

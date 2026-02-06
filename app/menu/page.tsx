import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import {
    ArrowLeft,
    Flame,
    Utensils,
    Scissors,
    Trash2,
    Soup,
    CircleDot,
    ChefHat,
    MonitorCheck
} from "lucide-react";

// Types matching the JSON structure
type JsonMenuItem = {
    name: string;
    name_ko: string;
    price: number;
    attributes?: string[];
    note?: string;
};

type MenuData = {
    restaurant: string;
    currency: string;
    menu: Record<string, JsonMenuItem[]>;
};

const SETTING_ICONS: Record<string, { icon: React.ElementType, label: string, color: string }> = {
    "큰 불판": { icon: CircleDot, label: "Large Grill", color: "text-orange-600" },
    "작은 불판": { icon: Flame, label: "Small Grill", color: "text-red-500" },
    "집게": { icon: Utensils, label: "Tongs", color: "text-stone-600" },
    "국자": { icon: ChefHat, label: "Ladle", color: "text-stone-600" },
    "숟가락": { icon: Utensils, label: "Spoon", color: "text-stone-600" },
    "가위": { icon: Scissors, label: "Scissors", color: "text-stone-600" },
    "뼈버리는 통": { icon: Trash2, label: "Bone Bin", color: "text-stone-500" },
    "국그릇": { icon: Soup, label: "Soup Bowl", color: "text-stone-600" },
};

// Default settings map based on keywords (since JSON lacks explicit settings)
const GUESS_SETTINGS = (item: JsonMenuItem): string[] => {
    const settings: string[] = ["숟가락"]; // Default
    const name = item.name.toLowerCase();

    if (name.includes("stew") || name.includes("soup") || name.includes("ramyun")) {
        settings.push("국자", "국그릇");
        if (name.includes("clam") || name.includes("crab")) settings.push("뼈버리는 통");
    }
    if (name.includes("grilled") || name.includes("bbq") || name.includes("bulgogi")) {
        settings.push("집게", "가위");
        // Heuristic for grill type
        if (item.price > 25) settings.push("큰 불판");
        else settings.push("작은 불판");
    }
    if (name.includes("ribs") || name.includes("chicken") || name.includes("bone")) {
        settings.push("뼈버리는 통");
    }

    return Array.from(new Set(settings)).filter(Boolean);
};

async function getMenuData(): Promise<MenuData> {
    const filePath = path.join(process.cwd(), "public/data/menu.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(jsonData);
}

export default async function MenuPage() {
    const data = await getMenuData();

    return (
        <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-950 pb-8">
            {/* Navbar */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <Link
                        href="/"
                        className="p-2 -ml-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="font-semibold text-lg ml-2">{data.restaurant} Menu</h1>
                </div>
            </div>

            {/* Menu Categories */}
            <div className="p-4 space-y-8">
                {Object.entries(data.menu).map(([category, items]) => (
                    <div key={category} className="space-y-4">
                        <h2 className="sticky top-[61px] z-[5] py-3 -mx-4 px-5 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-sm text-xl font-bold text-stone-800 dark:text-stone-100 border-l-4 border-orange-500 shadow-sm transition-all">
                            {category}
                        </h2>

                        <div className="grid gap-6">
                            {items.map((item, idx) => {
                                // Generate pseudo-settings since they aren't in JSON yet
                                const settings = GUESS_SETTINGS(item);
                                // Placeholder image logic
                                const imageUrl = `https://source.unsplash.com/800x600/?korean,food,${encodeURIComponent(item.name.split(' ')[0])}`;

                                return (
                                    <div
                                        key={`${category}-${idx}`}
                                        className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden shadow-sm border border-stone-100 dark:border-stone-800 flex flex-col"
                                    >
                                        {/* Image Placeholder */}
                                        <div className="relative w-full h-72 bg-stone-200 flex items-center justify-center overflow-hidden group">
                                            <Image
                                                src={`https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&w=800&q=80`} // Generic fallback for now
                                                alt={item.name}
                                                fill
                                                className="object-cover opacity-90"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                                <div className="flex flex-col text-white">
                                                    <h2 className="text-2xl font-bold leading-tight mb-1">{item.name_ko}</h2>
                                                    <h3 className="text-sm font-medium opacity-80 leading-snug">{item.name}</h3>
                                                </div>
                                            </div>
                                            <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white text-sm font-bold shadow-lg">
                                                ${item.price}
                                            </div>
                                        </div>

                                        <div className="p-4 space-y-3">
                                            {/* Auto-Generated Settings */}
                                            <div className="p-2 bg-stone-50 dark:bg-stone-800/50 rounded-xl space-y-1.5">
                                                <div className="flex justify-between items-center px-1">
                                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">Table Setting</h4>
                                                    <span className="text-[10px] bg-stone-200 dark:bg-stone-700 px-1.5 py-0.5 rounded text-stone-500">Auto</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {settings.map((set, sIdx) => {
                                                        const iconData = SETTING_ICONS[set];
                                                        const label = iconData ? set : set;
                                                        return (
                                                            <span key={sIdx} className="px-2 py-1 rounded-md text-[11px] font-medium bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-100 dark:border-stone-700 shadow-sm leading-tight">
                                                                {label}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Tags & Attributes */}
                                            {(item.attributes || item.note) && (
                                                <div className="flex flex-wrap gap-2 pt-1">
                                                    {item.attributes?.map(attr => {
                                                        let colorClass = "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300"; // Default
                                                        if (attr.toLowerCase() === 'spicy') {
                                                            colorClass = "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-900";
                                                        } else if (attr.toLowerCase() === 'vegetarian') {
                                                            colorClass = "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-900";
                                                        }

                                                        return (
                                                            <span key={attr} className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${colorClass}`}>
                                                                {attr}
                                                            </span>
                                                        );
                                                    })}
                                                    {item.note && (
                                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                                                            {item.note}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

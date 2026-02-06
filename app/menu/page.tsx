import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getMenuData } from "@/lib/menu";
import { MenuItemCard } from "@/components/menu/menu-item-card";
import { CategoryHeader } from "@/components/menu/category-header";

export default async function MenuPage() {
    const data = await getMenuData();

    return (
        <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-950 pb-12">
            {/* Navbar */}
            <nav className="sticky top-0 z-20 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border-b border-stone-200 dark:border-stone-800 px-4 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center">
                    <Link
                        href="/"
                        className="p-2 -ml-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-all active:scale-90"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="ml-3">
                        <h1 className="font-bold text-lg leading-none">{data.restaurant}</h1>
                        <p className="text-[10px] font-semibold text-orange-600 uppercase tracking-widest mt-1">Staff Training Guide</p>
                    </div>
                </div>
            </nav>

            {/* Menu Content */}
            <main className="p-0 space-y-12 w-full">
                {Object.entries(data.menu).map(([category, items]) => (
                    <section key={category}>
                        <CategoryHeader title={category} />

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
            </main>
        </div>
    );
}

import { getMenuList } from "@/lib/actions";
import { ScrollingMenu } from "@/components/menu/scrolling-menu";

export default async function MenuPage() {
    const data = await getMenuList();

    console.log(data)
    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-200">Failed to load menu</h1>
                    <p className="text-stone-600 dark:text-stone-400 mt-2">Please check your connection and try again.</p>
                </div>
            </div>
        );
    }

    return <ScrollingMenu data={data} />;
}

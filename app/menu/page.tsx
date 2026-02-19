// Import tools to fetch data and the component that handles the menu view
import { getMenuList } from "@/lib/actions";
import { ScrollingMenu } from "@/components/menu/scrolling-menu";

// This function creates the Menu page
export default async function MenuPage() {
    // We ask the "kitchen" (our data source) to give us the list of menu items
    const data = await getMenuList();

    // If we couldn't get any information (maybe the internet is down), show an error message
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

    // If we successfully got the data, we give it to the ScrollingMenu tool to display it
    return <ScrollingMenu data={data} />;
}

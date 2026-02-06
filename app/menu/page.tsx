import { getMenuData } from "@/lib/menu";
import { ScrollingMenu } from "@/components/menu/scrolling-menu";

export default async function MenuPage() {
    const data = await getMenuData();

    return <ScrollingMenu data={data} />;
}

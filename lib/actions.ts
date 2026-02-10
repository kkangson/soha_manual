'use server';

import { hygraph, HygraphQueries } from "./hygraph";
import { HygraphCategory, MenuData, JsonMenuItem } from "@/types/menu";

export async function getMenuList(): Promise<MenuData | null> {
  try {
    // Use Graffle to send the exported query
    const data: any = await (hygraph as any).gql(HygraphQueries.getMenuList).$send();

    if (!data || !data.menuCategories) {
      throw new Error('No data returned from Hygraph');
    }

    const categories = data.menuCategories as HygraphCategory[];

    const menu: Record<string, JsonMenuItem[]> = {};

    categories.forEach(cat => {
      menu[cat.name] = cat.items.map(item => ({
        id: item.id,
        name: item.name,
        name_ko: item.name_ko,
        price: item.price,
        image: item.image?.url,
        table_settings: item.table_setting.map(s => s.name),
        attributes: item.attribute.map(a => a.name)
      }));
    });

    return {
      restaurant: "Soju Haus",
      currency: "USD",
      menu
    };
  } catch (error) {
    console.error('Error in getMenuList:', error);
    return null;
  }
}

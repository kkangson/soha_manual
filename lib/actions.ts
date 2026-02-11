'use server';

import { HygraphCategory, MenuData, JsonMenuItem } from "@/types/menu";

const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT || process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
const HYGRAPH_TOKEN = process.env.HYGRAPH_PROD_AUTH_TOKEN;

const GET_MENU_LIST_QUERY = `
    query getMenuList {
      menuCategories {
        name
        items {
          id
          name
          name_ko
          price
          image {
            url
          }
          table_setting {
            name
          }
          attribute {
            name
          }
          note
        }
      }
    }
`;

export async function getMenuList(): Promise<MenuData | null> {
  if (!HYGRAPH_ENDPOINT) {
    console.error('HYGRAPH_ENDPOINT is not defined');
    return null;
  }

  try {
    const response = await fetch(HYGRAPH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(HYGRAPH_TOKEN ? { Authorization: `Bearer ${HYGRAPH_TOKEN}` } : {}),
      },
      body: JSON.stringify({ query: GET_MENU_LIST_QUERY }),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Hygraph request failed: ${response.status} ${text}`);
    }

    const { data, errors } = await response.json();

    if (errors) {
      console.error('Hygraph Errors:', errors);
      throw new Error('GraphQL Errors');
    }

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
        attributes: item.attribute.map(a => a.name),
        note: item.note
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

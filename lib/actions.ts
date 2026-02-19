'use server';

// Import necessary information structures for the menu data
import { HygraphCategory, MenuData, JsonMenuItem } from "@/types/menu";

// Setup the address (Endpoint) and the key (Token) to access our digital storehouse (Hygraph)
const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT || process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
const HYGRAPH_TOKEN = process.env.HYGRAPH_PROD_AUTH_TOKEN;

// This is a "shopping list" (Query) that tells Hygraph exactly what menu details we need
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

// This function goes to the digital storehouse and brings back the menu items
export async function getMenuList(): Promise<MenuData | null> {
  // If we don't have the address of the storehouse, we can't go there
  if (!HYGRAPH_ENDPOINT) {
    console.error('HYGRAPH_ENDPOINT is not defined');
    return null;
  }

  try {
    // We send a request to the storehouse with our "shopping list"
    const response = await fetch(HYGRAPH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(HYGRAPH_TOKEN ? { Authorization: `Bearer ${HYGRAPH_TOKEN}` } : {}),
      },
      body: JSON.stringify({ query: GET_MENU_LIST_QUERY }),
      next: { revalidate: 60 }, // This tells the app to check for new menu updates every 60 seconds
    });

    // If the storehouse didn't answer correctly, we stop and report an error
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Hygraph request failed: ${response.status} ${text}`);
    }

    // We open the package (JSON) sent back by the storehouse
    const { data, errors } = await response.json();

    if (errors) {
      console.error('Hygraph Errors:', errors);
      throw new Error('GraphQL Errors');
    }

    if (!data || !data.menuCategories) {
      throw new Error('No data returned from Hygraph');
    }

    // Now we organize the raw data into a format that our app can easily read
    const categories = data.menuCategories as HygraphCategory[];

    const menu: Record<string, JsonMenuItem[]> = {};

    categories.forEach(cat => {
      // Group the items by their category names (like 'Drinks' or 'Mains')
      menu[cat.name] = cat.items.map(item => ({
        id: item.id,
        name: item.name,
        name_ko: item.name_ko,
        price: item.price,
        image: item.image?.url,
        // Convert complex information into simple lists of names
        table_settings: item.table_setting.map(s => s.name),
        attributes: item.attribute.map(a => a.name),
        note: item.note
      }));
    });

    // We return the final, organized "Menu Data" object
    return {
      restaurant: "Soju Haus",
      currency: "USD",
      menu
    };
  } catch (error) {
    // If anything goes wrong during this whole process, we log the error and return nothing
    console.error('Error in getMenuList:', error);
    return null;
  }
}

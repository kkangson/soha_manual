
// This describes all the details that belong to one single Menu Item (like a dish or drink)
export interface JsonMenuItem {
    id?: string;               // A unique identification for the item
    name: string;             // The English name of the item
    name_ko: string;          // The Korean name of the item
    price: number;            // The cost of the item
    attributes?: string[];     // Special features (like 'Spicy' or 'Vegetarian')
    table_settings?: string[];  // Instructions for the server (like 'Needs Spoon')
    image?: string;           // The web address (URL) for the dish's photo
    note?: string;            // A short description or extra information about the dish
}

// This describes how the whole "Menu" is structured in the app
export interface MenuData {
    restaurant: string;       // The name of the restaurant (Soju Haus)
    currency: string;         // The type of money used (USD)
    menu: Record<string, JsonMenuItem[]>; // A list of menu items grouped by their category names
}

// These are specialized descriptions for information coming from the digital storehouse (Hygraph)
export interface HygraphMenuItem {
    id: string;
    name: string;
    name_ko: string;
    price: number;
    image?: { url: string };
    table_setting: { name: string }[];
    attribute: { name: string }[];
    note?: string;
}

// This describes how a "Category" (like 'Drinks') is received from the storehouse
export interface HygraphCategory {
    name: string;
    items: HygraphMenuItem[];
}

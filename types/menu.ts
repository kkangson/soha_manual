
export interface JsonMenuItem {
    id?: string;
    name: string;
    name_ko: string;
    price: number;
    attributes?: string[];
    table_settings?: string[];
    image?: string;
    note?: string;
}

export interface MenuData {
    restaurant: string;
    currency: string;
    menu: Record<string, JsonMenuItem[]>;
}

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

export interface HygraphCategory {
    name: string;
    items: HygraphMenuItem[];
}

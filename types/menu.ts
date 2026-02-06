export type MenuCategory = 'STAPLES' | 'SIDES' | 'ADD-ONS' | 'DRINKS' | string;

export interface JsonMenuItem {
    name: string;
    name_ko: string;
    price: number;
    attributes?: string[];
    note?: string;
}

export interface MenuData {
    restaurant: string;
    currency: string;
    menu: Record<MenuCategory, JsonMenuItem[]>;
}

export type TableSettingKey =
    | "큰 불판"
    | "작은 불판"
    | "집게"
    | "국자"
    | "숟가락"
    | "가위"
    | "뼈버리는 통"
    | "국그릇";

export interface SettingIcon {
    icon: React.ElementType;
    label: string;
    color: string;
}

export type SettingIconsMap = Record<TableSettingKey, SettingIcon>;

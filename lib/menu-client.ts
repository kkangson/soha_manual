import { JsonMenuItem, TableSettingKey, SettingIconsMap } from "@/types/menu";
import {
    CircleDot,
    Flame,
    Utensils,
    ChefHat,
    Scissors,
    Trash2,
    Soup
} from "lucide-react";

export const SETTING_ICONS: SettingIconsMap = {
    "큰 불판": { icon: CircleDot, label: "Large Grill", color: "text-orange-600" },
    "작은 불판": { icon: Flame, label: "Small Grill", color: "text-red-500" },
    "집게": { icon: Utensils, label: "Tongs", color: "text-stone-600" },
    "국자": { icon: ChefHat, label: "Ladle", color: "text-stone-600" },
    "숟가락": { icon: Utensils, label: "Spoon", color: "text-stone-600" },
    "가위": { icon: Scissors, label: "Scissors", color: "text-stone-600" },
    "뼈버리는 통": { icon: Trash2, label: "Bone Bin", color: "text-stone-500" },
    "국그릇": { icon: Soup, label: "Soup Bowl", color: "text-stone-600" },
};

export const guessSettings = (item: JsonMenuItem): TableSettingKey[] => {
    const settings: TableSettingKey[] = []
    const name = item.name.toLowerCase();

    if (name.includes("stew") || name.includes("soup") || name.includes("ramyun")) {
        settings.push("국자", "국그릇");
        if (name.includes("clam") || name.includes("crab")) settings.push("뼈버리는 통");
    }
    if (name.includes("grilled") || name.includes("bbq") || name.includes("bulgogi")) {
        settings.push("집게", "가위");
        if (item.price > 25) settings.push("큰 불판");
        else settings.push("작은 불판");
    }
    if (name.includes("ribs") || name.includes("chicken") || name.includes("bone")) {
        settings.push("뼈버리는 통");
    }

    return Array.from(new Set(settings)) as TableSettingKey[];
};

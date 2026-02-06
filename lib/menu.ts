import fs from "fs";
import path from "path";
import { MenuData } from "@/types/menu";

// Export everything from client for convenience, but keep server-only logic here
export * from "./menu-client";

export async function getMenuData(): Promise<MenuData> {
    const filePath = path.join(process.cwd(), "public/data/menu.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(jsonData);
}

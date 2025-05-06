import { Metadata } from "next";

export type SidebarItem = {
    icon?: string;
    title: string;
    url: string;
}

export type Schema = {
    meta: Partial<Metadata>;
    sidebar: SidebarItem[];
}
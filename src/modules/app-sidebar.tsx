"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  Sidebar,
  SidebarTrigger,
} from "@/lib/components/ui/sidebar";
import IconComponent, { IconName } from "../shared/ui/IconComponent";
import Link from "next/link";
import { useContext } from "react";
import { AppSchema } from "@/shared/providers/AppSchemaProvider";

export function AppSidebar() {
  const data = useContext(AppSchema);
  const items = data?.sidebar;

  return (
    <div className="relative pointer-events-auto">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <IconComponent name={item.icon as IconName} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarTrigger className="absolute -right-10 bottom-0 z-10" />
    </div>
  );
}

export default AppSidebar;

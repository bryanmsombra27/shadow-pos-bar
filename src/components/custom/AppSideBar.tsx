import { BarChart3, Home, Settings, Zap, CheckSquare } from "lucide-react";
import type { FC } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { PiPicnicTableBold } from "react-icons/pi";
import { GiClockwork } from "react-icons/gi";
import { NavLink } from "react-router";

const menuItems = [
  {
    title: "Inicio",
    url: "",
    icon: Home,
  },
  {
    title: "Roles",
    url: "roles",
    icon: Zap,
  },
  {
    title: "Mesas",
    url: "mesas",
    icon: PiPicnicTableBold,
  },
  {
    title: "Trabajadores",
    url: "trabajadores",
    icon: GiClockwork,
  },
  {
    title: "Ordenes",
    url: "ordenes",
    icon: CheckSquare,
  },

  {
    title: "Productos",
    url: "productos",
    icon: Settings,
  },
  {
    title: "Categorias",
    url: "categorias",
    icon: Settings,
  },
  {
    title: "Ordenes Pendientes",
    url: "barra",
    icon: Settings,
  },
];

interface AppSideBarProps {}
const AppSideBar: FC<AppSideBarProps> = ({}) => {
  return (
    <>
      <Sidebar>
        <SidebarHeader className="p-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BarChart3 className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold">Shadow POS BAR</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <NavLink
                    key={item.url}
                    end
                    to={item.url}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-md transition w-full ${
                        isActive ? "bg-primary text-white" : ""
                      }`
                    }
                  >
                    <SidebarMenuItem
                      key={item.title}
                      className="flex items-center justify-center"
                    >
                      <SidebarMenuButton asChild>
                        {/* <item.icon className="h-4 w-4" /> */}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </NavLink>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                alt="John Doe"
                className="object-cover"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">
                Sales Manager
              </span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default AppSideBar;

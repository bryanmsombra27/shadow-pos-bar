import type { FC } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { TopBar, AppSideBar } from "@/components/custom";

interface AdminLayoutProps {}
const AdminLayout: FC<AdminLayoutProps> = ({}) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full justify-center">
        <AppSideBar />

        <main className="flex-1 overflow-auto">
          <TopBar />
          <div className="mb-10"></div>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;

import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const Sidebar = () => {
  return (
    <SidebarProvider className="font-raleway border-none">
      <AppSidebar />
      <div className="pt-8 pl-2">
        <SidebarTrigger />
      </div>
    </SidebarProvider>
  );
};

export default Sidebar;

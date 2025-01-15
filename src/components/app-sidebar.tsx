
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Add Note",
    url: "#",
    path: "/images/add_icon.svg",
  },
  {
    title: "Calendar",
    url: "#",

    path: "/images/calendar_icon.svg",
  },
  {
    title: "Archive",
    url: "#",
    
    path: "/images/archive_icon.svg",
  },
  {
    title: "Trash",
    url: "#",
  
    path: "/images/trash_icon.svg",
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="">
      <SidebarContent className="bg-white py-8 px-4">
        <SidebarGroup>
          <SidebarGroupLabel>
            <Image
              src="/images/estrada_logo.svg"
              width={124}
              height={42.76}
              alt="estrada logo"
            />
          </SidebarGroupLabel>
          <SidebarGroupContent className="pt-12 mb-24">
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`font-semibold text-[1rem] leading-[1.17rem] text-[#5F5F5F] ${
                    index === 0 ? "first:mb-8" : ""
                  }`}
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <Image
                        src={item.path}
                        alt={item.title}
                        width={24}
                        height={24}
                      />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroupContent className="font-medium text-[0.5rem] leading-[0.65rem] text-[#767676] mt-28 text-center">
          <p>&copy; 2024 Estrada International Staffing Solutions.</p> 
          <p>All Rights Reserved.</p>
        </SidebarGroupContent>
      </SidebarContent>
    </Sidebar>
  );
}

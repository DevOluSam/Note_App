import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Search } from 'lucide-react'


function Header() {
  return (
    <header className="flex gap-6 flex-col md:flex-row md:gap-0 justify-between px-4 lg:px-8 font-raleway items-center text-[#5f5f5f] ">
      <h1 className="text-[2rem] font-bold leading-[2.35rem] ">My Notes</h1>
      <div className="w-[16.44rem] h-[2.69rem] relative">
        <input
          type="text"
          className="w-full h-full rounded-[5px] outline-none py-[10px] bg-[#f4f4f4] pl-12"
          placeholder="Search"
        />
        <div className="absolute top-[0.6rem] left-4 cursor-pointer">
        <Search />
        </div>
      </div>
      <div className="hidden xl:flex font-semibold text-[1.13rem] leading-[1.32rem] items-center gap-4">
        <p>Akinremi Adebayo</p>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <Image className="cursor-pointer"
          src="/images/estrada_menu.svg"
          width={43}
          height={43}
          alt="menu icon"
        />
      </div>
    </header>
  );
}

export default Header;

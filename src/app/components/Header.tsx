"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Search } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { useSort } from "@/context/SortContext";
import { useState } from "react";

function Header() {
  const { searchQuery, setSearchQuery } = useSearch();
  const { setSortType } = useSort();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev: any) => !prev);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(
      e.target.value as "alphabetical" | "creationDate" | "lastUpdated"
    );
    setIsDropdownVisible(false)
  };
  return (
    <header className="flex gap-6 flex-col sm:flex-row md:gap-0 justify-between px-4 lg:px-8 font-raleway items-center text-[#5f5f5f] bg-white py-6">
      <h1 className="text-[2rem] font-bold leading-[2.35rem] ">My Notes</h1>
      <div className="w-[16.44rem] h-[2.69rem] relative">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
        <Image
          className="cursor-pointer"
          src="/images/estrada_menu.svg"
          width={43}
          height={43}
          alt="menu icon"
          onClick={toggleDropdown}
        />
        {isDropdownVisible && (
            <div className="absolute font-raleway top-20 right-0 mt-2 w-[200px] bg-white shadow-lg rounded-md z-50 text-center">
              <ul>
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer text-base"
                  onClick={() => setSortType("alphabetical")}
                >
                  Sort Alphabetically
                </li>
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer text-base"
                  onClick={() => setSortType("creationDate")}
                >
                  Sort by Creation Date
                </li>
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer text-base"
                  onClick={() => setSortType("lastUpdated")}
                >
                  Sort by Last Updated
                </li>
              </ul>
            </div>
          )}
      </div>
    </header>
  );
}

export default Header;



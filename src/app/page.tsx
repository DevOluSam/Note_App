"use client";
import AddCard from "./components/AddCard";
import DateNav from "./components/DateNav";
import { NewNote } from "./components/NewNote";
import NoteCard from "./components/NoteCard";
import ProductReviewCard from "./components/ProductReviewCard";
import { useSelector } from "react-redux";
import { useSearch } from "@/context/SearchContext";
import { useSort } from "@/context/SortContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ConfirmDeleteAllNotesDialog from "./components/DeleteAll";

interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

interface RootState {
  notes: Note[];
}

export default function Home() {
  const [isDeleteAllDialogOpen, setIsDeleteAllDialogOpen] = useState(false);

  const notes = useSelector((state: RootState) => state.notes);
  const { searchQuery } = useSearch();
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const { sortType } = useSort();

  const sortedNotes = [...(searchQuery ? filteredNotes : notes)].sort(
    (a, b) => {
      switch (sortType) {
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "creationDate":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "lastUpdated":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        default:
          return 0;
      }
    }
  );

  const handleOpenDeleteAllDialog = () => {
    setIsDeleteAllDialogOpen(true);
  };

  const handleCloseDeleteAllDialog = () => {
    setIsDeleteAllDialogOpen(false);
  };

  return (
    <aside className="py-8 text-[#5f5f5f] font-raleway bg-[#fafafa] h-full mt-4 px-2 md:px-8 rounded-tl-[25px] z-10 w-full dark:bg-black dark:text-white">
      <h5 className="font-bold sm:text-[1.5rem] sm:text-left text-center text-lg sm:leading-[1.76rem] mb-6">
        Recent Folder
      </h5>
      <DateNav />
      <div className="flex mt-8 items-center ">
        <div className="flex gap-4 flex-wrap justify-center items-center group">
          <ProductReviewCard
            color="#FFE2E8"
            name="Product Review"
            date="12/12/2024"
            icon="/images/product_icon.svg"
          />
          <ProductReviewCard
            color="#EBE8FF"
            name="Product Review"
            date="12/12/2024"
            icon="/images/product_icon2.svg"
          />
          <ProductReviewCard
            color="#FFFEE2"
            name="Product Review"
            date="12/12/2024"
            icon="/images/product_icon3.svg"
          />
          <AddCard
            image="/images/product_icon4.svg"
            title="Add Card"
            width={26.03}
            height={29.37}
          />
        </div>
      </div>
      <section className="mt-10">
        <h5 className="font-bold text-[1.5rem] leading-[1.76rem] mb-6">
          My Notes
        </h5>
        <DateNav />
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start items-center mt-6 group">
          {sortedNotes
            ? sortedNotes.map((item) => (
                <NoteCard
                  key={item.id}
                  title={item.title}
                  body={item.body}
                  date={item.createdAt}
                  id={item.id}
                />
              ))
            : notes.map((item) => (
                <NoteCard
                  key={item.id}
                  title={item.title}
                  body={item.body}
                  date={item.createdAt}
                  id={item.id}
                />
              ))}
          <div className="mt-4 flex flex-col ">
            <NewNote />
            {notes.length > 1 && (
              <Button
                onClick={handleOpenDeleteAllDialog}
                className="hover:bg-[#FF7F7F] hover:text-white text-red-600 bg-red-50 mt-20 dark:hover:text-red-700 dark:hover:bg-red-200"
              >
                Clear Notes
              </Button>
            )}

            <ConfirmDeleteAllNotesDialog
              isOpen={isDeleteAllDialogOpen}
              onClose={handleCloseDeleteAllDialog}
            />
          </div>
        </div>
      </section>
    </aside>
  );
}

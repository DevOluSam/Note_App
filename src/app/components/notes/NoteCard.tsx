"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ColorRing } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { deleteNote, updateNote } from "@/redux/store";
import { toast } from "sonner";
import Modal from "./Modal";
import DropDown from "./DropDown";

interface NoteCardProps {
  title: string;
  date: string;
  body: string;
  id: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, date, body, id }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);
  const dispatch = useDispatch();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSaveChanges = () => {
    setIsLoading(true);
    setIsEditModalOpen(false);
    setTimeout(() => {
      dispatch(updateNote({ title: editTitle, body: editBody, id }));
      toast.success("Note has been updated successfully");
      setIsLoading(false);
    }, 3000);
  };

  const handleDelete = () => {
    setIsLoading(true);
    setIsDeleteModalOpen(false);
    setTimeout(() => {
      dispatch(deleteNote(id));
      toast.success("Note has been deleted");
      setIsLoading(false);
    }, 3000);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            colors={["#D5768A", "#A9A2D8", "#B0AC57", "#abbd81", "#849b87"]}
          />
        </div>
      )}
      <div className="bg-[#EBEBEB] border-2 border-[#FFE2E8] rounded-[21px] w-[17.94rem] h-[23.44rem] p-6 font-raleway flex flex-col gap-4 cursor-pointer group-hover:blur-[2px] hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 duration-500">
        <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.17)] pb-2">
          <div>
            <h3 className="font-bold text-[1rem] text-[#4C4B4B] leading-[1.17rem]">
              {title}
            </h3>
            <p className="font-medium text-[#707070] leading-[1.03rem] text-[0.88rem]">
              {date}
            </p>
          </div>
          <div ref={dropdownRef}>
            <Image
              src="/images/more_icon.svg"
              alt="more menu icon"
              width={18}
              height={4}
              className="cursor-pointer"
              onClick={() => setOpen((prev) => !prev)}
            />
            {open && (
              <DropDown
                onEdit={() => {
                  setIsEditModalOpen(true);
                  setOpen(false);
                }}
                onDelete={() => {
                  setIsDeleteModalOpen(true);
                  setOpen(false);
                }}
              />
            )}
          </div>
        </div>
        <textarea
          placeholder="Write something here..."
          className="w-full h-full bg-inherit outline-none text-[0.75rem] font-medium text-[#171717] leading-[1.25rem]"
          value={body}
          disabled
        ></textarea>
        {/* Modals */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Note"
          body={
            <>
              <input
                placeholder="Enter Note Title"
                className="w-full border-0 shadow-none outline-black dark:outline-white  font-raleway font-bold text-[1.5rem] leading-[1.76rem] py-4 px-2 dark:text-white  rounded-md"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className="border-0  h-[15rem] font-medium text-[#171717] leading-[1.25rem] rounded-md outline-black dark:outline-white  p-2 dark:text-white"
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                placeholder="Write Something here..."
              />
            </>
          }
          footer={
            <>
              <Button
                className="bg-gray-300 text-black mr-2 hover:bg-sky-700 hover:text-gray-50"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="hover:bg-[#FF7F7F] hover:text-white text-red-700 bg-red-50"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </>
          }
        />
        <Modal
          contentClassName="bg-red-50 text-red-600"
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Clear Notes"
          body={
            <p className="mt-2 text-sm text-red-600">
              Are you sure you want to clear all your notes? This action cannot
              be undone.
            </p>
          }
          footer={
            <>
              <Button
                className="bg-sky-600 text-white hover:bg-sky-600/70"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="hover:bg-[#FF7F7F]/80 bg-red-600  duration-300 transition-all ease-in-out text-white"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </>
          }
        />
      </div>
    </>
  );
};

export default NoteCard;

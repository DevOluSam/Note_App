"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { deleteNote, updateNote } from "@/redux/store";
import { toast } from "sonner";
import { ColorRing } from "react-loader-spinner";


interface NoteCardProps {
  title: string;
  date: string;
  body: string;
  id: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, date, body, id }) => {
  const [open, setOpen] = useState(false); // Controls dropdown menu
  const [isLoading, setIsLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Controls edit modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Controls delete modal
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
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
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
    }, 3000)
    
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
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
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

        {/* Edit Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[425px] font-raleway">
            <DialogHeader>
              <DialogTitle>Edit Note</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 text-[#5F5F5F]">
              <input
                placeholder="Enter Note Title"
                className="w-full border-0 shadow-none outline-none font-raleway font-bold text-[1.5rem] leading-[1.76rem] px-1"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <Textarea
                className="border-0 outline-none focus:outline-none h-[15rem] font-medium text-[#171717] leading-[1.25rem]"
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                placeholder="Write Something here..."
              />
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                className="bg-gray-300 text-black mr-2"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#FF7F7F] text-white"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="sm:max-w-[425px] font-raleway">
            <DialogHeader>
              <DialogTitle>Delete Note</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 text-[#5F5F5F] font-semibold">
              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to delete this note? This action cannot be
                undone.
              </p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                className="bg-gray-300 text-black"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#FF7F7F] hover:bg-white hover:text-[#FF7F7F] hover:border hover:border-[#FF7F7F] duration-300 transition-all ease-in-out text-white"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default NoteCard;

interface DropDownProps {
  onEdit: () => void;
  onDelete: () => void;
}

const DropDown: React.FC<DropDownProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="relative font-raleway">
      <div
        className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
        role="menu"
      >
        <div className="p-2">
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
            onClick={onEdit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Edit Note
          </button>
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
            onClick={onDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete Note
          </button>
        </div>
      </div>
    </div>
  );
};

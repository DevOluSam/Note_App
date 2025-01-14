import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCard from "./AddCard";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "@/redux/store";
import { toast } from "sonner";

export function NewNote() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const handleSaveNote = () => {
    if (!title.trim()) {
      toast.error("Please enter the title of your note");
      return;
    }
    dispatch(addNote({ title, body }));
    setTitle("");
    setBody("");
    toast.success('New note has been added')
  };
  return (
    <Dialog>
      <DialogTrigger asChild className="mt-8 text-[#5f5f5f]">
        <Button className="bg-[#fafafa] shadow-none hover:bg-[#fafafa]">
          <AddCard
            image="/images/add_note_icon.svg"
            title="New Note"
            width={44}
            height={44}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] font-raleway">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-2 items-center">
                <Image
                  src="/images/add_icon.svg"
                  alt="add icon"
                  width={24}
                  height={24}
                />
                <Button
                  type="submit"
                  className="font-semibold text-[1rem] leading-[1.17rem] text-[#5F5F5F] bg-white shadow-none hover:text-white"
                  onClick={handleSaveNote}
                >
                  Save note
                </Button>
              </div>
              <Image
                src="/images/gray_more_icon.svg"
                alt="more menu icon"
                width={28.5}
                height={6.33}
              />
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 text-[#5F5F5F]">
          <div className="grid  items-center gap-4 border-b pb-4">
            <input
              placeholder="Enter Note Title"
              className="w-full border-0 shadow-none outline-none font-raleway font-bold text-[1.5rem] leading-[1.76rem] px-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid h-[25rem] items-center ">
            <Textarea
              className="border-0 outline-none focus:outline-none h-full font-medium text-[#171717] leading-[1.25rem]"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import AddCard from "./components/AddCard";
import DateNav from "./components/DateNav";
import { NewNote } from "./components/NewNote";
import NoteCard from "./components/NoteCard";
import ProductReviewCard from "./components/ProductReviewCard";
import { useSelector, useDispatch } from "react-redux";

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
  const notes = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();
  return (
    <aside className="py-8 text-[#5f5f5f] font-raleway bg-[#fafafa] h-full mt-4 px-2 md:px-8 rounded-tl-[25px] z-10 w-full">
      <h5 className="font-bold text-[1.5rem] leading-[1.76rem] mb-6">
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
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start items-center mt-6">
          {notes.map((item) => (
            <NoteCard
              key={item.id}
              title={item.title}
              body={item.body}
              date={item.createdAt}
              id={item.id}
            />
          ))}

          <div className="mt-4">
            <NewNote />
          </div>
        </div>
      </section>
    </aside>
  );
}

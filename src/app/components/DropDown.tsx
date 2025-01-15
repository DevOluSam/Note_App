import React from "react";

interface DropDownProps {
  onEdit: () => void;
  onDelete: () => void;
}

const DropDown: React.FC<DropDownProps> = ({ onEdit, onDelete }) => (
  <div className="relative font-raleway">
    <div className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg" role="menu">
      <div className="p-2">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
          onClick={onEdit}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Edit Note
        </button>
        <button
          type="submit"
          className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
          onClick={onDelete}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete Note
        </button>
      </div>
    </div>
  </div>
);

export default DropDown;

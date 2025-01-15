import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { deleteAllNotes } from "@/redux/store";
import { useState } from "react";
import { toast } from "sonner";
import { ColorRing } from "react-loader-spinner";

const ConfirmDeleteAllNotesDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAll = () => {
    setIsLoading(true);
    onClose();
    setTimeout(() => {
        dispatch(deleteAllNotes());
        toast.success('All notes have been deleted successfully')
        setIsLoading(false)
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

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] font-raleway">
          <DialogHeader>
            <DialogTitle>Delete All Notes</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 text-[#5F5F5F] font-semibold">
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete all your notes? This action cannot be
              undone.
            </p>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button className="bg-gray-300 text-black" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="bg-[#FF7F7F] hover:bg-white hover:text-[#FF7F7F] hover:border hover:border-[#FF7F7F] duration-300 transition-all ease-in-out text-white"
              onClick={handleDeleteAll}
            >
              Delete All
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfirmDeleteAllNotesDialog;
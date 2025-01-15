import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: React.ReactNode;
  footer: React.ReactNode;
  contentClassName?: string; // Optional prop for DialogContent styling
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  contentClassName, // Destructure the new prop
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className={`sm:max-w-[425px] font-raleway ${contentClassName || ""}`}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 text-[#5F5F5F]">
        {body}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        {footer}
      </div>
    </DialogContent>
  </Dialog>
);

export default Modal;

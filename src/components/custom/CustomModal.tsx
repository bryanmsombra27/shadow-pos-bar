import type { FC, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiPlusCircle } from "react-icons/fi";

interface CustomModalProps {
  title: string;
  children: ReactNode;
  triggerName?: string;
  isManualTrigger?: boolean;
  trigger?: ReactNode | null;
  description: string;
}
const CustomModal: FC<CustomModalProps> = ({
  children,
  triggerName,
  title,
  isManualTrigger = false,
  trigger = null,
  description,
}) => {
  return (
    <Dialog>
      {isManualTrigger ? (
        <DialogTrigger>{trigger}</DialogTrigger>
      ) : (
        <div className="flex mb-10 justify-end">
          <>
            <DialogTrigger className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg text-white cursor-pointer">
              <FiPlusCircle />
              <span>{triggerName}</span>
            </DialogTrigger>
          </>
        </div>
      )}

      <DialogContent aria-description="lorem">
        <DialogTitle className="text-2xl">{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;

import type { FC, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
interface ManualModaProps {
  title: string;
  description: string;
  children: ReactNode;
  open: boolean;
}
const ManualModa: FC<ManualModaProps> = ({
  children,
  description,
  title,
  open = false,
}) => {
  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false}>
        <DialogTitle className="text-2xl">{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ManualModa;

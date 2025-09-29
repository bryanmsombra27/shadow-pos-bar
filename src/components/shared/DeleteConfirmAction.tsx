import { useState, type FC } from "react";
import { MdDeleteForever } from "react-icons/md";
import ManualModa from "../custom/ManualModal";
import { Button } from "../ui/button";

interface DeleteConfirmActionProps {
  title: string;
  deleteAction: () => void;
}
const DeleteConfirmAction: FC<DeleteConfirmActionProps> = ({
  title,
  deleteAction,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDeleteAction = () => {
    deleteAction();
    setIsOpen(false);
  };

  return (
    <>
      <MdDeleteForever
        className="cursor-pointer"
        size={22}
        onClick={() => setIsOpen(true)}
      />
      <ManualModa
        open={isOpen}
        description="Una vez realizada esta accion no podra recuperar el registro"
        title={title}
      >
        <div className="flex justify-between mt-5">
          <Button onClick={() => setIsOpen(false)}>
            No, cancela la acción
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteAction}
          >
            Si, elimina el registro
          </Button>
        </div>
      </ManualModa>
    </>
  );
};

export default DeleteConfirmAction;

import { ErrorMessage } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useActualizarRol from "@/hooks/roles/useActualizarRol";
import type { Role } from "@/interfaces/rol.interface";

import type { FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  nombre: string;
};

interface ActualizarRolProps {
  rol: Role;
}
const ActualizarRol: FC<ActualizarRolProps> = ({ rol }) => {
  const { isPending, mutateAsync } = useActualizarRol();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      nombre: rol.nombre,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateAsync({
      id: rol.id,
      nombre: data.nombre,
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-10  "
      >
        <div className="my-5">
          <Input
            placeholder="Ingresa el nombre del rol..."
            {...register("nombre", {
              required: true,
            })}
            className={errors.nombre ? "border-2 border-red-400" : ""}
          />
          {errors.nombre && <ErrorMessage message=" El campo es requerido" />}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className={
            isPending ? `cursor-not-allowed pointer-events-none opacity-30` : ""
          }
        >
          Actualizar Rol
        </Button>
      </form>
    </>
  );
};

export default ActualizarRol;

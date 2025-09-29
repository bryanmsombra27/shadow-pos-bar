import { ErrorMessage } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCrearRol from "@/hooks/roles/useCrearRol";

import type { FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  nombre: string;
};

interface CrearRolProps {}
const CrearRol: FC<CrearRolProps> = ({}) => {
  const { isPending, mutateAsync } = useCrearRol();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateAsync({
      nombre: data.nombre,
    });

    setValue("nombre", "");
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
          Crear Rol
        </Button>
      </form>
    </>
  );
};

export default CrearRol;

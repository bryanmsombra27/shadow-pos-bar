import { ErrorMessage } from "@/components/custom";
import Label from "@/components/shared/FormLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCrearCategorias from "@/hooks/categorias/useCrearCategorias";

import type { FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  nombre: string;
};

interface CrearCategoriaProps {}
const CrearCategoria: FC<CrearCategoriaProps> = ({}) => {
  const { isPending, mutateAsync } = useCrearCategorias();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateAsync(data.nombre);

    setValue("nombre", "");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-10  "
      >
        <div className="my-5">
          <Label
            text="Nombre de la categoria"
            id="categoria"
          />
          <Input
            id="categoria"
            placeholder="Ingresa el nombre de la categoria..."
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
          Crear Categoria
        </Button>
      </form>
    </>
  );
};

export default CrearCategoria;

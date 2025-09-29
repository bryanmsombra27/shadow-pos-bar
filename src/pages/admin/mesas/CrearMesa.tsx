import { ErrorMessage } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCrearMesa from "@/hooks/mesas/useCrearMesa";
import type { FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  mesa: string;
};

interface CrearMesaProps {}
const CrearMesa: FC<CrearMesaProps> = ({}) => {
  const { isPending, mutateAsync } = useCrearMesa();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateAsync(data.mesa);

    setValue("mesa", "");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-10  "
      >
        <div className="my-5">
          <Input
            placeholder="Ingresa el nombre de la mesa..."
            {...register("mesa", {
              required: true,
            })}
            className={errors.mesa ? "border-2 border-red-400" : ""}
          />
          {errors.mesa && <ErrorMessage message=" El campo es requerido" />}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className={
            isPending ? `cursor-not-allowed pointer-events-none opacity-30` : ""
          }
        >
          Crear Mesa
        </Button>
      </form>
    </>
  );
};

export default CrearMesa;

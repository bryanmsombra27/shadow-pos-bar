import { ErrorMessage } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useActualizarMesa from "@/hooks/mesas/useActualizarMesa";
import type { ActualizarMesa, Mesa } from "@/interfaces/mesa.interface";
import { type FC } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMeseros from "@/hooks/usuarios/useMeseros";

interface Inputs extends ActualizarMesa {}

interface ActualizarMesaProps {
  mesa: Mesa;
  page: number;
}
const ActualizarMesaForm: FC<ActualizarMesaProps> = ({ mesa, page }) => {
  //   console.log(mesa, "mesa");
  const { data } = useMeseros();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      nombre: mesa.nombre,
    },
  });

  const { mutateAsync, isPending } = useActualizarMesa(mesa.id, { page });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateAsync({
      mesa: {
        nombre: data.nombre,
        es_vip: data.es_vip,
        estado_actual: data.estado_actual,
        mesero_id: data.mesero_id,
      },
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
            placeholder="Ingresa el nombre de la mesa..."
            {...register("nombre", {
              required: true,
            })}
            className={errors.nombre ? "border-2 border-red-400" : ""}
          />
          {errors.nombre && <ErrorMessage message=" El campo es requerido" />}
        </div>

        <div>
          <Controller
            name="mesero_id"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value!}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleeciona un mesero" />
                </SelectTrigger>
                <SelectContent>
                  {data?.meseros.map((mesero) => (
                    <SelectItem
                      value={mesero.id}
                      key={mesero.id}
                    >
                      {mesero.nombre_completo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.mesero_id && (
            <ErrorMessage message=" El campo es requerido" />
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className={
            isPending ? `cursor-not-allowed pointer-events-none opacity-30` : ""
          }
        >
          Actualizar Mesa
        </Button>
      </form>
    </>
  );
};

export default ActualizarMesaForm;

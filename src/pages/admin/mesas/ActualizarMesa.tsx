import { ErrorMessage } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useActualizarMesa from "@/hooks/mesas/useActualizarMesa";
import useRoles from "@/hooks/roles/useRoles";
import type { ActualizarMesa, Mesa } from "@/interfaces/mesa.interface";
import { type FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Inputs extends ActualizarMesa {}

interface ActualizarMesaProps {
  mesa: Mesa;
}
const ActualizarMesaForm: FC<ActualizarMesaProps> = ({ mesa }) => {
  //   console.log(mesa, "mesa");
  const { data } = useRoles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      nombre: mesa.nombre,
    },
  });

  const { mutateAsync, isPending } = useActualizarMesa(mesa.id);

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
          <Select {...register("mesero_id", { required: true })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleeciona un mesero" />
            </SelectTrigger>
            <SelectContent>
              {data?.roles.map((rol) => (
                <SelectItem
                  value={rol.id}
                  key={rol.id}
                >
                  {rol.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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

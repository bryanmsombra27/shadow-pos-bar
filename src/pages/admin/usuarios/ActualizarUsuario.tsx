import { ErrorMessage } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FC } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRoles from "@/hooks/roles/useRoles";
import type { Usuario } from "@/interfaces/usuario.interface";
import useActualizarUsuarios from "@/hooks/usuarios/useActualizarUsuarios";

type Inputs = {
  nombre_completo: string;
  nombre_usuario: string;
  telefono: string;
  rol_id: string;
};

interface ActualizarUsuarioProps {
  usuario: Usuario;
}
const ActualizarUsuario: FC<ActualizarUsuarioProps> = ({ usuario }) => {
  const { isPending, mutateAsync } = useActualizarUsuarios();
  const { data } = useRoles();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      nombre_completo: usuario.nombre_completo,
      nombre_usuario: usuario.nombre_usuario,
      rol_id: usuario.rol_id,
      telefono: usuario.telefono,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateAsync({
      id: usuario.id,
      usuario: {
        nombre_completo: data.nombre_completo,
        nombre_usuario: data.nombre_usuario,
        rol_id: data.rol_id,
        telefono: data.telefono,
      },
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6  "
      >
        <div>
          <Label
            text="Nombre completo: "
            id="nombre"
          />
          <Input
            id="nombre"
            placeholder="Ingresa el nombre completo del usuario..."
            {...register("nombre_completo", {
              required: true,
            })}
            className={errors.nombre_completo ? "border-2 border-red-400" : ""}
          />
          {errors.nombre_completo && (
            <ErrorMessage message=" El campo es requerido" />
          )}
        </div>
        <div>
          <Label
            text="nombre de usuario: "
            id="username"
          />
          <Input
            id="username"
            placeholder="Ingresa el nombre de usuario..."
            {...register("nombre_usuario", {
              required: true,
            })}
            className={errors.nombre_usuario ? "border-2 border-red-400" : ""}
          />
          {errors.nombre_usuario && (
            <ErrorMessage message=" El campo es requerido" />
          )}
        </div>
        <div>
          <Label
            text="Elije un rol: "
            id="rol"
          />

          <Controller
            name="rol_id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                name="rol_id"
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un rol" />
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
            )}
          />

          {errors.rol_id && <ErrorMessage message=" El campo es requerido" />}
        </div>

        <div>
          <Label
            text="Telefono: "
            id="phone"
          />
          <Input
            id="phone"
            placeholder="Ingresa el telefono..."
            {...register("telefono", {
              required: true,
            })}
            className={errors.telefono ? "border-2 border-red-400" : ""}
          />
          {errors.telefono && <ErrorMessage message=" El campo es requerido" />}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className={`col-start-2 ${
            isPending ? "cursor-not-allowed pointer-events-none opacity-30" : ""
          } `}
        >
          Actualizar Usuario
        </Button>
      </form>
    </>
  );
};
interface LabelProps {
  text: string;
  id: string;
}

const Label = ({ text, id }: LabelProps) => {
  return (
    <label
      htmlFor={id}
      className="font-bold py-2 text-sm  inline-block"
    >
      {text}
    </label>
  );
};

export default ActualizarUsuario;

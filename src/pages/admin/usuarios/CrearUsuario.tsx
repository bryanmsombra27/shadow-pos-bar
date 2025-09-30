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
import useCrearUsuarios from "@/hooks/usuarios/useCrearUsuarios";

type Inputs = {
  nombre_completo: string;
  nombre_usuario: string;
  contrasena: string;
  telefono: string;
  rol_id: string;
  confirmar_contrasena: string;
};

interface CrearUsuarioProps {}
const CrearUsuario: FC<CrearUsuarioProps> = ({}) => {
  const { isPending, mutateAsync } = useCrearUsuarios();
  const { data } = useRoles();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const contrasena = watch("contrasena");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateAsync({
      nombre_completo: data.nombre_completo,
      contrasena: data.contrasena,
      nombre_usuario: data.nombre_usuario,
      rol_id: data.rol_id,
      telefono: data.telefono,
    });

    setValue("nombre_completo", "");
    setValue("nombre_usuario", "");
    setValue("contrasena", "");
    setValue("rol_id", "");
    setValue("confirmar_contrasena", "");
    setValue("telefono", "");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-6  "
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
            text="Contraseña: "
            id="password"
          />
          <Input
            id="password"
            type="password"
            placeholder="Ingresa la contraseña..."
            {...register("contrasena", {
              required: true,
            })}
            className={errors.contrasena ? "border-2 border-red-400" : ""}
          />
          {errors.contrasena && (
            <ErrorMessage message=" El campo es requerido" />
          )}
        </div>
        <div>
          <Label
            text="Confirma la contraseña: "
            id="password_confirm"
          />
          <Input
            id="password_confirm"
            type="password"
            placeholder="Ingresa la contraseña..."
            {...register("confirmar_contrasena", {
              required: "El campo es requerido",
              validate: (val) =>
                val == contrasena || "Las contraseñas deben coincidir",
            })}
            className={
              errors.confirmar_contrasena ? "border-2 border-red-400" : ""
            }
          />
          {errors.confirmar_contrasena && (
            <ErrorMessage message={errors.confirmar_contrasena.message!} />
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className={`col-start-2 ${
            isPending ? "cursor-not-allowed pointer-events-none opacity-30" : ""
          } `}
        >
          Crear Usuario
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

export default CrearUsuario;

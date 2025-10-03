import { ErrorMessage } from "@/components/custom";
import Label from "@/components/shared/FormLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useObtenerTodasLasCategorias from "@/hooks/categorias/useObtenerTodasLasCategorias";
import useCrearProductos from "@/hooks/productos/useCrearProductos";
import type { ProductoForm } from "@/interfaces/producto.interface";
import type { FC } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

interface Inputs extends ProductoForm {}

interface CrearProductosProps {}
const CrearProductos: FC<CrearProductosProps> = ({}) => {
  const { isPending, mutateAsync } = useCrearProductos();
  const { data } = useObtenerTodasLasCategorias();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateAsync({
      producto: {
        categoria_id: data.categoria_id,
        descripcion: data.descripcion,
        marca: data.marca,
        nombre: data.nombre,
        cantidad_producto: +data.cantidad_producto,
        precio: +data.precio,
      },
    });

    setValue("nombre", "");
    setValue("categoria_id", "");
    setValue("descripcion", "");
    setValue("marca", "");
    setValue("cantidad_producto", 0);
    setValue("precio", 0);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-5"
      >
        <div className="my-1">
          <Label
            text="Nombre del producto"
            id="nombre"
          />
          <Input
            id="nombre"
            placeholder="Ingresa el nombre del producto..."
            {...register("nombre", {
              required: true,
            })}
            className={errors.nombre ? "border-2 border-red-400" : ""}
          />
          {errors.nombre && <ErrorMessage message=" El campo es requerido" />}
        </div>
        <div className="my-1">
          <Label
            text="Categoria del producto"
            id="categoria"
          />
          <Controller
            name="categoria_id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                name="categoria_id"
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una categoria" />
                </SelectTrigger>
                <SelectContent>
                  {data?.categorias.map((categoria) => (
                    <SelectItem
                      value={categoria.id}
                      key={categoria.id}
                    >
                      {categoria.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.nombre && <ErrorMessage message=" El campo es requerido" />}
        </div>
        <div className="my-1">
          <Label
            text="Descripcion del producto"
            id="descripcion"
          />
          <Textarea
            {...register("descripcion")}
            className={errors.descripcion ? "border-2 border-red-400" : ""}
          />

          {errors.nombre && <ErrorMessage message=" El campo es requerido" />}
        </div>
        <div className="my-1">
          <Label
            text="Marca del producto"
            id="marca"
          />
          <Input
            id="marca"
            placeholder="Ingresa el nombre de la marca del producto..."
            {...register("marca", {})}
            className={errors.marca ? "border-2 border-red-400" : ""}
          />
          {errors.marca && <ErrorMessage message=" El campo es requerido" />}
        </div>
        <div className="my-1">
          <Label
            text="cantidad del producto"
            id="cantidad"
          />
          <Input
            id="cantidad"
            type="number"
            placeholder="Ingresa la cantidad del producto..."
            {...register("cantidad_producto", {})}
            className={
              errors.cantidad_producto ? "border-2 border-red-400" : ""
            }
          />
          {errors.cantidad_producto && (
            <ErrorMessage message=" El campo es requerido" />
          )}
        </div>

        <div className="my-1">
          <Label
            text="precio del producto"
            id="precio"
          />
          <Input
            id="precio"
            type="number"
            placeholder="Ingresa la cantidad del producto..."
            {...register("precio", {})}
            className={errors.precio ? "border-2 border-red-400" : ""}
          />
          {errors.precio && <ErrorMessage message=" El campo es requerido" />}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className={
            isPending ? `cursor-not-allowed pointer-events-none opacity-30` : ""
          }
        >
          Crear Producto
        </Button>
      </form>
    </>
  );
};

export default CrearProductos;

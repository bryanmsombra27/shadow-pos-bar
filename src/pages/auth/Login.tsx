import type { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Label from "@/components/shared/FormLabel";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@/components/custom";
import useLogin from "@/hooks/auth/useLogin";

type Inputs = {
  usuario: string;
  password: string;
};

interface LoginProps {}
const Login: FC<LoginProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { data, error, isPending, mutateAsync } = useLogin();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateAsync({
      password: data.password,
      usuario: data.usuario,
    });
  };

  return (
    <>
      <div className="h-svh flex items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Ingresa con tu cuenta</CardTitle>
            <CardDescription>
              Ingresa tu usuario y contraseña para iniciar sesión
            </CardDescription>
            {/* <CardAction>
              <Button variant="link">Iniciar Sesión</Button>
            </CardAction> */}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label
                    id="usuario"
                    text="Usuario"
                  />
                  <Input
                    id="usuario"
                    type="text"
                    placeholder="ingresa tu nombre de usuario"
                    {...register("usuario", { required: true })}
                    className={errors.usuario ? "border-2 border-red-400" : ""}
                  />

                  {errors.usuario && (
                    <ErrorMessage message=" El campo es requerido" />
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label
                      id="password"
                      text="Contraseña"
                    />
                    {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                  Forgot your password?
                  </a> */}
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="Ingresa tu contraseña"
                    {...register("password", { required: true })}
                    className={errors.password ? "border-2 border-red-400" : ""}
                  />
                  {errors.password && (
                    <ErrorMessage message=" El campo es requerido" />
                  )}
                </div>
              </div>

              <CardFooter className="flex-col gap-2 mt-10">
                <Button
                  disabled={isPending}
                  className={
                    isPending
                      ? `w-full cursor-not-allowed pointer-events-none opacity-30`
                      : "w-full"
                  }
                >
                  Ingresar
                </Button>

                {/* <Button
            variant="outline"
            className="w-full"
          >
            Login with Google
          </Button> */}
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;

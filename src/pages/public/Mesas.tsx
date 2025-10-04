import { Loader } from "@/components/custom";
import TableClient from "@/components/public/TableClient";
import useTodasLasMesas from "@/hooks/mesas/useTodasLasMesas";
import type { FC } from "react";
interface MesasProps {
  isAdmin?: boolean;
}
const Mesas: FC<MesasProps> = ({ isAdmin }) => {
  const { data, error, isPending } = useTodasLasMesas();

  if (isPending) return <Loader />;

  if (error)
    return (
      <span className="text-red-600 border-2 p-4 rounded-xl">
        No fue posible obtener las mesas
      </span>
    );

  return (
    <>
      <h1 className="text-center my-5 font-bold text-4xl"> Mesas </h1>

      <div className="container grid grid-cols-5 mt-5 gap-10 p-10">
        {data &&
          data.mesas.map((mesa) => (
            <TableClient
              mesa={mesa}
              key={mesa.id}
              isAdmin={isAdmin}
            />
          ))}
      </div>
    </>
  );
};

export default Mesas;

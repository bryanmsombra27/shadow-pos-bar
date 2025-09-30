import { Loader } from "@/components/custom";
import TableClient from "@/components/public/TableClient";
import useTodasLasMesas from "@/hooks/mesas/useTodasLasMesas";
import type { FC } from "react";
import { PiPicnicTableBold } from "react-icons/pi";
interface MesasProps {}
const Mesas: FC<MesasProps> = ({}) => {
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
            />
          ))}
      </div>
    </>
  );
};

export default Mesas;

import { socket } from "@/config/socket";
import { useEffect, type FC } from "react";

interface HomeProps {}
const Home: FC<HomeProps> = ({}) => {
  useEffect(() => {
    const handleTest = (value: any) => {
      console.log(value, "valor de backend");
    };

    if (socket) {
      socket.on("test", handleTest);
      socket.emit("test", {
        text: "vale verga",
      });
    }

    return () => {
      socket.off("test", handleTest);
    };
  }, [socket]);

  return <h1>Component</h1>;
};

export default Home;

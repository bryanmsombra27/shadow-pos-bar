import type { FC } from "react";
import "./loader.css";
interface LoaderProps {}
const Loader: FC<LoaderProps> = ({}) => {
  return (
    <div className="mx-auto w-full flex justify-center">
      <span className="loader"></span>
    </div>
  );
};

export default Loader;

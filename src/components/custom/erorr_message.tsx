import type { FC } from "react";

interface erorr_messageProps {
  message: string;
}
const erorr_message: FC<erorr_messageProps> = ({ message }) => {
  return (
    <span className="text-red-600 text-sm ml-2 mt-2 inline-block">
      {message}
    </span>
  );
};

export default erorr_message;

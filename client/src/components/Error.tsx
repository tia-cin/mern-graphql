import { FC } from "react";

const Error: FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-red-500 text-white p-4 rounded-lg">
        <p className="font-bold">Error</p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Error;

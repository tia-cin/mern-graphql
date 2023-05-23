import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-blue"></div>
    </div>
  );
};

export default Loading;

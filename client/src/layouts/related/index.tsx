import React, { ReactNode } from "react";

type Props = {
  children: ReactNode[];
};

const Related = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-start items-start w-full h-auto">
      {children.map((child) => child)}
    </div>
  );
};

export default Related;

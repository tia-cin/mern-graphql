import { FC } from "react";
import { ProjectTypes } from "../types";

const Card: FC<ProjectTypes> = ({ name, description }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Card;

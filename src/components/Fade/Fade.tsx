import classNames from "classnames";
import { FC, MouseEventHandler } from "react";

type PropsType = {
  onClick: MouseEventHandler<HTMLDivElement>;
  visibleFade: boolean;
};

const Fade: FC<PropsType> = ({ onClick, visibleFade }) => {
  return (
    <div
      onClick={onClick}
      className={classNames("fade", visibleFade ? "active" : "")}
    ></div>
  );
};

export default Fade;

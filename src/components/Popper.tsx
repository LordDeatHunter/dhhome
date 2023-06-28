import { Component, JSX, createSignal } from "solid-js";
import Box from "./Box";

interface PopperProps {
  children?: JSX.Element;
  content?: JSX.Element;
  activateMethod?: "hover" | "click" | "always";
}

const Popper: Component<PopperProps> = (props) => {
  const { children, content, activateMethod = "hover" } = props;

  const [hovered, setHovered] = createSignal<boolean>(false);

  return (
    <Box
      vertical
      onMouseEnter={() => {
        if (activateMethod !== "hover") return;
        return setHovered(true);
      }}
      onMouseLeave={() => {
        if (activateMethod !== "hover") return;
        return setHovered(false);
      }}
      onClick={() => {
        if (activateMethod !== "click") return;
        return setHovered(!hovered());
      }}
    >
      {children}
      {(hovered() || activateMethod === "always") && content}
    </Box>
  );
};
export default Popper;

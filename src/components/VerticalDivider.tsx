import { Component } from "solid-js";

interface VerticalDividerProps {
  color?: string;
}

const VerticalDivider: Component<VerticalDividerProps> = (props) => {
  const { color = "#0C0C1F" } = props;
  return (
    <div
      style={{
        width: "2px",
        height: "75%",
        "background-image": `linear-gradient(#000000, ${color}, #000000`,
      }}
    />
  );
};

export default VerticalDivider;

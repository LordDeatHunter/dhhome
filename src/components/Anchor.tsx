import { Component } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { styled } from "solid-styled-components";

const StyledAnchor = styled.a`
  color: inherit;
  text-decoration: none;
  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

interface AnchorProps {
  children?: JSX.Element;
  href?: string;
  openInNewTab?: boolean;
}

const Anchor: Component<AnchorProps> = (props) => {
  const { children, href, openInNewTab } = props;
  return (
    <StyledAnchor
      href={href}
      target={openInNewTab ? "_blank" : ""}
      rel="noopener noreferrer"
    >
      {children}
    </StyledAnchor>
  );
};

export default Anchor;

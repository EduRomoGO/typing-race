import styled from "@emotion/styled";

const colors = {
  white: "white",
  primary: "#15b169",
};

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 8px;
  resize: none;
`;

export const Button = styled.button`
  -webkit-appearance: none;
  border: 2px solid transparent;
  cursor: pointer;
  display: inline-block;
  font: inherit;
  font-weight: 900;
  overflow: hidden;
  padding: 1rem 1.8rem;
  text-align: center;
  text-overflow: ellipsis;
  transition: color 0.3s, background-color 0.3s;
  user-select: none;
  white-space: nowrap;
  background-color: ${colors.primary};
  border-color: ${colors.primary};
  color: ${colors.white};

  &:not(:disabled):hover,
  &:not(:disabled):focus {
    background-color: darken(${colors.primary}, 5%);
  }

  &:focus {
    outline: 1px dotted ${colors.primary};
  }

  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 16px;
`;

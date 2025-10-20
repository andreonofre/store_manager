import styled from "styled-components";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  min-height: 100vh;
`;

export const ContainerLeft = styled.div`
  background-color: #006EC40D;
  margin: 25px;
  border-radius: 20px;
  min-height: 80vh;
`;

export const ContainerRight = styled.div`
  margin-left: 3rem;
  margin-top: 25vh;
  font-weight: 600;
  font-size: 2rem;
`;

export const Subtitle = styled.h2`
  font-size: 0.9rem;
  font-weight: 300;
  color: grey;
  margin-top: 10px;
`;

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  gap: 20px;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  && {
    background-color: #006EC4;
    text-transform: none;
    padding: 10px;
    font-size: 1rem;
    &:hover {
      background-color: #006fc4c0;
    }
    &:disabled {
      background-color: #cccccc;
      color: #666666;
    }
  }
`;

export const LinkComponent = styled(Link)`
  display: flex;
  justify-content: center;
  font-size: 0.75rem;
  margin-top: -10px;
  color: #006EC4;
  font-weight: 400;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

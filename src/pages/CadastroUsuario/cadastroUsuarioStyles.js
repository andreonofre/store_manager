import styled from "styled-components";
import Button  from "@mui/material/Button";
import { Link } from "react-router-dom";


export const Container = styled.div`
    display: grid;
    grid-template-columns: 1.8fr 1fr; // ContainerLeft ocupa 2 partes, ContainerRight 1 parte
    min-height: 100vh;
`

export const ContainerLeft = styled.div`
    background-color: #006EC40D;
    margin: 25px;
    border-radius: 20px;
    min-height: 80vh;
`

export const ContainerRight = styled.div`
    /* background-color: rgba(255, 252, 242, 1); */
    margin-left: 3rem;
    margin-top: 25vh;
    font-weight: 600;
    font-size: 2rem;
`

export const Subtitle = styled.h1 `
    font-size: .9rem;
    font-weight: 300;
    color: grey;
`

export const CadastroGoogle = styled(Button) `
`
export const CadastroHotmail = styled(Button) `
`

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
  width: 55vh;
  border-radius: 10px;
`;

export const StyledButton = styled(Button)`
  && {
    background-color: rgb(0 110 196);
    color: white;
    padding: 12px 24px;
    text-transform: none;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 30px;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    
    &:hover {
      background-color: rgb(63 147 211);
      box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
    }
    
    &:disabled {
      background-color: #cccccc;
      color: #666666;
      box-shadow: none;
    }
  }
`;


export const LinkComponent = styled(Link)`
    display: flex;
    justify-content: center;
    font-size: .75rem;
    margin-top: -10px;
    color: #006EC4;
    font-weight: 400;
`
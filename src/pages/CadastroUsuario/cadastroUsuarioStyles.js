import styled from "styled-components";
import Button  from "@mui/material/Button";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";


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
    margin-top: 4vh;
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
  width: 70%;
  border-radius: 10px;
  align-self: center;
`;

export const StyledTextField = styled(TextField)`
    && {
        .MuiOutlinedInput-root {
            border-radius: 10px; /* Ajuste o valor conforme desejado */
            
            fieldset {
                border-radius: 12px; /* Mesmo valor */
            }
            
            &:hover fieldset {
                border-color: #006EC4;
            }
            
            &.Mui-focused fieldset {
                border-color: #006EC4;
            }
        }
    }
`

export const StyledButton = styled(Button)`
    width: 75%;
    && {
        background-color: #006EC4;
        text-transform: none;
        border-radius: 10px;
        align-self: center;
        &:hover {
            background-color: #006fc4c0;
        }
    }
`


export const LinkComponent = styled(Link)`
    display: flex;
    justify-content: center;
    font-size: .75rem;
    margin-top: -10px;
    color: #006EC4;
    font-weight: 400;
`
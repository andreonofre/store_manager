import styled from "styled-components";
import Button  from "@mui/material/Button";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1.8fr 1fr; // ContainerLeft ocupa 2 partes, ContainerRight 1 parte
    min-height: 100vh;
`

export const ContainerLeft = styled.div`
    background-color: #006EC40D;
    min-height: 80vh;
    /* min-width: 50vh; */
`

export const ContainerRight = styled.div`
    background-color: rgba(255, 252, 242, 1);
    margin-left: 3rem;
    margin-top: 25vh;
    font-weight: 600;
    font-size: 2rem;
    /* min-height: 50vh; */
`

export const Subtitle = styled.h1 `
    font-size: .9rem;
    font-weight: 300;
    color: grey;
`
export const ContainerForm = styled.div `
    display: flex;
    flex-direction: column;
    margin: 20px;
    gap: 20px;
`
export const StyledButton = styled(Button)`
    && {
        background-color: #006EC4;
        text-transform: none;
    
        &:hover {
            background-color: #006fc4c0;
        }
    }
`

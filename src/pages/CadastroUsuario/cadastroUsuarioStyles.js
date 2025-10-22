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
    width: 50%; // Adicione para consistência com outros botões
    font-size: 1.1rem; // Tamanho legível; ajuste conforme necessário
    border-radius: 50px; // Bordas altamente arredondadas (pilula-style)
    
    && {
        border: 2px solid gray; // Sobrescreve a borda outlined com espessura e cor personalizadas
        color: #333; // Cor do texto para contraste
        text-transform: none; // Remove uppercase padrão do MUI
        // Espaçamento interno customizado
       

        &:hover {
        border-color: #006EC4; // Cor da borda no hover, combinando com o tema
        background-color: rgba(0, 110, 196, 0.1); // Fundo sutil no hover
        color: #006EC4; // Texto muda para azul no hover
        }
    }
`

export const ContainerForm = styled.div `
    display: flex;
    flex-direction: column;
    margin: 20px;
    gap: 20px;
`


export const StyledButton = styled(Button)`
    width: 100%;
    && {
        background-color: #006EC4;
        text-transform: none;
    
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
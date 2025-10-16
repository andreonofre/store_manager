import styled from "styled-components";
import Button  from "@mui/material/Button";
import { Link } from "react-router-dom";


export const Container = styled.div`
    display: grid;
    grid-template-columns: 1.8fr 1fr; // ContainerLeft ocupa 2 partes, ContainerRight 1 parte
    min-height: 100vh;
`

export const SearchContainer = styled.div`
    grid-column: 1 / -1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #ddd;
`

export const WelcomeText = styled.h2`
    font-size: 24px;
    font-weight: 600;
    color: #000;
    margin: 0;
`

export const SearchBox = styled.div`
    width: 300px;
    
    .MuiTextField-root {
        width: 100%;
    }
    
    .MuiOutlinedInput-root {
        background-color: #f5f5f5;
        border-radius: 8px;
    }
`

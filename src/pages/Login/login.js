import React from "react";
import TextField from '@mui/material/TextField';
import { 
    Container,
    ContainerLeft, 
    ContainerRight, 
    Subtitle, 
    ContainerForm, 
    StyledButton, 
    LinkComponent 
} from "./loginStyles.js";

const Login = () => {
    return (
        <Container>
            <ContainerLeft>  </ContainerLeft>
            <ContainerRight> 
                Welcome
                <Subtitle>Please login here</Subtitle>
                <ContainerForm>
                    <TextField
                    required
                    id="email"
                    label="Endereço de e-mail"
                    defaultValue=""
                    />
                    <TextField
                    required
                    id="senha"
                    label="Senha"
                    defaultValue=""
                    />

                    <StyledButton variant="contained">Login</StyledButton>
                </ContainerForm>
                <LinkComponent> Esqueceu a Senha? </LinkComponent>
            </ContainerRight>
        </Container>
    );
};

export default Login;
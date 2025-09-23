import React from "react";
import { Container, ContainerLeft, ContainerRight, Subtitle, ContainerForm, StyledButton } from "./loginStyles.js";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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
                </ContainerForm>
                <Stack>
                    <StyledButton variant="contained">Login</StyledButton>
                </Stack>
            </ContainerRight>

        </Container>
    );
};

export default Login;
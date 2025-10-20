// ============================================
// ARQUIVO: login.js (ATUALIZADO)
// ============================================

import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';

import { 
    Container,
    ContainerLeft, 
    ContainerRight, 
    Subtitle, 
    ContainerForm, 
    StyledButton, 
    LinkComponent 
} from "./cadastroUsuarioStyles.js";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errors, setErrors] = useState({ email: false, senha: false });
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        // Validação básica
        const newErrors = {
            email: !email || !email.includes('@'),
            senha: !senha || senha.length < 8
        };

        setErrors(newErrors);

        // Se houver erros, não continua
        if (newErrors.email || newErrors.senha) {
            toast.error('Por favor, preencha todos os campos corretamente!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        setLoading(true);

        // Simula uma chamada de API
        setTimeout(() => {
            // Salva o token e o email do usuário
            localStorage.setItem('token', 'test-token-123');
            localStorage.setItem('email', email); // SALVA O EMAIL DO USUÁRIO
            
            // Notificação de sucesso
            toast.success('Login realizado com sucesso!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // Redireciona para home após um pequeno delay
            setTimeout(() => {
                navigate('/home');
            }, 500);

            setLoading(false);
        }, 1000);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    const handleForgotPassword = () => {
        window.location.href = '/esqueceuSenha';
    };

    const handleCadastro = () => {
        window.location.href = '/cadastroCliente';
    }
    

    return (
        <Container>
            <ContainerLeft></ContainerLeft>
            <ContainerRight> 
                Cadastrar-se
                <Subtitle>Cadastro do usuário</Subtitle>
                <ContainerForm>
                    <TextField
                        required
                        id="email"
                        label="Endereço de e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        error={errors.email}
                        helperText={errors.email ? "Digite um e-mail válido" : ""}
                        fullWidth
                        disabled={loading}
                    />
                    <TextField
                        required
                        id="senha"
                        label="Senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        onKeyPress={handleKeyPress}
                        error={errors.senha}
                        helperText={errors.senha ? "A senha deve ter pelo menos 8 caracteres" : ""}
                        fullWidth
                        disabled={loading}
                    />

                    <StyledButton 
                        variant="contained" 
                        onClick={handleLogin}
                        disabled={loading}
                    > 
                        {loading ? 'Entrando...' : 'Login'}
                    </StyledButton>
                </ContainerForm>
                <LinkComponent onClick={handleForgotPassword} style={{ cursor: 'pointer', marginBottom: '.7rem', fontSize: '.9rem' }}>
                    Cadastre-se
                </LinkComponent>
                <LinkComponent onClick={handleForgotPassword} style={{ cursor: 'pointer', fontSize: '.9rem' }}>
                    Esqueceu a Senha?
                </LinkComponent>
            </ContainerRight>
        </Container>
    );
};

export default Login;

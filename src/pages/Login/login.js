import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
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
} from "./loginStyles.js";

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

        // Simula uma chamada de API (remova isso quando integrar com backend real)
        setTimeout(() => {
            // Simula autenticação e salva o token
            localStorage.setItem('token', 'test-token-123');
            
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
        toast.info('Funcionalidade de recuperação de senha em desenvolvimento!', {
            position: "top-center",
            autoClose: 3000,
        });
    };

    return (
        <Container>
            <ContainerLeft></ContainerLeft>
            <ContainerRight> 
                Welcome
                <Subtitle>Please login here</Subtitle>
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
                <LinkComponent onClick={handleForgotPassword} style={{ cursor: 'pointer' }}>
                    Esqueceu a Senha?
                </LinkComponent>
            </ContainerRight>
        </Container>
    );
};

export default Login;
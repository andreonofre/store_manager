// ============================================
// ARQUIVO: esqueceuSenha.js
// ============================================

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
} from "./esqueceuSenhaStyles.js";

const EsqueceuSenha = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ email: false });
  const [loading, setLoading] = useState(false);

  // Validação de email mais robusta
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    // Validação básica
    const isEmailValid = validateEmail(email);
    
    setErrors({ email: !isEmailValid });

    // Se houver erros, não continua
    if (!isEmailValid) {
      toast.error('E-mail inválido, por favor digite novamente!', {
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
      // Salva o email do usuário para recuperação
      localStorage.setItem('resetEmail', email);

      // Notificação de sucesso
      toast.success('Código de verificação enviado. Verifique seu e-mail para prosseguir com a redefinição de senha.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redireciona para tela de login após um pequeno delay
      setTimeout(() => {
        navigate('/login');
      }, 2500);

      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleResetPassword();
    }
  };

  return (
    <Container>
      <ContainerLeft />
      <ContainerRight>
        <div>
          <h1>Redefinir Senha</h1>
          <Subtitle>Digite seu e-mail para receber o código de verificação</Subtitle>
        </div>
        <ContainerForm>
          <TextField
            label="E-mail"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            error={errors.email}
            helperText={errors.email ? "Digite um e-mail válido" : ""}
            fullWidth
            disabled={loading}
          />
          <StyledButton 
            variant="contained" 
            onClick={handleResetPassword}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Código'}
          </StyledButton>
          <LinkComponent to="/login">
            Voltar para Login
          </LinkComponent>
        </ContainerForm>
      </ContainerRight>
    </Container>
  );
};

export default EsqueceuSenha;

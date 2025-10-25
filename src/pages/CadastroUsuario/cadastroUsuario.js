// ============================================
// ARQUIVO: cadastroUsuario.js
// ============================================

import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';


import { 
    Container,
    ContainerLeft, 
    ContainerRight, 
    Subtitle, 
    ContainerForm,
    StyledTextField,
    StyledButton, 
    CadastroGoogle,
    CadastroHotmail,
    LinkComponent 
} from "./cadastroUsuarioStyles.js";

const CadastroUsuario = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cep, setCep] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [repetirSenha, setRepetirSenha] = useState('');
    const [errors, setErrors] = useState({ email: false, senha: false });
    const [loading, setLoading] = useState(false);

    const handleCadastroUsuario = async () => {
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
             handleCadastroUsuario();
         }
     };

     const handleCadastroGoogle = () => {
        window.location.href = '/cadastroGoogle';
     };

      const handleCadastroHotmail = () => {
        window.location.href = '/cadastroGoogle';
     };

     const handleLogin= () => {
         window.location.href = '/login';
     };

    return (
        <Container>
            <ContainerLeft></ContainerLeft>
            <ContainerRight> 
                Criar conta
                <Subtitle>Cadastro do usuário</Subtitle>
                <CadastroGoogle
                    startIcon={
                        <FontAwesomeIcon icon={faGoogle} style={{ color: '#414141ff' }} /> // Cor azul do Google para destaque
                    }
                    onClick={handleCadastroGoogle}
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#4e4e4eff',
                        padding: '10px 20px',
                        border: '1px solid #adadadff',
                        borderRadius: '10px',
                        fontWeight: 600,
                        textTransform: 'none',
                        width: '55%',
                        marginTop: '15px',
                        marginBottom: 'none'
                    }}
                > Cadastrar-se com Google </CadastroGoogle>
                <CadastroHotmail
                    startIcon={
                        <FontAwesomeIcon icon={faMicrosoft} style={{ color: '#414141ff' }} /> // Cor azul do Google para destaque
                    }
                    onClick={handleCadastroHotmail}
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#4e4e4eff',
                        padding: '10px 20px',
                        border: '1px solid #adadadff',
                        borderRadius: '10px',
                        fontWeight: 600,
                        textTransform: 'none',
                        width: '55%',
                        marginTop: '15px',
                        marginBottom: '15px',

                    }}
                > Cadastrar-se com Hotmail </CadastroHotmail>
                <Subtitle>──────────────  OU  ──────────────</Subtitle>
                <ContainerForm>
                    <StyledTextField
                        required
                        id="nome"
                        label="Nome/Razão Social"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        onKeyPress={handleKeyPress}
                        error={errors.nome}
                        helperText={errors.nome ? "Digite um nome ou razão social!" : ""}
                        fullWidth
                        disabled={loading}
                        
                    />
                    <StyledTextField
                        required
                        id="endereco"
                        label="Endereço"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        onKeyPress={handleKeyPress}
                        error={errors.endereco}
                        helperText={errors.endereco ? "Digite um Endereço válido" : ""}
                        fullWidth
                        disabled={loading}
                        
                    />
                    <StyledTextField
                        required
                        id="cep"
                        label="CEP"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        onKeyPress={handleKeyPress}
                        error={errors.cep}
                        helperText={errors.cep ? "Digite um CEP válido" : ""}
                        fullWidth
                        disabled={loading}
                        
                    />
                    <StyledTextField
                        required
                        id="telefone"
                        label="Telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        onKeyPress={handleKeyPress}
                        error={errors.telefone}
                        helperText={errors.telefone ? "Digite um Telefone válido" : ""}
                        fullWidth
                        disabled={loading}
                        
                    />
                    <StyledTextField
                        required
                        id="email"
                        label="Endereço de e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        error={errors.email}
                        helperText={errors.email ? "Digite um e-mail válido!" : ""}
                        fullWidth
                        disabled={loading}
                    />
                    <StyledTextField
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
                    <StyledTextField
                        required
                        id="repetirSenha"
                        label="Repetir senha"
                        type="password"
                        value={repetirSenha}
                        onChange={(e) => setRepetirSenha(e.target.value)}
                        onKeyPress={handleKeyPress}
                        error={errors.senha ? "As senhas devem ser iguais" : ""}
                        fullWidth
                        disabled={loading}
                    />

                    <StyledButton 
                        variant="contained" 
                        onClick={handleCadastroUsuario}
                        disabled={loading}
                    > 
                        {loading ? 'Finalizando...' : 'Criar conta'}
                    </StyledButton>
                    <LinkComponent onClick={handleLogin} style={{ cursor: 'pointer', marginBottom: '.7rem', fontSize: '.9rem' }}>
                    Já possui uma conta? Faça login
                    </LinkComponent>
                </ContainerForm>
            </ContainerRight>
        </Container>
    );
};

export default CadastroUsuario;

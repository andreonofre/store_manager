import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import NotificationsActive from '@mui/icons-material/NotificationsActive';
import Switch from '@mui/material/Switch';

import {
    Container,
    ProfileSection,
    AvatarWrapper,
    AdicionarFoto,
    FormSection,
    SectionTitle,
    FormGroup,
    SaveButton,
    InfoText,
    NotificationGroup,
    NotificationItem,
    NotificationInfo,
    NotificationIcon,
    NotificationTextGroup,
    NotificationLabel,
    NotificationDescription,
    StyledSwitch
} from "./configuracoesStyles.js";


const Configuracoes = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    
    // Estados para informações de contato
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [emailRecuperacao, setEmailRecuperacao] = useState("");
    const [telefone, setTelefone] = useState("");
    
    // Estados para senha
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    
    // Estados para mostrar/ocultar senha
    const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
    const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

    // Função para lidar com upload de imagem
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setProfileImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
        }

  };

  // Função para salvar informações de contato
  const handleSaveContact = () => {
    console.log("Salvando informações de contato:", { nome, email, emailRecuperacao, telefone });
    // Aqui você adiciona a lógica para enviar ao backend
  };

  // Função para notificações
  const [notificacoesAtivadas, setNotificacoesAtivadas] = useState(true);


  // Função para alterar senha
  const handleChangePassword = () => {
    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log("Alterando senha");
    // Aqui você adiciona a lógica para enviar ao backend
  };

  return (
        <Container>
        {/* 1. Card de Foto de Perfil */}
        <ProfileSection>
            <SectionTitle>Foto de Perfil</SectionTitle>
            <AvatarWrapper>
            <Avatar
                src={previewImage}
                sx={{ width: 150, height: 150 }}
            >
                {!previewImage && nome.charAt(0).toUpperCase()}
            </Avatar>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="profile-image-upload"
                type="file"
                onChange={handleImageChange}
            />
            <label htmlFor="profile-image-upload">
                <AdicionarFoto
                variant="contained"
                component="span"
                startIcon={<PhotoCamera />}
                >
                Adicionar Foto
                </AdicionarFoto>
            </label>
            </AvatarWrapper>
            <InfoText>Formatos aceitos: JPG, PNG (máx. 5MB)</InfoText>
        </ProfileSection>

        {/* 2. Card de Informações de Contato */}
        <FormSection>
            <SectionTitle>Informações de Contato</SectionTitle>
            <FormGroup>
            <TextField
                fullWidth
                label="Nome Completo"
                variant="outlined"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Email de Recuperação"
                variant="outlined"
                type="emailRecuperacao"
                value={emailRecuperacao}
                onChange={(e) => setEmailRecuperacao(e.target.value)}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Telefone"
                variant="outlined"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                margin="normal"
            />
            <SaveButton
                variant="contained"
                onClick={handleSaveContact}
            >
                Salvar Alterações
            </SaveButton>
            </FormGroup>
        </FormSection>

        {/* 3. Card de Preferências de Notificações */}
        <FormSection>
            <SectionTitle>Preferências de Notificações</SectionTitle>
            <NotificationGroup>
                <NotificationItem>
                <NotificationInfo>
                    <NotificationIcon>
                    <NotificationsActive />
                    </NotificationIcon>
                    <NotificationTextGroup>
                    <NotificationLabel>Notificações</NotificationLabel>
                    <NotificationDescription>
                        Deseja receber notificações do aplicativo? <br />
                        Ativando esta opção, você será informado sobre atualizações importantes, <br />
                        lembretes e novidades diretamente na sua tela, garantindo que não perca <br />
                        nenhuma informação relevante.
                    </NotificationDescription>
                    </NotificationTextGroup>
                </NotificationInfo>
                <StyledSwitch
                    checked={notificacoesAtivadas}
                    onChange={(e) => setNotificacoesAtivadas(e.target.checked)}
                    color="primary"
                />
                </NotificationItem>
            </NotificationGroup>
        </FormSection>


        {/* 4. Card de Alteração de Senha */}
        <FormSection>
            <SectionTitle>Alterar Senha</SectionTitle>
            <FormGroup>
            <TextField
                fullWidth
                label="Senha Atual"
                variant="outlined"
                type={mostrarSenhaAtual ? 'text' : 'password'}
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                margin="normal"
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                        onClick={() => setMostrarSenhaAtual(!mostrarSenhaAtual)}
                        edge="end"
                    >
                        {mostrarSenhaAtual ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                )
                }}
            />
            <TextField
                fullWidth
                label="Nova Senha"
                variant="outlined"
                type={mostrarNovaSenha ? 'text' : 'password'}
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                margin="normal"
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                        onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                        edge="end"
                    >
                        {mostrarNovaSenha ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                )
                }}
            />
            <TextField
                fullWidth
                label="Confirmar Nova Senha"
                variant="outlined"
                type={mostrarConfirmarSenha ? 'text' : 'password'}
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                margin="normal"
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                        onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                        edge="end"
                    >
                        {mostrarConfirmarSenha ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                )
                }}
            />
            <SaveButton
                variant="contained"
                onClick={handleChangePassword}
            >
                Alterar Senha
            </SaveButton>
            </FormGroup>
        </FormSection>
        </Container>
  );
};

export default Configuracoes;

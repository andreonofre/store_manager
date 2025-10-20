import React, { useState, useEffect } from "react";
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

  // Estado para controlar modo de edição
  const [isEditing, setIsEditing] = useState(false);

  // Estados para informações de contato (simulando dados pré-preenchidos do cadastro)
  const [nome, setNome] = useState("João Silva");
  const [email, setEmail] = useState("joao.silva@email.com");
  const [emailRecuperacao, setEmailRecuperacao] = useState("joao.recuperacao@email.com");
  const [telefone, setTelefone] = useState("(11) 98765-4321");

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

  // Função para ativar modo de edição
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Função para salvar informações de contato
  const handleSaveContact = () => {
    if (!email || !emailRecuperacao || !telefone) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }
    
    console.log("Salvando informações de contato:", { nome, email, emailRecuperacao, telefone });
    // Aqui você adiciona a lógica para enviar ao backend
    
    // Desativa modo de edição após salvar
    setIsEditing(false);
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
      <FormSection>
        <SectionTitle>Foto de Perfil</SectionTitle>
        <ProfileSection>
          <AvatarWrapper>
            <Avatar
              src={previewImage}
              sx={{ width: 100, height: 100 }}
            > 
              {!previewImage && nome.charAt(0).toUpperCase()}
            </Avatar>
            <IconButton
              color="primary"
              component="label"
            > 
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImageChange}
              />
              <PhotoCamera />   
            </IconButton>
          </AvatarWrapper>
          
          <InfoText>
            Formatos aceitos: JPG, PNG (máx. 5MB)
          </InfoText>
        </ProfileSection>
      </FormSection>

      {/* 2. Card de Informações de Contato */}
      <FormSection>
        <SectionTitle>Informações de Contato</SectionTitle>
        <FormGroup>
          <TextField
            label="Nome"
            type="text"
            fullWidth
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            margin="normal"
            disabled={!isEditing}
            InputProps={{
              readOnly: !isEditing,
            }}
          />
          <TextField
            label="E-mail"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            disabled={!isEditing}
            InputProps={{
              readOnly: !isEditing,
            }}
          />
          <TextField
            label="E-mail de Recuperação"
            type="email"
            fullWidth
            required
            value={emailRecuperacao}
            onChange={(e) => setEmailRecuperacao(e.target.value)}
            margin="normal"
            disabled={!isEditing}
            InputProps={{
              readOnly: !isEditing,
            }}
          />
          <TextField
            label="Telefone"
            type="tel"
            fullWidth
            required
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            margin="normal"
            disabled={!isEditing}
            InputProps={{
              readOnly: !isEditing,
            }}
          />
          
          {!isEditing ? (
            <SaveButton onClick={handleEdit}>
              Editar
            </SaveButton>
          ) : (
            <SaveButton onClick={handleSaveContact}>
              Salvar Alterações
            </SaveButton>
          )}
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
                <NotificationLabel>
                  Notificações
                </NotificationLabel>
                <NotificationDescription>
                  Deseja receber notificações do aplicativo?
                </NotificationDescription>
                <NotificationDescription>
                  Ativando esta opção, você será informado sobre atualizações importantes,
                  lembretes e novidades diretamente na sua tela, garantindo que não perca
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
            label="Senha Atual"
            type={mostrarSenhaAtual ? "text" : "password"}
            fullWidth
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
              ),
            }}
          />
          <TextField
            label="Nova Senha"
            type={mostrarNovaSenha ? "text" : "password"}
            fullWidth
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
              ),
            }}
          />
          <TextField
            label="Confirmar Nova Senha"
            type={mostrarConfirmarSenha ? "text" : "password"}
            fullWidth
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
              ),
            }}
          />
          <SaveButton onClick={handleChangePassword}>
            Alterar Senha
          </SaveButton>
        </FormGroup>
      </FormSection>
    </Container>
  );
};

export default Configuracoes;

// ============================================
// ARQUIVO: cadastroProdutos.js
// ============================================

import React, { useState } from 'react';
import { 
  TextField, 
  MenuItem, 
  Button,
  Box,
  Alert,
  Snackbar
} from '@mui/material';
import {
  SaveOutlined,
  ClearOutlined,
  ShoppingCartOutlined,
  CategoryOutlined,
  AttachMoneyOutlined,
  InventoryOutlined,
  ImageOutlined
} from '@mui/icons-material';
import {
  PageContainer,
  FormContainer,
  Card,
  CardHeader,
  CardContent,
  FormSection,
  SectionTitle,
  ButtonGroup,
  ImagePreviewContainer,
  ImagePreview
} from './cadastroProdutosStyles';

export default function CadastroProdutos() {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    categoria: '',
    preco: '',
    quantidade: '',
    imagem: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const categorias = [
    'Eletrônicos',
    'Roupas',
    'Alimentos',
    'Livros',
    'Móveis',
    'Esportes',
    'Beleza',
    'Brinquedos',
    'Ferramentas',
    'Outros'
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleSubmit = () => {
    // Validações
    if (!formData.nome.trim()) {
      showSnackbar('Nome do produto é obrigatório!', 'error');
      return;
    }

    if (!formData.categoria) {
      showSnackbar('Selecione uma categoria!', 'error');
      return;
    }

    if (!formData.preco || parseFloat(formData.preco) <= 0) {
      showSnackbar('Preço deve ser maior que zero!', 'error');
      return;
    }

    if (!formData.quantidade || parseInt(formData.quantidade) < 0) {
      showSnackbar('Quantidade inválida!', 'error');
      return;
    }

    // Criar novo produto
    const novoProduto = {
      id: Date.now(),
      ...formData,
      preco: parseFloat(formData.preco),
      quantidade: parseInt(formData.quantidade),
      dataCadastro: new Date().toISOString()
    };

    // Recuperar produtos existentes do localStorage
    const produtosExistentes = JSON.parse(
      localStorage.getItem('produtos') || '[]'
    );

    // Adicionar novo produto
    const produtosAtualizados = [...produtosExistentes, novoProduto];

    // Salvar no localStorage
    localStorage.setItem('produtos', JSON.stringify(produtosAtualizados));

    showSnackbar('✅ Produto cadastrado com sucesso!', 'success');
    handleClear();
  };

  const handleClear = () => {
    setFormData({
      nome: '',
      descricao: '',
      categoria: '',
      preco: '',
      quantidade: '',
      imagem: ''
    });
  };

  return (
    <PageContainer>
      <FormContainer>
        <Card>
          <CardHeader>
            <ShoppingCartOutlined sx={{ fontSize: 40, mb: 1 }} />
            <h1>Cadastro de Produtos</h1>
            <p>Gerencie seu catálogo de produtos</p>
          </CardHeader>
          
          <CardContent>
            {/* Informações Básicas */}
            <FormSection>
              <SectionTitle>
                <CategoryOutlined sx={{ mr: 1 }} />
                Informações Básicas
              </SectionTitle>
              
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Nome do Produto"
                  variant="outlined"
                  required
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  placeholder="Ex: Notebook Dell Inspiron"
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  select
                  label="Categoria"
                  variant="outlined"
                  required
                  value={formData.categoria}
                  onChange={(e) => handleChange('categoria', e.target.value)}
                >
                  <MenuItem value="">
                    <em>Selecione uma categoria</em>
                  </MenuItem>
                  {categorias.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Descrição"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={formData.descricao}
                  onChange={(e) => handleChange('descricao', e.target.value)}
                  placeholder="Descreva as características do produto..."
                />
              </Box>
            </FormSection>

            {/* Valores e Estoque */}
            <FormSection>
              <SectionTitle>
                <AttachMoneyOutlined sx={{ mr: 1 }} />
                Valores e Estoque
              </SectionTitle>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
                <TextField
                  fullWidth
                  label="Preço (R$)"
                  variant="outlined"
                  required
                  type="number"
                  value={formData.preco}
                  onChange={(e) => handleChange('preco', e.target.value)}
                  placeholder="0.00"
                  inputProps={{
                    step: '0.01',
                    min: '0'
                  }}
                />

                <TextField
                  fullWidth
                  label="Quantidade em Estoque"
                  variant="outlined"
                  required
                  type="number"
                  value={formData.quantidade}
                  onChange={(e) => handleChange('quantidade', e.target.value)}
                  placeholder="0"
                  inputProps={{
                    min: '0'
                  }}
                />
              </Box>
            </FormSection>

            {/* Imagem */}
            <FormSection>
              <SectionTitle>
                <ImageOutlined sx={{ mr: 1 }} />
                Imagem do Produto
              </SectionTitle>
              
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="URL da Imagem"
                  variant="outlined"
                  value={formData.imagem}
                  onChange={(e) => handleChange('imagem', e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </Box>
              
              {formData.imagem && (
                <ImagePreviewContainer>
                  <ImagePreview 
                    src={formData.imagem} 
                    alt="Preview"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150?text=Imagem+Indisponível';
                    }}
                  />
                  <Alert severity="success" sx={{ flex: 1 }}>
                    Imagem carregada com sucesso!
                  </Alert>
                </ImagePreviewContainer>
              )}
            </FormSection>

            {/* Botões */}
            <ButtonGroup>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                startIcon={<ClearOutlined />}
                onClick={handleClear}
                sx={{ 
                  borderRadius: '25px',
                  padding: '12px 32px',
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Limpar
              </Button>
              
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveOutlined />}
                onClick={handleSubmit}
                sx={{ 
                  borderRadius: '25px',
                  padding: '12px 32px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #654092 100%)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)'
                  }
                }}
              >
                Cadastrar Produto
              </Button>
            </ButtonGroup>
          </CardContent>
        </Card>
      </FormContainer>

      {/* Snackbar para notificações */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}

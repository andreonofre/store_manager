// ============================================
// ARQUIVO: listarProdutos.js (ATUALIZADO)
// ============================================

import React, { useState, useEffect } from 'react';
import { 
  IconButton,
  Chip,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Divider
} from '@mui/material';
import {
  DeleteOutline,
  InventoryOutlined,
  Close as CloseIcon,
  Category as CategoryIcon,
  AttachMoney as AttachMoneyIcon,
  Inventory as InventoryIcon
} from '@mui/icons-material';
import {
  PageContainer,
  FormContainer,
  Card,
  CardHeader,
  CardContent,
  ProductList,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductMeta
} from './listarProdutosStyles';

export default function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = () => {
    const produtosSalvos = JSON.parse(
      localStorage.getItem('produtos') || '[]'
    );
    setProdutos(produtosSalvos);
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleDelete = (id, event) => {
    event.stopPropagation(); // Impede que o modal abra ao deletar
    const produtosAtualizados = produtos.filter(produto => produto.id !== id);
    setProdutos(produtosAtualizados);
    localStorage.setItem('produtos', JSON.stringify(produtosAtualizados));
    showSnackbar('🗑️ Produto removido com sucesso!', 'info');
  };

  const handleOpenModal = (produto) => {
    setProdutoSelecionado(produto);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setProdutoSelecionado(null);
  };

  const formatarData = (dataISO) => {
    if (!dataISO) return 'Data não disponível';
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <PageContainer>
      <FormContainer>
        <Card>
          <CardHeader>
            <InventoryOutlined sx={{ fontSize: 40, mb: 1 }} />
            <h1>Lista de Produtos</h1>
            <p>Total de {produtos.length} produtos cadastrados</p>
          </CardHeader>
          
          <CardContent>
            {produtos.length === 0 ? (
              <Alert severity="info" sx={{ borderRadius: '12px' }}>
                Nenhum produto cadastrado ainda. Vá para a tela de cadastro para adicionar produtos!
              </Alert>
            ) : (
              <ProductList>
                {produtos.map((produto) => (
                  <ProductCard 
                    key={produto.id}
                    onClick={() => handleOpenModal(produto)}
                    style={{ cursor: 'pointer' }}
                  >
                    <ProductImage
                      src={produto.imagem || 'https://via.placeholder.com/80'}
                      alt={produto.nome}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80?text=Sem+Imagem';
                      }}
                    />
                    
                    <ProductInfo>
                      <ProductName>{produto.nome}</ProductName>
                      
                      <ProductMeta>
                        <Chip 
                          label={produto.categoria}
                          color="primary"
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                        <Chip 
                          label={`R$ ${produto.preco.toFixed(2)}`}
                          color="success"
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                        <Chip 
                          label={`Estoque: ${produto.quantidade}`}
                          color={produto.quantidade > 10 ? 'success' : 'warning'}
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      </ProductMeta>
                      
                      {produto.descricao && (
                        <p style={{ 
                          margin: '8px 0 0 0', 
                          color: '#666', 
                          fontSize: '0.9rem'
                        }}>
                          {produto.descricao}
                        </p>
                      )}
                    </ProductInfo>
                    
                    <IconButton 
                      onClick={(e) => handleDelete(produto.id, e)}
                      color="error"
                      sx={{ 
                        '&:hover': { 
                          background: 'rgba(244, 67, 54, 0.1)' 
                        }
                      }}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </ProductCard>
                ))}
              </ProductList>
            )}
          </CardContent>
        </Card>
      </FormContainer>

      {/* Modal de Detalhes do Produto */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
          }
        }}
      >
        {produtoSelecionado && (
          <>
            <DialogTitle
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px'
              }}
            >
              <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
                Detalhes do Produto
              </Typography>
              <IconButton
                onClick={handleCloseModal}
                sx={{ 
                  color: 'white',
                  '&:hover': { background: 'rgba(255, 255, 255, 0.1)' }
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ padding: '30px 24px' }}>
              {/* Imagem Grande */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 3,
                  padding: 2,
                  background: '#f5f5f5',
                  borderRadius: '12px'
                }}
              >
                <img
                  src={produtoSelecionado.imagem || 'https://via.placeholder.com/400'}
                  alt={produtoSelecionado.nome}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '400px',
                    borderRadius: '8px',
                    objectFit: 'contain'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400?text=Sem+Imagem';
                  }}
                />
              </Box>

              {/* Nome do Produto */}
              <Typography 
                variant="h4" 
                component="h2" 
                sx={{ 
                  fontWeight: 700,
                  color: '#333',
                  marginBottom: 2
                }}
              >
                {produtoSelecionado.nome}
              </Typography>

              <Divider sx={{ marginBottom: 3 }} />

              {/* Informações em Grid */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, marginBottom: 3 }}>
                {/* Categoria */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CategoryIcon sx={{ color: '#667eea', fontSize: 28 }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                      Categoria
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                      {produtoSelecionado.categoria}
                    </Typography>
                  </Box>
                </Box>

                {/* Preço */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AttachMoneyIcon sx={{ color: '#4caf50', fontSize: 28 }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                      Preço
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#4caf50' }}>
                      R$ {produtoSelecionado.preco.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                {/* Quantidade em Estoque */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <InventoryIcon 
                    sx={{ 
                      color: produtoSelecionado.quantidade > 10 ? '#4caf50' : '#ff9800', 
                      fontSize: 28 
                    }} 
                  />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                      Estoque
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        color: produtoSelecionado.quantidade > 10 ? '#4caf50' : '#ff9800'
                      }}
                    >
                      {produtoSelecionado.quantidade} unidades
                    </Typography>
                  </Box>
                </Box>

                {/* Data de Cadastro */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 28, 
                    height: 28, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <Typography sx={{ fontSize: 24 }}>📅</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                      Data de Cadastro
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                      {formatarData(produtoSelecionado.dataCadastro)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Descrição */}
              {produtoSelecionado.descricao && (
                <Box sx={{ marginTop: 3 }}>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#667eea',
                      marginBottom: 1
                    }}
                  >
                    📝 Descrição
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#666',
                      lineHeight: 1.8,
                      padding: 2,
                      background: '#f9f9f9',
                      borderRadius: '8px',
                      borderLeft: '4px solid #667eea'
                    }}
                  >
                    {produtoSelecionado.descricao}
                  </Typography>
                </Box>
              )}
            </DialogContent>

            <DialogActions sx={{ padding: '16px 24px', background: '#fafafa' }}>
              <Button
                onClick={handleCloseModal}
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '10px 30px',
                  borderRadius: '25px',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #654092 100%)',
                  }
                }}
              >
                Fechar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

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

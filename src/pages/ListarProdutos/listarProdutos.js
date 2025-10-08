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
  Divider,
  TextField,
  InputAdornment,
  MenuItem
} from '@mui/material';
import {
  DeleteOutline,
  InventoryOutlined,
  Close as CloseIcon,
  Category as CategoryIcon,
  AttachMoney as AttachMoneyIcon,
  Inventory as InventoryIcon,
  LocationOn as LocationOnIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon
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
  ProductMeta,
  LocationBadge,
  SearchContainer,
  StockBadge
} from './listarProdutosStyles';

export default function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

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

  useEffect(() => {
    carregarProdutos();
  }, []);

  useEffect(() => {
    filtrarProdutos();
  }, [searchTerm, produtos]);

  const carregarProdutos = () => {
    const produtosSalvos = JSON.parse(
      localStorage.getItem('produtos') || '[]'
    );
    setProdutos(produtosSalvos);
  };



  const filtrarProdutos = () => {
  if (!searchTerm.trim()) {
    setProdutosFiltrados(produtos);
    return;
  }

  const termo = searchTerm.toLowerCase();
  const filtrados = produtos.filter(produto => {
    const codigo = produto.codigo ? produto.codigo.toLowerCase() : '';
    const nome = produto.nome ? produto.nome.toLowerCase() : '';
    
    return codigo.includes(termo) || nome.includes(termo);
  });
  setProdutosFiltrados(filtrados);
};


  const getStockStatus = (produto) => {
    const { quantidade, estoqueMinimo } = produto;
    const estoqueMin = estoqueMinimo || 0;
    
    if (quantidade === 0) {
      return { status: 'esgotado', label: 'ESGOTADO', color: '#d32f2f' };
    } else if (quantidade <= estoqueMin) {
      return { status: 'baixo', label: 'ESTOQUE BAIXO', color: '#f57c00' };
    } else if (quantidade <= estoqueMin * 2) {
      return { status: 'medio', label: 'ESTOQUE MÉDIO', color: '#ffa726' };
    } else {
      return { status: 'alto', label: 'ESTOQUE ALTO', color: '#4caf50' };
    }
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
    event.stopPropagation();
    const produtosAtualizados = produtos.filter(produto => produto.id !== id);
    setProdutos(produtosAtualizados);
    localStorage.setItem('produtos', JSON.stringify(produtosAtualizados));
    showSnackbar('🗑️ Produto removido com sucesso!', 'info');
  };

  const handleOpenModal = (produto) => {
    setProdutoSelecionado(produto);
    setEditData({ ...produto });
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setProdutoSelecionado(null);
    setIsEditing(false);
    setEditData(null);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditData({ ...produtoSelecionado });
    }
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEdit = () => {
    // Validações
    if (!editData.nome.trim()) {
      showSnackbar('Nome do produto é obrigatório!', 'error');
      return;
    }

    if (!editData.categoria) {
      showSnackbar('Selecione uma categoria!', 'error');
      return;
    }

    if (!editData.preco || parseFloat(editData.preco) <= 0) {
      showSnackbar('Preço deve ser maior que zero!', 'error');
      return;
    }

    if (editData.quantidade === '' || parseInt(editData.quantidade) < 0) {
      showSnackbar('Quantidade inválida!', 'error');
      return;
    }

    if (editData.estoqueMinimo === '' || parseInt(editData.estoqueMinimo) < 0) {
      showSnackbar('Estoque mínimo inválido!', 'error');
      return;
    }

    if (!editData.corredor.trim()) {
      showSnackbar('Corredor é obrigatório!', 'error');
      return;
    }

    if (!editData.prateleira.trim()) {
      showSnackbar('Prateleira é obrigatória!', 'error');
      return;
    }

    // Atualizar produto
    const produtosAtualizados = produtos.map(p => 
      p.id === editData.id 
        ? {
            ...editData,
            preco: parseFloat(editData.preco),
            quantidade: parseInt(editData.quantidade),
            estoqueMinimo: parseInt(editData.estoqueMinimo)
          }
        : p
    );

    setProdutos(produtosAtualizados);
    localStorage.setItem('produtos', JSON.stringify(produtosAtualizados));
    setProdutoSelecionado(editData);
    setIsEditing(false);
    showSnackbar('✅ Produto atualizado com sucesso!', 'success');
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
            {/* Campo de Busca */}
            <SearchContainer>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Buscar por código ou nome do produto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#667eea' }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setSearchTerm('')}
                        edge="end"
                        size="small"
                      >
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </SearchContainer>

            {produtosFiltrados.length === 0 ? (
              <Alert severity="info" sx={{ borderRadius: '12px' }}>
                {searchTerm 
                  ? `Nenhum produto encontrado para "${searchTerm}"`
                  : 'Nenhum produto cadastrado ainda. Vá para a tela de cadastro para adicionar produtos!'}
              </Alert>
            ) : (
              <ProductList>
                {produtosFiltrados.map((produto) => {
                  const stockStatus = getStockStatus(produto);
                  
                  return (
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
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: '#999', 
                            display: 'block', 
                            mb: 1,
                            fontWeight: 600 
                          }}
                        >
                          Código: {produto.codigo}
                        </Typography>
                        
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
                        </ProductMeta>

                        {/* Badge de Estoque com Cores */}
                        <StockBadge color={stockStatus.color}>
                          <WarningIcon sx={{ fontSize: 18, mr: 0.5 }} />
                          {stockStatus.label}: <strong>{produto.quantidade}</strong> unidades
                          {produto.estoqueMinimo > 0 && 
                            ` (Mín: ${produto.estoqueMinimo})`
                          }
                        </StockBadge>

                        {/* Exibir localização */}
                        {(produto.corredor || produto.prateleira) && (
                          <LocationBadge>
                            <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            Corredor: {produto.corredor || 'N/A'} | Prateleira: {produto.prateleira || 'N/A'}
                          </LocationBadge>
                        )}
                        
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
                  );
                })}
              </ProductList>
            )}
          </CardContent>
        </Card>
      </FormContainer>

      {/* Modal de Detalhes/Edição do Produto */}
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
        {produtoSelecionado && editData && (
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
                {isEditing ? 'Editar Produto' : 'Detalhes do Produto'}
              </Typography>
              <Box>
                <IconButton
                  onClick={handleEditToggle}
                  sx={{ 
                    color: 'white',
                    mr: 1,
                    '&:hover': { background: 'rgba(255, 255, 255, 0.1)' }
                  }}
                >
                  {isEditing ? <CancelIcon /> : <EditIcon />}
                </IconButton>
                <IconButton
                  onClick={handleCloseModal}
                  sx={{ 
                    color: 'white',
                    '&:hover': { background: 'rgba(255, 255, 255, 0.1)' }
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
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
                  src={editData.imagem || 'https://via.placeholder.com/400'}
                  alt={editData.nome}
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

              {isEditing && (
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="URL da Imagem"
                    variant="outlined"
                    value={editData.imagem}
                    onChange={(e) => handleEditChange('imagem', e.target.value)}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </Box>
              )}

              {/* Nome do Produto */}
              {isEditing ? (
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Nome do Produto"
                    variant="outlined"
                    required
                    value={editData.nome}
                    onChange={(e) => handleEditChange('nome', e.target.value)}
                  />
                </Box>
              ) : (
                <Typography 
                  variant="h4" 
                  component="h2" 
                  sx={{ 
                    fontWeight: 700,
                    color: '#333',
                    marginBottom: 2
                  }}
                >
                  {editData.nome}
                </Typography>
              )}

              <Divider sx={{ marginBottom: 3 }} />

              {/* Informações em Grid */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, marginBottom: 3 }}>
                {/* Código */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 28, 
                    height: 28, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <Typography sx={{ fontSize: 24 }}>🔖</Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                      Código
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                      {editData.codigo}
                    </Typography>
                  </Box>
                </Box>

                {/* Categoria */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CategoryIcon sx={{ color: '#667eea', fontSize: 28 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                      Categoria
                    </Typography>
                    {isEditing ? (
                      <TextField
                        select
                        fullWidth
                        size="small"
                        value={editData.categoria}
                        onChange={(e) => handleEditChange('categoria', e.target.value)}
                      >
                        {categorias.map((cat) => (
                          <MenuItem key={cat} value={cat}>
                            {cat}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : (
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                        {editData.categoria}
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* Preço */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AttachMoneyIcon sx={{ color: '#4caf50', fontSize: 28 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                      Preço
                    </Typography>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        value={editData.preco}
                        onChange={(e) => handleEditChange('preco', e.target.value)}
                        inputProps={{ step: '0.01', min: '0' }}
                      />
                    ) : (
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#4caf50' }}>
                        R$ {editData.preco.toFixed(2)}
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* Quantidade em Estoque */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <InventoryIcon 
                    sx={{ 
                      color: getStockStatus(editData).color, 
                      fontSize: 28 
                    }} 
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                      Estoque Atual
                    </Typography>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        value={editData.quantidade}
                        onChange={(e) => handleEditChange('quantidade', e.target.value)}
                        inputProps={{ min: '0' }}
                      />
                    ) : (
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600, 
                          color: getStockStatus(editData).color
                        }}
                      >
                        {editData.quantidade} unidades
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* Estoque Mínimo */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WarningIcon sx={{ color: '#ff9800', fontSize: 28 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                      Estoque Mínimo
                    </Typography>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        value={editData.estoqueMinimo}
                        onChange={(e) => handleEditChange('estoqueMinimo', e.target.value)}
                        inputProps={{ min: '0' }}
                      />
                    ) : (
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                        {editData.estoqueMinimo} unidades
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* Status do Estoque */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 28, 
                    height: 28, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <Typography sx={{ fontSize: 24 }}>📊</Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                      Status do Estoque
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        color: getStockStatus(editData).color
                      }}
                    >
                      {getStockStatus(editData).label}
                    </Typography>
                  </Box>
                </Box>

                {/* Corredor */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon sx={{ color: '#ff9800', fontSize: 28 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                      Corredor
                    </Typography>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        size="small"
                        value={editData.corredor}
                        onChange={(e) => handleEditChange('corredor', e.target.value)}
                      />
                    ) : (
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                        {editData.corredor || 'Não informado'}
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* Prateleira */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 28, 
                    height: 28, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <Typography sx={{ fontSize: 24 }}>📦</Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                      Prateleira
                    </Typography>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        size="small"
                        value={editData.prateleira}
                        onChange={(e) => handleEditChange('prateleira', e.target.value)}
                      />
                    ) : (
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                        {editData.prateleira || 'Não informado'}
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* Cadastrado Por */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon sx={{ color: '#9c27b0', fontSize: 28 }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                      Cadastrado Por
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                      {editData.cadastradoPor || 'Não informado'}
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
                      {formatarData(editData.dataCadastro)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Descrição */}
              {isEditing ? (
                <Box sx={{ marginTop: 3 }}>
                  <TextField
                    fullWidth
                    label="Descrição"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={editData.descricao}
                    onChange={(e) => handleEditChange('descricao', e.target.value)}
                    placeholder="Descreva as características do produto..."
                  />
                </Box>
              ) : (
                editData.descricao && (
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
                      {editData.descricao}
                    </Typography>
                  </Box>
                )
              )}
            </DialogContent>

            <DialogActions sx={{ padding: '16px 24px', background: '#fafafa', gap: 2 }}>
              {isEditing ? (
                <>
                  <Button
                    onClick={handleEditToggle}
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    sx={{
                      borderRadius: '25px',
                      padding: '10px 30px',
                      fontWeight: 600,
                      textTransform: 'none'
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSaveEdit}
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={{
                      background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
                      color: 'white',
                      padding: '10px 30px',
                      borderRadius: '25px',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #388e3c 0%, #1b5e20 100%)',
                      }
                    }}
                  >
                    Salvar Alterações
                  </Button>
                </>
              ) : (
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
              )}
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

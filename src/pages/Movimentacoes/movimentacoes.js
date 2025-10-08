// ============================================
// ARQUIVO: movimentacoes.js
// ============================================

import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  MenuItem, 
  Button,
  Box,
  Alert,
  Snackbar,
  Chip,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Divider
} from '@mui/material';
import {
  SaveOutlined,
  ClearOutlined,
  TrendingUpOutlined,
  TrendingDownOutlined,
  InventoryOutlined,
  DeleteOutline,
  VisibilityOutlined,
  Close as CloseIcon
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
  MovimentacaoList,
  MovimentacaoCard,
  MovimentacaoInfo,
  MovimentacaoMeta,
  TipoChip,
  StatsContainer,
  StatCard,
  StatValue,
  StatLabel
} from './movimentacoesStyle.js';

export default function Movimentacoes() {
  const [formData, setFormData] = useState({
    produtoId: null,
    tipo: '',
    quantidade: '',
    observacao: '',
    dataMovimentacao: new Date().toISOString().split('T')[0]
  });

  const [produtos, setProdutos] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [movimentacaoSelecionada, setMovimentacaoSelecionada] = useState(null);

  useEffect(() => {
    carregarProdutos();
    carregarMovimentacoes();
  }, []);

  const carregarProdutos = () => {
    const produtosSalvos = JSON.parse(
      localStorage.getItem('produtos') || '[]'
    );
    setProdutos(produtosSalvos);
  };

  const carregarMovimentacoes = () => {
    const movimentacoesSalvas = JSON.parse(
      localStorage.getItem('movimentacoes') || '[]'
    );
    setMovimentacoes(movimentacoesSalvas);
  };

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

  const atualizarEstoqueProduto = (produtoId, quantidade, tipo) => {
    const produtosAtualizados = produtos.map(produto => {
      if (produto.id === produtoId) {
        const novaQuantidade = tipo === 'entrada' 
          ? produto.quantidade + quantidade
          : produto.quantidade - quantidade;
        
        return {
          ...produto,
          quantidade: Math.max(0, novaQuantidade)
        };
      }
      return produto;
    });

    localStorage.setItem('produtos', JSON.stringify(produtosAtualizados));
    setProdutos(produtosAtualizados);
  };

  const handleSubmit = () => {
    // Validações
    if (!formData.produtoId) {
      showSnackbar('Selecione um produto!', 'error');
      return;
    }

    if (!formData.tipo) {
      showSnackbar('Selecione o tipo de movimentação!', 'error');
      return;
    }

    if (!formData.quantidade || parseInt(formData.quantidade) <= 0) {
      showSnackbar('Quantidade deve ser maior que zero!', 'error');
      return;
    }

    const quantidade = parseInt(formData.quantidade);
    const produtoSelecionado = produtos.find(p => p.id === formData.produtoId);

    // Verificar se há estoque suficiente para saída
    if (formData.tipo === 'saida' && produtoSelecionado.quantidade < quantidade) {
      showSnackbar('Estoque insuficiente para esta movimentação!', 'error');
      return;
    }

    // Criar nova movimentação
    const novaMovimentacao = {
      id: Date.now(),
      produtoId: formData.produtoId,
      produtoNome: produtoSelecionado.nome,
      produtoCategoria: produtoSelecionado.categoria,
      tipo: formData.tipo,
      quantidade: quantidade,
      observacao: formData.observacao,
      dataMovimentacao: formData.dataMovimentacao,
      dataCriacao: new Date().toISOString(),
      estoqueAnterior: produtoSelecionado.quantidade,
      estoquePosterior: formData.tipo === 'entrada' 
        ? produtoSelecionado.quantidade + quantidade
        : produtoSelecionado.quantidade - quantidade
    };

    // Salvar movimentação
    const movimentacoesAtualizadas = [novaMovimentacao, ...movimentacoes];
    localStorage.setItem('movimentacoes', JSON.stringify(movimentacoesAtualizadas));
    setMovimentacoes(movimentacoesAtualizadas);

    // Atualizar estoque do produto
    atualizarEstoqueProduto(formData.produtoId, quantidade, formData.tipo);

    showSnackbar('✅ Movimentação registrada com sucesso!', 'success');
    handleClear();
  };

  const handleClear = () => {
    setFormData({
      produtoId: null,
      tipo: '',
      quantidade: '',
      observacao: '',
      dataMovimentacao: new Date().toISOString().split('T')[0]
    });
  };

  const handleDelete = (id, event) => {
    event.stopPropagation();
    
    const movimentacao = movimentacoes.find(m => m.id === id);
    
    // Reverter a movimentação no estoque
    const quantidadeReverter = movimentacao.quantidade;
    const tipoReverter = movimentacao.tipo === 'entrada' ? 'saida' : 'entrada';
    atualizarEstoqueProduto(movimentacao.produtoId, quantidadeReverter, tipoReverter);

    // Remover movimentação
    const movimentacoesAtualizadas = movimentacoes.filter(m => m.id !== id);
    localStorage.setItem('movimentacoes', JSON.stringify(movimentacoesAtualizadas));
    setMovimentacoes(movimentacoesAtualizadas);

    showSnackbar('🗑️ Movimentação excluída e estoque revertido!', 'info');
  };

  const handleOpenModal = (movimentacao) => {
    setMovimentacaoSelecionada(movimentacao);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setMovimentacaoSelecionada(null);
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

  const formatarDataSimples = (dataISO) => {
    if (!dataISO) return 'Data não disponível';
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR');
  };

  // Calcular estatísticas
  const totalEntradas = movimentacoes
    .filter(m => m.tipo === 'entrada')
    .reduce((acc, m) => acc + m.quantidade, 0);

  const totalSaidas = movimentacoes
    .filter(m => m.tipo === 'saida')
    .reduce((acc, m) => acc + m.quantidade, 0);

  const saldoTotal = produtos.reduce((acc, p) => acc + p.quantidade, 0);

  return (
    <PageContainer>
      <FormContainer>
        {/* Cards de Estatísticas */}
        <StatsContainer>
          <StatCard bgColor="#4caf50">
            <TrendingUpOutlined sx={{ fontSize: 40, color: 'white', mb: 1 }} />
            <StatValue>{totalEntradas}</StatValue>
            <StatLabel>Total Entradas</StatLabel>
          </StatCard>

          <StatCard bgColor="#f44336">
            <TrendingDownOutlined sx={{ fontSize: 40, color: 'white', mb: 1 }} />
            <StatValue>{totalSaidas}</StatValue>
            <StatLabel>Total Saídas</StatLabel>
          </StatCard>

          <StatCard bgColor="#667eea">
            <InventoryOutlined sx={{ fontSize: 40, color: 'white', mb: 1 }} />
            <StatValue>{saldoTotal}</StatValue>
            <StatLabel>Saldo em Estoque</StatLabel>
          </StatCard>
        </StatsContainer>

        <Card>
          <CardHeader>
            <InventoryOutlined sx={{ fontSize: 40, mb: 1 }} />
            <h1>Movimentações de Estoque</h1>
            <p>Registre entradas e saídas de produtos</p>
          </CardHeader>
          
          <CardContent>
            {/* Formulário de Movimentação */}
            <FormSection>
              <SectionTitle>
                <InventoryOutlined sx={{ mr: 1 }} />
                Nova Movimentação
              </SectionTitle>
              
              <Box sx={{ mb: 3 }}>
                <Autocomplete
                  options={produtos}
                  getOptionLabel={(option) => option.nome}
                  value={produtos.find(p => p.id === formData.produtoId) || null}
                  onChange={(event, newValue) => {
                    handleChange('produtoId', newValue ? newValue.id : null);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecione o Produto"
                      variant="outlined"
                      required
                      placeholder="Digite para buscar..."
                    />
                  )}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <Box>
                        <Typography variant="body1">{option.nome}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          Estoque atual: {option.quantidade} | Categoria: {option.categoria}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                />
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
                <TextField
                  fullWidth
                  select
                  label="Tipo de Movimentação"
                  variant="outlined"
                  required
                  value={formData.tipo}
                  onChange={(e) => handleChange('tipo', e.target.value)}
                >
                  <MenuItem value="">
                    <em>Selecione o tipo</em>
                  </MenuItem>
                  <MenuItem value="entrada">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TrendingUpOutlined sx={{ color: '#4caf50' }} />
                      Entrada
                    </Box>
                  </MenuItem>
                  <MenuItem value="saida">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TrendingDownOutlined sx={{ color: '#f44336' }} />
                      Saída
                    </Box>
                  </MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  label="Quantidade"
                  variant="outlined"
                  required
                  type="number"
                  value={formData.quantidade}
                  onChange={(e) => handleChange('quantidade', e.target.value)}
                  placeholder="0"
                  inputProps={{ min: '1' }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Data da Movimentação"
                  variant="outlined"
                  type="date"
                  value={formData.dataMovimentacao}
                  onChange={(e) => handleChange('dataMovimentacao', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Observação"
                  variant="outlined"
                  multiline
                  rows={3}
                  value={formData.observacao}
                  onChange={(e) => handleChange('observacao', e.target.value)}
                  placeholder="Informações adicionais sobre a movimentação..."
                />
              </Box>
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
                Registrar Movimentação
              </Button>
            </ButtonGroup>

            {/* Lista de Movimentações */}
            {movimentacoes.length > 0 && (
              <Box sx={{ marginTop: 5 }}>
                <SectionTitle>
                  📋 Histórico de Movimentações ({movimentacoes.length})
                </SectionTitle>
                
                <MovimentacaoList>
                  {movimentacoes.map((mov) => (
                    <MovimentacaoCard 
                      key={mov.id}
                      onClick={() => handleOpenModal(mov)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                        {mov.tipo === 'entrada' ? (
                          <TrendingUpOutlined 
                            sx={{ fontSize: 40, color: '#4caf50' }} 
                          />
                        ) : (
                          <TrendingDownOutlined 
                            sx={{ fontSize: 40, color: '#f44336' }} 
                          />
                        )}
                        
                        <MovimentacaoInfo>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                            {mov.produtoNome}
                          </Typography>
                          
                          <MovimentacaoMeta>
                            <TipoChip tipo={mov.tipo}>
                              {mov.tipo === 'entrada' ? '↑ ENTRADA' : '↓ SAÍDA'}
                            </TipoChip>
                            <Chip 
                              label={`${mov.quantidade} unidades`}
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                            <Chip 
                              label={formatarDataSimples(mov.dataMovimentacao)}
                              size="small"
                              variant="outlined"
                            />
                          </MovimentacaoMeta>
                        </MovimentacaoInfo>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenModal(mov);
                          }}
                          color="primary"
                          sx={{ '&:hover': { background: 'rgba(102, 126, 234, 0.1)' }}}
                        >
                          <VisibilityOutlined />
                        </IconButton>
                        
                        <IconButton 
                          onClick={(e) => handleDelete(mov.id, e)}
                          color="error"
                          sx={{ '&:hover': { background: 'rgba(244, 67, 54, 0.1)' }}}
                        >
                          <DeleteOutline />
                        </IconButton>
                      </Box>
                    </MovimentacaoCard>
                  ))}
                </MovimentacaoList>
              </Box>
            )}
          </CardContent>
        </Card>
      </FormContainer>

      {/* Modal de Detalhes da Movimentação */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: '16px', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)' }
        }}
      >
        {movimentacaoSelecionada && (
          <>
            <DialogTitle
              sx={{
                background: movimentacaoSelecionada.tipo === 'entrada'
                  ? 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)'
                  : 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {movimentacaoSelecionada.tipo === 'entrada' ? (
                  <TrendingUpOutlined sx={{ fontSize: 32 }} />
                ) : (
                  <TrendingDownOutlined sx={{ fontSize: 32 }} />
                )}
                <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
                  {movimentacaoSelecionada.tipo === 'entrada' ? 'Entrada' : 'Saída'} de Estoque
                </Typography>
              </Box>
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
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', mb: 2 }}>
                {movimentacaoSelecionada.produtoNome}
              </Typography>

              <Chip 
                label={movimentacaoSelecionada.produtoCategoria}
                color="primary"
                sx={{ mb: 3, fontWeight: 600 }}
              />

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: 'grid', gap: 2.5 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                    Quantidade Movimentada
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                    {movimentacaoSelecionada.quantidade} unidades
                  </Typography>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                      Estoque Anterior
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#666' }}>
                      {movimentacaoSelecionada.estoqueAnterior}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                      Estoque Posterior
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        color: movimentacaoSelecionada.tipo === 'entrada' ? '#4caf50' : '#f44336'
                      }}
                    >
                      {movimentacaoSelecionada.estoquePosterior}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                    Data da Movimentação
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {formatarDataSimples(movimentacaoSelecionada.dataMovimentacao)}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                    Registrado em
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {formatarData(movimentacaoSelecionada.dataCriacao)}
                  </Typography>
                </Box>

                {movimentacaoSelecionada.observacao && (
                  <Box>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 1 }}>
                      Observação
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#666',
                        padding: 2,
                        background: '#f9f9f9',
                        borderRadius: '8px',
                        borderLeft: '4px solid #667eea'
                      }}
                    >
                      {movimentacaoSelecionada.observacao}
                    </Typography>
                  </Box>
                )}
              </Box>
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

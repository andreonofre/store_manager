import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  Snackbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import {
  SaveOutlined,
  ClearOutlined,
  BusinessOutlined,
  EditOutlined,
  DeleteOutlined,
  PrintOutlined,
  PictureAsPdfOutlined,
  DescriptionOutlined,
  FilterListOutlined,
  PhoneOutlined,
  EmailOutlined,
  LocationOnOutlined,
  PersonOutlined,
  StoreOutlined
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
  TableContainer as StyledTableContainer,
  TableHeader,
  FilterContainer,
  ActionButtons,
  EmptyState,
  PrintContainer,
  PrintHeader,
  PrintTable
} from './fornecedoresStyle';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function Fornecedores() {
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    nomeAgente: '',
    cnpj: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    observacoes: ''
  });

  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorEditando, setFornecedorEditando] = useState(null);
  const [usuarioLogado, setUsuarioLogado] = useState('');
  const [filtros, setFiltros] = useState({
    dataInicio: '',
    dataFim: '',
    busca: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const printRef = useRef();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setUsuarioLogado(email);
    } else {
      setUsuarioLogado('Usuário não identificado');
    }

    // Carregar fornecedores do localStorage
    carregarFornecedores();
  }, []);

  const carregarFornecedores = () => {
    const fornecedoresSalvos = JSON.parse(localStorage.getItem('fornecedores') || '[]');
    setFornecedores(fornecedoresSalvos);
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

  // Validação de CNPJ
  const validarCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]/g, '');
    
    if (cnpj.length !== 14) return false;
    
    // Elimina CNPJs inválidos conhecidos
    if (/^(\d)\1{13}$/.test(cnpj)) return false;

    // Validação dos dígitos verificadores
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
  };

  // Formatação de CNPJ
  const formatarCNPJ = (cnpj) => {
    return cnpj
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatarTelefone = (telefone) => {
    return telefone
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const handleSubmit = () => {
    // Validações
    if (!formData.nomeEmpresa.trim()) {
      showSnackbar('Nome da empresa é obrigatório!', 'error');
      return;
    }

    if (!formData.nomeAgente.trim()) {
      showSnackbar('Nome do agente é obrigatório!', 'error');
      return;
    }

    if (!formData.cnpj.trim()) {
      showSnackbar('CNPJ é obrigatório!', 'error');
      return;
    }

    if (!validarCNPJ(formData.cnpj)) {
      showSnackbar('CNPJ inválido!', 'error');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      showSnackbar('Email inválido!', 'error');
      return;
    }

    if (!formData.telefone.trim()) {
      showSnackbar('Telefone é obrigatório!', 'error');
      return;
    }

    if (!formData.cidade.trim()) {
      showSnackbar('Cidade é obrigatória!', 'error');
      return;
    }

    const fornecedoresExistentes = JSON.parse(localStorage.getItem('fornecedores') || '[]');

    if (fornecedorEditando) {
      // Atualizar fornecedor existente
      const fornecedoresAtualizados = fornecedoresExistentes.map(fornecedor =>
        fornecedor.id === fornecedorEditando.id
          ? {
              ...formData,
              id: fornecedorEditando.id,
              atualizadoPor: usuarioLogado,
              dataAtualizacao: new Date().toISOString()
            }
          : fornecedor
      );

      localStorage.setItem('fornecedores', JSON.stringify(fornecedoresAtualizados));
      showSnackbar('✅ Fornecedor atualizado com sucesso!', 'success');
      setFornecedorEditando(null);
    } else {
      // Verificar se CNPJ já existe
      const cnpjExiste = fornecedoresExistentes.some(
        f => f.cnpj.replace(/\D/g, '') === formData.cnpj.replace(/\D/g, '')
      );

      if (cnpjExiste) {
        showSnackbar('Já existe um fornecedor com este CNPJ!', 'error');
        return;
      }

      // Criar novo fornecedor
      const novoFornecedor = {
        id: Date.now(),
        ...formData,
        cadastradoPor: usuarioLogado,
        dataCadastro: new Date().toISOString()
      };

      const fornecedoresAtualizados = [...fornecedoresExistentes, novoFornecedor];
      localStorage.setItem('fornecedores', JSON.stringify(fornecedoresAtualizados));
      showSnackbar('✅ Fornecedor cadastrado com sucesso!', 'success');
    }

    handleClear();
    carregarFornecedores();
  };

  const handleClear = () => {
    setFormData({
      nomeEmpresa: '',
      nomeAgente: '',
      cnpj: '',
      email: '',
      telefone: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      observacoes: ''
    });
    setFornecedorEditando(null);
  };

  const handleEdit = (fornecedor) => {
    setFormData({
      nomeEmpresa: fornecedor.nomeEmpresa,
      nomeAgente: fornecedor.nomeAgente,
      cnpj: fornecedor.cnpj,
      email: fornecedor.email,
      telefone: fornecedor.telefone,
      endereco: fornecedor.endereco,
      cidade: fornecedor.cidade,
      estado: fornecedor.estado,
      cep: fornecedor.cep,
      observacoes: fornecedor.observacoes
    });
    setFornecedorEditando(fornecedor);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este fornecedor?')) {
      const fornecedoresAtualizados = fornecedores.filter(f => f.id !== id);
      localStorage.setItem('fornecedores', JSON.stringify(fornecedoresAtualizados));
      setFornecedores(fornecedoresAtualizados);
      showSnackbar('Fornecedor excluído com sucesso!', 'success');
    }
  };

  const fornecedoresFiltrados = fornecedores.filter(fornecedor => {
    const { dataInicio, dataFim, busca } = filtros;
    const dataCadastro = new Date(fornecedor.dataCadastro);

    // Filtro por período
    if (dataInicio && dataCadastro < new Date(dataInicio)) return false;
    if (dataFim && dataCadastro > new Date(dataFim)) return false;

    // Filtro por busca
    if (busca) {
      const buscaLower = busca.toLowerCase();
      return (
        fornecedor.nomeEmpresa.toLowerCase().includes(buscaLower) ||
        fornecedor.nomeAgente.toLowerCase().includes(buscaLower) ||
        fornecedor.cnpj.includes(busca) ||
        fornecedor.email.toLowerCase().includes(buscaLower) ||
        fornecedor.cidade.toLowerCase().includes(buscaLower)
      );
    }

    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF('l', 'mm', 'a4');
    
    // Configurar fonte
    doc.setFont('helvetica');
    
    // Cabeçalho do documento
    doc.setFillColor(102, 126, 234);
    doc.rect(0, 0, 297, 35, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('RELATÓRIO DE FORNECEDORES', 148.5, 15, { align: 'center' });
    
    doc.setFontSize(11);
    doc.text(`Sistema de Gerenciamento`, 148.5, 22, { align: 'center' });
    
    // Informações do relatório
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 43);
    doc.text(`Usuário: ${usuarioLogado}`, 14, 48);
    doc.text(`Total de fornecedores: ${fornecedoresFiltrados.length}`, 14, 53);
    
    if (filtros.dataInicio || filtros.dataFim) {
      let filtroTexto = 'Período: ';
      if (filtros.dataInicio) filtroTexto += `${new Date(filtros.dataInicio).toLocaleDateString('pt-BR')}`;
      if (filtros.dataInicio && filtros.dataFim) filtroTexto += ' até ';
      if (filtros.dataFim) filtroTexto += `${new Date(filtros.dataFim).toLocaleDateString('pt-BR')}`;
      doc.text(filtroTexto, 200, 43);
    }

    if (fornecedoresFiltrados.length > 0) {
      // Preparar dados da tabela
      const tableData = fornecedoresFiltrados.map((fornecedor, index) => [
        index + 1,
        fornecedor.nomeEmpresa,
        fornecedor.nomeAgente,
        formatarCNPJ(fornecedor.cnpj),
        fornecedor.email,
        formatarTelefone(fornecedor.telefone),
        fornecedor.cidade,
        new Date(fornecedor.dataCadastro).toLocaleDateString('pt-BR')
      ]);

      // Criar tabela com autoTable
      autoTable(doc, {
        head: [['#', 'Empresa', 'Agente', 'CNPJ', 'Email', 'Telefone', 'Cidade', 'Cadastro']],
        body: tableData,
        startY: 60,
        theme: 'grid',
        headStyles: {
          fillColor: [102, 126, 234],
          textColor: 255,
          fontStyle: 'bold',
          halign: 'center',
          fontSize: 10
        },
        bodyStyles: {
          fontSize: 9,
          cellPadding: 3
        },
        alternateRowStyles: {
          fillColor: [245, 245, 250]
        },
        columnStyles: {
          0: { cellWidth: 10, halign: 'center' },
          1: { cellWidth: 45 },
          2: { cellWidth: 40 },
          3: { cellWidth: 35, halign: 'center' },
          4: { cellWidth: 50 },
          5: { cellWidth: 28, halign: 'center' },
          6: { cellWidth: 30 },
          7: { cellWidth: 22, halign: 'center' }
        },
        margin: { left: 14, right: 14 }
      });
    } else {
      // Mensagem quando não há fornecedores
      doc.setFontSize(14);
      doc.setTextColor(150, 150, 150);
      doc.text('Não possui fornecedores cadastrados', 148.5, 100, { align: 'center' });
      
      doc.setFontSize(10);
      doc.text('Cadastre o primeiro fornecedor ou ajuste os filtros de busca', 148.5, 110, { align: 'center' });
    }
    
    // Rodapé
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Página ${i} de ${pageCount}`,
        148.5,
        200,
        { align: 'center' }
      );
    }

    doc.save(`relatorio_fornecedores_${new Date().getTime()}.pdf`);
    showSnackbar('✅ PDF exportado com sucesso!', 'success');
  };

  const handleExportExcel = () => {
    if (fornecedoresFiltrados.length === 0) {
      showSnackbar('Não há fornecedores para exportar!', 'warning');
      return;
    }

    const dadosExcel = fornecedoresFiltrados.map((fornecedor, index) => ({
      '#': index + 1,
      'Nome da Empresa': fornecedor.nomeEmpresa,
      'Nome do Agente': fornecedor.nomeAgente,
      'CNPJ': formatarCNPJ(fornecedor.cnpj),
      'Email': fornecedor.email,
      'Telefone': formatarTelefone(fornecedor.telefone),
      'Endereço': fornecedor.endereco,
      'Cidade': fornecedor.cidade,
      'Estado': fornecedor.estado,
      'CEP': fornecedor.cep,
      'Observações': fornecedor.observacoes || '-',
      'Data de Cadastro': new Date(fornecedor.dataCadastro).toLocaleString('pt-BR'),
      'Cadastrado Por': fornecedor.cadastradoPor
    }));

    const worksheet = XLSX.utils.json_to_sheet(dadosExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Fornecedores');

    // Ajustar largura das colunas
    const colWidths = [
      { wch: 5 },  // #
      { wch: 35 }, // Nome Empresa
      { wch: 30 }, // Nome Agente
      { wch: 20 }, // CNPJ
      { wch: 30 }, // Email
      { wch: 15 }, // Telefone
      { wch: 40 }, // Endereço
      { wch: 20 }, // Cidade
      { wch: 10 }, // Estado
      { wch: 12 }, // CEP
      { wch: 40 }, // Observações
      { wch: 18 }, // Data Cadastro
      { wch: 25 }  // Cadastrado Por
    ];
    worksheet['!cols'] = colWidths;

    XLSX.writeFile(workbook, `fornecedores_${new Date().getTime()}.xlsx`);
    showSnackbar('✅ Excel exportado com sucesso!', 'success');
  };

  return (
    <>
      <PageContainer className="no-print">
        <FormContainer>
          <Card>
            <CardHeader>
              <BusinessOutlined sx={{ fontSize: 40, mb: 1 }} />
              <h1>{fornecedorEditando ? 'Editar Fornecedor' : 'Cadastro de Fornecedores'}</h1>
              <p>Gerencie sua rede de fornecedores</p>
            </CardHeader>

            <CardContent>
              {/* Usuário Logado */}
              <Alert
                severity="info"
                icon={<StoreOutlined />}
                sx={{ mb: 3, borderRadius: '12px' }}
              >
                {fornecedorEditando ? 'Editando fornecedor' : 'Cadastrando'} como: <strong>{usuarioLogado}</strong>
              </Alert>

              {/* Informações da Empresa */}
              <FormSection>
                <SectionTitle>
                  <BusinessOutlined sx={{ mr: 1 }} />
                  Informações da Empresa
                </SectionTitle>

                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Nome da Empresa"
                    variant="outlined"
                    required
                    value={formData.nomeEmpresa}
                    onChange={(e) => handleChange('nomeEmpresa', e.target.value)}
                    placeholder="Ex: Distribuidora XYZ Ltda"
                  />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Nome do Agente/Representante"
                    variant="outlined"
                    required
                    value={formData.nomeAgente}
                    onChange={(e) => handleChange('nomeAgente', e.target.value)}
                    placeholder="Ex: João Silva"
                    InputProps={{
                      startAdornment: <PersonOutlined sx={{ mr: 1, color: '#999' }} />
                    }}
                  />

                  <TextField
                    fullWidth
                    label="CNPJ"
                    variant="outlined"
                    required
                    value={formData.cnpj}
                    onChange={(e) => handleChange('cnpj', formatarCNPJ(e.target.value))}
                    placeholder="00.000.000/0000-00"
                    inputProps={{ maxLength: 18 }}
                  />
                </Box>
              </FormSection>

              {/* Informações de Contato */}
              <FormSection>
                <SectionTitle>
                  <PhoneOutlined sx={{ mr: 1 }} />
                  Informações de Contato
                </SectionTitle>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="contato@empresa.com"
                    InputProps={{
                      startAdornment: <EmailOutlined sx={{ mr: 1, color: '#999' }} />
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Telefone"
                    variant="outlined"
                    required
                    value={formData.telefone}
                    onChange={(e) => handleChange('telefone', formatarTelefone(e.target.value))}
                    placeholder="(00) 00000-0000"
                    inputProps={{ maxLength: 15 }}
                    InputProps={{
                      startAdornment: <PhoneOutlined sx={{ mr: 1, color: '#999' }} />
                    }}
                  />
                </Box>
              </FormSection>

              {/* Endereço */}
              <FormSection>
                <SectionTitle>
                  <LocationOnOutlined sx={{ mr: 1 }} />
                  Endereço
                </SectionTitle>

                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Endereço Completo"
                    variant="outlined"
                    value={formData.endereco}
                    onChange={(e) => handleChange('endereco', e.target.value)}
                    placeholder="Rua, número, bairro"
                  />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 3, mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Cidade"
                    variant="outlined"
                    required
                    value={formData.cidade}
                    onChange={(e) => handleChange('cidade', e.target.value)}
                    placeholder="Ex: São Paulo"
                  />

                  <TextField
                    fullWidth
                    label="Estado"
                    variant="outlined"
                    value={formData.estado}
                    onChange={(e) => handleChange('estado', e.target.value.toUpperCase())}
                    placeholder="UF"
                    inputProps={{ maxLength: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="CEP"
                    variant="outlined"
                    value={formData.cep}
                    onChange={(e) => handleChange('cep', e.target.value.replace(/\D/g, ''))}
                    placeholder="00000-000"
                    inputProps={{ maxLength: 8 }}
                  />
                </Box>

                <Box>
                  <TextField
                    fullWidth
                    label="Observações"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={formData.observacoes}
                    onChange={(e) => handleChange('observacoes', e.target.value)}
                    placeholder="Informações adicionais sobre o fornecedor..."
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
                  {fornecedorEditando ? 'Atualizar Fornecedor' : 'Cadastrar Fornecedor'}
                </Button>
              </ButtonGroup>
            </CardContent>
          </Card>

          {/* Tabela de Fornecedores */}
          <StyledTableContainer>
            <TableHeader>
              <h2>
                <StoreOutlined sx={{ mr: 1, verticalAlign: 'middle' }} />
                Lista de Fornecedores
              </h2>
              <Chip
                label={`${fornecedoresFiltrados.length} fornecedor(es)`}
                sx={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 600
                }}
              />
            </TableHeader>

            {/* Filtros */}
            <FilterContainer>
              <FilterListOutlined sx={{ color: '#667eea' }} />
              <TextField
                label="Buscar"
                variant="outlined"
                size="small"
                value={filtros.busca}
                onChange={(e) => setFiltros({ ...filtros, busca: e.target.value })}
                placeholder="Empresa, Agente, CNPJ, Email ou Cidade"
                sx={{ flexGrow: 1, maxWidth: 400 }}
              />

              <TextField
                label="Data Início"
                variant="outlined"
                size="small"
                type="date"
                value={filtros.dataInicio}
                onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
                InputLabelProps={{ shrink: true }}
                sx={{ width: 180 }}
              />

              <TextField
                label="Data Fim"
                variant="outlined"
                size="small"
                type="date"
                value={filtros.dataFim}
                onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
                InputLabelProps={{ shrink: true }}
                sx={{ width: 180 }}
              />

              <ActionButtons>
                <Button
                  variant="contained"
                  startIcon={<PrintOutlined />}
                  onClick={handlePrint}
                  sx={{
                    background: '#43a047',
                    '&:hover': { background: '#2e7d32' }
                  }}
                >
                  Imprimir
                </Button>

                <Button
                  variant="contained"
                  startIcon={<PictureAsPdfOutlined />}
                  onClick={handleExportPDF}
                  sx={{
                    background: '#e53935',
                    '&:hover': { background: '#c62828' }
                  }}
                >
                  PDF
                </Button>

                <Button
                  variant="contained"
                  startIcon={<DescriptionOutlined />}
                  onClick={handleExportExcel}
                  sx={{
                    background: '#1e88e5',
                    '&:hover': { background: '#1565c0' }
                  }}
                >
                  Excel
                </Button>
              </ActionButtons>
            </FilterContainer>

            {/* Tabela */}
            {fornecedoresFiltrados.length > 0 ? (
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: '#f8f9fa' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Empresa</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Agente</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>CNPJ</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Telefone</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Cidade</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Cadastro</TableCell>
                      <TableCell sx={{ fontWeight: 600 }} align="center">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fornecedoresFiltrados.map((fornecedor) => (
                      <TableRow
                        key={fornecedor.id}
                        sx={{ '&:hover': { background: '#f8f9fa' } }}
                      >
                        <TableCell>{fornecedor.nomeEmpresa}</TableCell>
                        <TableCell>{fornecedor.nomeAgente}</TableCell>
                        <TableCell>{formatarCNPJ(fornecedor.cnpj)}</TableCell>
                        <TableCell>{fornecedor.email}</TableCell>
                        <TableCell>{formatarTelefone(fornecedor.telefone)}</TableCell>
                        <TableCell>{fornecedor.cidade}</TableCell>
                        <TableCell>
                          {new Date(fornecedor.dataCadastro).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Editar">
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(fornecedor)}
                              sx={{ color: '#1e88e5' }}
                            >
                              <EditOutlined />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Excluir">
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(fornecedor.id)}
                              sx={{ color: '#e53935' }}
                            >
                              <DeleteOutlined />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <EmptyState>
                <StoreOutlined />
                <h3>Nenhum fornecedor encontrado</h3>
                <p>Cadastre o primeiro fornecedor ou ajuste os filtros</p>
              </EmptyState>
            )}
          </StyledTableContainer>
        </FormContainer>
      </PageContainer>

      {/* Área de Impressão */}
      <PrintContainer ref={printRef}>
        <PrintHeader>
          <h1>RELATÓRIO DE FORNECEDORES</h1>
          <p><strong>Sistema de Gerenciamento</strong></p>
          <p>Gerado em: {new Date().toLocaleString('pt-BR')}</p>
          <p>Usuário: {usuarioLogado}</p>
          <p>Total de fornecedores: {fornecedoresFiltrados.length}</p>
        </PrintHeader>

        {fornecedoresFiltrados.length > 0 ? (
          <PrintTable>
            <thead>
              <tr>
                <th>#</th>
                <th>Empresa</th>
                <th>Agente</th>
                <th>CNPJ</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Cidade</th>
                <th>Cadastro</th>
              </tr>
            </thead>
            <tbody>
              {fornecedoresFiltrados.map((fornecedor, index) => (
                <tr key={fornecedor.id}>
                  <td>{index + 1}</td>
                  <td>{fornecedor.nomeEmpresa}</td>
                  <td>{fornecedor.nomeAgente}</td>
                  <td>{formatarCNPJ(fornecedor.cnpj)}</td>
                  <td>{fornecedor.email}</td>
                  <td>{formatarTelefone(fornecedor.telefone)}</td>
                  <td>{fornecedor.cidade}</td>
                  <td>{new Date(fornecedor.dataCadastro).toLocaleDateString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </PrintTable>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
            <h3>Não possui fornecedores cadastrados</h3>
            <p>Cadastre o primeiro fornecedor ou ajuste os filtros de busca</p>
          </div>
        )}
      </PrintContainer>

      {/* Snackbar */}
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

      {/* Estilos para impressão */}
      <style>
        {`
          @media print {
            .no-print {
              display: none !important;
            }
            
            body * {
              visibility: hidden;
            }
            
            ${PrintContainer}, ${PrintContainer} * {
              visibility: visible;
            }
            
            ${PrintContainer} {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
}

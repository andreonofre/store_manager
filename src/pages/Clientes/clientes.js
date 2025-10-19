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
  PersonAddOutlined,
  PeopleOutlined,
  EditOutlined,
  DeleteOutlined,
  PrintOutlined,
  PictureAsPdfOutlined,
  DescriptionOutlined,
  FilterListOutlined,
  PhoneOutlined,
  EmailOutlined,
  LocationOnOutlined,
  CakeOutlined
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
} from './clientesStyle';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function Clientes() {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cpf: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: ''
  });

  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);
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

    // Carregar clientes do localStorage
    carregarClientes();
  }, []);

  const carregarClientes = () => {
    const clientesSalvos = JSON.parse(localStorage.getItem('clientes') || '[]');
    setClientes(clientesSalvos);
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

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return false;
    
    // Validação básica de CPF
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    return true;
  };

  const formatarCPF = (cpf) => {
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatarTelefone = (telefone) => {
    return telefone
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    return idade;
  };

  const handleSubmit = () => {
    // Validações
    if (!formData.nomeCompleto.trim()) {
      showSnackbar('Nome completo é obrigatório!', 'error');
      return;
    }

    if (!formData.cpf.trim()) {
      showSnackbar('CPF é obrigatório!', 'error');
      return;
    }

    if (!validarCPF(formData.cpf)) {
      showSnackbar('CPF inválido!', 'error');
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

    if (!formData.dataNascimento) {
      showSnackbar('Data de nascimento é obrigatória!', 'error');
      return;
    }

    if (!formData.cidade.trim()) {
      showSnackbar('Cidade é obrigatória!', 'error');
      return;
    }

    const clientesExistentes = JSON.parse(localStorage.getItem('clientes') || '[]');

    if (clienteEditando) {
      // Atualizar cliente existente
      const clientesAtualizados = clientesExistentes.map(cliente =>
        cliente.id === clienteEditando.id
          ? {
              ...formData,
              id: clienteEditando.id,
              idade: calcularIdade(formData.dataNascimento),
              atualizadoPor: usuarioLogado,
              dataAtualizacao: new Date().toISOString()
            }
          : cliente
      );

      localStorage.setItem('clientes', JSON.stringify(clientesAtualizados));
      showSnackbar('✅ Cliente atualizado com sucesso!', 'success');
      setClienteEditando(null);
    } else {
      // Verificar se CPF já existe
      const cpfExiste = clientesExistentes.some(
        c => c.cpf.replace(/\D/g, '') === formData.cpf.replace(/\D/g, '')
      );

      if (cpfExiste) {
        showSnackbar('Já existe um cliente com este CPF!', 'error');
        return;
      }

      // Criar novo cliente
      const novoCliente = {
        id: Date.now(),
        ...formData,
        idade: calcularIdade(formData.dataNascimento),
        cadastradoPor: usuarioLogado,
        dataCadastro: new Date().toISOString()
      };

      const clientesAtualizados = [...clientesExistentes, novoCliente];
      localStorage.setItem('clientes', JSON.stringify(clientesAtualizados));
      showSnackbar('✅ Cliente cadastrado com sucesso!', 'success');
    }

    handleClear();
    carregarClientes();
  };

  const handleClear = () => {
    setFormData({
      nomeCompleto: '',
      cpf: '',
      email: '',
      telefone: '',
      dataNascimento: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: ''
    });
    setClienteEditando(null);
  };

  const handleEdit = (cliente) => {
    setFormData({
      nomeCompleto: cliente.nomeCompleto,
      cpf: cliente.cpf,
      email: cliente.email,
      telefone: cliente.telefone,
      dataNascimento: cliente.dataNascimento,
      endereco: cliente.endereco,
      cidade: cliente.cidade,
      estado: cliente.estado,
      cep: cliente.cep
    });
    setClienteEditando(cliente);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      const clientesAtualizados = clientes.filter(c => c.id !== id);
      localStorage.setItem('clientes', JSON.stringify(clientesAtualizados));
      setClientes(clientesAtualizados);
      showSnackbar('Cliente excluído com sucesso!', 'success');
    }
  };

  const clientesFiltrados = clientes.filter(cliente => {
    const { dataInicio, dataFim, busca } = filtros;
    const dataCadastro = new Date(cliente.dataCadastro);

    // Filtro por período
    if (dataInicio && dataCadastro < new Date(dataInicio)) return false;
    if (dataFim && dataCadastro > new Date(dataFim)) return false;

    // Filtro por busca
    if (busca) {
      const buscaLower = busca.toLowerCase();
      return (
        cliente.nomeCompleto.toLowerCase().includes(buscaLower) ||
        cliente.cpf.includes(busca) ||
        cliente.email.toLowerCase().includes(buscaLower) ||
        cliente.cidade.toLowerCase().includes(buscaLower)
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
    doc.text('RELATÓRIO DE CLIENTES', 148.5, 15, { align: 'center' });
    
    doc.setFontSize(11);
    doc.text(`Sistema de Gerenciamento`, 148.5, 22, { align: 'center' });
    
    // Informações do relatório
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 43);
    doc.text(`Usuário: ${usuarioLogado}`, 14, 48);
    doc.text(`Total de clientes: ${clientesFiltrados.length}`, 14, 53);
    
    if (filtros.dataInicio || filtros.dataFim) {
      let filtroTexto = 'Período: ';
      if (filtros.dataInicio) filtroTexto += `${new Date(filtros.dataInicio).toLocaleDateString('pt-BR')}`;
      if (filtros.dataInicio && filtros.dataFim) filtroTexto += ' até ';
      if (filtros.dataFim) filtroTexto += `${new Date(filtros.dataFim).toLocaleDateString('pt-BR')}`;
      doc.text(filtroTexto, 200, 43);
    }

    if (clientesFiltrados.length > 0) {
      // Preparar dados da tabela
      const tableData = clientesFiltrados.map((cliente, index) => [
        index + 1,
        cliente.nomeCompleto,
        formatarCPF(cliente.cpf),
        cliente.email,
        formatarTelefone(cliente.telefone),
        `${cliente.idade} anos`,
        cliente.cidade,
        new Date(cliente.dataCadastro).toLocaleDateString('pt-BR')
      ]);

      // Criar tabela com autoTable
      autoTable(doc, {
        head: [['#', 'Nome Completo', 'CPF', 'Email', 'Telefone', 'Idade', 'Cidade', 'Cadastro']],
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
          1: { cellWidth: 50 },
          2: { cellWidth: 30, halign: 'center' },
          3: { cellWidth: 50 },
          4: { cellWidth: 30, halign: 'center' },
          5: { cellWidth: 20, halign: 'center' },
          6: { cellWidth: 35 },
          7: { cellWidth: 25, halign: 'center' }
        },
        margin: { left: 14, right: 14 }
      });
    } else {
      // Mensagem quando não há clientes
      doc.setFontSize(14);
      doc.setTextColor(150, 150, 150);
      doc.text('Não possui clientes cadastrados', 148.5, 100, { align: 'center' });
      
      doc.setFontSize(10);
      doc.text('Cadastre o primeiro cliente ou ajuste os filtros de busca', 148.5, 110, { align: 'center' });
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

    doc.save(`relatorio_clientes_${new Date().getTime()}.pdf`);
    showSnackbar('✅ PDF exportado com sucesso!', 'success');
  };

  const handleExportExcel = () => {
    if (clientesFiltrados.length === 0) {
      showSnackbar('Não há clientes para exportar!', 'warning');
      return;
    }

    const dadosExcel = clientesFiltrados.map((cliente, index) => ({
      '#': index + 1,
      'Nome Completo': cliente.nomeCompleto,
      'CPF': formatarCPF(cliente.cpf),
      'Email': cliente.email,
      'Telefone': formatarTelefone(cliente.telefone),
      'Data de Nascimento': new Date(cliente.dataNascimento).toLocaleDateString('pt-BR'),
      'Idade': cliente.idade,
      'Endereço': cliente.endereco,
      'Cidade': cliente.cidade,
      'Estado': cliente.estado,
      'CEP': cliente.cep,
      'Data de Cadastro': new Date(cliente.dataCadastro).toLocaleString('pt-BR'),
      'Cadastrado Por': cliente.cadastradoPor
    }));

    const worksheet = XLSX.utils.json_to_sheet(dadosExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');

    // Ajustar largura das colunas
    const colWidths = [
      { wch: 5 },  // #
      { wch: 30 }, // Nome
      { wch: 15 }, // CPF
      { wch: 30 }, // Email
      { wch: 15 }, // Telefone
      { wch: 15 }, // Data Nascimento
      { wch: 8 },  // Idade
      { wch: 40 }, // Endereço
      { wch: 20 }, // Cidade
      { wch: 10 }, // Estado
      { wch: 12 }, // CEP
      { wch: 18 }, // Data Cadastro
      { wch: 25 }  // Cadastrado Por
    ];
    worksheet['!cols'] = colWidths;

    XLSX.writeFile(workbook, `clientes_${new Date().getTime()}.xlsx`);
    showSnackbar('✅ Excel exportado com sucesso!', 'success');
  };

  return (
    <>
      <PageContainer className="no-print">
        <FormContainer>
          <Card>
            <CardHeader>
              <PersonAddOutlined sx={{ fontSize: 40, mb: 1 }} />
              <h1>{clienteEditando ? 'Editar Cliente' : 'Cadastro de Clientes'}</h1>
              <p>Gerencie sua base de clientes</p>
            </CardHeader>

            <CardContent>
              {/* Usuário Logado */}
              <Alert
                severity="info"
                icon={<PeopleOutlined />}
                sx={{ mb: 3, borderRadius: '12px' }}
              >
                {clienteEditando ? 'Editando cliente' : 'Cadastrando'} como: <strong>{usuarioLogado}</strong>
              </Alert>

              {/* Informações Pessoais */}
              <FormSection>
                <SectionTitle>
                  <PeopleOutlined sx={{ mr: 1 }} />
                  Informações Pessoais
                </SectionTitle>

                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Nome Completo"
                    variant="outlined"
                    required
                    value={formData.nomeCompleto}
                    onChange={(e) => handleChange('nomeCompleto', e.target.value)}
                    placeholder="Ex: João Silva Santos"
                  />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
                  <TextField
                    fullWidth
                    label="CPF"
                    variant="outlined"
                    required
                    value={formData.cpf}
                    onChange={(e) => handleChange('cpf', formatarCPF(e.target.value))}
                    placeholder="000.000.000-00"
                    inputProps={{ maxLength: 14 }}
                  />

                  <TextField
                    fullWidth
                    label="Data de Nascimento"
                    variant="outlined"
                    required
                    type="date"
                    value={formData.dataNascimento}
                    onChange={(e) => handleChange('dataNascimento', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <CakeOutlined sx={{ mr: 1, color: '#999' }} />
                    }}
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
                    placeholder="exemplo@email.com"
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

                <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 3 }}>
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
                  {clienteEditando ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
                </Button>
              </ButtonGroup>
            </CardContent>
          </Card>

          {/* Tabela de Clientes */}
          <StyledTableContainer>
            <TableHeader>
              <h2>
                <PeopleOutlined sx={{ mr: 1, verticalAlign: 'middle' }} />
                Lista de Clientes
              </h2>
              <Chip
                label={`${clientesFiltrados.length} cliente(s)`}
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
                placeholder="Nome, CPF, Email ou Cidade"
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
            {clientesFiltrados.length > 0 ? (
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: '#f8f9fa' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Nome</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>CPF</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Telefone</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Idade</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Cidade</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Cadastro</TableCell>
                      <TableCell sx={{ fontWeight: 600 }} align="center">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clientesFiltrados.map((cliente) => (
                      <TableRow
                        key={cliente.id}
                        sx={{ '&:hover': { background: '#f8f9fa' } }}
                      >
                        <TableCell>{cliente.nomeCompleto}</TableCell>
                        <TableCell>{formatarCPF(cliente.cpf)}</TableCell>
                        <TableCell>{cliente.email}</TableCell>
                        <TableCell>{formatarTelefone(cliente.telefone)}</TableCell>
                        <TableCell>{cliente.idade} anos</TableCell>
                        <TableCell>{cliente.cidade}</TableCell>
                        <TableCell>
                          {new Date(cliente.dataCadastro).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Editar">
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(cliente)}
                              sx={{ color: '#1e88e5' }}
                            >
                              <EditOutlined />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Excluir">
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(cliente.id)}
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
                <PeopleOutlined />
                <h3>Nenhum cliente encontrado</h3>
                <p>Cadastre o primeiro cliente ou ajuste os filtros</p>
              </EmptyState>
            )}
          </StyledTableContainer>
        </FormContainer>
      </PageContainer>

      {/* Área de Impressão */}
      <PrintContainer ref={printRef}>
        <PrintHeader>
          <h1>RELATÓRIO DE CLIENTES</h1>
          <p><strong>Sistema de Gerenciamento</strong></p>
          <p>Gerado em: {new Date().toLocaleString('pt-BR')}</p>
          <p>Usuário: {usuarioLogado}</p>
          <p>Total de clientes: {clientesFiltrados.length}</p>
        </PrintHeader>

        {clientesFiltrados.length > 0 ? (
          <PrintTable>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Idade</th>
                <th>Cidade</th>
                <th>Cadastro</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map((cliente, index) => (
                <tr key={cliente.id}>
                  <td>{index + 1}</td>
                  <td>{cliente.nomeCompleto}</td>
                  <td>{formatarCPF(cliente.cpf)}</td>
                  <td>{cliente.email}</td>
                  <td>{formatarTelefone(cliente.telefone)}</td>
                  <td>{cliente.idade} anos</td>
                  <td>{cliente.cidade}</td>
                  <td>{new Date(cliente.dataCadastro).toLocaleDateString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </PrintTable>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
            <h3>Não possui clientes cadastrados</h3>
            <p>Cadastre o primeiro cliente ou ajuste os filtros de busca</p>
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

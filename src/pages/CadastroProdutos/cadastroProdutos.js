// // ============================================
// //   ARQUIVO: cadastroProdutos.js (ATUALIZADO)
// // ============================================

// import React, { useState, useEffect } from 'react';
// import { 
//   TextField, 
//   MenuItem, 
//   Button,
//   Box,
//   Alert,
//   Snackbar,
//   Typography
// } from '@mui/material';
// import {
//   SaveOutlined,
//   ClearOutlined,
//   ShoppingCartOutlined,
//   CategoryOutlined,
//   AttachMoneyOutlined,
//   InventoryOutlined,
//   ImageOutlined,
//   LocationOnOutlined,
//   PersonOutlined,
//   WarningOutlined
// } from '@mui/icons-material';
// import {
//   PageContainer,
//   FormContainer,
//   Card,
//   CardHeader,
//   CardContent,
//   FormSection,
//   SectionTitle,
//   ButtonGroup,
//   ImagePreviewContainer,
//   ImagePreview
// } from './cadastroProdutosStyles';

// export default function CadastroProdutos() {

//   const [formData, setFormData] = useState({
//     codigo: '',
//     nome: '',
//     descricao: '',
//     categoria: '',
//     custoUnitario: '',
//     custoLogistica: '',
//     custoMaoDeObra: '',
//     custoEmbalagem: '',
//     custoArmazem: '',
//     quantidade: '',
//     estoqueMinimo: '',
//     imagem: '',
//     corredor: '',
//     prateleira: ''
//   });


//   const [percentualLucro, setPercentualLucro] = useState('');
//   const [usuarioLogado, setUsuarioLogado] = useState('');

//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   });

//   useEffect(() => {
//     const email = localStorage.getItem('email');
//     if (email) {
//       setUsuarioLogado(email);
//     } else {
//       setUsuarioLogado('Usuário não identificado');
//     }
//   }, []);

//   const categorias = [
//     'Eletrônicos',
//     'Roupas',
//     'Alimentos',
//     'Livros',
//     'Móveis',
//     'Esportes',
//     'Beleza',
//     'Brinquedos',
//     'Ferramentas',
//     'Outros'
//   ];

//   const handleChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const showSnackbar = (message, severity = 'success') => {
//     setSnackbar({
//       open: true,
//       message,
//       severity
//     });
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar(prev => ({ ...prev, open: false }));
//   };


// // Adicione esta função para calcular o custo total
// const calcularCustoTotal = () => {
//   const custos = [
//     parseFloat(formData.custoUnitario) || 0,
//     parseFloat(formData.custoLogistica) || 0,
//     parseFloat(formData.custoMaoDeObra) || 0,
//     parseFloat(formData.custoEmbalagem) || 0,
//     parseFloat(formData.custoArmazem) || 0
//   ];
  
//   return custos.reduce((acc, valor) => acc + valor, 0);
// };



// // Adicione esta função para calcular o valor de venda
// const calcularValorVenda = () => {
//   const custoTotal = calcularCustoTotal();
//   const percentual = parseFloat(percentualLucro) || 0;
//   return custoTotal + (custoTotal * (percentual / 100));
// };

//   const handleSubmit = () => {


//     // Validações
//     // if (!formData.codigo.trim()) {
//     //   showSnackbar('Código do produto é obrigatório!', 'error');
//     //   return;
//     // }

   
//     if (!formData.nome.trim()) {
//       showSnackbar('Nome do produto é obrigatório!', 'error');
//       return;
//     }

//     if (!formData.categoria) {
//       showSnackbar('Selecione uma categoria!', 'error');
//       return;
//     }

//     if (!formData.custoUnitario || parseFloat(formData.custoUnitario) <= 0) {
//       showSnackbar('Preço deve ser maior que zero!', 'error');
//       return;
//     }

//     if (!formData.custoLogistica || parseFloat(formData.custoLogistica) <= 0) {
//       showSnackbar('Preço deve ser maior que zero!', 'error');
//       return;
//     }

//     if (!formData.custoMaoDeObra || parseFloat(formData.custoMaoDeObra) <= 0) {
//       showSnackbar('Preço deve ser maior que zero!', 'error');
//       return;
//     }

//       if (!formData.custoEmbalagem || parseFloat(formData.custoEmbalagem) <= 0) {
//       showSnackbar('Preço deve ser maior que zero!', 'error');
//       return;
//     }

//     if (!formData.custoArmazem || parseFloat(formData.custoArmazem) <= 0) {
//       showSnackbar('Preço deve ser maior que zero!', 'error');
//       return;
//     }

//     if (!formData.quantidade || parseInt(formData.quantidade) < 0) {
//       showSnackbar('Quantidade inválida!', 'error');
//       return;
//     }

//     if (!formData.estoqueMinimo || parseInt(formData.estoqueMinimo) < 0) {
//       showSnackbar('Estoque mínimo inválido!', 'error');
//       return;
//     }

//     if (!formData.corredor.trim()) {
//       showSnackbar('Corredor é obrigatório!', 'error');
//       return;
//     }

//     if (!formData.prateleira.trim()) {
//       showSnackbar('Prateleira é obrigatória!', 'error');
//       return;
//     }

//     // Verificar se já existe produto com este código
//     const produtosExistentes = JSON.parse(
//       localStorage.getItem('produtos') || '[]'
//     );

//     const codigoExiste = produtosExistentes.some(
//       p => p.codigo.toLowerCase() === formData.codigo.toLowerCase()
//     );

//     // if (codigoExiste) {
//     //   showSnackbar('Já existe um produto com este código!', 'error');
//     //   return;
//     // }

//     // Criar novo produto
//     const novoProduto = {
//       id: Date.now(),
//       ...formData,
//       custoUnitario: parseFloat(formData.custoUnitario),
//       custoLogistica: parseFloat(formData.custoLogistica),
//       custoMaoDeObra: parseFloat(formData.custoMaoDeObra),
//       custoEmbalagem: parseFloat(formData.custoEmbalagem),
//       custoArmazem: parseFloat(formData.custoArmazem),
//       quantidade: parseInt(formData.quantidade),
//       estoqueMinimo: parseInt(formData.estoqueMinimo),
//       cadastradoPor: usuarioLogado,
//       dataCadastro: new Date().toISOString()
//     };

//     // Adicionar novo produto
//     const produtosAtualizados = [...produtosExistentes, novoProduto];

//     // Salvar no localStorage
//     localStorage.setItem('produtos', JSON.stringify(produtosAtualizados));

//     showSnackbar('✅ Produto cadastrado com sucesso!', 'success');
//     handleClear();
//   };

//   const handleClear = () => {
//     setFormData({
//       codigo: '',
//       nome: '',
//       descricao: '',
//       categoria: '',
//       custoUnitario: '',
//       custoLogistica: '',
//       custoMaoDeObra: '',
//       custoEmbalagem: '',
//       custoArmazem: '',
//       quantidade: '',
//       estoqueMinimo: '',
//       imagem: '',
//       corredor: '',
//       prateleira: ''
//     });
//     setPercentualLucro(''); // Adicione esta linha
//   };

//   return (
//     <PageContainer>
//       <FormContainer>
//         <Card>
//           <CardHeader>
//             <ShoppingCartOutlined sx={{ fontSize: 40, mb: 1 }} />
//             <h1>Cadastro de Produtos</h1>
//             <p>Gerencie seu catálogo de produtos</p>
//           </CardHeader>
          
//           <CardContent>
//             {/* Usuário Logado */}
//             <Alert 
//               severity="info" 
//               icon={<PersonOutlined />}
//               sx={{ mb: 3, borderRadius: '12px' }}
//             >
//               Cadastrando como: <strong>{usuarioLogado}</strong>
//             </Alert>

//             {/* Informações Básicas */}
//             <FormSection>
//               <SectionTitle>
//                 <CategoryOutlined sx={{ mr: 1 }} />
//                 Informações Básicas
//               </SectionTitle>

//               <Box sx={{ mb: 3 }}>
//                 <TextField
//                   fullWidth
//                   label="Nome do Produto"
//                   variant="outlined"
//                   required
//                   value={formData.nome}
//                   onChange={(e) => handleChange('nome', e.target.value)}
//                   placeholder="Ex: Notebook Dell Inspiron"
//                 />
//               </Box>

//               <Box sx={{ mb: 3 }}>
//                 <TextField
//                   fullWidth
//                   select
//                   label="Categoria"
//                   variant="outlined"
//                   required
//                   value={formData.categoria}
//                   onChange={(e) => handleChange('categoria', e.target.value)}
//                 >
//                   <MenuItem value="">
//                     <em>Selecione uma categoria</em>
//                   </MenuItem>
//                   {categorias.map((cat) => (
//                     <MenuItem key={cat} value={cat}>
//                       {cat}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Box>

//               <Box sx={{ mb: 3 }}>
//                 <TextField
//                   fullWidth
//                   label="Descrição"
//                   variant="outlined"
//                   multiline
//                   rows={4}
//                   value={formData.descricao}
//                   onChange={(e) => handleChange('descricao', e.target.value)}
//                   placeholder="Descreva as características do produto..."
//                 />
//               </Box>
//             </FormSection>


//              {/* Custos e Estoque*/}
//             <FormSection>
//               <SectionTitle>
//                 <AttachMoneyOutlined sx={{ mr: 1 }} />
//                 Custos do Produto
//               </SectionTitle>
              
//               <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
//                 <TextField
//                   fullWidth
//                   label="Custo Unitário (R$)"
//                   variant="outlined"
//                   required
//                   type="number"
//                   value={formData.custoUnitario}
//                   onChange={(e) => handleChange('custoUnitario', e.target.value)}
//                   placeholder="0.00"
//                   inputProps={{
//                     step: '0.01',
//                     min: '0'
//                   }}
//                 />

//                 <TextField
//                   fullWidth
//                   label="Logística (R$)"
//                   variant="outlined"
//                   // required
//                   type="number"
//                   value={formData.custoLogistica}
//                   onChange={(e) => handleChange('custoLogistica', e.target.value)}
//                   placeholder="0.00"
//                   inputProps={{
//                     step: '0.01',
//                     min: '0'
//                   }}
//                 />
//               </Box>

//               <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
//                 <TextField
//                   fullWidth
//                   label="Mão de Obra (R$)"
//                   variant="outlined"
//                   // required
//                   type="number"
//                   value={formData.custoMaoDeObra}
//                   onChange={(e) => handleChange('custoMaoDeObra', e.target.value)}
//                   placeholder="0.00"
//                   inputProps={{
//                     step: '0.01',
//                     min: '0'
//                   }}
//                 />

//                  <TextField
//                   fullWidth
//                   label="Embalagens (R$)"
//                   variant="outlined"
//                   // required
//                   type="number"
//                   value={formData.custoEmbalagem}
//                   onChange={(e) => handleChange('custoEmbalagem', e.target.value)}
//                   placeholder="0.00"
//                   inputProps={{
//                     step: '0.01',
//                     min: '0'
//                   }}
//                 />

//                 <TextField
//                   fullWidth
//                   label="Armazém (R$)"
//                   variant="outlined"
//                   // required
//                   type="number"
//                   value={formData.custoArmazem}
//                   onChange={(e) => handleChange('custoArmazem', e.target.value)}
//                   placeholder="0.00"
//                   inputProps={{
//                     step: '0.01',
//                     min: '0'
//                   }}
//                 />

//               </Box>

//             </FormSection>

//             {/* Sessão Estoque */}
//             <FormSection>
//               <SectionTitle>
//                 <InventoryOutlined sx={{ mr: 1 }} />
//                 Estoque
//               </SectionTitle>


//                {/* Campos de Estoque Existentes */}
//               <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
//                 <TextField
//                   fullWidth
//                   label="Quantidade em Estoque"
//                   variant="outlined"
//                   required
//                   type="number"
//                   value={formData.quantidade}
//                   onChange={(e) => handleChange('quantidade', e.target.value)}
//                   placeholder="0"
//                   inputProps={{ min: '0' }}
//                 />

//                 <TextField
//                   fullWidth
//                   label="Estoque Mínimo"
//                   variant="outlined"
//                   required
//                   type="number"
//                   value={formData.estoqueMinimo}
//                   onChange={(e) => handleChange('estoqueMinimo', e.target.value)}
//                   placeholder="Ex: 10"
//                   inputProps={{ min: '0' }}
//                   helperText="Defina a quantidade mínima de estoque para alertas"
//                   InputProps={{
//                     startAdornment: <WarningOutlined sx={{ mr: 1, color: '#ff9800' }} />,
//                   }}
//                 />

//                 <TextField
//                     fullWidth
//                     label="Percentual de Lucro (%)"
//                     variant="outlined"
//                     type="number"
//                     value={percentualLucro}
//                     onChange={(e) => setPercentualLucro(e.target.value)}
//                     placeholder="Ex: 50, 100, 150"
//                     inputProps={{
//                       step: '0.01',
//                       min: '0'
//                     }}
//                     helperText="Digite o percentual de lucro desejado"
//                   />
//               </Box>

//               {/* Grid com Cards de Cálculo */}
//               <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
//                 {/* Card Custo Total */}
//                 <Card 
//                   sx={{ 
//                     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                     color: 'white',
//                     borderRadius: '12px',
//                     boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
//                   }}
//                 >
//                   <CardContent>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                       <AttachMoneyOutlined sx={{ mr: 1, fontSize: 24 }} />
//                       <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                         Custo Total do Produto
//                       </Typography>
//                     </Box>
//                     <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
//                       R$ {calcularCustoTotal().toFixed(2)}
//                     </Typography>
//                     <Typography variant="caption" sx={{ opacity: 0.9, mt: 1, display: 'block' }}>
//                       Soma de todos os custos
//                     </Typography>
//                   </CardContent>

//                 </Card>

//                   <Card 
//                   sx={{ 
//                     background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
//                     color: 'white',
//                     borderRadius: '12px',
//                     boxShadow: '0 4px 15px rgba(17, 153, 142, 0.4)'
//                   }}
//                 >
//                   <CardContent>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                       <Box>
//                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                           <AttachMoneyOutlined sx={{ mr: 1, fontSize: 24 }} />
//                           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                             Valor de Venda Sugerido
//                           </Typography>
//                         </Box>
//                         <Typography variant="h4" sx={{ fontWeight: 700 }}>
//                           R$ {calcularValorVenda().toFixed(2)}
//                         </Typography>
//                         <Typography variant="caption" sx={{ opacity: 0.9, mt: 1, display: 'block' }}>
//                           {percentualLucro 
//                             ? `Custo + ${percentualLucro}% de lucro` 
//                             : 'Informe o percentual de lucro'}
//                         </Typography>
//                       </Box>
                      
//                       {percentualLucro && calcularCustoTotal() > 0 && (
//                         <Box sx={{ textAlign: 'center', bgcolor: 'rgba(255, 255, 255, 0.2)', p: 2, borderRadius: '8px' }}>
//                           <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
//                             Lucro Unitário
//                           </Typography>
//                           <Typography variant="h6" sx={{ fontWeight: 700 }}>
//                             R$ {(calcularValorVenda() - calcularCustoTotal()).toFixed(2)}
//                           </Typography>
//                         </Box>
//                       )}
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Box>
             
//             </FormSection>


//             {/* Localização no Estoque */}
//             <FormSection>
//               <SectionTitle>
//                 <LocationOnOutlined sx={{ mr: 1 }} />
//                 Localização no Estoque
//               </SectionTitle>
              
//               <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
//                 <TextField
//                   fullWidth
//                   label="Corredor"
//                   variant="outlined"
//                   required
//                   value={formData.corredor}
//                   onChange={(e) => handleChange('corredor', e.target.value)}
//                   placeholder="Ex: A1, B3, C2"
//                 />

//                 <TextField
//                   fullWidth
//                   label="Prateleira"
//                   variant="outlined"
//                   required
//                   value={formData.prateleira}
//                   onChange={(e) => handleChange('prateleira', e.target.value)}
//                   placeholder="Ex: P1, P2, Superior"
//                 />
//               </Box>
//             </FormSection>

//             {/* Imagem */}
//             <FormSection>
//               <SectionTitle>
//                 <ImageOutlined sx={{ mr: 1 }} />
//                 Imagem do Produto
//               </SectionTitle>
              
//               <Box sx={{ mb: 3 }}>
//                 <TextField
//                   fullWidth
//                   label="URL da Imagem"
//                   variant="outlined"
//                   value={formData.imagem}
//                   onChange={(e) => handleChange('imagem', e.target.value)}
//                   placeholder="https://exemplo.com/imagem.jpg"
//                 />
//               </Box>
              
//               {formData.imagem && (
//                 <ImagePreviewContainer>
//                   <ImagePreview 
//                     src={formData.imagem} 
//                     alt="Preview"
//                     onError={(e) => {
//                       e.target.src = 'https://via.placeholder.com/150?text=Imagem+Indisponível';
//                     }}
//                   />
//                   <Alert severity="success" sx={{ flex: 1 }}>
//                     Imagem carregada com sucesso!
//                   </Alert>
//                 </ImagePreviewContainer>
//               )}
//             </FormSection>

//             {/* Botões */}
//             <ButtonGroup>
//               <Button
//                 variant="outlined"
//                 color="secondary"
//                 size="large"
//                 startIcon={<ClearOutlined />}
//                 onClick={handleClear}
//                 sx={{ 
//                   borderRadius: '25px',
//                   padding: '12px 32px',
//                   textTransform: 'none',
//                   fontWeight: 600
//                 }}
//               >
//                 Limpar
//               </Button>
              
//               <Button
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 startIcon={<SaveOutlined />}
//                 onClick={handleSubmit}
//                 sx={{ 
//                   borderRadius: '25px',
//                   padding: '12px 32px',
//                   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                   textTransform: 'none',
//                   fontWeight: 600,
//                   '&:hover': {
//                     background: 'linear-gradient(135deg, #5568d3 0%, #654092 100%)',
//                     boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)'
//                   }
//                 }}
//               >
//                 Cadastrar Produto
//               </Button>
//             </ButtonGroup>
//           </CardContent>
//         </Card>
//       </FormContainer>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert 
//           onClose={handleCloseSnackbar} 
//           severity={snackbar.severity}
//           variant="filled"
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </PageContainer>
//   );
// }






// ============================================
//   ARQUIVO: cadastroProdutos.js (ATUALIZADO)
// ============================================


import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  MenuItem, 
  Button,
  Box,
  Alert,
  Snackbar,
  Typography,
  Card as MuiCard,  // Adicione esta linha
} from '@mui/material';
import {
  SaveOutlined,
  ClearOutlined,
  ShoppingCartOutlined,
  CategoryOutlined,
  AttachMoneyOutlined,
  InventoryOutlined,
  ImageOutlined,
  LocationOnOutlined,
  PersonOutlined,
  WarningOutlined
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
    codigo: '',
    nome: '',
    descricao: '',
    categoria: '',
    custoUnitario: '',
    custoLogistica: '',
    custoMaoDeObra: '',
    custoEmbalagem: '',
    custoArmazem: '',
    quantidade: '',
    estoqueMinimo: '',
    imagem: '',
    corredor: '',
    prateleira: ''
  });



  const [percentualLucro, setPercentualLucro] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState('');


  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });


  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setUsuarioLogado(email);
    } else {
      setUsuarioLogado('Usuário não identificado');
    }
  }, []);


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



// Adicione esta função para calcular o custo total
const calcularCustoTotal = () => {
  const custos = [
    parseFloat(formData.custoUnitario) || 0,
    parseFloat(formData.custoLogistica) || 0,
    parseFloat(formData.custoMaoDeObra) || 0,
    parseFloat(formData.custoEmbalagem) || 0,
    parseFloat(formData.custoArmazem) || 0
  ];
  
  return custos.reduce((acc, valor) => acc + valor, 0);
};




// Adicione esta função para calcular o valor de venda
const calcularValorVenda = () => {
  const custoTotal = calcularCustoTotal();
  const percentual = parseFloat(percentualLucro) || 0;
  return custoTotal + (custoTotal * (percentual / 100));
};


  const handleSubmit = () => {



    // Validações
    // if (!formData.codigo.trim()) {
    //   showSnackbar('Código do produto é obrigatório!', 'error');
    //   return;
    // }


   
    if (!formData.nome.trim()) {
      showSnackbar('Nome do produto é obrigatório!', 'error');
      return;
    }


    if (!formData.categoria) {
      showSnackbar('Selecione uma categoria!', 'error');
      return;
    }


    if (!formData.custoUnitario || parseFloat(formData.custoUnitario) <= 0) {
      showSnackbar('Preço deve ser maior que zero!', 'error');
      return;
    }


    if (!formData.custoLogistica || parseFloat(formData.custoLogistica) <= 0) {
      showSnackbar('Preço deve ser maior que zero!', 'error');
      return;
    }


    if (!formData.custoMaoDeObra || parseFloat(formData.custoMaoDeObra) <= 0) {
      showSnackbar('Preço deve ser maior que zero!', 'error');
      return;
    }


      if (!formData.custoEmbalagem || parseFloat(formData.custoEmbalagem) <= 0) {
      showSnackbar('Preço deve ser maior que zero!', 'error');
      return;
    }


    if (!formData.custoArmazem || parseFloat(formData.custoArmazem) <= 0) {
      showSnackbar('Preço deve ser maior que zero!', 'error');
      return;
    }


    if (!formData.quantidade || parseInt(formData.quantidade) < 0) {
      showSnackbar('Quantidade inválida!', 'error');
      return;
    }


    if (!formData.estoqueMinimo || parseInt(formData.estoqueMinimo) < 0) {
      showSnackbar('Estoque mínimo inválido!', 'error');
      return;
    }


    if (!formData.corredor.trim()) {
      showSnackbar('Corredor é obrigatório!', 'error');
      return;
    }


    if (!formData.prateleira.trim()) {
      showSnackbar('Prateleira é obrigatória!', 'error');
      return;
    }


    // Verificar se já existe produto com este código
    const produtosExistentes = JSON.parse(
      localStorage.getItem('produtos') || '[]'
    );


    const codigoExiste = produtosExistentes.some(
      p => p.codigo.toLowerCase() === formData.codigo.toLowerCase()
    );


    // if (codigoExiste) {
    //   showSnackbar('Já existe um produto com este código!', 'error');
    //   return;
    // }


    // Criar novo produto
    const novoProduto = {
      id: Date.now(),
      ...formData,
      custoUnitario: parseFloat(formData.custoUnitario),
      custoLogistica: parseFloat(formData.custoLogistica),
      custoMaoDeObra: parseFloat(formData.custoMaoDeObra),
      custoEmbalagem: parseFloat(formData.custoEmbalagem),
      custoArmazem: parseFloat(formData.custoArmazem),
      quantidade: parseInt(formData.quantidade),
      estoqueMinimo: parseInt(formData.estoqueMinimo),
      cadastradoPor: usuarioLogado,
      dataCadastro: new Date().toISOString()
    };


    // Adicionar novo produto
    const produtosAtualizados = [...produtosExistentes, novoProduto];


    // Salvar no localStorage
    localStorage.setItem('produtos', JSON.stringify(produtosAtualizados));


    showSnackbar('✅ Produto cadastrado com sucesso!', 'success');
    handleClear();
  };


  const handleClear = () => {
    setFormData({
      codigo: '',
      nome: '',
      descricao: '',
      categoria: '',
      custoUnitario: '',
      custoLogistica: '',
      custoMaoDeObra: '',
      custoEmbalagem: '',
      custoArmazem: '',
      quantidade: '',
      estoqueMinimo: '',
      imagem: '',
      corredor: '',
      prateleira: ''
    });
    setPercentualLucro('');
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
            {/* Usuário Logado */}
            <Alert 
              severity="info" 
              icon={<PersonOutlined />}
              sx={{ mb: 3, borderRadius: '12px' }}
            >
              Cadastrando como: <strong>{usuarioLogado}</strong>
            </Alert>


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



             {/* Custos e Estoque*/}
            <FormSection>
              <SectionTitle>
                <AttachMoneyOutlined sx={{ mr: 1 }} />
                Custos do Produto
              </SectionTitle>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
                <TextField
                  fullWidth
                  label="Custo Unitário (R$)"
                  variant="outlined"
                  required
                  type="number"
                  value={formData.custoUnitario}
                  onChange={(e) => handleChange('custoUnitario', e.target.value)}
                  placeholder="0.00"
                  inputProps={{
                    step: '0.01',
                    min: '0'
                  }}
                />


                <TextField
                  fullWidth
                  label="Logística (R$)"
                  variant="outlined"
                  // required
                  type="number"
                  value={formData.custoLogistica}
                  onChange={(e) => handleChange('custoLogistica', e.target.value)}
                  placeholder="0.00"
                  inputProps={{
                    step: '0.01',
                    min: '0'
                  }}
                />
              </Box>


              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
                <TextField
                  fullWidth
                  label="Mão de Obra (R$)"
                  variant="outlined"
                  // required
                  type="number"
                  value={formData.custoMaoDeObra}
                  onChange={(e) => handleChange('custoMaoDeObra', e.target.value)}
                  placeholder="0.00"
                  inputProps={{
                    step: '0.01',
                    min: '0'
                  }}
                />


                 <TextField
                  fullWidth
                  label="Embalagens (R$)"
                  variant="outlined"
                  // required
                  type="number"
                  value={formData.custoEmbalagem}
                  onChange={(e) => handleChange('custoEmbalagem', e.target.value)}
                  placeholder="0.00"
                  inputProps={{
                    step: '0.01',
                    min: '0'
                  }}
                />


                <TextField
                  fullWidth
                  label="Armazém (R$)"
                  variant="outlined"
                  // required
                  type="number"
                  value={formData.custoArmazem}
                  onChange={(e) => handleChange('custoArmazem', e.target.value)}
                  placeholder="0.00"
                  inputProps={{
                    step: '0.01',
                    min: '0'
                  }}
                />


              </Box>


            </FormSection>


            {/* Sessão Estoque */}
            <FormSection>
              <SectionTitle>
                <InventoryOutlined sx={{ mr: 1 }} />
                Estoque
              </SectionTitle>



               {/* Campos de Estoque Existentes */}
              <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth
                  label="Quantidade em Estoque"
                  variant="outlined"
                  // required
                  type="number"
                  value={formData.quantidade}
                  onChange={(e) => handleChange('quantidade', e.target.value)}
                  placeholder="0"
                  inputProps={{ min: '0' }}
                />


                <TextField
                  fullWidth
                  label="Estoque Mínimo"
                  variant="outlined"
                  required
                  type="number"
                  value={formData.estoqueMinimo}
                  onChange={(e) => handleChange('estoqueMinimo', e.target.value)}
                  placeholder="Ex: 10"
                  inputProps={{ min: '0' }}
                  helperText="Defina a quantidade mínima de estoque para alertas"
                  InputProps={{
                    startAdornment: <WarningOutlined sx={{ mr: 1, color: '#ff9800' }} />,
                  }}
                />


                <TextField
                    fullWidth
                    label="Percentual de Lucro (%)"
                    variant="outlined"
                    type="number"
                    value={percentualLucro}
                    onChange={(e) => setPercentualLucro(e.target.value)}
                    placeholder="Ex: 50, 100, 150"
                    inputProps={{
                      step: '0.01',
                      min: '0'
                    }}
                    helperText="Digite o percentual de lucro desejado"
                  />
              </Box>


           {/* Grid com Cards de Cálculo */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
                {/* Card Custo Total - VERMELHO */}
                <Box 
                  sx={{ 
                    background: 'linear-gradient(135deg, #e53935 0%, #c62828 100%)',
                    color: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(229, 57, 53, 0.4)',
                    p: 3
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AttachMoneyOutlined sx={{ mr: 1, fontSize: 24 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Custo Total do Produto
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                    R$ {calcularCustoTotal().toFixed(2)}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9, mt: 1, display: 'block' }}>
                    Soma de todos os custos
                  </Typography>
                </Box>

                {/* Card Valor de Venda - VERDE */}
                <Box 
                  sx={{ 
                    background: 'linear-gradient(135deg, #43a047 0%, #2e7d32 100%)',
                    color: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(67, 160, 71, 0.4)',
                    p: 3
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AttachMoneyOutlined sx={{ mr: 1, fontSize: 24 }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Valor de Venda Sugerido
                        </Typography>
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        R$ {calcularValorVenda().toFixed(2)}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.9, mt: 1, display: 'block' }}>
                        {percentualLucro 
                          ? `Custo + ${percentualLucro}% de lucro` 
                          : 'Informe o percentual de lucro'}
                      </Typography>
                    </Box>
                    
                    {percentualLucro && calcularCustoTotal() > 0 && (
                      <Box sx={{ textAlign: 'center', bgcolor: 'rgba(255, 255, 255, 0.2)', p: 2, borderRadius: '8px' }}>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                          Lucro Unitário
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          R$ {(calcularValorVenda() - calcularCustoTotal()).toFixed(2)}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
             
            </FormSection>



            {/* Localização no Estoque */}
            <FormSection>
              <SectionTitle>
                <LocationOnOutlined sx={{ mr: 1 }} />
                Localização no Estoque
              </SectionTitle>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
                <TextField
                  fullWidth
                  label="Corredor"
                  variant="outlined"
                  required
                  value={formData.corredor}
                  onChange={(e) => handleChange('corredor', e.target.value)}
                  placeholder="Ex: A1, B3, C2"
                />


                <TextField
                  fullWidth
                  label="Prateleira"
                  variant="outlined"
                  required
                  value={formData.prateleira}
                  onChange={(e) => handleChange('prateleira', e.target.value)}
                  placeholder="Ex: P1, P2, Superior"
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

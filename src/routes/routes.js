// import React from 'react';
// import { Routes, Route } from 'react-router-dom';


// import Login from '../pages/Login/login';
// import Home from '../pages/Home/home';

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/home" element={<Home />} />
//     </Routes>
//   );
// };

// export default AppRoutes;
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login/login';
import Home from '../pages/Home/home';
import CadastroProdutos from '../pages/CadastroProdutos/cadastroProdutos';
import Movimentacoes from '../pages/Movimentacoes/movimentacoes';
import ListarProdutos from '../pages/ListarProdutos/listarProdutos';
import Configuracoes from '../pages/Configuracoes/configuracoes';
import DrawerLayout from '../navigation/DrawerLayout';

// Componente para proteger rotas autenticadas
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // ou seu método de autenticação
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <DrawerLayout>{children}</DrawerLayout>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rota pública - Login */}
      <Route path="/" element={<Login />} />
      
      {/* Rotas protegidas com Drawer */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cadastro-produtos"
        element={
          <ProtectedRoute>
            <CadastroProdutos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movimentacoes"
        element={
          <ProtectedRoute>
            <Movimentacoes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/listar-produtos"
        element={
          <ProtectedRoute>
            <ListarProdutos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/configuracoes"
        element={
          <ProtectedRoute>
            <Configuracoes />
          </ProtectedRoute>
        }
      />

      {/* Rota 404 - Redireciona para home se autenticado, senão para login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
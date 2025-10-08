import React, { useState, createContext, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  Avatar,
} from '@mui/material';

import {
  DashboardCustomIcon,
  ProductCustomIcon,
  MovementCustomIcon,
  InventoryCustomIcon,
  SettingsCustomIcon,
  UserAvatarIcon,
} from '../CustomIcons';

import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  AddCircle as AddCircleIcon,
  TrendingUp as TrendingUpIcon,
  Inventory as InventoryIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  BorderColor,
} from '@mui/icons-material';

const drawerWidth = 280;

// Context para o tema
export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const DrawerLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    // Limpar autenticação/token aqui
    localStorage.removeItem('token');
    navigate('/');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardCustomIcon />, path: '/home' },
    { text: 'Cadastro de Produtos', icon: <ProductCustomIcon />, path: '/cadastro-produtos' },
    { text: 'Movimentações', icon: <MovementCustomIcon />, path: '/movimentacoes' },
    { text: 'Listar Produtos', icon: <InventoryCustomIcon />, path: '/listar-produtos' },
    { text: 'Configurações', icon: <SettingsCustomIcon />, path: '/configuracoes' },
  ];
  const drawer = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: isDarkMode ? '#1e1e1e' : '#C8DEEF',
      }}
    >
      {/* Header do Drawer */}
      <Box
        sx={{
          p: 3,
          bgcolor: isDarkMode ? '#2d2d2d' : '#C8DEEF',
          color: '#000000ff',
          textAlign: 'center',
        }}
      >
        <UserAvatarIcon 
          sx={{ 
            fontSize: 60,
            p: 0.1,
            mb: 2,
            color: 'transparent',
          }} 
        />
        <Typography variant="h6" noWrap component="div">
          Estoque
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          Versão 1.0
        </Typography>
      </Box>

      <Divider />

      {/* Menu Items */}
      <List sx={{ flex: 1, pt: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={isActive}
                onClick={() => {
                  navigate(item.path);
                  if (mobileOpen) handleDrawerToggle();
                }}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  '&.Mui-selected': {
                    bgcolor: isDarkMode ? '#424242' : '#BED8ED',
                    '&:hover': {
                      bgcolor: isDarkMode ? '#505050' : '#bbdefb',
                    },
                  },
                  '&:hover': {
                    bgcolor: isDarkMode ? '#333' : '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive
                      ? isDarkMode
                        ? '#90caf9'
                        : '#006EC4'
                      : isDarkMode
                      ? '#006EC4'
                      : '#28303F',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    color: isActive 
                      ? isDarkMode
                        ? '#90caf9'
                        : '#006EC4'
                      : isDarkMode
                      ? '#b0b0b0'
                      : '#28303F',
                    '& .MuiTypography-root': {
                      fontWeight: isActive ? 600 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* Footer com Tema e Logout */}
      <Box sx={{ p: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={isDarkMode}
              onChange={handleThemeToggle}
              icon={<LightModeIcon />}
              checkedIcon={<DarkModeIcon />}
            />
          }
          label={
            <Typography sx={{ color: isDarkMode ? '#fff' : 'inherit', fontSize: 14 }}>
              Tema Escuro
            </Typography>
          }
          sx={{ width: '100%', ml: 0, mb: 1 }}
        />

        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            bgcolor: isDarkMode ? '#4a1a1a' : '#ffebee',
            '&:hover': {
              bgcolor: isDarkMode ? '#5a2020' : '#ffcdd2',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#f44336', minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Sair"
            sx={{
              '& .MuiTypography-root': {
                color: '#f44336',
                fontWeight: 600,
              },
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme: handleThemeToggle }}>
      <Box sx={{ display: 'flex' }}>
        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            bgcolor: isDarkMode ? '#2d2d2d' : '#1976d2',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {menuItems.find((item) => item.path === location.pathname)?.text || 'Dashboard'}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Drawer Mobile */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                bgcolor: isDarkMode ? '#1e1e1e' : '#fff',
              },
            }}
          >
            {drawer}
          </Drawer>

          {/* Drawer Desktop */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                bgcolor: isDarkMode ? '#1e1e1e' : '#ffffffff',
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Conteúdo Principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 0,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            minHeight: '100vh',
            bgcolor: isDarkMode ? '#121212' : '#fafafa',
            color: isDarkMode ? '#fff' : 'inherit',
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeContext.Provider>
  );
};

export default DrawerLayout;
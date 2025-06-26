import React, { useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
  Chip
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Send as SendIcon,
  GetApp as WithdrawIcon,
  History as HistoryIcon,
  AccountCircle,
  Logout,
  Settings,
  Notifications,
  ChevronLeft,
  Wallet,
  TrendingDown as DepositIcon,
} from "@mui/icons-material";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";


const UserLayout = () => {
  const user = useAuth();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch()
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!user) return <Navigate to="/login" replace />;
  if (user?.role !== "user") return <div>Unauthorized</div>;

  const navigationItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Transfer", icon: <SendIcon />, path: "/transfer" },
    { text: "Withdraw", icon: <WithdrawIcon />, path: "/withdraw" },
    { text: "History", icon: <HistoryIcon />, path: "/history" },
    { text: "Deposit", icon: <DepositIcon />, path: "/deposite" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logout())
    setAnchorEl(null);
    handleProfileMenuClose()
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  

  const isActive = (path) => location.pathname === path;

  const drawerWidth = sidebarCollapsed ? 70 : 280;

  const drawer = (
    <div className="h-full mt-16 bg-gradient-to-br from-slate-50 to-blue-50 backdrop-blur-lg overflow-y-auto">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-white/20 sticky top-0 bg-white/20 backdrop-blur-sm z-10">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Wallet className="text-white text-lg" />
              </div>
              <div>
                <Typography variant="h6" className="font-bold text-gray-800">
                  WalletApp
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  Digital Wallet
                </Typography>
              </div>
            </div>
          )}
          {!isMobile && (
            <IconButton 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-gray-600 hover:bg-white/50"
              size="small"
            >
              <ChevronLeft className={`transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            </IconButton>
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="pb-20">
        {/* User Profile Section */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-white/20">
            <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/50 backdrop-blur-sm">
              <Avatar 
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600"
                src={user.avatar}
              >
                {user.name?.charAt(0)}
              </Avatar>
              <div className="flex-1 min-w-0">
                <Typography variant="subtitle1" className="font-semibold text-gray-800 truncate">
                  {user.name}
                </Typography>
                <Typography variant="caption" className="text-gray-500 truncate">
                  {user.email}
                </Typography>
              </div>
              <Chip 
                label="PRO" 
                size="small" 
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <List className="p-2 space-y-1">
          {navigationItems.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              className={`rounded-xl transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-700 hover:bg-white/60 hover:scale-102'
              }`}
              sx={{
                mb: 1,
                minHeight: 48,
                justifyContent: sidebarCollapsed ? 'center' : 'initial',
                px: 2.5,
              }}
            >
              <ListItemIcon
                className={`${
                  isActive(item.path) ? 'text-white' : 'text-gray-600'
                } transition-colors`}
                sx={{
                  minWidth: 0,
                  mr: sidebarCollapsed ? 0 : 3,
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!sidebarCollapsed && (
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.95rem',
                    fontWeight: isActive(item.path) ? 600 : 500,
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </div>
      
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      {/* Top Navigation */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 10,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          color: "text.primary",
        }}
      >
        <Toolbar className="justify-between">
          <div className="flex items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="font-semibold text-gray-800">
              {navigationItems.find((item) => isActive(item.path))?.text ||
                "Dashboard"}
            </Typography>
          </div>

          <div className="flex items-center space-x-3">
            <IconButton className="text-gray-600 hover:bg-white/50">
              <Notifications />
            </IconButton>
            <IconButton
              onClick={handleProfileMenuOpen}
              className="text-gray-600"
            >
              <Avatar
                className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600"
                src={user.avatar}
              >
                {user.name?.charAt(0)}
              </Avatar>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 2,
            mt: 1,
            minWidth: 200,
          },
        }}
      >
        <MenuItem className="hover:bg-white/50">
          <AccountCircle className="mr-3 text-gray-600" />
          Profile
        </MenuItem>

        <Divider />
        <MenuItem
          onClick={handleLogout}
          className="hover:bg-red-50 text-red-600"
        >
          <Logout className="mr-3" />
          Logout
        </MenuItem>
      </Menu>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 280,
              border: "none",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(20px)",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(20px)",
              transition: "width 0.3s ease",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          mt: 8,
          transition: "margin 0.3s ease, width 0.3s ease",
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
};

export default UserLayout;

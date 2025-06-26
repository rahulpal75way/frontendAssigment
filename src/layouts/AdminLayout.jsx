import React, { useState } from "react";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
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
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  MonetizationOn as CommissionIcon,
  ChevronLeft,
  Notifications,
  Logout,
  AdminPanelSettings,
  AccountCircle,
} from "@mui/icons-material";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const AdminLayout = () => {
  const user = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!user) return <Navigate to="/login" replace />;
  if (user?.role !== "admin") return <div>Unauthorized</div>;

  const drawerWidth = sidebarCollapsed ? 70 : 280;

  const navigationItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    {
      text: "Commissions",
      icon: <CommissionIcon />,
      path: "/admin/commissions",
    },
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

  const drawer = (
    <div className="h-full mt-16 bg-gradient-to-br from-slate-50 to-indigo-50 overflow-y-auto">
      <div className="p-4 border-b border-white/20 sticky top-0 bg-white/30 backdrop-blur-sm z-10">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <AdminPanelSettings className="text-white" />
              </div>
              <div>
                <Typography variant="h6" className="font-bold text-gray-800">
                  Admin Console
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  Wallet Management
                </Typography>
              </div>
            </div>
          )}
          {!isMobile && (
            <IconButton
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              size="small"
            >
              <ChevronLeft
                className={`transition-transform ${
                  sidebarCollapsed ? "rotate-180" : ""
                }`}
              />
            </IconButton>
          )}
        </div>
      </div>

      {!sidebarCollapsed && (
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/50 backdrop-blur-sm">
            <Avatar
              className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600"
              src={user.avatar}
            >
              {user.name?.charAt(0)}
            </Avatar>
            <div className="flex-1 min-w-0">
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-800 truncate"
              >
                {user.name}
              </Typography>
              <Typography variant="caption" className="text-gray-500 truncate">
                {user.email}
              </Typography>
            </div>
            <Chip
              label="ADMIN"
              size="small"
              className="bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs"
            />
          </div>
        </div>
      )}

      <List className="p-2 space-y-1">
        {navigationItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            to={item.path}
            className={`rounded-xl transition-all duration-200 ${
              isActive(item.path)
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105"
                : "text-gray-700 hover:bg-white/60 hover:scale-102"
            }`}
            sx={{
              mb: 1,
              minHeight: 48,
              justifyContent: sidebarCollapsed ? "center" : "initial",
              px: 2.5,
            }}
          >
            <ListItemIcon
              className={`${
                isActive(item.path) ? "text-white" : "text-gray-600"
              } transition-colors`}
              sx={{
                minWidth: 0,
                mr: sidebarCollapsed ? 0 : 3,
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            {!sidebarCollapsed && (
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: isActive(item.path) ? 600 : 500,
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 10,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
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
              <MenuIcon className="text-black" />
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
                className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600"
                src={user.avatar}
              >
                {user.name?.charAt(0)}
              </Avatar>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

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

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 280,
              border: "none",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(20px)",
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
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

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

export default AdminLayout;

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
import ErrorBoundary from "../components/ErrorBoundary";
import ThemeToggleButton from "../components/ThemeToggleButton";

const AdminLayout = () => {
  const user = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isDarkMode = theme.palette.mode === "dark";

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

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleProfileMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    dispatch(logout());
    handleProfileMenuClose();
  };

  const isActive = (path) => location.pathname === path;

  const drawer = (
    <Box
      sx={{
        height: "100%",
        marginTop: "64px",
        backgroundColor: isDarkMode
          ? "rgba(18,18,18,0.95)"
          : "rgba(248,250,252,0.95)",
        backdropFilter: "blur(20px)",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${
            isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
          }`,
          backgroundColor: isDarkMode
            ? "rgba(18,18,18,0.8)"
            : "rgba(255,255,255,0.8)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {!sidebarCollapsed && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(to right, #6366f1, #8b5cf6)",
                }}
              >
                <AdminPanelSettings sx={{ color: "white" }} />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Admin Console
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Wallet Management
                </Typography>
              </Box>
            </Box>
          )}
          {!isMobile && (
            <IconButton
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              size="small"
            >
              <ChevronLeft
                sx={{
                  transform: sidebarCollapsed
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Profile */}
      {!sidebarCollapsed && (
        <Box
          sx={{
            p: 2,
            borderBottom: `1px solid ${
              isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            }`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 1.5,
              borderRadius: 2,
              backgroundColor: isDarkMode
                ? "rgba(255,255,255,0.05)"
                : "rgba(255,255,255,0.7)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Avatar
              sx={{
                width: 48,
                height: 48,
                background: "linear-gradient(to right, #6366f1, #8b5cf6)",
              }}
              src={user.avatar}
            >
              {user.name?.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" fontWeight={600} noWrap>
                {user.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {user.email}
              </Typography>
            </Box>
            <Chip
              label="ADMIN"
              size="small"
              sx={{
                background: "linear-gradient(to right, #f43f5e, #ec4899)",
                color: "white",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            />
          </Box>
        </Box>
      )}

      {/* Navigation */}
      <List sx={{ p: 1, "& .MuiListItem-root": { mb: 0.5 } }}>
        {navigationItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              borderRadius: "12px",
              minHeight: 48,
              justifyContent: sidebarCollapsed ? "center" : "initial",
              px: 2,
              mx: 1,
              ...(isActive(item.path)
                ? {
                    background: "linear-gradient(to right, #6366f1, #8b5cf6)",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
                    transform: "scale(1.02)",
                    "& .MuiListItemIcon-root": { color: "white" },
                    "& .MuiListItemText-primary": {
                      color: "white",
                      fontWeight: 600,
                    },
                  }
                : {
                    color: theme.palette.text.primary,
                    "&:hover": {
                      backgroundColor: isDarkMode
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.05)",
                      transform: "scale(1.01)",
                    },
                    "& .MuiListItemIcon-root": {
                      color: theme.palette.text.secondary,
                    },
                  }),
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: sidebarCollapsed ? 0 : 2,
                justifyContent: "center",
                transition: "color 0.2s ease",
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
    </Box>
  );

  return (
    <ErrorBoundary>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* AppBar */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            zIndex: theme.zIndex.drawer + 10,
            backgroundColor: isDarkMode
              ? "rgba(18,18,18,0.9)"
              : "rgba(255,255,255,0.9)",
            backdropFilter: "blur(20px)",
            borderBottom: `1px solid ${
              isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            }`,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" fontWeight={600}>
                {navigationItems.find((item) => isActive(item.path))?.text ||
                  "Dashboard"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <ThemeToggleButton/>
              <IconButton
                sx={{
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    backgroundColor: isDarkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Notifications />
              </IconButton>
              <IconButton onClick={handleProfileMenuOpen}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    background: "linear-gradient(to right, #6366f1, #8b5cf6)",
                  }}
                  src={user.avatar}
                >
                  {user.name?.charAt(0)}
                </Avatar>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          PaperProps={{
            sx: {
              backgroundColor: isDarkMode
                ? "rgba(18,18,18,0.95)"
                : "rgba(255,255,255,0.95)",
              backdropFilter: "blur(20px)",
              border: `1px solid ${
                isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
              }`,
              borderRadius: "12px",
              mt: 1,
              minWidth: 200,
            },
          }}
        >
          <MenuItem onClick={handleProfileMenuClose}>
            <AccountCircle sx={{ mr: 1.5 }} />
            Profile
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={handleLogout}
            sx={{ color: "#ef4444", "&:hover": { backgroundColor: "#fee2e2" } }}
          >
            <Logout sx={{ mr: 1.5 }} />
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
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                width: 280,
                border: "none",
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
                width: drawerWidth,
                border: "none",
                transition: "width 0.3s ease",
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
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            mt: 8,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ErrorBoundary>
  );
};

export default AdminLayout;

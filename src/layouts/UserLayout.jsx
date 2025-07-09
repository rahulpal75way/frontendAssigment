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
  Chip,
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
import ErrorBoundary from "../components/ErrorBoundary";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { resetTokens } from "../store/reducers/authReducers";

const UserLayout = () => {
  const user = useAuth();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!user) return <Navigate to="/login" replace />;
  if (!["USER", "CANDIDATE"].includes(user?.role)) return <div>Unauthorized</div>;

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
    dispatch(resetTokens());
    setAnchorEl(null);
    handleProfileMenuClose();
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path) => location.pathname === path;
  const drawerWidth = sidebarCollapsed ? 70 : 280;

  // Theme-aware styles
  const isDarkMode = theme.palette.mode === "dark";

  const drawer = (
    <Box
      sx={{
        height: "100%",
        marginTop: "64px",
        backgroundColor: isDarkMode
          ? "rgba(18, 18, 18, 0.95)"
          : "rgba(248, 250, 252, 0.95)",
        backdropFilter: "blur(20px)",
        overflowY: "auto",
      }}
    >
      {/* Sidebar Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${
            isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
          }`,
          position: "sticky",
          top: 0,
          backgroundColor: isDarkMode
            ? "rgba(18, 18, 18, 0.8)"
            : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
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
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Wallet sx={{ color: "white", fontSize: "1.2rem" }} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.text.primary,
                    fontSize: "1.1rem",
                  }}
                >
                  WalletApp
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Digital Wallet
                </Typography>
              </Box>
            </Box>
          )}
          {!isMobile && (
            <IconButton
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              sx={{
                color: theme.palette.text.secondary,
                "&:hover": {
                  backgroundColor: isDarkMode
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                },
              }}
              size="small"
            >
              <ChevronLeft
                sx={{
                  transition: "transform 0.3s ease",
                  transform: sidebarCollapsed
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Scrollable Content */}
      <Box sx={{ pb: 10 }}>
        {/* User Profile Section */}
        {!sidebarCollapsed && (
          <Box
            sx={{
              p: 2,
              borderBottom: `1px solid ${
                isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              }`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 1.5,
                borderRadius: "16px",
                backgroundColor: isDarkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                }}
                src={user.avatar}
              >
                {user.name?.charAt(0)}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.email}
                </Typography>
              </Box>
              <Chip
                label="PRO"
                size="small"
                sx={{
                  background:
                    "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
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
                transition: "all 0.2s ease",
                minHeight: 48,
                justifyContent: sidebarCollapsed ? "center" : "initial",
                px: 2,
                mx: 1,
                ...(isActive(item.path)
                  ? {
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                      color: "white",
                      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                      transform: "scale(1.02)",
                      "& .MuiListItemIcon-root": {
                        color: "white",
                      },
                      "& .MuiListItemText-primary": {
                        color: "white",
                        fontWeight: 600,
                      },
                    }
                  : {
                      color: theme.palette.text.primary,
                      "&:hover": {
                        backgroundColor: isDarkMode
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.05)",
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
        {/* Background decorative elements */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "5rem",
              right: "5rem",
              width: "18rem",
              height: "18rem",
              background: isDarkMode
                ? "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)"
                : "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
              borderRadius: "50%",
              filter: "blur(40px)",
              animation: "pulse 4s ease-in-out infinite",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "5rem",
              left: "5rem",
              width: "18rem",
              height: "18rem",
              background: isDarkMode
                ? "linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)"
                : "linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)",
              borderRadius: "50%",
              filter: "blur(40px)",
              animation: "pulse 4s ease-in-out infinite",
              animationDelay: "1s",
            }}
          />
        </Box>

        {/* Top Navigation */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            zIndex: theme.zIndex.drawer + 10,
            backgroundColor: isDarkMode
              ? "rgba(18, 18, 18, 0.9)"
              : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            borderBottom: `1px solid ${
              isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
            }`,
            color: theme.palette.text.primary,
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
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
              >
                {navigationItems.find((item) => isActive(item.path))?.text ||
                  "Dashboard"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <ThemeToggleButton />
              <IconButton
                sx={{
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    backgroundColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <Notifications />
              </IconButton>
              <IconButton
                onClick={handleProfileMenuOpen}
                sx={{ color: theme.palette.text.secondary }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
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
                ? "rgba(18, 18, 18, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              border: `1px solid ${
                isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              }`,
              borderRadius: "12px",
              mt: 1,
              minWidth: 200,
            },
          }}
        >
          <MenuItem
            sx={{
              "&:hover": {
                backgroundColor: isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            <AccountCircle
              sx={{ mr: 1.5, color: theme.palette.text.secondary }}
            />
            <Typography sx={{ color: theme.palette.text.primary }}>
              Profile
            </Typography>
          </MenuItem>
          <Divider
            sx={{
              borderColor: isDarkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
            }}
          />
          <MenuItem
            onClick={handleLogout}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(239, 68, 68, 0.1)",
              },
            }}
          >
            <Logout sx={{ mr: 1.5, color: "#ef4444" }} />
            <Typography sx={{ color: "#ef4444" }}>Logout</Typography>
          </MenuItem>
        </Menu>

        {/* Sidebar */}
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          {/* Mobile Drawer */}
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
                backgroundColor: isDarkMode
                  ? "rgba(18, 18, 18, 0.95)"
                  : "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: isDarkMode
                    ? "rgba(255, 255, 255, 0.3)"
                    : "rgba(0, 0, 0, 0.3)",
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

          {/* Desktop Drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                border: "none",
                backgroundColor: isDarkMode
                  ? "rgba(18, 18, 18, 0.95)"
                  : "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                transition: "width 0.3s ease",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: isDarkMode
                    ? "rgba(255, 255, 255, 0.3)"
                    : "rgba(0, 0, 0, 0.3)",
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
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            mt: 8,
            transition: "margin 0.3s ease, width 0.3s ease",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ErrorBoundary>
  );
};

export default UserLayout;

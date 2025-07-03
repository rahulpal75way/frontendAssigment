import React from "react";
import {
  Paper,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  useTheme,
} from "@mui/material";

const CommissionTable = ({
  commissions,
  formatTxnId,
  getTypeIcon,
  getTypeColor,
  total,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        backgroundColor: isDarkMode
          ? "rgba(18, 18, 18, 0.85)"
          : "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${
          isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
        }`,
        boxShadow: isDarkMode
          ? "0 25px 50px -12px rgba(0,0,0,0.5)"
          : "0 25px 50px -12px rgba(0,0,0,0.15)",
      }}
    >
      <Box p={3}>
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ mb: 2, color: theme.palette.text.primary }}
        >
          Commission Transactions
        </Typography>

        <TableContainer
          sx={{
            maxHeight: 450,
            overflowX: "auto", // Enable horizontal scroll
          }}
        >
          <Box sx={{ minWidth: 600 /* or 1000 if more columns */ }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {["Transaction ID", "Type", "Amount"].map((label) => (
                    <TableCell
                      key={label}
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.text.primary,
                        backgroundColor: isDarkMode
                          ? theme.palette.background.paper // solid dark background
                          : theme.palette.primary.light, // solid light background
                        whiteSpace: "nowrap",
                      }}
                      align={label === "Amount" ? "right" : "left"}
                    >
                      {label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {commissions.map((commission, index) => (
                  <TableRow
                    key={commission.txnId}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        backgroundColor: isDarkMode
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(99,102,241,0.03)",
                      },
                    }}
                  >
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            fontSize: 14,
                            fontWeight: "bold",
                            background:
                              "linear-gradient(to right, #60A5FA, #A78BFA)",
                            color: "#fff",
                          }}
                        >
                          {index + 1}
                        </Avatar>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "monospace",
                            color: theme.palette.text.secondary,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {formatTxnId(commission.txnId)}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        icon={getTypeIcon(commission.type)}
                        label={
                          commission.type.charAt(0).toUpperCase() +
                          commission.type.slice(1)
                        }
                        color={getTypeColor(commission.type)}
                        variant="outlined"
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                      />
                    </TableCell>

                    <TableCell align="right">
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        sx={{ color: "success.main" }}
                      >
                        ${commission.amount.toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>

        <Box
          mt={3}
          pt={3}
          sx={{
            borderTop: `1px solid ${
              isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            }`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Total {commissions.length} transactions
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            Total: ${total.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CommissionTable;

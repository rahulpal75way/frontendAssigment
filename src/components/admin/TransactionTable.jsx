import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Avatar,
  Chip,
  Fade,
  Button,
  Tooltip,
  useTheme,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const getActualType = (item) => {
  return item?.type
    ? "transfer"
    : item?.to === null && item?.from !== null
    ? "withdraw"
    : "deposit";
};

const TransactionTable = ({ data, type, onApprove, onReject }) => {
    const theme = useTheme();
      const isDarkMode = theme.palette.mode === "dark";
  const getColumns = () => {
    const baseCols = [
      { key: "id", label: "Transaction ID" },
      {
        key: type === "transfer" ? "from" : "userId",
        label: type === "transfer" ? "From User" : "User ID",
      },
      ...(type === "transfer"
        ? [
            { key: "to", label: "To User" },
            { key: "type", label: "Transfer Type" },
          ]
        : []),
      { key: "amount", label: "Amount" },
      { key: "status", label: "Status" },
      ...(type !== "mixed" ? [{ key: "actions", label: "Actions" }] : []),
    ];
    return baseCols;
  };

  const columns = getColumns();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                sx={{
                  fontWeight: 600,
                  color: "text.secondary"
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  No pending {type}s found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <Fade in timeout={300 * (index + 1)} key={item.id}>
                <TableRow
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.02)",
                    },
                  }}
                >
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: "monospace" }}
                    >
                      {item.id.slice(0, 8)}...
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          fontSize: "0.75rem",
                        }}
                      >
                        {(item.userId || item.from)?.toString().slice(0, 2) ||
                          "N/A"}
                      </Avatar>
                      <Typography variant="body2">
                        User {item.userId || item.from}
                      </Typography>
                    </Box>
                  </TableCell>

                  {type === "transfer" && (
                    <>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar
                            sx={{
                              width: 24,
                              height: 24,
                              fontSize: "0.75rem",
                              bgcolor: "secondary.main",
                            }}
                          >
                            {item.to?.toString().slice(0, 2) || "N/A"}
                          </Avatar>
                          <Typography variant="body2">
                            User {item.to}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.type || "Transfer"}
                          size="small"
                          color={
                            item.type === "international"
                              ? "secondary"
                              : "primary"
                          }
                          variant="outlined"
                          sx={{ textTransform: "capitalize" }}
                        />
                      </TableCell>
                    </>
                  )}

                  <TableCell>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color="primary.main"
                    >
                      ${item.amount.toLocaleString()}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={item.status || "pending"}
                      size="small"
                      color={
                        item.status === "approved"
                          ? "success"
                          : item.status === "rejected"
                          ? "error"
                          : "warning"
                      }
                      variant="outlined"
                      sx={{ textTransform: "capitalize" }}
                    />
                  </TableCell>

                  {type !== "mixed" && (
                    <TableCell>
                      {(item.status === "pending" || !item.status) && (
                        <Box display="flex" gap={1}>
                          <Tooltip title="Approve Transaction">
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() =>
                                onApprove(
                                  item.id,
                                  type === "mixed" ? getActualType(item) : type
                                )
                              }
                              sx={{
                                minWidth: "auto",
                                background:
                                  "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                                "&:hover": {
                                  background:
                                    "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                },
                                textTransform: "none",
                                fontWeight: 600,
                                px: 1.5,
                              }}
                            >
                              <CheckCircle sx={{ fontSize: 16, mr: 0.5 }} />{" "}
                              Approve
                            </Button>
                          </Tooltip>

                          <Tooltip title="Reject Transaction">
                            <Button
                              variant="outlined"
                              size="small"
                              color="error"
                              onClick={() =>
                                onReject(
                                  item.id,
                                  type === "mixed" ? getActualType(item) : type
                                )
                              }
                              sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                px: 1.5,
                              }}
                            >
                              Reject
                            </Button>
                          </Tooltip>
                        </Box>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              </Fade>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;

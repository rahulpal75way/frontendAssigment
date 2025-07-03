// components/TransactionTabs.jsx
import React from "react";
import { Box, Button, Chip } from "@mui/material";

const TransactionTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        px: 3,
        pt: 2,
        width: {
          xs: "100%",
          md: "800px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 1,
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
      >
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            variant={activeTab === tab.id ? "contained" : "text"}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              whiteSpace: "nowrap",
              flexShrink: 0,
              ...(activeTab === tab.id && {
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                width: "120px",
              }),
            }}
          >
            <span>
              {tab.label}
              <Chip
                size="small"
                label={tab.data.length}
                sx={{
                  ml: 1,
                  height: 20,
                  backgroundColor:
                    activeTab === tab.id
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(0,0,0,0.1)",
                  color: activeTab === tab.id ? "white" : "text.secondary",
                }}
              />
            </span>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default TransactionTabs;

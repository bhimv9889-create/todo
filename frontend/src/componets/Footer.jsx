import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box
            sx={{
                mt: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                color: "white",
                opacity: 0.95,
                backgroundColor: "#5c63ef",
                height: "50px"
            }}
        >
            <Typography variant="body2">
                © {new Date().getFullYear()} ToDo App | Made with ❤️ by Bhim Vishwakarma
            </Typography>
        </Box>
    );
}

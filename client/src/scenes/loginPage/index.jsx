import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function LoginPage() {
    const theme = useTheme();
    const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    return (
        <Box>
            <Box width="100%" backgroundColor={theme.palette.background.alt} p="1rem 6%" textAlign="center">
                <Typography
                    fontWeight="bold"
                    fontSize="32px"
                    color="primary"
                >
                    linkLounge
                </Typography>
            </Box>
            <Box
                width={isNonMobileScreen ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                Welcome to linkLounge, your chill spot to connect, share, and vibe with your favorite people!
                </Typography>
                <Form />
            </Box>
        </Box>
    );
}

export default LoginPage;

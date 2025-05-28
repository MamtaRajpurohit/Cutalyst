import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Stack, Box } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px)",
        borderRadius: "20px",
        mx: 3,
        mt: 3,
        px: 2,
        py: 1,
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 8px 30px rgba(255, 255, 255, 0.1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            fontWeight: "bold",
            letterSpacing: 1.5,
            color: "#e1bee7",
            textDecoration: "none",
            textShadow: "0 0 15px rgba(193, 103, 219, 0.8)",
            transition: "transform 0.3s ease, text-shadow 0.3s",
            "&:hover": {
              transform: "scale(1.08)",
              textShadow: "0 0 20px rgba(255, 128, 202, 0.9)",
            },
          }}
        >
          Cutalyst ✨
        </Typography>

        {/* Nav Links */}
        <Stack
          direction="row"
          spacing={4}
          sx={{
            alignItems: "center",
            "@media (max-width: 768px)": { display: "none" },
          }}
        >
          {/* Reusable NavLink Style */}
          {[
            { label: "Features", to: "/features" },
            { label: "Dashboard", to: "/dashboard" },
            { label: "Login", to: "/login" },
          ].map(({ label, to }) => (
            <Typography
              key={label}
              component={Link}
              to={to}
              variant="body1"
              sx={{
                position: "relative",
                cursor: "pointer",
                fontWeight: 500,
                color: "white",
                textDecoration: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "#f8bbd0",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-4px",
                  left: 0,
                  width: "100%",
                  height: "2px",
                  background:
                    "linear-gradient(to right, #ce93d8, #f06292, #f8bbd0)",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s ease-in-out",
                },
                "&:hover::after": {
                  transform: "scaleX(1)",
                },
              }}
            >
              {label}
            </Typography>
          ))}

          {/* Sign Up Button */}
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            sx={{
              background: "linear-gradient(to right, #ab47bc, #f06292)",
              color: "#fff",
              px: 4,
              py: 1.2,
              fontWeight: "bold",
              borderRadius: "999px",
              boxShadow: "0 4px 14px rgba(240, 98, 146, 0.4)",
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(to right, #f06292, #ff80ab)",
                transform: "scale(1.07)",
                boxShadow: "0 6px 18px rgba(255, 128, 171, 0.6)",
              },
            }}
          >
            Sign Up 🚀
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}






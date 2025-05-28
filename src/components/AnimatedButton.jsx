import { Button, Box } from "@mui/material";
import { useState } from "react";

export default function AnimatedButton({ text }) {
  const [hover, setHover] = useState(false);

  return (
    <Button
      variant="contained"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        position: "relative",
        px: 4,
        py: 1.5,
        fontSize: "1.1rem",
        fontWeight: "600",
        letterSpacing: "1px",
        textTransform: "uppercase",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        background: "linear-gradient(to right, #9b4dca, #f06292)",
        color: "white",
        boxShadow: hover
          ? "0px 5px 25px rgba(255, 105, 180, 0.6)"
          : "0px 3px 15px rgba(255, 105, 180, 0.3)",
        "&:hover": {
          transform: "scale(1.08)",
          boxShadow: "0px 6px 30px rgba(255, 105, 180, 0.8)",
        },
        "&:active": {
          transform: "scale(1)",
          boxShadow: "0px 2px 10px rgba(255, 105, 180, 0.5)",
        },
      }}
    >
      {/* Glow Effect */}
      <Box
        sx={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 10%, transparent 50%)",
          opacity: hover ? 0.5 : 0.2,
          transition: "opacity 0.3s ease",
        }}
      />
      
      {/* Animated Shine Effect */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(120deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 70%)",
          opacity: 0,
          transform: "translateX(-100%)",
          animation: hover ? "shine 1.2s infinite linear" : "none",
        }}
      />

      <span style={{ position: "relative", zIndex: 2 }}>{text}</span>
    </Button>
  );
}



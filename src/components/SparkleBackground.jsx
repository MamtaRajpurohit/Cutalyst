// SparkleBackground.jsx
import { Box } from '@mui/material';

export default function SparkleBackground() {
  return (
    <Box
      position="absolute"
      inset="0"
      pointerEvents="none"
      overflow="hidden"
      zIndex="0"
    >
      <Box
        width="100%"
        height="100%"
        sx={{
          background: 'linear-gradient(to top right, #9c27b0, #f06292)',
          opacity: 0.2,
          animation: 'pulse 2s infinite',
        }}
      />
      <Box
        position="absolute"
        inset="0"
        sx={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.1,
        }}
      />
    </Box>
  );
}


  
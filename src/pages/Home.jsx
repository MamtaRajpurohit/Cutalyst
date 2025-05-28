import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import UploadSection from "../components/UploadSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <Box
      as="section"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      position="relative"
      textAlign="center"
      overflow="hidden"
      sx={{
        background: "linear-gradient(-45deg, #7b1fa2, #e91e63, #ff4081, #ab47bc)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 8s ease infinite",
        color: "#fff",
      }}
    >
      {/* Gradient + Float Animations */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>

      {/* Glass Overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backdropFilter="blur(15px)"
        bg="rgba(255, 255, 255, 0.05)"
        zIndex="0"
      />

      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          top={`${Math.random() * 100}%`}
          left={`${Math.random() * 100}%`}
          width={`${Math.random() * 6 + 4}px`}
          height={`${Math.random() * 6 + 4}px`}
          bg="rgba(255, 255, 255, 0.3)"
          borderRadius="50%"
          zIndex="2"
          animation={`float ${Math.random() * 5 + 3}s infinite ease-in-out`}
        />
      ))}

      {/* Navbar */}
      <Box position="relative" zIndex="10">
        <Navbar />
      </Box>

      {/* Hero + Upload Sections */}
      <Box
        as="main"
        flex="1"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        zIndex="10"
        position="relative"
      >
        <HeroSection />
        <UploadSection />
      </Box>

      {/* Footer */}
      <Box position="relative" zIndex="10">
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;




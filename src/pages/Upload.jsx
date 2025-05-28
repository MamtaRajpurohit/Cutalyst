import React, { useState } from 'react';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Upload() {
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      bgGradient="linear(to-br, #0d0d0d, #1a1a1a)"
      color="white"
      position="relative"
    >
      {/* Navbar */}
      <Navbar />

      {/* Upload Section */}
      <Box as="main" flex="1" display="flex" alignItems="center" justifyContent="center">
        <VStack
          spacing={6}
          width={{ base: '90%', sm: '500px' }}
          height="350px"
          bg="rgba(255, 255, 255, 0.1)"
          border="1px solid"
          borderColor="purple.500"
          backdropFilter="blur(10px)"
          borderRadius="16px"
          boxShadow="lg"
          justifyContent="center"
          textAlign="center"
          transition="all 0.3s"
          _hover={{ boxShadow: 'xl', borderColor: 'purple.600' }}
          position="relative"
        >
          <Text fontSize="lg" fontWeight="bold" color="gray.300">
            Upload Your Video
          </Text>

          <Button
            as="label"
            variant="solid"
            colorScheme="purple"
            cursor="pointer"
            borderRadius="12px"
            px={6}
            py={2}
          >
            Browse Files
            <input
              type="file"
              hidden
              accept="video/*"
              onChange={handleFileUpload}
            />
          </Button>

          <Text fontSize="sm" color="gray.400">
            {fileName ? `Selected: ${fileName}` : 'or Drag & Drop here'}
          </Text>

          {/* Glow Border Animation */}
          <Box
            position="absolute"
            inset="0"
            borderRadius="16px"
            border="1px solid"
            borderColor="purple.400"
            pointerEvents="none"
            animation="pulse 2s infinite"
          />
        </VStack>
      </Box>

      {/* Footer */}
      <Footer />

      {/* Soft Glows */}
      <Box
        position="absolute"
        top="15%"
        left="10%"
        width="200px"
        height="200px"
        bgGradient="radial(closest-side, rgba(173, 127, 240, 0.4), transparent)"
        filter="blur(80px)"
        zIndex={-1}
      />
      <Box
        position="absolute"
        bottom="10%"
        right="10%"
        width="150px"
        height="150px"
        bgGradient="radial(closest-side, rgba(216, 27, 96, 0.4), transparent)"
        filter="blur(80px)"
        zIndex={-1}
      />
    </Box>
  );
}

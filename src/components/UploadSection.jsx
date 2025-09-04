import { useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function UploadSection() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponse(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
    setResponse(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a video file!");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Uploading file:", file);
      const res = await fetch("https://diu068-cutalyst.hf.space/upload", {
        method: "POST",
        body: formData,
        headers: {
              Accept: "application/json",
        },
      });
      if (!res.ok) throw new Error("Server error: " + res.status);
      const data = await res.json();
      console.log("Pipeline response:", data);
      setResponse(data);
    } catch (err) {
      console.error("Upload/pipeline failed:", err);
      setResponse({ error: err.message });
    } finally {
      setUploading(false);
    }
  };

  return (
    <section id="upload" style={{ padding: '6rem 0', textAlign: 'center' }}>
      <Box
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        sx={{
          width: { xs: '90%', sm: '500px' },
          height: '300px',
          bgcolor: 'rgba(255,255,255,0.1)',
          border: '2px dashed',
          borderColor: 'rgba(173,127,240,0.6)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          boxShadow: '0 5px 20px rgba(173,127,240,0.3)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(173,127,240,0.5)',
            transform: 'scale(1.02)',
          },
          position: 'relative', margin: 'auto',
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 50, color: 'rgba(173,127,240,0.8)', mb: 1 }}/>
        <Typography variant="h6" color="gray.300" gutterBottom>
          {file ? file.name : "Upload Your Video"}
        </Typography>

        <input
          type="file"
          accept="video/*"
          id="video-upload"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <label htmlFor="video-upload">
          <Button
            component="span"
            variant="contained"
            sx={{
              background: 'linear-gradient(to right, #8e24aa, #d81b60)',
              color: 'white', px: 4, py: 1,
              fontWeight: 'bold', borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(216,27,96,0.5)',
              transition: 'all 0.3s',
              '&:hover': {
                background: 'linear-gradient(to right, #d81b60, #ff4081)',
                transform: 'scale(1.05)',
                boxShadow: '0 6px 15px rgba(255,64,129,0.7)',
              },
            }}
          >
            Browse Files
          </Button>
        </label>

        <Typography variant="caption" color="gray.400" mt={1}>
          or Drag & Drop here
        </Typography>

        {file && !uploading && (
          <Button
            onClick={handleUpload}
            variant="outlined"
            sx={{
              mt: 2, borderColor: '#d81b60',
              color: '#d81b60', fontWeight: 'bold',
              '&:hover': { backgroundColor: '#f8bbd0', borderColor: '#d81b60' },
            }}
          >
            Upload
          </Button>
        )}

        {uploading && <CircularProgress sx={{ mt: 2, color: '#d81b60' }} />}

        {response && (
          <Box mt={2} textAlign="center">
            {response.error && (
              <Typography variant="body2" color="error">
                {response.error}
              </Typography>
            )}
            {response.short_url && (
              <>
                <Typography variant="body2" color="success.main" gutterBottom>
                  🎬 Your short video is ready!
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    wordBreak: 'break-all',
                    color: '#8e24aa',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(response.short_url);
                    alert("URL copied!");
                  }}
                >
                  🔗 {response.short_url}
                </Typography>
              </>
            )}
          </Box>
        )}

        <Box
          sx={{
            position: 'absolute', inset: 0,
            borderRadius: '16px',
            border: '2px solid transparent',
            background: 'linear-gradient(90deg, rgba(173,127,240,0.2), rgba(216,27,96,0.2))',
            maskImage: 'linear-gradient(#000, rgba(0,0,0,0.2))',
            pointerEvents: 'none',
            animation: 'pulse-border 2s infinite',
          }}
        />
      </Box>

      <style>{`
        @keyframes pulse-border {
          0%   { box-shadow: 0 0 10px rgba(173,127,240,0.3); }
          50%  { box-shadow: 0 0 20px rgba(173,127,240,0.6); }
          100% { box-shadow: 0 0 10px rgba(173,127,240,0.3); }
        }
      `}</style>
    </section>
  );
}




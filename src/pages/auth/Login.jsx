import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  InputAdornment,
  CircularProgress,
  Toolbar,
  Container,
  Paper,
  Alert,
  IconButton,
  InputLabel,
  OutlinedInput,
  FormControl
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill all required fields");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await login(username, password);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.message || "Authentication failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleDemoLogin = (user, pass) => {
    setUsername(user);
    setPassword(pass);
  };

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      minHeight: "100vh", 
      bgcolor: "#f0f2f5",
      backgroundImage: "radial-gradient(at 0% 0%, hsla(210,100%,96%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,100%,96%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(240,100%,96%,1) 0, transparent 50%)",
    }}>
      <Header />
      <Toolbar />
      
      <Box sx={{ 
        flexGrow: 1, 
        display: "flex", 
        alignItems: "center", 
        py: { xs: 4, md: 8 } 
      }}>
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              borderRadius: 5,
              overflow: "hidden",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              minHeight: 600,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(20px)",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            {/* BRANDING SECTION */}
            <Box
              sx={{
                flex: 1.2,
                background: "linear-gradient(135deg, #1e3a8a 0%, #172554 100%)",
                color: "white",
                p: { xs: 4, md: 8 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {/* Decorative elements */}
              <Box sx={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
              }} />
              <Box sx={{
                position: "absolute",
                bottom: -80,
                left: -80,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.03)",
              }} />

              <Box sx={{ position: "relative", zIndex: 1 }}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                  alt="Emblem of India"
                  style={{ 
                    height: 140, 
                    marginBottom: 32, 
                    filter: "drop-shadow(0 0 20px rgba(255,255,255,0.2)) brightness(0) invert(1)" 
                  }}
                />
                
                <Typography variant="h3" fontWeight="800" letterSpacing="-0.5px" gutterBottom>
                  AMRAVATI
                </Typography>
                <Typography variant="h5" fontWeight="300" sx={{ opacity: 0.9, letterSpacing: "1px", mb: 4 }}>
                  District Administration Portal
                </Typography>
                
                <Box sx={{ width: 60, height: 4, bgcolor: "#f59e0b", mx: "auto", mb: 4, borderRadius: 2 }} />
                
                <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 350, mx: "auto", fontWeight: 300, lineHeight: 1.7 }}>
                  Access the official communication and task allocation system for enhanced district governance and efficient service delivery.
                </Typography>
              </Box>
            </Box>

            {/* LOGIN FORM SECTION */}
            <Box
              sx={{
                flex: 1,
                p: { xs: 4, md: 8 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                bgcolor: "white"
              }}
            >
              <Box sx={{ mb: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                   <AdminPanelSettingsIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
                   <Typography variant="h4" fontWeight="700" color="text.primary">
                    Sign In
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                  Welcome back! Please enter your details.
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" variant="filled" sx={{ mb: 4, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleLogin}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    fullWidth
                    label="Username or Email"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        bgcolor: "#f8fafc"
                      }
                    }}
                  />

                  <FormControl variant="outlined" fullWidth sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      bgcolor: "#f8fafc"
                    }
                  }}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      startAdornment={
                        <InputAdornment position="start">
                          <LockOutlinedIcon color="action" />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link href="#" underline="hover" variant="subtitle2" fontWeight="600" color="primary">
                      Forgot Password?
                    </Link>
                  </Box>

                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      py: 1.8,
                      borderRadius: 3,
                      fontSize: "1rem",
                      fontWeight: "700",
                      background: "linear-gradient(90deg, #1e3a8a, #2563eb)",
                      boxShadow: "0 10px 15px -3px rgba(30, 58, 138, 0.3)",
                      textTransform: "none",
                      '&:hover': {
                        background: "linear-gradient(90deg, #1e40af, #3b82f6)",
                        boxShadow: "0 20px 25px -5px rgba(30, 58, 138, 0.4)",
                        transform: "translateY(-1px)"
                      },
                      transition: "all 0.2s ease"
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In to Portal"}
                  </Button>
                </Box>
              </form>

              {/* Demo Credentials */}
              <Box sx={{ 
                mt: 5, 
                p: 3, 
                borderRadius: 4, 
                bgcolor: "#f8fafc", 
                border: "1px dashed #cbd5e1" 
              }}>
                <Typography variant="body2" fontWeight="bold" color="text.secondary" gutterBottom>
                  Quick Access (Demo)
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      size="small" 
                      onClick={() => handleDemoLogin('admin', 'admin123')}
                      sx={{ borderRadius: 2, textTransform: "none", fontSize: "0.75rem" }}
                    >
                      Admin
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      size="small" 
                      color="secondary"
                      onClick={() => handleDemoLogin('collector', 'collector123')}
                      sx={{ borderRadius: 2, textTransform: "none", fontSize: "0.75rem" }}
                    >
                      Collector
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              <Typography variant="caption" color="text.disabled" textAlign="center" sx={{ mt: 4 }}>
                Portal version 1.0.4 • Secure Connection SSL/TLS
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
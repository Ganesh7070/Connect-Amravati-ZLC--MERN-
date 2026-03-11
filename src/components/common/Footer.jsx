import React from 'react';
import {
  Box,
  Typography,
  Link,
  Container,
  Grid,
  Divider,
  Stack
} from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: '#0f172a', // Darker navy for a premium look
        color: 'rgba(255, 255, 255, 0.8)',
        borderTop: '4px solid #f59e0b', // Decorative accent border
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between" alignItems="flex-start">
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                alt="GOI"
                style={{ height: 40, marginRight: 15, filter: 'brightness(0) invert(1)' }}
              />
              <Box>
                <Typography variant="h6" fontWeight="bold" color="white" sx={{ letterSpacing: '0.5px' }}>
                  CONNECT AMRAVATI
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.6, display: 'block' }}>
                  DISTRICT ADMINISTRATION PORTAL
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ lineHeight: 1.6, mb: 2 }}>
              Ensuring transparent communication and efficient task management across the district administration of Amravati.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 2, sm: 4 }}
              justifyContent="flex-end"
            >
              <Box>
                <Typography variant="subtitle2" color="white" fontWeight="bold" gutterBottom>
                  Quick Links
                </Typography>
                <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5, fontSize: '0.875rem' }}>Home</Link>
                <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5, fontSize: '0.875rem' }}>Login</Link>
                <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5, fontSize: '0.875rem' }}>About District</Link>
              </Box>
              {/* <Box>
                <Typography variant="subtitle2" color="white" fontWeight="bold" gutterBottom>
                  Support
                </Typography>
                <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5, fontSize: '0.875rem' }}>Help Center</Link>
                <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5, fontSize: '0.875rem' }}>Contact NIC</Link>
                <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5, fontSize: '0.875rem' }}>Privacy Policy</Link>
              </Box> */}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption">
            &copy; {new Date().getFullYear()} Collector Office, Amravati. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ mr: 1 }}>
              Developed & Maintained By
            </Typography>
            <Link
              href="https://settribe.com/Home"
              color="secondary"
              target="_blank"
              underline="hover"
              sx={{ fontWeight: 'bold' }}
            >
              SETTribe
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;


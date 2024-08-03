import React from 'react';
import { Container, Box, Typography, Link, TextField, Button, Grid, Divider } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box sx={{ backgroundColor: 'white', color: 'black', py: 4, boxShadow: 3 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Funiro
                        </Typography>
                        <Typography variant="body2" color={'gray'} >
                            400 University Drive Suite 200 Coral Gables, FL 33134 USA
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Links
                        </Typography>
                        <Box>
                            <Link href="#" color="gray" underline="none">
                                Home
                            </Link>
                        </Box>
                        <Box>
                            <Link href="#" color="gray" underline="none">
                                Shop
                            </Link>
                        </Box>
                        <Box>
                            <Link href="#" color="gray" underline="none">
                                About
                            </Link>
                        </Box>
                        <Box>
                            <Link href="#" color="gray" underline="none">
                                Contact
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Help
                        </Typography>
                        <Box>
                            <Link href="#" color="gray" underline="none">
                                Payment Options
                            </Link>
                        </Box>
                        <Box>
                            <Link href="#" color="gray" underline="none">
                                Returns
                            </Link>
                        </Box>
                        <Box>
                            <Link href="#" color="gray" underline="none">
                                Privacy Policies
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Newsletter
                        </Typography>
                        <Box display="flex" flexDirection="column">
                            <Box display="flex" mb={1}>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    placeholder="Enter Your Email Address"
                                    sx={{ backgroundColor: 'white', borderRadius: 1, mr: 1 }}
                                    fullWidth
                                />
                                <Button sx={{ color: 'black', borderRadius: 1, marginRight: 2, fontWeight: 'bold' }}>
                                    SUBSCRIBE
                                </Button>
                            </Box>
                            <Divider />
                        </Box>
                    </Grid>
                </Grid>
                <Box textAlign="center" mt={4}>
                    <Typography variant="body2">
                        2023 Funiro. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};
export default Footer;

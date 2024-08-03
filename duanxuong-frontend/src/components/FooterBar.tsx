import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HighQualityOutlinedIcon from '@mui/icons-material/HighQualityOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';

const FooterBar: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#FAF3EA', // Màu nền
                padding: '60px 0',
                textAlign: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 15px' }}>
                    <HighQualityOutlinedIcon sx={{ fontSize: '2rem', color: 'black' }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                        High Quality
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray', fontSize: '0.875rem' }}>
                        Crafted from Top Materials
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 15px' }}>
                    <LocalShippingOutlinedIcon sx={{ fontSize: '2rem', color: 'black' }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                        Free Shipping
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray', fontSize: '0.875rem' }}>
                        Crafted from Top Materials
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 15px' }}>
                    <HighQualityOutlinedIcon sx={{ fontSize: '2rem', color: 'black' }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                        High Quality
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray', fontSize: '0.875rem' }}>
                        Crafted from Top Materials
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 15px' }}>
                    <SupportAgentOutlinedIcon sx={{ fontSize: '2rem', color: 'black' }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                        24 / 7 Support
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray', fontSize: '0.875rem' }}>
                        Crafted from Top Materials
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default FooterBar;

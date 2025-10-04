import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';

function SimpleAppBar() {
    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* 왼쪽 아이콘 + 텍스트 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AdbIcon />
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                            fontWeight: 700,
                            fontFamily: 'monospace',
                        }}
                    >
                        캘린더
                    </Typography>
                </Box>

                {/* 오른쪽 Avatar */}
                <Avatar alt="User" />
            </Toolbar>
        </AppBar>
    );
}

export default SimpleAppBar;

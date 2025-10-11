import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';

export default function Header() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    // 아바타 클릭 시 메뉴 열기
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // 메뉴 닫기
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // 로그아웃 처리
    const handleLogout = () => {
        localStorage.removeItem('token'); // 토큰 삭제
        handleMenuClose();
        navigate('/login'); // 로그인 페이지로 이동
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* 왼쪽 로고나 이름 */}
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

                {/* 오른쪽 유저 아바타 */}
                <Box>
                    <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 2 }}>
                        <Avatar alt="User" />
                    </IconButton>

                    {/* 드롭다운 메뉴 */}
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        onClick={handleMenuClose}
                        PaperProps={{
                            elevation: 3,
                            sx: {
                                mt: 1.5,
                                minWidth: 150,
                                '& .MuiMenuItem-root': { justifyContent: 'center' },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

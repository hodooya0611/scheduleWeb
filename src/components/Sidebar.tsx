import React from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                width: '220px',
                padding: '20px',
                borderRight: '1px solid #ddd',
                height: '100vh',
                boxSizing: 'border-box',
            }}
        >
            <Typography variant="h6" sx={{ mb: 2 }}>
                캘린더
            </Typography>

            <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/CreateCalender')}>
                + 캘린더 추가하기
            </Button>
        </div>
    );
}
